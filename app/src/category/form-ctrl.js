'use strict';

angular
    .module('app.category')
    .controller('CategoryFormCtrl', ['$scope', '$mdDialog', 'Category', CategoryFormCtrl]);

function CategoryFormCtrl($scope, $mdDialog, Category){
    $scope.closeDialog = closeDialog;
    console.log('$scope.category', $scope.category);
    function closeDialog(alert){
        $mdDialog.hide(alert);
    }
}    