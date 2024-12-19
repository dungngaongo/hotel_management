import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import History from "./History.js";

const HistoryServe = sequelize.define("HistoryServe", {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  history_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: History, 
      key: "id",
    },
    onDelete: "CASCADE", 
    onUpdate: "CASCADE",
  },
  service_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "history_serve", 
  timestamps: false,         
});

HistoryServe.belongsTo(History, { foreignKey: "history_id" }); 

export default HistoryServe;
