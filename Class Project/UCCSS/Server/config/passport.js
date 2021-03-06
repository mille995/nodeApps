var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    User = require('../app/models/users'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local');

// use email as the username for login
var localOptions = { usernameField: 'email' };

// login authentication
var localLogin = new localStrategy(localOptions, function (email, password, next) {
    User.findOne({ email: email }).exec()
        .then(function (user) {
            if (!user) {
                return next({ status: "404", message: "Email not found." });
            } else {
                user.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        return next(err);
                    } else if (!isMatch) {
                        return next({ status: 401, message: 'Invalid username or password' });
                    } else {
                        return next(null, user);
                    }
                });
            }
        })
        .catch(function (err) { return next(err); });
});

// will generate a token and add the user to it
generateToken = function (user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10000000   // unit is milliseconds
    });
};

setUserInfo = function (req) {
    return {
        _id: req._id,
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        issuer: "edu.uwm"
    };
};

// log in and generate a token
login = function (req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({ token: generateToken(userInfo), user: req.user });
};

// extracts the data from the token following login
var jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

// uses the payload from the token and extracts the _id field value
// looks up the user and checks if it is valid
var jwtLogin = new jwtStrategy(jwtOptions, function (payload, next) {
    User.findById(payload._id).exec()
        .then(function (user) {
            if (user) {
                return next(null, user);
            } else {
                return next(null, false);
            }
        })
        .catch(function (err) { return next(err); });
});

passport.use(jwtLogin);
passport.use(localLogin);
