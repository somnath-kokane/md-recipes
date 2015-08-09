'use strict';

var express = require('express');

module.exports = function(app){
    var router = express.Router();
    router.use(function(req, res, next){
        console.log('Time: ', Date.now());
    });
    //app.use('/settings', require('./settings/router')(app));
    app.use('/category', require('./category')(app));
    //app.use('/recipe', require('./recipe/router')(app));
    return router;
}