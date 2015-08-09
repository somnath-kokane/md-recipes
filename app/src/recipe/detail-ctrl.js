'use strict';

angular
    .module('app.recipe')
    .controller('RecipeDetailCtrl', ['$scope', '$route', 'Recipe', RecipeDetailCtrl]);

function RecipeDetailCtrl($scope, $route, Recipe){
    var self = this;
    init();

    function init(){
        $scope.page.toolbar = 'recipe/detail/toolbar.html';
        var id = $route.current.params.id;
        Recipe
            .getById(id)
            .then(function(result){
                self.recipe = angular.copy(result);
                $scope.page.title = self.recipe.title;
            })
            .catch(function(err){
                console.error(err);
            });
    }
}