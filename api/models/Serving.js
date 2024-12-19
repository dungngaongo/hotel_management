import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Booking from "./Booking.js"; 
import Service from "./Service.js"; 

const Serving = sequelize.define("Serving", {
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Booking,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Service,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  service_name: {
    type: DataTypes.STRING(100),
    allowNull: true, 
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, 
    },
  },
  serve_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "serving", 
  timestamps: false,  
});

Serving.belongsTo(Booking, { foreignKey: "booking_id" }); 
Serving.belongsTo(Service, { foreignKey: "service_id" });

export default Serving;
