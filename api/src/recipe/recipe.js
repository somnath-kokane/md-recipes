'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RecipeSchema = new Schema({
    title: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);