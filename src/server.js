import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.js";
import { folderRouter } from "./routes/folder.js";
import flashCardRouter from "./routes/flashCards.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

console.log(
  "GOOGLE_CLIENT_ID:",
  process.env.GOOGLE_CLIENT_ID ? "LOADED" : "MISSING"
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/auth", router);
app.use("/api/folder", folderRouter);
app.use("/api/flash-card", flashCardRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
