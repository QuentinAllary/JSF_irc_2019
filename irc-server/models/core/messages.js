const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-long')(mongoose);

// create schema
const Long = mongoose.Schema.Types.Long;

const messageSchema = new Schema(
	{
		userId: Long,
		userName: String,
		chatRoomId: Long,
		chatRoomName: String,
		date: Date,
		text: String
	}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
