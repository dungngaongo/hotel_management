import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; 
import Room from "./Room.js";

const History = sequelize.define("History", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  user_name: {
    type: DataTypes.STRING(100),
    allowNull: true, 
  },
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room, 
      key: "number",
    },
    onDelete: "CASCADE", 
    onUpdate: "CASCADE",
  },
  room_type: {
    type: DataTypes.STRING(50),
    allowNull: true, 
  },
  from_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  income: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
}, {
  tableName: "history", 
  timestamps: false,    
});

History.belongsTo(User, { foreignKey: "user_id" }); 
History.belongsTo(Room, { foreignKey: "room_number" }); 

export default History;
