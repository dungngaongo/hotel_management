import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Room from './Room.js';

const RoomFurniture = sequelize.define('RoomFurniture', {
  room_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Room,
      key: 'number'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'room_furniture', 
  timestamps: false,
});

RoomFurniture.belongsTo(Room, { foreignKey: 'room_number' });

export default RoomFurniture;
