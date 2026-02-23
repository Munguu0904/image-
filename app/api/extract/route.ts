import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  return NextResponse.json({ result: "daraa ni ooroo soli" });
};
