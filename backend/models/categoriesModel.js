const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A category must have a description'],
    },
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;