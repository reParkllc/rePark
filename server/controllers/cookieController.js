const User = require('../models/userModels');
const cookieController = {
    setSSIDCookie (req, res, next) {
        const userID = User.find({name: req.body.name},
        'id',
        (err, id) => {
            if (err) {
                return next(err);
            }
            return id;
        });
        res.cookie('ssid', userID, {httpOnly: true});
        res.locals.userId = userID;
        return next();
    }
};

module.exports = cookieController;