const express = require("express");
const router = express.Router();
const admin = require('../../admin');

const usersCollection = admin.firestore().collection('users');

router.post('/create', async (req, res) => {
	// this fucntion allows authenticated admin users to create new profiles
	try {
		let user = {
			// add custom fields
			role: "basic", // change to admin in Firebase Console to test admin priviledges
			uid: req.user.user_id
		};
		let ref = await usersCollection.add(user);
		res.send(ref);
		return;
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.get('/read/', async (req, res) => {
	// returns the user with the given id
	try {
		let data = usersCollection;
		for (queryKey in Object.keys(req.query)) {
			data = data.where(queryKey, '==', req.query[queryKey]);
		}
		data.get();
		if (data.empty) {
			res.status(404).send(`no users found based on the given query`);
			return;
		}
		else {
			res.send(data.docs.data());
			return;
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.post('/update/:id', async (req, res) => {
	try {
		let data = await usersCollection.where('uid', '==', req.params.id).get();
		if (data.empty) {
			res.status(404).send(`user with id: ${req.params.id} does not exist`);
			return;
		}
		else {
			let user = data.docs[0].data();
			let newUser = {
				// add custom fields
				role: req.body.role ? req.body.role : user.role,
				uid: req.body.uid ? req.body.uid : user.uid
			};
			let setUser = await data.docs[0].ref.update(newUser);
			res.send(setUser);
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		let data = await usersCollection.where('uid', '==', req.params.id).get();
		if (data.empty) {
			res.status(404).send(`user with id: ${req.params.id} does not exist`);
			return;
		}
		else {
			let deletedUser = data.docs[0].ref.delete();
			res.send(deletedUser);
		}
	}
	catch (error) {
		console.log(error);
		res.status(400).send("Error");
		return;
	}
});


module.exports = router;