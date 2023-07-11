import { NextRequest, NextResponse } from "next/server";
import {
  deletePrompt,
  getPromptById,
  updatePrompt,
} from "@/lib/prompt-actions";
import { Params } from "@/common.types";

export const GET = async (request: NextRequest, { params: { id } }: Params) => {
  try {
    const prompt = await getPromptById(id);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt Not Found" }, { status: 404 });
    }

    return NextResponse.json(prompt, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Params
) => {
  try {
    const existingPrompt = await getPromptById(id);

    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    const { prompt, tag } = await request.json();

    await updatePrompt(id, prompt, tag);

    return NextResponse.json(
      { message: "Prompt Updated successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Params
) => {
  try {
    await deletePrompt(id);

    return NextResponse.json(
      { message: "Prompt deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
