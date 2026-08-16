import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

dotenv.config();
await connectDB();

const app = express();

// CORS — barcha originlarga ruxsat (hakaton uchun oson). Kerak bo'lsa CLIENT_URL bilan cheklang.
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") ?? "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, msg: "Real Hacaton API 🚀" }));

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));
