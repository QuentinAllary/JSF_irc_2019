const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-long')(mongoose);

// create schema
const Long = mongoose.Schema.Types.Long;

const userSchema = new Schema(
	{
		userId: Long,
		userName: String,
		userMail: String,
		userPassWord: String,
	}, { collection: 'Users' });

userSchema.statics.findAllUsers = function (cb) {
	return this.find({ }).exec(cb);
};

userSchema.statics.findByUserName = function (userName, cb) {
	return this.find({ userName: userName }).exec(cb);
};

userSchema.statics.findByUserNameAndUserMail = function (userName, userMail, cb) {
	return this.find({
		userName: userName,
		userMail: userMail })
		.exec(cb);
};

userSchema.statics.findMax = function (cb) {
	return this.findOne({ })
		.sort('-chatRoomId')
		.exec(cb);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
