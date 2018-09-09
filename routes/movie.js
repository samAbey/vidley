const { Movie, validateMovie } = require('../models/movies');
const { Genre }           = require('../models/genre');
const express             = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    Movie.find().then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send('Internal server error');
    });


});

router.get('/:id', (req, res) => {
    
    Movie.findById(req.params.id).then(movie => {
        res.send(movie)
    }).catch(err => {
        res.status(404).send('Genre not found');
    });

});

router.put('/:id', async (req, res) => {

    const { error } = validateMovie(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }


    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');

    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true}).then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(404).send('Movie does not exsist!');
    });
    
});


router.post('/', async (req, res) => {

    const { error } = validateMovie(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie.save().then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(500).send('Internal server error');
    });

});

router.delete('/:id', (req, res) => {
    
    Movie.findByIdAndRemove(req.params.id).then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(404).send('Movie not found!');
    });

})

module.exports = router;