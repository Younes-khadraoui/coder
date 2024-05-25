"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prompt: z.string().min(2).max(50),
  features: z.string().min(2).max(50),
  techs: z.string().min(2).max(50),
});

const ChatForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      features: "",
      techs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("prompt", values.prompt);
      formData.append("features", values.features);
      formData.append("techs", values.techs);
      const response = await axios.post(
        "http://localhost:8000/submit_form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Prompt</FormLabel>
              <FormControl>
                <Input placeholder="Make an app ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Features</FormLabel>
              <FormControl>
                <Input placeholder="Feature 1, Feature 2 ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="techs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Tech Stack</FormLabel>
              <FormControl>
                <Input placeholder="Tech 1, Tech 2 ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {loading && <div className="text-xl">Loading...</div>}
    </Form>
  );
};

export default ChatForm;
