//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            controller : 'IndexController',
            templateUrl: 'views/index.html'
        })
        .state('SignIn',{
            url : '/signin',
            templateUrl: 'views/users/signin.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
        })
        .state('articles',{
            url : '/articles',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createArticle',{
            url : '/articles/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editArticles',{
            url : '/articles/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewArticle',{
            url : '/articles/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
     .state('requests',{
            url : '/requests',
            controller : 'RequestsController',
            templateUrl: 'views/requests/list.html'
        })
        .state('createRequest',{
            url : '/requests/create',
            controller : 'RequestsController',
            templateUrl: 'views/requests/create.html'
        })
        .state('editRequests',{
            url : '/requests/{requestId}/edit',
            controller : 'RequestsController',
            templateUrl: 'views/requests/edit.html'
        })
        .state('viewRequest',{
            url : '/requests/{requestId}',
            controller : 'RequestsController',
            templateUrl: 'views/requests/view.html'
        })
        .state('404',{
            templateUrl: 'views/404.html'
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);