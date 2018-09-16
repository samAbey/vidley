const express   = require('express');
const helmet    = require('helmet');
const genre     = require('./routes/genre');
const customer  = require('./routes/customer');
const movie     = require('./routes/movie');
const rentals   = require('./routes/rentals');
const mongoose  = require('mongoose');

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Server is listening on ${PORT}`)})