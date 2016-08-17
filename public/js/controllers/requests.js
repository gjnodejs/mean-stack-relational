angular.module('mean.requests').controller('RequestsController', ['$scope', '$stateParams', 'Global', 'Requests', '$state', function ($scope, $stateParams, Global, Requests, $state) {
    $scope.global = Global;

    $scope.create = function() {
        var request = new Requests({
            title: this.title,
            content: this.content
        });

        request.$save(function(response) {
            $state.go('viewRequest',{requestId : response.id})
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(request) {
        if (request) {
            request.$remove();  

            for (var i in $scope.requests) {
                if ($scope.requests[i] === request) {
                    $scope.requests.splice(i, 1);
                }
            }
        }
        else {
            $scope.request.$remove();
            $state.go('requests');
        }
    };

    $scope.update = function() {
        var request = $scope.request;
        if (!request.updated) {
            request.updated = [];
        }
        request.updated.push(new Date().getTime());
        request.$update(function() {
        $state.go('viewRequest',{requestId : request.id})

        });
    };

    $scope.find = function() {
        Requests.query(function(requests) {
            $scope.requests = requests;
        });
    };

    $scope.findOne = function() {
        Requests.get({
            requestId: $stateParams.requestId
        }, function(request) {
            $scope.request = request;
        });
    };
    $scope.find = function() {
        Requests.query(function(requests) {
            $scope.requests = requests;
        });
    };



}]);