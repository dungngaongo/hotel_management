import sequelize from "./config/database.js";
import Booking from "./models/Booking.js";
import User from "./models/User.js";
import Service from "./models/Service.js";
import History from "./models/History.js";
import HistoryServe from "./models/HistoryServe.js";
import Serving from "./models/Serving.js";
import { Room, RoomInfo } from './models/index.js';


// Đồng bộ hóa cơ sở dữ liệu với mô hình, đồng thời xử lý xóa bảng phụ
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
