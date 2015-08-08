'use strict';

angular.module('main')
    .controller('ShellCtrl', ['$location', '$mdSidenav', '$mdBottomSheet', '$q', ShellCtrl]);

function ShellCtrl($location, $mdSidenav, $mdBottomSheet, $q){
    var self = this;
    self.sidenav = [
        {text: 'Home', icon: 'home', path: '/'},
        {text: 'Category', icon: 'device_hub', path: '/category'},
        {text: 'Explore', icon:'explore', path: '/'},
        {text: 'Favorites', icon:'favorite', path: '/'},
        {text: 'Lists', icon: 'subject', path: '/'},
        {text: 'Settings', icon: 'settings', path: '/settings'}
    ];
    self.toggleSidenav = function(){
        var pending = $mdBottomSheet.hide() || $q.when(true);
        pending.then(function(){
            $mdSidenav('left').toggle();
        });
    };

    self.selectNav = function(item){
        self.selected = angular.isNumber(item) ? self.sidenav[item] : item;
        var path = self.selected.path;
        self.toggleSidenav();
        $location.path(path);
    };
}
