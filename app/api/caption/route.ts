import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  try {
    // 1. Frontend-ээс явуулж байгаа нэртэй яг ижилхэн 'image' гэж авна
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Зураг ирсэнгүй" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Энэ зураг дээр юу байгааг маш товч тайлбарла.",
            },
            {
              type: "image_url",
              image_url: {
                url: image, // Энд 'imageUrl' биш 'image' байх ёстой
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json({ output: response.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
