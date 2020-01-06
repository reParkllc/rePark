const path = require('path');
const { Session } = require('../models/sessionModels');

const sessionController = {
    isLoggedIn(req, res, next){
        Session.find({cookieId: res.locals.user._id}, (err, session) => {
            if (err) {
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
        Session.create({cookieId: res.locals.user._id + 'a'}, (err, session) => {
            console.log(session)
            if (session) {
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