import { createPrompt } from "@/lib/prompt-actions";

export const POST = async (request: Request, response: Response) => {
  const inputPrompt = await request.json();

  try {
    const newPrompt = await createPrompt(inputPrompt);

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
