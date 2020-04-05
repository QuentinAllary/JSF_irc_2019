const express = require('express');
const router = express.Router();
const userService = require('../service/core/userService');

router.post('/', async (req, res) => {
	let userExists = false;
	let correctPassword = false;
	let userToLog = {
		username: req.body.username,
		password: req.body.password
	};

	let ids = 0;
	let foundUser = undefined;
	let allUsers = await userService.findAllUsers();

	if (typeof allUsers != 'undefined') {
		allUsers.forEach(user => {
			ids++;
			if (user.userName === userToLog.username) {
				userExists = true;
				if (user.userPassWord === userToLog.password) {
					foundUser = user;
					correctPassword = true;
				}
			}
		});
	}
	res.json({ userExists: userExists, correctPassword: correctPassword, user: foundUser });
});

module.exports = router;
