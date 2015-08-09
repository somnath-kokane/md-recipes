'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', require('./api/src')(app));

try {
    app.listen(8000);
    console.log('server started on http://localhost:8000/');
} catch (e) {
    console.log('could not start server on 8000 port', e);
}