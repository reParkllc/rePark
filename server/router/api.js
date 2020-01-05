const express = require('express');

const router = express.Router();

router.get('/', 
    userController.verifyUser, 
    (req, res) => {
    res.render('../../client/index.html')
});

router.get('')