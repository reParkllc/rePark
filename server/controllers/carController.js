const { User } = require('../models/userModels');

const carController = {
  updateUser(req, res, next){
		console.log('running car controller', res.locals.user)
		const { car_make, car_model, car_color } = req.body.car;
		User.findOneAndUpdate({_id: res.locals.user._doc._id}, 
													 { ...res.locals.user._doc, car: {car_make, car_model, car_color}}, 
													 { new: true }, (err, updatedDoc) => {
														 if (err) {
															return next({
																log: 'Express error handler caught car update error',
																status: 400,
																message: { err: 'An error occurred' },
															});
														 };
														 res.locals.user.car = updatedDoc;
														 return next();
													 })
													 }
  };

module.exports = carController;