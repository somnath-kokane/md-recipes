'use strict';

var angular = require('angular');

angular
    .module('main', [
        require('./app'), 
        require('./category')
    ]);

angular
    .element(document)
    .ready(function(){
        angular.bootstrap(document, ['main']);
    });