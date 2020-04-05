const User = require('../../models/core/users');

function createNewUser(userId, userName, userMail, userPassWord) {
	console.log('Create a new user.');

	return new Promise((resolve, reject) => {
		let newUser = new User();
		newUser.userId = userId;
		newUser.userName = userName;
		newUser.userMail = userMail;
		newUser.userPassWord = userPassWord;
		newUser.save()
			.then((object) => {
				console.log('New user has been created.');
				resolve({status: 'CREATED', newUser: object});
			})
			.catch((error) => {
				console.error('Error during user creation: ' + error);
				reject({status: 'KO', error: error});
			});
	});
}

function findAllUsers() {
	return new Promise((resolve, reject) => {
		User.findAllUsers((err, documents) => {
			if (err) reject({status: 'KO', error: err.stack});
			resolve(documents);
		});
	});
}

function userJoinedRoom(userName) {
	return new Promise(async (resolve, reject) => {
		let ids = 0;
		let foundUser = undefined;
		let allUsers = await this.findAllUsers();

		if (typeof allUsers != 'undefined') {
			allUsers.forEach(user => {
				ids++;
				if (user.userName=== userName) {
					foundUser = user;
				}
			});
		}
		if (foundUser === undefined) {
			foundUser = await this.createNewUser(ids + 1, userName);
			foundUser = foundUser.newUser;
		}
		resolve(foundUser);
	});
}

module.exports = {
	findAllUsers,
	createNewUser,
	userJoinedRoom
};
