const express = require("express");
const router = express.Router();
const admin = require('../../admin');
// users collection CRUD and other API calls for site admin users
const users = require('./users');
// add other collection CRUD and API calls and associated files, i.e.:
// const events = require('./events'); // events file would live in same file as 'users' above

const usersCollection = admin.firestore().collection('users');

// site (not Firebase) admin authentication middleware
async function isAdmin(req, res, next) {
	try {
		let data = await usersCollection.where('uid', '==', req.user.user_id).get();
		if (data.empty) {
			res.status(403).send("admin: no user");
			return;
		}
		else {
			let user = data.docs[0].data();
			if (user.role === "admin") {
				next();
				return;
			}
			else {
				res.status(403).send("admin: user is not an admin");
				return;
			}
		}
	} catch (error) {
		res.status(400);
		res.send(error);
	}
}

router.use(isAdmin);
router.use('/users', users);

module.exports = router;