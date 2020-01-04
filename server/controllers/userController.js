const User = require('../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {

  const { name, pass } = req.body; 

  User.create({name, pass}).then(user => console.log(user))
}