"use client";
import ChatForm from "@/components/costum/ChatForm";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function Home() {
  const getNumInstructions = async () => {
    const response = await axios.get(
      "http://localhost:8000/get_num_instructions"
    );
    const data = response.data;
    console.log(data);
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

      {/* {initCode && (
        <div>
          <h2>Initial code</h2>
          <pre>
            <ReactMarkdown>{initCode}</ReactMarkdown>
          </pre>
        </div>
      )} */}
    </main>
  );
}
