const express   = require('express');
const { Genre, validateGenre } = require('../models/genre');

const router = express.Router();

router.get('/', (req, res) => {

    Genre.find().then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send('Internal server error');
    });


});

router.get('/:id', (req, res) => {
    
    Genre.findById(req.params.id).then(genre => {
        res.send(genre)
    }).catch(err => {
        res.status(404).send('Genre not found');
    });

});

router.put('/:id', (req, res) => {

    const { error } = validateGenre(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true}).then(genre => {
        res.send(genre);
    }).catch(err => {
        res.status(404).send('Genre does not exsist!');
    });
    
});


router.post('/', (req, res) => {

    const { error } = validateGenre(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({name: req.body.name});

    genre.save().then(genre => {
        res.send(genre);
    }).catch(err => {
        res.status(500).send('Internal server error');
    });

});

router.delete('/:id', (req, res) => {
    
    Genre.findByIdAndRemove(req.params.id).then(genre => {
        res.send(genre);
    }).catch(err => {
        res.status(404).send('Genre not found!');
    });

})

module.exports = router;