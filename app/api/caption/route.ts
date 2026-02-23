import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    return NextResponse.json({ result: "daraa ni ooroo soli" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
