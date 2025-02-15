from fastapi import FastAPI, HTTPException, Path
from pymongo import MongoClient
import google.generativeai as genai
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI") or "mongodb://localhost:27017/"
DATABASE_NAME = os.getenv("DATABASE_NAME") or "job_portal_db"
COLLECTION_NAME = os.getenv("COLLECTION_NAME") or "users"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Gemini API key not found. Set GEMINI_API_KEY environment variable.")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')


def fetch_data_from_mongodb(apar_id: str):
    """Fetches user data from MongoDB based on aparId."""
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    users_collection = db[COLLECTION_NAME]

    user = users_collection.find_one({"aparId": apar_id, "userType": "student"})
    client.close()

    if not user:
        return None  

    prompt_text = ""

    if "performance" in user and "subjects" in user["performance"]:
        for subject_name, subject_data in user["performance"]["subjects"].items():
            if "sub_marks" in subject_data and isinstance(subject_data["sub_marks"], (int, float)):
                if subject_data["sub_marks"] > 50: 
                    prompt_text += f"Subject: {subject_name}\n"
    if "projects" in user and user["projects"]:
        prompt_text += f"Projects: {user['projects']}\n"

    return prompt_text


def generate_skills_with_gemini(prompt_text: str) -> List[str]:
    """Calls Gemini API to extract skills from the given prompt."""
    if not prompt_text:
        return [] 

    prompt = f"Extract relevant technical skills from the following:\n{prompt_text}\nSkills should be in list format only ex: [skill1, skill2, skill3].\nSkills:"
    try:
        response = model.generate_content(prompt)
        skill_text = response.text

        skills_list_str = skill_text.strip().strip('[]').replace(' ', '').lower()
        skills_list = [skill.strip() for skill in skills_list_str.split(',')] if skills_list_str else [] 
        return skills_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini API: {e}")


@app.get("/get_skills/{apar_id}", response_model=dict) # Path parameter for apar_id
async def get_skills(apar_id: str = Path(..., title="The APAR ID of the student")):
    """API endpoint to get relevant skills for a specific student by APAR ID."""
    data_prompt = fetch_data_from_mongodb(apar_id) 
    if not data_prompt:
        raise HTTPException(status_code=404, detail=f"No data found for student with APAR ID: {apar_id}")

    skills = generate_skills_with_gemini(data_prompt)
    return {"skills": skills}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)