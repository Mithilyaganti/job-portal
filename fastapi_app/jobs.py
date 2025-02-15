# jobs.py (modified)
import pandas as pd
import pymongo
import os
from dotenv import load_dotenv
from typing import List, Dict, Any
from bson import ObjectId

def connect_to_mongodb(uri: str, db_name: str = "coursevita"):  # Added db_name
    """Connects to MongoDB and returns the client and database."""
    try:
        client = pymongo.MongoClient(uri)
        # Explicitly get the database using the provided db_name
        db = client.get_database(db_name)  # Use db_name here
        db.command('ping')  # Check connection
        print(f"Successfully connected to MongoDB database: {db_name}")
        return client, db
    except pymongo.errors.ConnectionFailure as e:
        print(f"Failed to connect to MongoDB: {e}")
        return None, None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None, None


def load_csv_data(file_path: str) -> pd.DataFrame:
    """Loads data from a CSV file into a pandas DataFrame."""
    try:
        df = pd.read_csv(file_path)
        return df
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None
    except pd.errors.EmptyDataError:
        print(f"Error: CSV file is empty at {file_path}")
        return None
    except pd.errors.ParserError as e:
        print(f"Error parsing CSV file at {file_path}:\n{e}")
        return None


def prepare_job_data(row: pd.Series) -> Dict[str, Any]:
    """
    Prepares a single job posting document from a pandas Series (CSV row).
    Handles data type conversions and nested structures.
    """
    def safe_str(value):
        return str(value) if pd.notna(value) else None
    
    def safe_list(value):
        if pd.isna(value):
             return []
        if isinstance(value, str):
            if value.startswith('[') and value.endswith(']'):
                return [item.strip() for item in value[1:-1].split(',') if item.strip()]
            else:
                return [value.strip()]
        return []
    
    def safe_int(value):
        try:
            return int(value) if pd.notna(value) else None
        except (ValueError, TypeError):
            return None
    
    
    job_data = {
        "title": safe_str(row.get("title")),
        "description": safe_str(row.get("description")),
        "identifier": safe_str(row.get("identifier")),
        "datePosted": pd.to_datetime(row.get("datePosted")).isoformat() if pd.notna(row.get("datePosted")) else None,
        "validThrough": pd.to_datetime(row.get("validThrough")).isoformat() if pd.notna(row.get("validThrough")) else None,
        "qualifications": safe_list(row.get("qualifications")),
        "experienceMonths": safe_int(row.get("experienceMonths")),
        "occupationalCategory": safe_str(row.get("occupationalCategory")),
        "responsibilities": safe_list(row.get("responsibilities")),
        "industry": safe_str(row.get("industry")),
        "skills": safe_list(row.get("skills")),
        "specialCommitments": safe_str(row.get("specialCommitments")),
        "workHours": safe_str(row.get("workHours")),
        "employmentType": safe_list(row.get("employmentType")),
        "organization": {
            "name": safe_str(row.get("OrganizationName")),
            "type": safe_str(row.get("OrganizationType")),
            "sameAs": safe_str(row.get("OrganizationSameAs")),
            "logo": safe_str(row.get("OrganizationLogo"))
        },
        "location": {
            "locality": safe_str(row.get("LocationLocality")),
            "region": safe_str(row.get("LocationRegion")),
            "postalCode": safe_str(row.get("LocationPostalCode")),
            "streetAddress": safe_str(row.get("LocationStreetAddress")),
            "country": safe_str(row.get("LocationCountry"))
        }
    }
    cleaned_job_data = {k: v for k, v in job_data.items() if v is not None}
    
    if "organization" in cleaned_job_data:
        cleaned_job_data["organization"] = {k: v for k, v in cleaned_job_data["organization"].items() if v is not None}
    if "location" in cleaned_job_data:
        cleaned_job_data["location"] = {k: v for k, v in cleaned_job_data["location"].items() if v is not None}

    return cleaned_job_data


def insert_job_data(db, job_data_list: List[Dict[str, Any]], collection_name: str = "jobs"): #added collection name
    """Inserts a list of job data dictionaries into the specified MongoDB collection."""
    if not job_data_list:
        print("No job data to insert.")
        return

    try:
        result = db[collection_name].insert_many(job_data_list)  # Use collection_name
        print(f"Inserted {len(result.inserted_ids)} documents into {collection_name}.")
    except pymongo.errors.BulkWriteError as e:
        print(f"Bulk write error: {e.details}")
        for error in e.details['writeErrors']:
            if error['code'] == 11000:
                print(f"  Duplicate key error on document with identifier: {error['op']['identifier']}")
            else:
                print(f"  Other write error: {error}")
    except Exception as e:
        print(f"An unexpected error occurred during insertion: {e}")


# main.py (modified)
import jobs
import os
from dotenv import load_dotenv

def main():
    """Main function to orchestrate the data loading and insertion."""
    load_dotenv()
    mongodb_uri = os.getenv("DB_URL")  # Use DB_URL
    if not mongodb_uri:
        print("Error: DB_URL environment variable not set.")
        return

    db_name = "coursevita"      # Database name
    collection_name = "jobs"   # Collection name

    client, db = jobs.connect_to_mongodb(mongodb_uri, db_name) #pass db name
    if not client:
        return

    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct the absolute path to the CSV file
    csv_file_path = os.path.join(script_dir, "jobs.csv")
    df = jobs.load_csv_data(csv_file_path)
    if df is None:
        client.close()
        return

    job_data_list = []
    for _, row in df.iterrows():
        job_data = jobs.prepare_job_data(row)
        job_data_list.append(job_data)

    jobs.insert_job_data(db, job_data_list, collection_name)  # Pass collection_name
    client.close()
    print("MongoDB connection closed.")

if __name__ == "__main__":
    main()