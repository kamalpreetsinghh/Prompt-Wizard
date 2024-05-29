import { Params } from "@/common.types";
import { getPromptsByUserId } from "@/lib/prompt-actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params: { id } }: Params) => {
  try {
    const prompts = await getPromptsByUserId(id);

    return NextResponse.json(prompts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
