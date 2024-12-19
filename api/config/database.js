import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bookingrooms', 'root', 'cungvay10', {
  host: 'localhost',  
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
