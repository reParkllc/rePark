const { User } = require('../models/userModels');
const cookieController = {
    
    setSSIDCookie (req, res, next) {
        console.log('inside the SSID')
        console.log(req.body)
        User.find({name: req.body.name})
        .exec()
        .then(user => {
            console.log(user[0]._id)
            res.cookie('ssid', user[0]._id, {httpOnly: true});
            res.locals.userId = user[0]._id;
            console.log('inside the cookie, user id shit', res.locals.userId)
            return next();
        })
        .catch(
            err => {return next({
                log: 'Express error handler caught setSSIDcookie error',
                status: 400,
                message: { err: 'An error occurred' },
              })}
        )
    }
};

module.exports = cookieController;