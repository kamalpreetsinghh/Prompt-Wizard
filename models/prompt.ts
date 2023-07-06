import mongoose, { Document, Schema, model, models } from "mongoose";

interface Prompt extends Document {
  creator: mongoose.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<Prompt>({
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
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
