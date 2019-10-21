const functions = require('firebase-functions');
const admin = require('./admin');
const configureRoutes = require('./routes');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

// authentication middleware
const authenticate = async (req, res, next) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
		res.status(403).send('Unauthorized');
		return;
	}
	const idToken = req.headers.authorization.split('Bearer ')[1];
	try {
		const decodedIdToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedIdToken;
		next();
		return;
	} catch (e) {
		res.status(403).send('Unauthorized');
		return;
	}
};

app.use(authenticate);

configureRoutes(app);

// Expose the API as a function
exports.api = functions.https.onRequest(app);