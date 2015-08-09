'use strict';

angular
    .module('app', [require('angular-material'), require('angular-route')])
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$templateCache', run]);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/recipe'});
}

function run($rootScope, $templateCache){
    $templateCache.put('page/toolbar.html', '<h2>Recipes</h2>');
    $rootScope.page = $rootScope.page || {};
    $rootScope.page.toolbar = 'page/toolbar.html';
}