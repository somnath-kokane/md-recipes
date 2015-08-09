'use strict';

angular
    .module('app.category')
    .controller('CategoryDetailCtrl', ['$scope', '$route', 'Category', CategoryDetailCtrl]);

function CategoryDetailCtrl($scope, $route, Category){
    var self = this;
    init();

    function init(){
        var id = $route.current.params.id;
        if(id){
            Category
                .getById(id)
                .then(function(result){
                    self.category = angular.copy(result);
                })
                .catch(function(){
                    //
                });
        }
    }
}