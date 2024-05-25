import ChatForm from "@/components/costum/ChatForm";

export default function Home() {
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
    </main>
  );
}
