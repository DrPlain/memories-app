import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "morgan";
import postRoutes from "./routes/posts";
import userRoutes from './routes/users';

const app = express();
const CONNECTION_URL = "mongodb://localhost:27017/memories";
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to database and listening on port ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
