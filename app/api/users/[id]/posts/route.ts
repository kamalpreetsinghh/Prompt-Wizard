import { getPromptsByUserId } from "@/lib/prompt-actions";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const prompts = await getPromptsByUserId(id);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
