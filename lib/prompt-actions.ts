import Prompt, { IPrompt } from "@/models/prompt";
import { connectToDB } from "./database";

export const getAllPrompts = async () => {
  await connectToDB();

  const prompts = await Prompt.find({}).populate("creator");
  return prompts;
};

export const createPrompt = async (prompt: IPrompt) => {
  await connectToDB();

  const newPrompt = new Prompt(prompt);
  await newPrompt.save();

  // We can also save using create method
  // const savedPrompt = await Prompt.create({creator: userId, prompt, tag})
  return newPrompt;
};

export const deletePrompt = async (id: string) => {
  await connectToDB();

  const result = await Prompt.findByIdAndDelete(id);
  return result;
};

export const getPromptById = async (id: string) => {
  await connectToDB();

  const prompt = await Prompt.findById(id).populate("creator");
  return prompt;
};

export const updatePrompt = async (
  id: string,
  newPrompt: string,
  newTag: string
) => {
  const prompt = await Prompt.findById(id).populate("creator");
  prompt.prompt = newPrompt;
  prompt.tag = newTag;
  const result = await prompt.save();
  return result;
};

export const getPromptsByUserId = async (userId: string) => {
  await connectToDB();

  const prompts = await Prompt.find({ creator: userId }).populate("creator");
  return prompts;
};
