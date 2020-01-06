const path = require('path');
const Session = require('../models/sessionModels');

const sessionController = {
    isLoggedIn(req, res, next){
        Session.find({cookieId: req.cookies.ssid}, (err, session) => {
            if (err) {
                res.status(401).json({'Error': err});
                next();
            } else {
                return next();
            }
        })
    },
    
    startSession(req, res, next){
        Session.create({cookieId: res.locals.userId}, (err, session) => {
            if (err) {
                res.status(401).json({'Error': err});
                next();
            } else {
                console.log(session);
                return next();
            }
        })
    }
}

module.exports = sessionController;