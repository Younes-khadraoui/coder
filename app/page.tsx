"use client";
import ChatForm from "@/components/costum/ChatForm";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/response";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const instructions = useStore((state) => state.instructions);
  const [initCode, setInitCode] = useState("");

  const getNumInstructions = async () => {
    const response = await axios.get(
      "http://localhost:8000/get_num_instructions"
    );
    const data = response.data;
    console.log(data);
  };

  const getCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/get_code",
        {
          instruction_number: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInitCode(response.data.content);
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10">
        <h1 className="text-4xl font-bold">Coder</h1>
        <p className="text-2xl">
          The best <span className="animate-pulse text-red-400">AI</span> coder
          in the world
        </p>
      </div>
      <ChatForm />
      {instructions && (
        <div>
          <div className="p-10">
            <h2 className="text-2xl">Instructions</h2>
            <ReactMarkdown>{instructions}</ReactMarkdown>
          </div>
          <Button onClick={getCode}>Get code</Button>
        </div>
      )}
      {initCode && (
        <div>
          <h2>Initial code</h2>
          <pre>
            <ReactMarkdown>{initCode}</ReactMarkdown>
          </pre>
        </div>
      )}
    </main>
  );
}
