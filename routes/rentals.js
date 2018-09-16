const express = require('express');
const { Rental, validateRental } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const Fawn = require('fawn');
const mongoose = require('mongoose');

const router = express.Router();


Fawn.init(mongoose);

router.get('/', (req, res) => {
    Rental.find().sort('-dateOut').then(rentals => {
        res.send(rentals);
    }).catch(err => {
        res.status(401).send('Internal server error');
    })
});

router.post('/', async (req, res) => {
    
    const { error } = validateRental(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(400).send('Invalid customer');
    }

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) {
        return res.status(400).send('Invalid movie');
    }

    if(movie.numberInStock === 0) {
        return res.status(400).send('Movie sold out.')
    }

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
        .update('movies', {_id: movie._id}, {
            $inc: { numberInStock: -1}
        })
        .save('rentals', rental)
        .run();

        res.send(rental);

    } catch (ex) {
        res.status(500).send('Something went wrong')
    }
   

});

module.exports = router;