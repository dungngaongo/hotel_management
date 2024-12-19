import { createError } from "../utils/error.js";
import Room from "../models/Room.js";

export const getHotel = async (req, res, next) => {
  try {
    const hotel = {
      name: "Hotel XYZ", 
      address: "123 Main St",
      distance: "1km",
      city: "Hanoi",
      photos: [
        "https://example.com/photo1.jpg", 
        "https://example.com/photo2.jpg"
      ],
      description: "A beautiful hotel for your stay",
      rating: 5,
      cheapestPrice: 1000, 
    };

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
