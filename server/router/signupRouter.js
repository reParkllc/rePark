const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const carController = require('../controllers/carController');


router.post('/', userController.createUser,
									carController.updateUser,
						cookieController.setSSIDCookie,
						sessionController.startSession,
						(req, res) => {
							res.status(200).json(res.locals.user)
						}
);
						



module.exports = router;