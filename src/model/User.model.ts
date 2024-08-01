import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  avatar: string;
  role: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  events: any[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: [true, "Profile Avatar is required"],
    default: "https://i.ibb.co/bNj02BN/proavatar.png",
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  events: [],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
