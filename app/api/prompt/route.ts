import { createPrompt, getAllPrompts } from "@/lib/prompt-actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const prompts = await getAllPrompts();

    return NextResponse.json(prompts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();

  try {
    const newPrompt = await createPrompt(requestBody);

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
