const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An item must have a name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'An item must have a description'],
    },
    price: {
        type: Number,
        required: [true, 'An item must have a price']
    },
    ratingsAverage: {
        type: Number
    },
    comments: {
        type: [String]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categories',
        required: [true, 'Item must belong to a category.']
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;