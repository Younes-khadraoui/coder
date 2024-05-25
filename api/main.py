from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Form

from functions import getInstructions

app = FastAPI()


@app.post("/")
async def root():
    return {"message": "Hello World"}


@app.post("/submit_form")
async def submit_form(
    prompt: str = Form(...), features: str = Form(...), techs: str = Form(...)
):
    global user_prompt, user_features, user_techs
    user_prompt = prompt
    user_features = features
    user_techs = techs

    return getInstructions(user_prompt, user_features, user_techs)


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
