import Prompt from "@/models/prompt";
import { connectToDB } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;

  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request: Request, response: Response) => {
  const url = request.url.split("/");
  const id = url[url.length - 1];
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Prompt Updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating prompt", { status: 500 });
  }
};

export const DELETE = async (request: Request, response: Response) => {
  const url = request.url.split("/");
  const id = url[url.length - 1];

  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
