const express = require("express");
const router = express.Router();
// users collection CRUD and other API calls for site admin users
const users = require('./users');
// add other collection CRUD and API calls and associated files, i.e.:
// const events = require('./events'); // events file would live in same file as 'users' above

router.use('/users', users);

module.exports = router;