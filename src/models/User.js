import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, minlength: 6, select: false },
    avatar: { type: String, default: "" },
    provider: { type: String, enum: ["email", "google"], default: "email" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // parol yo'q bo'lsa (Google/social user) — hash qilinmaydi
  if (!this.password || !this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (plain) {
  if (!this.password) return false; // social user parol bilan kira olmaydi
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model("User", userSchema);
