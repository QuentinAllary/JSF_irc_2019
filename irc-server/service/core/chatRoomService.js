const ChatRoom = require('../../models/core/chatRooms');
const util = require('util');

function createNewChatRoom(chatRoomId, chatRoomName) {
	console.log('Create a new chat room.');

	return new Promise((resolve, reject) => {
		let newChatRoom = new ChatRoom();
		newChatRoom.chatRoomId = chatRoomId;
		newChatRoom.chatRoomName = chatRoomName;
		newChatRoom.chatRoomMessages = [];

		newChatRoom.save()
			.then((object) => {
				console.log('New chat room has been created.');
				resolve({status: 'CREATED', newChatRoom: object});
			})
			.catch((error) => {
				console.error('Error during chat room creation: ' + error);
				reject({status: 'KO', error: error});
			});
	});
}

function updateChatRoom(chatRoomId, chatRoomName, chatRoomMessages) {
	console.log('Update a chat room.');

	return new Promise((resolve, reject) => {
		ChatRoom.findByName(chatRoomName)
			.then((room) => {
				room[0].chatRoomName = chatRoomName;
				room[0].chatRoomMessages = chatRoomMessages;
				room[0].save()
					.then((updatedRoom) => {
						resolve({status: 'UPDATED', chatRoom: updatedRoom});
					})
					.catch((error) => {
						reject({status: 'KO', error: error});
					});
			})
			.catch((error) => {
				console.error('Update of room [ '+ chatRoomId +' ] - [ '+ chatRoomName +' ] has failed: ' + error);
				reject({status: 'KO', error: error});
			});
	});
}

function findAllChatRooms() {
	return new Promise((resolve, reject) => {
		ChatRoom.findAllChatRooms((err, documents) => {
			if (err) reject({status: 'KO', error: err.stack});
			resolve(documents);
		});
	});
}

function findMaxId() {
	return new Promise((resolve, reject) => {
		ChatRoom.findMaxId((err, document) => {
			if (err) reject({status: 'KO', error: err.stack});
			resolve(document);
		});
	});
}

function joinChatRoom(roomName) {
	return new Promise(async (resolve, reject) => {
		let ids = 0;
		let chatRoom = undefined;
		let chatRooms = await this.findAllChatRooms();

		if (typeof chatRooms != 'undefined') {
			chatRooms.forEach(room => {
				ids++;
				if (room.chatRoomName === roomName) {
					chatRoom = room;
				}
			});
		}
		if (chatRoom === undefined) {
			chatRoom = await this.createNewChatRoom(ids + 1, roomName);
			chatRoom = chatRoom.newChatRoom;
		}
		resolve(chatRoom);
	});
}

module.exports = {
	findMaxId,
	joinChatRoom,
	updateChatRoom,
	findAllChatRooms,
	createNewChatRoom
};
