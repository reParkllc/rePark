const path = require('path');
const User = require('../models/userModels');


const userController = {

//Create user controller
  createUser (req, res, next) {
	const { name, phone, pass, car } = req.query; 
	const newUser = {
		name,
		phone,
		pass,
		car
	}

  User.create(newUser, (err, userDoc) => {
		if (err) {
			return res.sendStatus(404);
		}
		res.locals.user = userDoc;
		next();
	});
},

  //verify user controller
  verifyUser (req, res, next) {
    const { name, pass } = req.query;
    User.findOne({ name }, (err, userDoc) => {
		if (err) {
			res.status(401).json({'Error': err});
			next();
		}
      	if(user === null) {
			res.status(401).json({err})
			next();
      	}
      	if(user.pass === req.body.pass){
			res.locals.user = userDoc;
			next();
		}
		}
	) 
}
}

module.exports = userController;