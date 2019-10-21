const basic = require('./basic');
const admin = require('./admin');
const admin1 = require('../admin');

const configureRoutes = (app) => {	
	app.use("/basic", basic);
	app.use("/admin", admin);
};

module.exports = configureRoutes;