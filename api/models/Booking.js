import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; 
import Room from './Room.js'; 

const Booking = sequelize.define('Booking', {
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
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: 'number',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  from_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rent_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  check_in: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'booking',  
  timestamps: false, 
});

Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Room, { foreignKey: 'room_number' });

export default Booking;
