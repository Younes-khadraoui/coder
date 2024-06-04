"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/response";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";

const page = () => {
  const instructions = useStore((state) => state.instructions);
  const [initCode, setInitCode] = useState("");

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
    <div>
      {instructions && (
        <div className="p-10">
          <div>
            <h2 className="text-2xl">Instructions</h2>
            <ReactMarkdown>{instructions}</ReactMarkdown>
          </div>
          <Button onClick={getCode}>Get code</Button>
        </div>
      )}
    </div>
  );
};

export default page;
