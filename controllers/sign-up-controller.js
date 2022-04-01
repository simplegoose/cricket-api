const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

exports.signUpController = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    
    if(Object.keys(req.body).length === 0) {
        res.status(400)
        .send({
            message: 'The request cannot be empty'
        });
        
        return;
    }
    
    const { password, email } = req.body;

    let indexOfAt = email.indexOf('@');

    if( email === '' || password === '' ) {
        res.status(400)
            .send({
                message: 'Please fill in the fields and try again'
            });

        return;
    }      

    const userSignup = new User({
        password : bcrypt.hashSync(password, salt),
        email : email.toLowerCase()
    });

    const existingUser = await User.findOne({ email : req.body.email.toLowerCase()})
                                    .lean()
                                    .catch( e => {
                                        console.log(e);
                                            res.status(500)
                                                .send({
                                                    message: `Internal server error, sorry for the inconvenience.`
                                                })
                                        })

    if (existingUser !== null) {
        res.status(200).send({
            message: 'A user exists with the same email, please try again with another email or forget password.'
        });

        return;

    } else {
        await userSignup.save()
                    .catch( (e) => {
                        console.log(e);
                        res.status(500).send({
                            message: `There was a problem when trying to sign you up,
                                    please try again after a few minutes. Sorry for the
                                    inconvinience`
                        })
                });

        res.status(200)
            .send({
                message: `Welcome ${email.slice(0, indexOfAt)}! you can now proceed to login`
        });
    }
}
