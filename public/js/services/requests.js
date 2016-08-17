//Articles service used for articles REST endpoint
angular.module('mean.requests').factory("Requests", ['$resource', function($resource) {
    return $resource('requests/:requestId', {
        requestId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);