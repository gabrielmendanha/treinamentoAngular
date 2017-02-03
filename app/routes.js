/**
 * Created by gabrieloliveiramendanha on 31/01/17.
 */

(function () {
    var MyApp = angular.module('MyApp');

    MyApp.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : './views/login.html',
                controller  : 'LoginController as ic'
            })

            .when('/feed', {
                templateUrl : './views/feed.html',
                controller  : 'FeedController as fc'
            })

            .when('/profile', {
                templateUrl : './views/profile.html',
                controller  : 'ProfileController as pc'
            })

            .otherwise({
                redirectTo: '/'
            });
    });

}());