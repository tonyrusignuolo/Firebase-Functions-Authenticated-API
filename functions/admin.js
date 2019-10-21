// Firebase admin sdk. To learn more, visit https://firebase.google.com/docs/admin/setup
const admin = require('firebase-admin');
admin.initializeApp(
	{
		credential: admin.credential.applicationDefault(),
		databaseURL: "" // paste your Firebase URL here
	}
);

module.exports = admin;