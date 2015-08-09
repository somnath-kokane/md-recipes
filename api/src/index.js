'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app){
    
    //app.use('/settings', require('./settings/router')(app));
    app.use('/category', require('./category'));
    app.use('/recipe', require('./recipe'));

    return router;
}