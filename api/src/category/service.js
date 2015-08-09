'use strict';

module.exports = Service;

function Service(app){

    var cache = require('./data');

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        delete: remove
    };

    function getAll(options, cb){
        cb(null, cache);
    }

    function getById(id, cb){
        var result;
        cache.forEach(function(item, index){
            if(item.id === parseInt(id)){
                result = item;
            }
        });
        if(result){
            cb(null, result);
        } else {
            cb({status: 404, message: 'Not Found'});
        }
    }

    function create(data, cb){
        data.id = cache.length + 1;
        cache.push(data);
        return cb(null, data);
    }

    function update(id, data, cb){
        var result;
        cache.forEach(function(item, index){
            if(item.id === parseInt(id)){
                result = item;
            }
        });
        if(!result){
            cb({status: 404, message: 'Not Found'});
            return;
        }
        for(var key in data){
           result[key] = data[key]; 
        }
        cb(null, result);
    }

    function remove(id, cb){
        var result, idx;
        cache.forEach(function(item, index){
            if(item.id === parseInt(id)){
                result = item;
                idx = id;
            }
        });
        if(!result){
            cb({status: 404, message: 'Not Found'});
            return;
        }
        [].splice.apply(cache, [idx, 1]);
        return cb(result);
    }
}