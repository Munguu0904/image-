import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  // return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
};
