import express, { request, response } from "express";
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
    return response.status(500).json({ message: "Internal server error" });
  }
});

//Route for retrieve Restaurant details by id
router.get("/get-restaurant/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const details = await Restaurant.findById({ _id: id });
    if (!details) {
      return response
        .status(404)
        .json({ message: "Restaurant details not found" });
    }
    response.status(200).json(details);
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: "Internal server error" });
  }
});

//Route for update restaurant information by id
router.put("/update/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const updateDetails = await Restaurant.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name: request.body.name,
        address: request.body.address,
        telephone: request.body.telephone,
      }
    );
    if (!updateDetails) {
      return response.status(404).json({ message: "Restaurant not found" });
    }
    response
      .status(200)
      .json({ message: "Restaurant details update successfully..." });
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: "Internal server error" });
  }
});

//Route for delete restaurant by id
router.delete("/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const deleteRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deleteRestaurant) {
      return response.status(404).json({ message: "Restaurant not found" });
    }
    response.status(200).json({ message: "Restaurant delete succesfully..." });
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default router;
