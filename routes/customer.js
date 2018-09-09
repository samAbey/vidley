const express   = require('express');
const { validateCustomer, Customer } = require('../models/customer');

const router = express.Router();


router.post('/', (req, res) => {

    const { error } = validateCustomer(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, isGold, phone } = req.body;

    const customer = new Customer({
        name,
        isGold,
        phone
    });

    customer.save().then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send('Internal server error!');
    });
    
});

router.get('/', (req, res) => {

    Customer.find().then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send('Internal server error!');
    });

});

router.get('/:id', (req, res) => {

    Customer.findById(req.params.id).then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(404).send('Customer not found!');
    });

});

router.put('/:id', (req, res) => {

    const { error } = validateCustomer(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, isGold, phone } = req.body;
    
    Customer.findByIdAndUpdate(req.params.id, {
        name, isGold:isGold?isGold:false, phone
    }, {new: true}).then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(404).send('Customer not found!');
    });

});

router.delete('/:id', (req, res) => {

    Customer.findByIdAndRemove(req.params.id).then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(404).send(err);
    });
})


module.exports = router;