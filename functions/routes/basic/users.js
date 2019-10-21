const express = require("express");
const router = express.Router();
const admin = require('../../admin');

const usersCollection = admin.firestore().collection('users');

router.post('/create', async (req, res) => {
	// this function should allow users who are authenticated through Firebase to create their own user profile.
	// If their profile already exists, this function will throw an error
	try {
		let data = await usersCollection.where('uid', '==', req.user.user_id).get();
		if (data.empty) {
			// user doesn't exist, therefore, one should be creaed
			let user = {
				role: "basic",
				uid: req.user.user_id
			};
			// console.log(user);
			let ref = await usersCollection.add(user);
			res.status(201).send(ref);
			return;
		}
		else {
			// user with that id already exists. Therefore, one should not be created
			res.status(400).send(`sser already exists`);
			return;
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.get('/read/self', async (req, res) => {
	// returns the user that is currently logged in
	try {
		let data = await usersCollection.where('uid', '==', req.user.user_id).get();
		if (data.empty) {
			res.status(404).send("No user found!");
			return;
		}
		else {
			res.send(data.docs[0].data());
			return;
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.get('/read/:id', async (req, res) => {
	// returns the user with the given id
	try {
		let data = await usersCollection.where('uid', '==', req.params.id).get();
		if (data.empty) {
			res.status(404).send("No user found!");
			return;
		}
		else {
			res.send(data.docs[0].data());
			return;
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.post('/update', async (req, res) => {
	// allows the authenticated user to create a db entry for themselves (profile)
	try {
		let data = await usersCollection.where('uid', '==', req.user.user_id).get();
		if (data.empty) {
			res.status(404).send("user doesn't exist");
			return;
		}
		else {
			let user = data.docs[0].data();
			let newUser = {
				role: req.body.role ? req.body.role : user.role,
				uid: user.uid
			};
			await data.docs[0].ref.update(newUser);
			res.send(user);
			return;
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});


module.exports = router;