import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Room = sequelize.define('Room', {
  number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'idle',
    validate: {
      isIn: [['idle', 'bussy']],
    }
  }
}, {
  tableName: 'room',  
  timestamps: false,
});

export default Room;
