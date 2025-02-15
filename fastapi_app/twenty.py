import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGO_URI = os.environ.get("DB_URL")  # Or use a default value
DATABASE_NAME = "coursevita"
JOBS_COLLECTION = "jobs"
STUDENTS_COLLECTION = "studentcollection"

def get_db_collections():
    """Connects to MongoDB and returns the jobs and students collections."""
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    return db[JOBS_COLLECTION], db[STUDENTS_COLLECTION]

def preprocess_skills(skills):
    """Preprocesses skills to a lowercase space-separated string."""
    if skills is None:
        return ""
    if isinstance(skills, str):
        return skills.lower()
    if isinstance(skills, list):
        return " ".join(skill.lower() for skill in skills).strip()
    return ""

def create_job_skill_vectors(jobs_collection):
    """Creates TF-IDF vectors for job skills only."""
    job_cursor = jobs_collection.find(
        {
            "skills": {"$exists": True, "$ne": [], "$not": {"$type": "null"}},
             "$or": [
               {"skills": {"$type": "array"}},
               {"skills": {"$type": "string", "$ne": ""}},
             ]
        },
        {"skills": 1, "identifier": 1, "_id": 0}
    )
    job_skills_list = []
    job_identifiers = []
    for job in job_cursor:
        job_skills = preprocess_skills(job.get("skills"))
        job_skills_list.append(job_skills)
        job_identifiers.append(job.get("identifier", ""))

    vectorizer = TfidfVectorizer(stop_words='english', min_df=1)
    try:
        job_tfidf_matrix = vectorizer.fit_transform(job_skills_list)
        return job_tfidf_matrix, job_identifiers, vectorizer
    except ValueError as e:
        print(f"Error creating job vectors: {e}")
        return None, None, None

def get_student_skills_vector(student_id, students_collection, vectorizer):
    """Gets the TF-IDF vector for a single student's skills."""
    student = students_collection.find_one({"_id": student_id}, {"skills": 1, "_id": 0})
    if not student or "skills" not in student:
        return None

    student_skills = preprocess_skills(student["skills"])
    return vectorizer.transform([student_skills])


def recommend_jobs_for_student(student_id, jobs_collection, students_collection):
    """Recommends jobs for a given student ID."""

    # 1. Create Job Vectors (One-time operation, ideally cached)
    job_tfidf_matrix, job_identifiers, vectorizer = create_job_skill_vectors(jobs_collection)
    if job_tfidf_matrix is None:
        return []  # Or handle the error appropriately

    # 2. Get Student Vector
    student_vector = get_student_skills_vector(student_id, students_collection, vectorizer)
    if student_vector is None:
        return []

    # 3. Calculate Cosine Similarity
    cosine_similarities = cosine_similarity(student_vector, job_tfidf_matrix).flatten()

    # 4. Get Top N Job Indices
    top_n = 10  # Recommend 10 jobs
    top_job_indices = cosine_similarities.argsort()[::-1][:top_n]

    # 5. Get Job Details
    recommended_jobs = []
    for index in top_job_indices:
        job_identifier = job_identifiers[index]
        job_details = jobs_collection.find_one({"identifier": job_identifier}, {"_id": 0})
        if job_details:
            job_details['similarity_score'] = cosine_similarities[index].item()
            recommended_jobs.append(job_details)

    return recommended_jobs

# Example Usage (for testing)
if __name__ == "__main__":
    jobs_collection, students_collection = get_db_collections()
    test_student_id = "student1"  # Replace with a *string* student ID
    recommendations = recommend_jobs_for_student(test_student_id, jobs_collection, students_collection)

    if recommendations:
        print(f"Recommended Jobs for Student ID {test_student_id}:")
        for job in recommendations:
            print(f"  - Title: {job.get('title')}, Similarity: {job.get('similarity_score'):.4f}")
            print(f"    Description: {job.get('description')[:100]}...")
            print(f"    Organization: {job.get('organization', {}).get('name')}")
            print("-" * 20)
    else:
        print(f"No recommendations found for Student ID {test_student_id} or an error occurred.")