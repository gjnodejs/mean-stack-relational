angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'SignOut', '$state', function ($scope, Global, SignOut, $state) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "MY REQUESTS",
        "state": "articles"
    }, {
        "title": "Create New REQUEST",
        "state": "createArticle"
    },
    {
        "title": "MY RESPONSES",
        "state": "requests"
    }, {
        "title": "Search a VIDEO",
        "state": "createRequest"
    }              
                  ];
    
    $scope.isCollapsed = false;

    $scope.SignOut = function(){
        SignOut.get(function(response){
            if(response.status === 'success'){
                $scope.global = null;
                $state.go('home');
            }
        });
    }


}]);