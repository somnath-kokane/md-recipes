'use strict';

angular
    .module('app.category')
    .factory('Category', ['$http', Category]);

function Category($http){
    return {
        getAll: function(){
            var url = '/category/'
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        getById: function(id){
            var url = '/category/'+ id;
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        create: function(data){
            var url = '/category/';
            return $http.post(url, data).then(function(res){
                return res.data;
            });
        },
        update: function(id, data){
            var url = '/category/' + id;
            return $http.put(url, data).then(function(res){
                return res.data;
            });
        },
        delete: function(id){
            var url = '/category/' + id;
            return $http.delete(url).then(function(res){
                return res.data;
            });
        }
    }
}