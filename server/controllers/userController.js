const path = require('path');
const { User } = require('../models/userModels');

const userController = {

  //Create user controller
  createUser(req, res, next) {
    const { name, phone, pass } = req.body;
    const phoneNum = Number(phone);
    const newUser = {
      name: name,
      phone: phoneNum,
      pass: pass
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
  verifyUser(req, res, next) {
    const { phone, pass } = req.body;
    console.log(req.body)
    User.findOne({ phone: phone })
      .exec()
      .then(userDoc => {
        console.log(userDoc)
        if (!userDoc) {
          res.locals.auth = false;
          return next();
        }
        if (userDoc.pass === req.body.pass) {
          console.log('userpass matches')
          res.locals.auth = true;
          return next();
        }
        res.locals.auth = false;
        return next();
      })
      .catch(err => {
        res.status(401).json({ 'Error': err });
        return next({
          log: 'ERROR: userController verifyUser error',
          status: 400,
          message: { err: 'An error occurred' },
        });
      });
  },

  updateUserCar(req, res, next) {
    const { car_make, car_model, car_color } = req.body.car;
    const { id } = req.body;
    User.findOneAndUpdate({ _id: id },
      {
        car: {
          car_make: car_make,
          car_model: car_model,
          car_color: car_color
        }
      },
      { new: true }, (err, updatedDoc) => {
        if (err) {
          return next({
            log: 'Express error handler caught car update error',
            status: 400,
            message: { err: 'An error occurred' },
          });
        };
        res.locals.successfulSignup = true;
        return next();
      })
  }
}
module.exports = userController;