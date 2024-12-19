import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";  
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotel.js";
import roomsRoute from "./routes/rooms.js";
import bookingRoute from "./routes/booking.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use((req, res, next) => {
  req.user = { id: 100, isAdmin: true }; 
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: "http://localhost:3000",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());  
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingRoute);

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database connection failed:", err));

app.listen(8800, () => {
  console.log("Backend server is running on port 8800");
});
