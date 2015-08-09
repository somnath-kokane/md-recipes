'use strict';

angular.module('app.category')
    .controller('CategoryListCtrl', ['$scope', '$location', 'Category', CategoryListCtrl]);

function CategoryListCtrl($scope, $location, Category){
    var self = this;
    $scope.page.toolbar = 'category/list/toolbar.html';
    self.selectCategory = selectCategory;
    init();

    function init(){
        Category
            .getAll()
            .then(function(result){
                self.categories = angular.copy(result);
            })
            .catch(function(err){
                //
            });
    }

    function selectCategory(item){
        $location.path('/category/'+ item._id + '/detail/');
    }
}
