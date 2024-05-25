from fastapi import FastAPI
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()

gemini_api_key = os.getenv("GOOGLE_API_KEY")


@app.get("/")
async def root():
    return {"message": "Hello World"}
