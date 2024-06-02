import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoute from "./routes/restaurantRoute.js";

const app = express();
dotenv.config({ path: "./.env" });

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to Restaurant Service...");
});

app.use("/restaurant", restaurantRoute);

mongoose
  .connect(process.env.mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listen to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
