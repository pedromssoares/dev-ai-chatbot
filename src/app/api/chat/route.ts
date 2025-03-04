// app/api/chat/route.ts
import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { error: "A mensagem é obrigatória." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a software development assistant. Answer only questions about software development. Respond in the same language as the user's question.",
        },
        { role: "user", content: message },
      ],
      temperature: 0,
      stream: true,
      stream_options: { include_usage: true },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Itera sobre cada chunk recebido do stream.
          for await (const chunk of response) {
            const content = chunk.choices[0].delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          console.error("Erro no streaming:", error);
          // Se ocorrer erro, apenas loga sem chamar controller.error()
        } finally {
          // Assegura que o stream seja sempre fechado
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain", // ou "text/event-stream" se formatar como SSE
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro na rota de chat:", error);
    return NextResponse.json(
      {
        error:
          error.response?.data?.error?.message ||
          error.message ||
          "Erro interno.",
      },
      { status: 500 }
    );
  }
}