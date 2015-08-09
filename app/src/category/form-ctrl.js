'use strict';

angular
    .module('app.category')
    .controller('CategoryFormCtrl', ['$scope', '$route', 'Category', CategoryFormCtrl]);

function CategoryFormCtrl($scope, $route, Category){
    var self = this;
    self.category = {};
    init();

    function init(){
        var id = $route.current.params.id;
        if(id){
            Category
                .getById(id)
                .then(function(result){
                    self.category = angular.copy(result);
                })
                .catch(function(err){
                    //
                });

        }
    }
}    