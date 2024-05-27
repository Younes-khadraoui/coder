from dotenv import load_dotenv
import os

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate


load_dotenv()
gemini_api_key = os.getenv("GOOGLE_API_KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-pro", google_api_key=os.getenv("GOOGLE_API_KEY")
)


def getInstructions(prompt: str, features: str, techs: str) -> str:
    init_prompt = f"""
        You are one of the best developers in the world, and you are going to build a great app.
        Give me detailed instructions to achieve this: {prompt}.
        I want in my app these features: {features}.
        And use the following tech stack: {techs}.
        And dont give code snippets, just the instructions.
    """

    return llm.invoke(init_prompt)


def getCode(instruction: str, techs: str) -> str:
    code_prompt = f"""
        You are one of the best developers in the world, and you are going to build a great app.
        Give me detailed instructions to achieve this: {instruction}.
        And use the following tech stack: {techs}.
        and give only code snippet and not the instructions.
    """

    return llm.invoke(code_prompt)

