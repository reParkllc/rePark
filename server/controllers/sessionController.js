const path = require('path');
const { Session } = require('../models/sessionModels');

const sessionController = {
    isLoggedIn(req, res, next){
        console.log('isLoggedin', res.locals)
        Session.find({cookieId: res.locals.user._id}, (err, session) => {
            if (err) {
                // res.status(401).json({'Error': err});
                return next({
                    log: 'ERROR: sessionController: isLoggedIn error',
                    status: 400,
                    message: { err: 'An error occurred' },
                });
            } 
            return next();
        })
    },
    
    startSession(req, res, next){
        // console.log('cookieID', req.cookies)
        Session.create({cookieId: res.locals.user._id + 'a'}, (err, session) => {
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