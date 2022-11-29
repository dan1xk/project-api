import bcrypt from "bcryptjs";
import { User } from "../types";
import { Schema } from "mongoose";
import { mongoose } from "../database";

const UserSchema: Schema<User> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next: () => void) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
