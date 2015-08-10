'use strict';

angular
    .module('app.category')
    .factory('Category', ['$http', '$q', 'appConfig', Category]);

function Category($http, $q, appConfig){

    var categories = [
      {
        "_id": "55c736c9f113e899114ce252",
        "title": "coffee",
        "image": "/assets/images/category/coffee-and-breakfast1.png",
        "description": "coffee description",
        "__v": 0
      },
      {
        "_id": "55c73b1e93d90748124b41d7",
        "title": "drinks",
        "image": "/assets/images/category/coffee-and-breakfast1.png",
        "__v": 0,
        "description": "drinks description"
      }
    ];

    return {
        getAll: function(){
            if(appConfig.env == 'demo'){
                return $q.when(categories);
            }
            var url = '/category/'
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        getById: function(id){
            if(appConfig.env == 'demo'){
                var category;
                angular.forEach(categories, function(item){
                    if(item._id == id){
                        category = item;
                    }
                });
                return $q.when(category);
            }
            var url = '/category/'+ id;
            return $http.get(url).then(function(res){
                return res.data;
            });
        },
        create: function(data){
            if(appConfig.env == 'demo'){
                var id = (new Date).toString().split(' ').join('').toLowerCase();
                var data = angular.extend({_id: id}, data);
                return $q.when(data);
            }
            var url = '/category/';
            return $http.post(url, data).then(function(res){
                return res.data;
            });
        },
        update: function(id, data){
            if(appConfig.env == 'demo'){
                angular.forEach(categories, function(item){
                    if(item._id == id){
                        item = angular.extend(item, data);
                    }
                });
                return $q.when(data);
            }
            var url = '/category/' + id;
            return $http.put(url, data).then(function(res){
                return res.data;
            });
        },
        delete: function(id){
            if(appConfig.env == 'demo'){
                var idx;
                var data = {};
                angular.forEach(categories, function(item, index){
                    if(item._id == id){
                        idx = index;
                        data = angular.copy(item);
                    }
                });
                if(idx){
                    [].splice.apply(categories, [idx, 1]);
                }
                return $q.when(data);
            }
            var url = '/category/' + id;
            return $http.delete(url).then(function(res){
                return res.data;
            });
        }
    }
}