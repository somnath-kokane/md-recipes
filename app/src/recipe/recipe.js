'use strict';

angular
    .module('app.recipe')
    .factory('Recipe',['$http', '$q', 'appConfig', Recipe]);

function Recipe($http, $q, appConfig){

    var recipes = [
      {
        "_id": "55c74891dc599ff815235373",
        "title": "Perfect Italian Pizza",
        "image": "/assets/images/category/italian-pizza.jpg",
        "description": "Perfect Italian Pizaa Description",
        "__v": 0
      }
    ];

    return {
        getAll: function(){
            if(appConfig.env == 'demo'){
                return $q.when(recipes);
            }
            var url = '/recipe/';
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        getById: function(id){
            if(appConfig.env == 'demo'){
                var recipe;
                angular.forEach(recipes, function(item){
                    if(item._id == 'id'){
                        recipe = item;
                    }
                });
                return $q.when(recipe);
            }
            var url = '/recipe/' + id;
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        create: function(data){
            if(appConfig.env == 'demo'){
                var id = (new Date).toString().split(' ').join('').toLowerCase();
                data = angular.extend({_id: id}, data);
                recipes.push(data);
                return $q.when(data);
            }
            var url = '/recipe/';
            return $http.post(url, data).then(function(res){
                return res.data;
            });
        },
        update: function(id, data){
            if(appConfig.env == 'demo'){
                angular.forEach(recipes, function(item){
                    if(item._id == id){
                        item = angular.extend(item, data);
                    }
                });
                return $q.when(data);
            }
            var url = '/recipe/' + id;
            return $http.put(url, data).then(function(res){
                return res.data;
            });
        },
        delete: function(id){
            if(appConfig.env == 'demo'){
                var idx, data = {};
                angular.forEach(recipes, function(item, index){
                    if(item._id == id){
                        idx = index;
                        data = angular.copy(item);
                    }
                });
                if(idx){
                    [].splice.apply(recipes, [idx, 1]);
                }
                return $q.when(data);
            }
            var url = '/recipe/' + id;
            return $http.delete(url).then(function(res){
                return res.data;
            });
        }

    }
}