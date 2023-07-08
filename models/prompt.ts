import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IPrompt {
  creator: mongoose.Types.ObjectId;
  prompt: string;
  tag: string;
}

interface IPromptDoc extends IPrompt, Document {}

const PromptSchema = new Schema<IPromptDoc>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required."],
    },
    tag: {
      type: String,
      required: [true, "Tag is required."],
    },
  },
  { timestamps: true }
);

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
