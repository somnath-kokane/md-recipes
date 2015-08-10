'use strict';

angular
    .module('app.category')
    .controller('CategoryDetailCtrl', ['$scope', '$route', '$mdDialog', 'Category', CategoryDetailCtrl]);

function CategoryDetailCtrl($scope, $route, $mdDialog, Category){
    var self = this;
    $scope.page.onEdit = editCategory;
    init();

    function init(){
        $scope.page.toolbar = 'category/detail/toolbar.html';
        var id = $route.current.params.id;
        if(id){
            Category
                .getById(id)
                .then(function(result){
                    self.category = angular.copy(result);
                    $scope.page.title = self.category.title;
                })
                .catch(function(){
                    //
                });
        }
    }

    function editCategory(ev){
        $scope.page.categoryId = self.category._id;
        showFormDialog(ev);
    }

    function showFormDialog(ev){
        $mdDialog
            .show({
                controller: 'CategoryFormCtrl',
                templateUrl: 'category/form.html',
                parent: angular.element(document.body),
                targetEvent: ev
            })
            .then(function(alert){
                $scope.alert = alert;
            });
    }
}