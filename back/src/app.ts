import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/authRoutes";



dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📡 PORT: ${PORT}
    `);
});
