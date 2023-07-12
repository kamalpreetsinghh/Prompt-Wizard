import Prompt, { IPrompt } from "@/models/prompt";
import { connectToDB } from "./dbConfig";

connectToDB();

export const getAllPrompts = async () => {
  const prompts = await Prompt.find({}).populate({
    path: "creator",
    select: "_id username image",
  });
  return prompts;
};

export const createPrompt = async (prompt: IPrompt) => {
  const createdPrompt = new Prompt(prompt);
  await createdPrompt.save();

  // We can also save using create method
  // const savedPrompt = await Prompt.create({creator: userId, prompt, tag})
  return createdPrompt;
};

export const deletePrompt = async (id: string) => {
  const result = await Prompt.findByIdAndDelete(id);
  return result;
};

export const getPromptById = async (id: string) => {
  const prompt = await Prompt.findById(id).populate("creator");
  return prompt;
};

export const updatePrompt = async (
  id: string,
  updatedPrompt: string,
  updatedTag: string
) => {
  const prompt = await Prompt.findById(id).populate("creator");

  let result;

  if (prompt) {
    prompt.prompt = updatedPrompt;
    prompt.tag = updatedTag;
    result = await prompt.save();
  }

  return result;
};

export const getPromptsByUserId = async (userId: string) => {
  const prompts = await Prompt.find({ creator: userId }).populate("creator");
  return prompts;
};
