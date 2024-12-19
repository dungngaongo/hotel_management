import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, 
    },
  },
  income: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "service",
  timestamps: false,   
});

export default Service;
