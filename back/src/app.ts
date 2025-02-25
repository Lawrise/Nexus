import express from "express";
import dotenv from "dotenv";
import path from "path";



dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📡 PORT: ${PORT}
    `);
});
