'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', require('./api/src')(app));

app.use(function(err, req, res, next){
    err = err || {};
    res.status(err.status || 500);
    res.send({message: err.message, error: err});
});

try {
    app.listen(port);
    console.log('server started on http://localhost:8000/');
} catch (e) {
    console.log('could not start server on 8000 port', e);
}