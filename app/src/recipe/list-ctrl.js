'use strict';

angular
    .module('app.recipe')
    .controller('RecipeListCtrl', ['$rootScope', '$scope', '$mdDialog', 'Recipe', RecipeListCtrl]);

function RecipeListCtrl($rootScope, $scope, $mdDialog, Recipe){
    var self = this;
    self.onAdd = $scope.page.onAdd = onAdd;
    self.onEdit = onEdit;
    self.onDelete = onDelete;

    $rootScope.$on('recipe:change', onRecipeChange);
    $rootScope.$on('recipe:add', onRecipeAdd);
    $rootScope.$on('recipe:delete', onRecipeDelete);

    init();

    function init(){
        $scope.page.toolbar = 'recipe/list/toolbar.html';
        $scope.page.title = 'Recipes';
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

    function onRecipeChange(ev, recipe){
        angular.forEach(self.recipes, function(item){
            if(item._id == recipe._id){
                item = angular.extend(item, recipe);
            }
        });
    }

    function onRecipeAdd(ev, recipe){
        self.recipes.push(recipe);
    }

    function onRecipeDelete(ev, id){
        var idx;
        angular.forEach(self.recipes, function(item, index){
            if(item._id == id){
                idx = index;
            }
        });
        if(idx){
            [].splice.apply(self.recipes, [idx, 1]);
        }
    }

    function onAdd(ev){
        showDialog(ev);
    }

    function onEdit(ev, item){
        self.selected = angular.copy(item);
        showDialog(ev);
    }   

    function onDelete(ev, item){
        self.selected = angular.copy(item);
        showConfirm(ev);
    }

    function showConfirm(ev){
        var parentEl = angular.element(document.body);
        var confirm = $mdDialog.confirm()
            .parent(parentEl)
            .title('Confirm Delete')
            .content('Would you like to delete ' + self.selected.title + '?')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);
            
        $mdDialog.show(confirm)
            .then(function(alert){
                var id = self.selected._id;
                Recipe
                    .delete(id)
                    .then(function(){
                        $rootScope.$broadcast('recipe:delete', id);
                    });
            })
            .finally(function(){
                self.selected = undefined;
            });
    }

    function showDialog(ev){
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: ev,
            templateUrl: 'recipe/form.html',
            locals: {
                recipe: self.selected || {}
            },
            controller: ['$scope', '$mdDialog', 'Recipe', 'recipe', DialogController]
        }).then(function(msg){
            //alert(msg || '');
            self.selected = undefined;
        });
    }
}


function DialogController($scope, $mdDialog, Recipe, recipe){
    $scope.recipe = recipe;
    $scope.close = function(alert){
        $mdDialog.hide(alert);
    };
    $scope.save = function(){
        if($scope.recipe._id){
            update();
        } else {
            create();
        }
    }

    function update(){
        var data = angular.copy($scope.recipe);
        var id = data._id;
        Recipe.update(id, data).then(function(result){
            $scope.$root.$broadcast('recipe:change', data);
            $scope.close('updated');
        });
    }

    function create(){
        var data = angular.copy($scope.recipe);
        Recipe.create(data).then(function(result){
            $scope.$root.$broadcast('recipe:add', result);
            $scope.close('created');
        }); 
    }
}