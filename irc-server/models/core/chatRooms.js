const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-long')(mongoose);

// create schema
const Long = mongoose.Schema.Types.Long;

const chatRoomSchema = new Schema(
	{
		chatRoomId: Long,
		chatRoomName: String,
		chatRoomMessages: []
	}, { collection: 'ChatRooms' });

chatRoomSchema.statics.findByName = function (name, cb) {
	return this.find({ chatRoomName: name }).exec(cb);
};

chatRoomSchema.statics.findAllChatRooms = function (cb) {
	return this.find({ }).exec(cb);
};

chatRoomSchema.statics.findMaxId = function (cb) {
	return this.findOne({ })
		.sort('-chatRoomId')
		.exec(cb);
};

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
