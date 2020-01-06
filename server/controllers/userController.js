const path = require('path');
const { User } = require('../models/userModels');


const userController = {

//Create user controller
  createUser (req, res, next) {
	console.log('req.body: ', req.body);
	const { name, phone, pass } = req.body;
	const newUser = {
		name,
		phone,
    pass
	}

	User.create(newUser)
	.then(userDoc => {
		res.locals.user = userDoc;
		return next();
	})
	.catch(err => {
		return next({
				log: 'Express error handler caught user create error',
				status: 400,
				message: { err: 'An error occurred' },
			});
	});
},

  //verify user controller
  verifyUser (req, res, next) {
    const { name, pass } = req.body;
		User.findOne({ name })
		.exec()
		.then(userDoc => {
			if (userDoc.name === null) {
        res.status(401).json({ err })
				return next();
			}
			if (userDoc.pass === req.body.pass) {
				res.locals.user = userDoc;
				return next();
			}
		})
		.catch(err => {
			res.status(401).json({'Error': err});
			return next({
				log: 'ERROR: userController verifyUser error',
				status: 400,
				message: { err: 'An error occurred' },
			});
		});
	}
}
module.exports = userController;