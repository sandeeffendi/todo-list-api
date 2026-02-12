import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  UpdatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default User;
