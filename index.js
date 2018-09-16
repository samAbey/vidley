const express   = require('express');
const helmet    = require('helmet');
const genre     = require('./routes/genre');
const customer  = require('./routes/customer');
const movie     = require('./routes/movie');
const rentals   = require('./routes/rentals');
const users     = require('./routes/users');
const auth      = require('./routes/auth');
const mongoose  = require('mongoose');
const Joi       = require('joi');
Joi.objectid    = require('joi-objectid')(Joi);

const app       = express();

mongoose.connect('mongodb://localhost/vidley', { useNewUrlParser: true}).then(() => {
    console.log('Connected to mongo DB.')
}).catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(helmet());
app.use('/api/genre', genre);
app.use('/api/customer', customer);
app.use('/api/movie', movie);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Server is listening on ${PORT}`)})