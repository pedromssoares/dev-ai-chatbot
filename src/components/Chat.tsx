"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Message } from "@/components/Message";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a parte inferior quando novas mensagens chegam.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit() {
    if (!input.trim()) return;

    setError(null);
    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.body) {
        throw new Error("No response body");
      }

      // Prepara o leitor para processar a resposta em stream.
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let streamedText = "";

      // Adiciona uma mensagem de IA vazia para atualização incremental.
      setMessages((prev) => [...prev, { sender: "ai", text: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        streamedText += decoder.decode(value, { stream: !done });

        // Atualiza a última mensagem (de IA) com o conteúdo acumulado.
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: "ai", text: streamedText };
          return updated;
        });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setError("Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>ChatBot about Software Development</CardTitle>
        <CardDescription>Ask me anything about software development.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="space-x-2">
        <Input
          placeholder="How can I help you?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={loading}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </CardFooter>

      {error && (
        <div className="p-2 text-sm text-red-600">
          <p>{error}</p>
        </div>
      )}
    </Card>
  );
}