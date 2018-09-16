const mongoose          = require('mongoose');
const Joi               = require('Joi');
const { genreSchema }   = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type        : String,
        required    : true,
        minlength   : 5,
        maxlength   : 255,
        trim        : true
    },
    genre: {
        type     : genreSchema,
        required : true
    },
    numberInStock: {
        type    : Number,
        require : true,
        min     : 0,
        max     : 255
    },
    dailyRentalRate: {
        required: true,
        type    : Number,
        min     : 0,
        max     : 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie (movie) {

    const schema = {
        title           : Joi.string().min(5).max(255).required(),
        genreId         : Joi.objectid().required(),
        numberInStock   : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    }

    return Joi.validate(movie, schema);

}

module.exports = {
    movieSchema,
    Movie,
    validateMovie
}