'use strict';

var express = require('express');

module.exports = Category;

function Category(app){
    var router = express.Router();
    var Service = require('./service')(app);

    router.get('/', getAll);
    router.get('/:id/', getById);
    router.post('/', create);
    router.put('/:id/', update);
    router.delete('/:id', remove);

    return router;

    function getAll(req, res){
        var options = {};
        Service.getAll(options, function(err, result){
            if(err){
                return res.status(404).send('Not Found');
            }
            return res.send(result);
        });
    }

    function getById(req, res){
        var id = req.params.id;
        Service.getById(id, function(err, result){
            if(err){
                return res.status(err.status).send(err.message);
            }
            return res.send(result);
        });
    }

    function create(req, res){
        var data = req.body;
        Service.create(data, function(err, result){
            if(err){
                return res.status(err.status).send(err.message);
            }
            return res.send(result);
        });
    }

    function update(req, res){
        var id = req.params.id;
        var data = req.body;
        Service.update(id, data, function(err, result){
            if(err){
                return res.status(err.status).send(err.message);
            }
            return res.send(result);
        });
    }

    function remove(req, res){
        var id = req.params.id;
        Service.delete(id, function(err, result){
            if(err){
                return res.status(err.status).send(err.message);
            }
            return res.send(result);
        });
    }
}