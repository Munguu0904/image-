import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 },
      );
    }

    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Identify ingredients. Return only a single string of ingredients separated by a comma and a space. Example: Pasta, Egg, Bacon, Garlic",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "List ingredients from this image, separated by commas.",
            },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      temperature: 0.1,
    });

    const rawContent = visionResponse.choices[0]?.message?.content || "";

    const ingredientsArray = rawContent
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return NextResponse.json({ ingredients: ingredientsArray });
  } catch (error: any) {
    console.error("Vision Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
