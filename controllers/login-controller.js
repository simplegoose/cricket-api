const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

exports.userloginController = async (req, res) => {
    if(Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: 'You are not allowed to send an empty request'
        })

        return;
    }

    const { email, password } = req.body

    if( email === '' || password === '' ) {
        res.status(400)
            .send({
                message: 'Please fill in the fields and try again'
            })
        
            return;
    } else {
        const user = await User.findOne({ email: email })
                                        .lean()
                                        .catch( e => {
                                            console.log(e)
                                            res.status(500)
                                                .send({
                                                    message: `Internal server error, sorry for the inconvenience.`
                                                })
                                        })
                   
        if (user === null) {
            res.status(401)
                .send({
                    message: `Wrong username or password, try to login
                            again or create an account if you don't have one`
                })

            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            req.session.isLoggedIn = true
            req.session.userName = user.email

            res.send(req.session)

        } else {
            res.status(401)
                .send({
                    message: `Wrong username or password, try to login
                            again or create an account if you don't have one`
                })
        }
    }
}

//Checks if user is logged in to authorize them to interact with the api
exports.userCheckIfLoggedIn = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        res.status(401)
                .send({
                    message: 'You are not allowed to perform this action'
                })

        return;
    } else {
        next()
    }
}

//Checks if the user is already logged in to avoid double log in
exports.checkIfLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn) {
        res.status(204);
        return;
    } else {
        next()
    }
}
//logs out user
exports.userLogoutController = (req, res) => {
    delete req.session.isLoggedIn
    delete req.session.userName

    res.status(200).send({
        message: 'You have sucessfully logged out'
    })
}