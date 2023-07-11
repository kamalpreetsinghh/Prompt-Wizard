import { Document, Schema, Types, model, models } from "mongoose";

export interface IPrompt {
  prompt: string;
  tag: string;
  creator: Types.ObjectId;
}

interface IPromptDoc extends IPrompt, Document {}

const PromptSchema = new Schema<IPromptDoc>(
  {
    prompt: {
      type: String,
      required: [true, "Prompt is required."],
    },
    tag: {
      type: String,
      required: [true, "Tag is required."],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Prompt = models.prompts || model("prompts", PromptSchema);

export default Prompt;
