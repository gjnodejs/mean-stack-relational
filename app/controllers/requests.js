'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find request by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.request = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Request.find({where: {id: id}, include: [{model:db.User, attributes:['id', 'username', 'name']}]}).then(function(request){
        if(!request) {
            return next(new Error('Failed to load request ' + id));
        } else {
            req.request = request;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a request
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Request.create(req.body).then(function(request){
        if(!request){
            return res.send('users/signup', {errors: new StandardError('Request could not be created')});
        } else {
            return res.jsonp(request);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a request
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var request = req.request;

    request.updateAttributes({
        title: req.body.title,
        content: req.body.content
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete a request
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var request = req.request;

    request.destroy().then(function(){
        return res.jsonp(request);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show a request
 */
exports.show = function(req, res) {
    // Sending down the article that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.request);
};

/**
 * List of Requests
 */
exports.all = function(req, res) {
    db.Request.findAll({include: [{model:db.User, attributes: ['id', 'username', 'name']}]}).then(function(requests){
        return res.jsonp(requests);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Article authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.request.User.id !== req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
