from pymongo import MongoClient
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration - Use environment variables for security
MONGO_URI = os.getenv("DB_URL")  # Default to localhost
DATABASE_NAME = "coursevita"
STUDENTS_COLLECTION = "studentcollection"

def create_and_post_student_data(num_students=10):
    """
    Creates fake student data and inserts it into the MongoDB collection.

    Args:
        num_students: The number of fake student records to create.
    """

    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    students_collection = db[STUDENTS_COLLECTION]

    # Example skills (expand this list!)
    skills_list = [
        "Python", "JavaScript", "React", "Node.js", "Java", "C++", "C#",
        "SQL", "NoSQL", "MongoDB", "PostgreSQL", "AWS", "Azure", "GCP",
        "Docker", "Kubernetes", "Data Analysis", "Machine Learning",
        "Deep Learning", "Natural Language Processing", "Computer Vision",
        "Web Development", "Mobile Development", "UI/UX Design",
        "Project Management", "Agile", "Scrum", "Git", "Testing", "Debugging"
    ]

    fake_students = []
    for i in range(num_students):
        student = {
            "_id": f"student{i+1}",  # Use a string _id for consistency with recommendations.py
            "userType": "student",
            "aparId": f"APAR{i+1:05}",  # Example: APAR00001, APAR00002, ...
            "email": f"student{i+1}@example.com",
            "password": "hashedPasswordExample",  # In a real app, hash passwords!
            "projects": [f"Project {i+1} - {j}" for j in range(1, 4)], # List of projects
            "name": f"Student Name {i+1}",
            "college_name": f"University {i+1}",
            "cgpa": round(7.0 + (i % 3), 2), # Example CGPA between 7.0 and 9.0
            "performance": {
                "subjects": {
                    "Math": {"sub_marks": 80 + (i % 20)},        # Marks between 80 and 99
                    "Science": {"sub_marks": 75 + (i % 25)},    # Marks between 75 and 99
                    "English": {"sub_marks": 60 + (i % 40)},   # Marks between 60 and 99
                }
            },
            "skills": [skills_list[(i + j) % len(skills_list)] for j in range(3)], # Select 3 skills
            "createdAt": datetime.datetime.now(datetime.timezone.utc),
            "updatedAt": datetime.datetime.now(datetime.timezone.utc),
        }
        fake_students.append(student)

    # Insert the data. Use insert_many for efficiency.
    try:
      result = students_collection.insert_many(fake_students)
      print(f"Inserted {len(result.inserted_ids)} student records.")
    except Exception as e:
       print(f"An error occurred: {e}")
    finally:
      client.close()

def print_students(num_to_print=5):
    """Prints a specified number of student records from the database."""

    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    students_collection = db[STUDENTS_COLLECTION]

    try:
        # Find and print the specified number of students
        for student in students_collection.find().limit(num_to_print):
            print(student)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    create_and_post_student_data(20)
    print_students(5)  # Create and insert 20 fake student records