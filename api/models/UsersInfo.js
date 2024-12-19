import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; 

const UsersInfo = sequelize.define('UsersInfo', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'users_infor', 
  timestamps: false,  
});

UsersInfo.belongsTo(User, { foreignKey: 'user_id' });

export default UsersInfo;
