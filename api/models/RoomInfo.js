import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Room from './Room.js';

const RoomInfo = sequelize.define('RoomInfo', {
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
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  area: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hour_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  daily_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'room_infor',  
  timestamps: false,
});

RoomInfo.belongsTo(Room, { foreignKey: 'room_number' });

export default RoomInfo;
