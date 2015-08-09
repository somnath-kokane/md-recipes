'use strict';

var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Category', CategorySchema);