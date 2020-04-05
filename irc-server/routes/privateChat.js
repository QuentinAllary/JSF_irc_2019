const express = require('express');
const router = express.Router();
const chatRoomService = require('../service/core/chatRoomService');
const util = require('util');


router.get('/:username', async (req, res, next) => {
	let roomName = req.params.username;

	let ids = 0;
	let messages = [];
	let chatRooms = await chatRoomService.findAllChatRooms();

	if (typeof chatRooms != 'undefined') {
		chatRooms.forEach(room => {
			ids++;
			if (room.chatRoomName === roomName) {
				messages = room.chatRoomMessages;
			}
		});
	}
	res.json(messages);
});

module.exports = router;
