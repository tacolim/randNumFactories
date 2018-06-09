const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET = process.env.APP_SECRET;
const AuthController = {

};

module.exports = AuthController;