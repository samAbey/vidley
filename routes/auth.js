const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('Joi');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validateUser(req.user);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid email or password')
    }

    res.send(true)

});

function validateUser (user) {
    
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);

}

module.exports = router;