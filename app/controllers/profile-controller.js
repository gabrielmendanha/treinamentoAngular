/**
 * Created by gabrieloliveiramendanha on 31/01/17.
 */

(function () {
    var myApp = angular.module('MyApp');

    var ProfileController = function ($scope, HTTPRequestService, $location) {
        var pc = this;
        pc.posts = [];
        pc.getPosts = function() {

            HTTPRequestService.getUserByID(sessionStorage.id)
                .then(function (result) {
                    var user = result.data;
                    pc.posts = user.posts;
                });
        };

        pc.goFeed = function () {
            $location.path('/feed');
        }

    };

    ProfileController.$inject = ['$scope', 'HTTPRequestService', '$location'];
    myApp.controller('ProfileController', ProfileController);

}());