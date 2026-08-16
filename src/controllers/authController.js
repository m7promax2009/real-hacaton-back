import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

const publicUser = (u) => ({
  _id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  displayName: `${u.firstName} ${u.lastName}`.trim(),
  email: u.email,
});

// POST /api/auth/register
export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email va password majburiy" });

  if (await User.findOne({ email }))
    return res.status(409).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });

  const user = await User.create({ firstName, lastName, email, password });
  res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
}

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Email yoki parol xato" });

  res.json({ token: signToken(user._id), user: publicUser(user) });
}

// GET /api/auth/me  (himoyalangan)
export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}
