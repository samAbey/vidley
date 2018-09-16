const { User, validateUser} = require('../models/user');
const express               = require('express');
const _                     = require('lodash');
const bcrypt                = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let registerdUser = await User.findOne({ email: req.body.email });

    if (registerdUser) {
        return res.status(400).send('User already registered')
    }

    let user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    user.save().then(user => {
        res.send(_.pick(user, ['name', 'email']));
    }).catch(err => {
        res.status(500).send('Internal server error');
    });

});

module.exports = router;