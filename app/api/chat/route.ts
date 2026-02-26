import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Mini Chatgpt." },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0].message.content;
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Aldaa garlaa" }, { status: 500 });
  }
}
