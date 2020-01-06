const path = require('path');
const { Session } = require('../models/sessionModels');

const sessionController = {
    isLoggedIn(req, res, next){
        console.log('reioi', req.locals.user)
        Session.find({cookieId: req.locals.user._id}, (err, session) => {

            if (err) {
                res.status(401).json({'Error': err});
                return next({
                    log: 'ERROR: sessionController: isLoggedIn error',
                    status: 400,
                    message: { err: 'An error occurred' },
                });
            } else {
                return next();
            }
        })
    },
    
    startSession(req, res, next){
        // console.log('asdkhsadf', res.locals.user._id)
        Session.create({cookieId: 8787878947}, (err, session) => {
            console.log(session)
            if (session) {console.log('session!!!!!', session);
                return next();}
            if (err) {
                return next({
                    log: 'Express error handler caught session create error',
                    status: 400,
                    message: { err: 'An error occurred' },
                  });
            }
        })
    }
}

module.exports = sessionController;