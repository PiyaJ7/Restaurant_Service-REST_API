import express from "express";
import { Restaurant } from "../models/restaurantModel.js";

const router = express.Router();

//Route for create Restaurant
router.post("/create", async (request, response) => {
  try {
    const newRestaurant = await Restaurant.create({
      name: request.body.name,
      address: request.body.address,
      telephone: request.body.telephone,
    });
    console.log("Restaurant Created Successful...");
    return response.status(201).send("Restaurant Created Successful...");
  } catch (err) {
    console.error("Error creating new restaurant", err);
    return response.status(500).json({ error: "Internal server error" });
  }
});

export default router;
