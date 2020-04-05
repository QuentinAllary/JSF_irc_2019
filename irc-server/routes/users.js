const express = require('express');
const router = express.Router();
const userService = require('../service/core/userService');
const util = require('util');

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.post('/', async (req, res, next) => {
	let userToRegister = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};

	let ids = 0;
	let foundUser = undefined;
	let allUsers = await userService.findAllUsers();

	if (typeof allUsers != 'undefined') {
		allUsers.forEach(user => {
			ids++;
			if (user.userName === userToRegister.username) {
				foundUser = user;
			}
		});
	}
	if (foundUser === undefined) {
		foundUser = await userService.createNewUser(ids + 1, userToRegister.username, userToRegister.email, userToRegister.password);
		foundUser = foundUser.newUser;
	} else {
		res.json({user_already_signed_up: true});
	}
	res.json(foundUser);
});

router.get('/', async (req, res, next) => {
	let allUsers = await userService.findAllUsers();
	res.json(allUsers);
});

module.exports = router;
