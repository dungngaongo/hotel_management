// models/index.js
import Room from './Room.js';
import RoomInfo from './RoomInfo.js';

Room.hasOne(RoomInfo, { foreignKey: 'room_number' });
RoomInfo.belongsTo(Room, { foreignKey: 'room_number' });

export { Room, RoomInfo };
