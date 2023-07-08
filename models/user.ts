import { Document, Schema, model, models } from "mongoose";

interface User extends Document {
  email: string;
  name: string;
  username: string;
  image: string;
  description?: string;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
    },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
