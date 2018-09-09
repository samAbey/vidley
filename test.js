
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const genres = [];

router.get('/', (req, res) => {

    const result = validateGenre(req.body);

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }


});

router.get('/:id', (req, res) => {
    
    const genre = [];
    if(!genre) {
        return res.status(404).send('Genre not found');
    }

    res.send(genre);

});

router.put('/:id', (req, res) => {
    
    const genre = [];
    if(!genre) {
        return res.status(404).send('Genre not found');
    }

    const result = validateGenre(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }


    res.send(genre);

});


router.post('/', () => {

    const result = validateGenre(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    
    const genre = [];
    if(!genre) {
        return res.status(404).send('Genre not found');
    }

    
    res.send(genre);

})

function validateGenre (genre) {

    const schema = {
        name: Joi.string().min(5).max(25).isRequired
    }

    return Joi.validate(genre, schema)
}

module.exports = router;