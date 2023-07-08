import { NextRequest } from "next/server";
import {
  deletePrompt,
  getPromptById,
  updatePrompt,
} from "@/lib/prompt-actions";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const prompt = await getPromptById(id);
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const existingPrompt = await getPromptById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    const { prompt, tag } = await request.json();

    await updatePrompt(id, prompt, tag);

    return new Response("Prompt Updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating prompt", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await deletePrompt(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
