import { Document, Schema, Types, model, models } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  username: string;
  image?: string;
  password?: string;
  bio?: string;
  following?: Types.ObjectId[];
  followers?: Types.ObjectId[];
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
}

const UserSchema = new Schema<IUser>(
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
        /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 3-20 alphanumeric letters and be unique!",
      ],
    },
    password: {
      type: String,
    },
    image: { type: String },
    bio: { type: String, default: "" },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
