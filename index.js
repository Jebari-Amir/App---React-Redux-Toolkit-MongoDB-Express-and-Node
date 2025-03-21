import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"; // Ajout de dotenv
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

dotenv.config(); // Charger les variables d'environnement

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/tour", tourRouter);

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://amirj5353:W1xM50B2g1MVbk4v@cluster0.tanjy.mongodb.net/";

const port = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
