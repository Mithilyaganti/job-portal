# test.py
import pymongo
import os
from dotenv import load_dotenv

def print_sample_jobs(db_uri: str, db_name: str, collection_name: str, num_jobs: int = 5):
    """Prints a sample of job postings from a MongoDB database.

    Args:
        db_uri: The MongoDB connection URI.
        db_name: The name of the database.
        collection_name: The name of the collection.
        num_jobs: The number of jobs to print (default is 5).
    """
    try:
        client = pymongo.MongoClient(db_uri)
        db = client.get_database(db_name)
        collection = db[collection_name]

        jobs = collection.find().limit(num_jobs)
        for job in jobs:
            print(job)

        client.close()  # Close the connection when done
        print("MongoDB connection closed.")

    except pymongo.errors.ConnectionFailure as e:
        print(f"Failed to connect to MongoDB: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")



def main():
    """Main function to connect to MongoDB and print sample jobs."""
    load_dotenv()  # Load environment variables from .env file
    db_uri = os.getenv("DB_URL")

    if not db_uri:
        print("Error: DB_URL environment variable not set.")
        return

    db_name = "coursevita"
    collection_name = "jobs"

    print_sample_jobs(db_uri, db_name, collection_name)



if __name__ == "__main__":
    main()