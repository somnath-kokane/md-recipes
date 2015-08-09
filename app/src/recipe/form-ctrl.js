'use strict';

angular
    .module('app.recipe')
    .controller('RecipeFormCtrl', ['$scope', '$route', 'Recipe', RecipeFormCtrl]);

function RecipeFormCtrl($scope, $route, Recipe){
    var self = this;
    init();

    function init(){
        $scope.page.toolbar = 'recipe/form/toolbar.html';
        var id = $route.current.params.id;
        Recipe
            .getById(id)
            .then(function(result){
                self.recipe = angular.copy(result);
                $scope.page.title = result.title;
            })
            .catch(function(err){
                console.error(err);
            });
    }
}