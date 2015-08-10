'use strict';

angular.module('app.category')
    .controller('CategoryListCtrl', ['$rootScope', '$scope', '$mdDialog', 'Category', CategoryListCtrl]);

function CategoryListCtrl($rootScope, $scope, $mdDialog, Category){
    var self = this;
    self.onAdd = $scope.page.onAdd = onAdd;
    self.onEdit = onEdit;
    self.onDelete = onDelete;

    $rootScope.$on('category:change', onCategoryChange);
    $rootScope.$on('category:add', onCategoryAdd);
    $rootScope.$on('category:delete', onCategoryDelete);

    init();

    function init(){
        $scope.page.toolbar = 'category/list/toolbar.html';
        $scope.page.title = 'Categories';
        Category
            .getAll()
            .then(function(result){
                self.categories = angular.copy(result);
            })
            .catch(function(err){
                //
            });
    }

    function onCategoryChange(ev, category){
        angular.forEach(self.categories, function(item){
            if(item._id == category._id){
                item = angular.extend(item, category);
            }
        });
    }

    function onCategoryAdd(ev, category){
        self.categories.push(category);
    }

    function onCategoryDelete(ev, id){
        var idx;
        angular.forEach(self.categories, function(item, index){
            if(item._id == id){
                idx = index;
            }
        });
        if(idx){
            [].splice.apply(self.categories, [idx, 1]);
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
                return Category.delete(id).then(function(){
                    $rootScope.$broadcast('category:delete', id);
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
            templateUrl: 'category/form.html',
            locals: {
                category: self.selected || {}
            },
            controller: ['$scope', '$mdDialog', 'Category', 'category', DialogController]
        }).then(function(msg){
            //alert(msg || '');
            self.selected = undefined;
        });
    }
}

function DialogController($scope, $mdDialog, Category, category){
    $scope.category = category;
    $scope.close = function(alert){
        $mdDialog.hide(alert);
    };
    $scope.save = function(){
        if($scope.category._id){
            update();
        } else {
            create();
        }
    }

    function update(){
        var data = angular.copy($scope.category);
        var id = data._id;
        Category.update(id, data).then(function(result){
            $scope.$root.$broadcast('category:change', data);
            $scope.close('updated');
        });
    }

    function create(){
        var data = angular.copy($scope.category);
        Category.create(data).then(function(result){
            $scope.$root.$broadcast('category:add', result);
            $scope.close('created');
        }); 
    }
}

