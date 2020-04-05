const express = require('express');
const router = express.Router();
const chatRoomService = require('../service/core/chatRoomService');

router.get('/:room', async (req, res, next) => {
	let roomName = req.params.room;

	let ids = 0;
	let chatRoom = undefined;
	let chatRooms = await chatRoomService.findAllChatRooms();

	if (typeof chatRooms != 'undefined') {
		chatRooms.forEach(room => {
			ids++;
			if (room.chatRoomName === roomName) {
				chatRoom = room;
			}
		});
	}
	res.json(chatRoom.chatRoomMessages);
});

module.exports = router;
