'use strict';

var express = require('express');
var router = express.Router();
var Category = require('./category');

router.get('/', getAll);
router.get('/:id/', getById);
router.post('/', create);
router.put('/:id/', update);
router.delete('/:id', remove);

module.exports = router;

function getAll(req, res, next){
    var options = {};
    Category.find(function(err, result){
        if(err){
            return next(err);
        }
        res.json(result);
    });
}

function getById(req, res, next){
    var id = req.params.id;
    Category.findById(id, function(err, result){
        if(null === result){
            err = new Error('Record Not Found');
            err.status = 404;
        }
        if(err){
            return next(err);
        }
        res.json(result);
    });
}

function create(req, res, next){
    var data = req.body;
    Category.create(data, function(err, result){
        if(err){
            return next(err);
        }
        res.json(result);
    });
}

function update(req, res, next){
    var id = req.params.id;
    var data = req.body;
    Category.findByIdAndUpdate(id, data, function(err, result){
        if(null === result){
            err = new Error('Record Not Found');
            err.status = 404;
        }
        if(err){
            return next(err);
        }
        return res.send(result);
    });
}

function remove(req, res, next){
    var id = req.params.id;
    Category.findByIdAndRemove(id, function(err, result){
        if(null === result){
            err = new Error('Record Not Found');
            err.status = 404;
        }
        if(err){
            return next(err);
        }
        res.json(result);
    });
}