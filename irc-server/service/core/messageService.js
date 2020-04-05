const Message = require('../../models/core/messages');

function createNewMessage(userId, userName, chatRoomId, chatRoomName, message) {
	console.log('Add new message to the record.');

	return new Promise((resolve, reject) => {
		let newMessage = new Message();
		newMessage.userId = userId;
		newMessage.userName = userName;
		newMessage.chatRoomId = chatRoomId;
		newMessage.chatRoomName = chatRoomName;
		newMessage.date = new Date();
		newMessage.text = message;

		newMessage.save()
			.then((object) => {
				console.log('New message has been created.');
				resolve({status: 'CREATED', newMessage: object});
			})
			.catch((error) => {
				console.error('Error during message creation: ' + error);
				reject({status: 'KO', error: error});
			});
	});
}

module.exports = {
	createNewMessage
};
