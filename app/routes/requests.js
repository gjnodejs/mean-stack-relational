'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
requests = require('../../app/controllers/requests');

module.exports = function(app) {
// Article Routes
app.route('/requests')
    .get(requests.all)
    .post(users.requiresLogin, requests.create);
app.route('/requests/:requestId')
    .get(requests.show)
    .put(users.requiresLogin, requests.hasAuthorization, requests.update)
    .delete(users.requiresLogin, requests.hasAuthorization, requests.destroy);

// Finish with setting up the requestId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('requestId', requests.request);
};

