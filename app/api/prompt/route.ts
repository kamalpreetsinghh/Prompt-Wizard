import { getAllPrompts } from "@/lib/prompt-actions";

export const GET = async (request: Request, response: Response) => {
  try {
    const prompts = await getAllPrompts();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
