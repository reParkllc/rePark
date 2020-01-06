const express = require('express');
const router = express.Router();
//User Model
const User = require('../models/userModels')
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');


router.post('/', userController.verifyUser,
						cookieController.setSSIDCookie,
						sessionController.isLoggedIn,
            sessionController.startSession,
            (req, res) => {
              return res.status(200).json({"message": "login Success..."})
            });
//send back a json object "login success"!!!!

module.exports = router;