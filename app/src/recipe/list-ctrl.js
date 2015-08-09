'use strict';

angular
    .module('app.recipe')
    .controller('RecipeListCtrl', ['$scope', 'Recipe', RecipeListCtrl]);

function RecipeListCtrl($scope, Recipe){
    var self = this;
    init();

    function init(){
        $scope.page.toolbar = 'recipe/list/toolbar.html';
        Recipe
            .getAll()
            .then(function(result){
                console.log('result', result);
                self.recipes = angular.copy(result);
            })
            .catch(function(err){
                console.error(err);
            });
    }
}