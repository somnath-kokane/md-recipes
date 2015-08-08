'use strict';

var angular = require('angular');

angular
    .module('main', [require('angular-material')]);

require('./shell-ctrl');

angular
    .element(document)
    .ready(function(){
        angular.bootstrap(document, ['main']);
    });