'use strict';

var fs = require('fs');

angular
    .module('app.recipe', ['app'])
    .config(['$routeProvider', config])
    .run(['$templateCache', run]);

function config($routeProvider){
    $routeProvider.when('/recipe/', {
        templateUrl: 'recipe/list.html',
        controller: 'RecipeListCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/recipe/:id/', {
        templateUrl: 'recipe/form.html',
        controller: 'RecipeFormCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/recipe/add', {
        templateUrl: 'recipe/form.html',
        controller: 'RecipeFormCtrl',
        controllerAs: 'vm'
    });
    $routeProvider.when('/recipe/:id/detail', {
        templateUrl: 'recipe/detail.html',
        controller: 'RecipeDetailCtrl',
        controllerAs: 'vm'
    });
}

function run($templateCache){
    
    $templateCache.put(
        'recipe/list.html', 
        fs.readFileSync(__dirname + '/templates/list.html', 'utf8'));
    $templateCache.put(
        'recipe/form.html', 
        fs.readFileSync(__dirname + '/templates/form.html', 'utf8'));
    $templateCache.put(
        'recipe/detail.html', 
        fs.readFileSync(__dirname + '/templates/detail.html', 'utf8'));
    $templateCache.put(
        'recipe/list/toolbar.html', 
        fs.readFileSync(__dirname + '/templates/list-toolbar.html', 'utf8'));
    $templateCache.put(
        'recipe/form/toolbar.html', 
        fs.readFileSync(__dirname + '/templates/form-toolbar.html', 'utf8'));
    $templateCache.put(
        'recipe/detail/toolbar.html', 
        fs.readFileSync(__dirname + '/templates/detail-toolbar.html', 'utf8'));
}