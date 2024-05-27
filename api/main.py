from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Form, HTTPException
import re

from functions import getInstructions, getCode

app = FastAPI()


@app.post("/")
async def root():
    return {"message": "Hello World"}


user_prompt = ""
user_features = ""
user_techs = ""
instructions_list = []


@app.post("/submit_form")
async def submit_form(
    prompt: str = Form(...), features: str = Form(...), techs: str = Form(...)
):
    global user_prompt, user_features, user_techs, instructions, instructions_list
    user_prompt = prompt
    user_features = features
    user_techs = techs

    instructions = getInstructions(user_prompt, user_features, user_techs)
    instructions_content = instructions.content
    instructions_list = re.split(r"\n\*\*\d+", instructions_content)
    return instructions


@app.post("/get_code")
async def get_code(data: dict):
    instruction_number = data.get("instruction_number")
    if instruction_number is None or instruction_number < 0:
        raise HTTPException(status_code=400, detail="Invalid instruction_number")
    code = getCode(instructions_list[instruction_number], user_techs)
    return code


@app.get("/get_num_instructions")
async def number_instructions():
    print(len(instructions_list))
    return len(instructions_list)


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
