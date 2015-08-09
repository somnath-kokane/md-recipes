'use strict';

var express = require('express');
var Recipe = require('./recipe');
var router = express.Router();

router.get('/', getAll);
router.get('/:id/', getById);
router.post('/', create);
router.put('/:id/', update);
router.delete('/:id/', remove);

module.exports = router;

function getAll(req, res, next){
    Recipe.find(function(err, result){
        if(err){
            return next(err);
        }
        res.json(result);
    });
}

function getById(req, res, next){
    Recipe.findById(req.params.id, function(err, result){
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
    Recipe.create(req.body, function(err, result){
        if(err){
            return next(err);
        }
        res.json(result);
    });
}

function update(req, res, next){
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, result){
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

function remove(req, res, next){
    Recipe.findByIdAndRemove(req.params.id, function(err, result){
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