const mongoose  = require('mongoose');
const Joi       = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type    : Boolean,
        default : false
    },
    name: {
        type        : String,
        required    : true,
        minlength   : 5,
        maxlength   : 50
    },
    phone: {
        type        : String,
        required    : true,
        minlength   : 10,
        maxlength   : 50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer (customer) {

    const schema = {
        name    : Joi.string().min(5).max(50).required(),
        isGold  : Joi.boolean(),
        phone   : Joi.string().min(10).max(50).required()
    };

    return Joi.validate(customer, schema);
}

module.exports = {
    Customer,
    validateCustomer
}