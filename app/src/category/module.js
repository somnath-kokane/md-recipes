'use strict';

var fs = require('fs');

angular
    .module('app.category', [])
    .config(['$routeProvider', config])
    .run(['$templateCache', run]);

function config($routeProvider){
    $routeProvider.when('/category/', {
        templateUrl: 'category/list.html',
        controller: 'CategoryListCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/category/:id/', {
        templateUrl: 'category/form.html',
        controller: 'CategoryFormCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/category/add', {
        templateUrl: 'category/form.html',
        controller: 'CategoryFormCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/category/:id/detail', {
        templateUrl: 'category/detail.html',
        controller: 'CategoryDetailCtrl',
        controllerAs: 'vm'
    });
}

function run($templateCache){

    $templateCache.put(
        'category/list.html', 
        fs.readFileSync(__dirname + '/templates/list.html', 'utf8')
    );
    $templateCache.put(
        'category/form.html', 
        fs.readFileSync(__dirname + '/templates/form.html', 'utf8')
    );
    $templateCache.put(
        'category/detail.html', 
        fs.readFileSync(__dirname + '/templates/detail.html', 'utf8')
    );
    $templateCache.put(
        'category/list/toolbar.html', 
        fs.readFileSync(__dirname + '/templates/list/toolbar.html', 'utf8')
    );
}