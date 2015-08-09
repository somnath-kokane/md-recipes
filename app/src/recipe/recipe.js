'use strict';

angular
    .module('app.recipe')
    .factory('Recipe',['$http', Recipe]);

function Recipe($http){

    return {
        getAll: function(){
            var url = '/recipe/';
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        getById: function(id){
            var url = '/recipe/' + id;
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        create: function(data){
            var url = '/recipe/';
            return $http.post(url, data).then(function(res){
                return res.data;
            });
        },
        update: function(id, data){
            var url = '/recipe/' + id;
            return $http.put(url, data).then(function(res){
                return res.data;
            });
        },
        delete: function(id){
            var url = '/recipe/' + id;
            return $http.delete(url).then(function(res){
                return res.data;
            });
        }

    }
}