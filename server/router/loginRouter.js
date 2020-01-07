const express = require('express');
const router = express.Router();
//User Model
const User = require('../models/userModels')
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');


router.post('/', userController.verifyUser,
  (req, res) => {
    res.status(200).json({ id: res.locals.id, auth: res.locals.auth })
  });

module.exports = router;