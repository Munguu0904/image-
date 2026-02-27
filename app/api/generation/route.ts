import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Professional high-quality food photography of: ${prompt}. Appetizing, well-lit, realistic.`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = imageResponse.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error("Image Gen Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
