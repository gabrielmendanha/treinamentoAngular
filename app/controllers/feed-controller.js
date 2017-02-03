/**
 * Created by gabrieloliveiramendanha on 31/01/17.
 */

(function () {
    var myApp = angular.module('MyApp');

    var FeedController = function ($scope, HTTPRequestService, $mdDialog, $location, $timeout) {
        var fc = this;
        fc.nickname = "";
        fc.items = [];
        fc.post = {
            // description: ''
        };

        fc.getFeed = function (){
            HTTPRequestService.getUserByID(sessionStorage.id)
                .then(function (result) {
                    var diff = $(result.data.feed).not(fc.items).get();

                    diff.forEach(function (element) {
                        fc.items.push(element);
                    });


                });
        };

        fc.openFromLeft = function() {
            $mdDialog.show({
                templateUrl: './views/upload.html',
                clickOutsideToClose:true,
                scope: $scope.$new()
                }
            )
        };

        fc.openSearch = function() {
            $mdDialog.show({
                    templateUrl: './views/search.html',
                    clickOutsideToClose:true,
                    scope: $scope.$new()
                }
            );
        };

        fc.upload = function() {
            var newPost = {
                poster_name: sessionStorage.person,
                description: fc.post.description,
                img: './static/images/generic-candy.jpg'
            };

            HTTPRequestService.getUserByID(sessionStorage.id)
                .then(function (result) {
                    var user = result.data;
                    user.posts.push(newPost);
                    user.feed.push(newPost);
                    fc.items.push(newPost);


                    HTTPRequestService.updateUser(sessionStorage.id, user).then(function() {
                        user.followers.forEach(function (follower) {
                            HTTPRequestService.getUserByID(follower).then(function (el) {
                                el.data.feed.push(newPost);
                                HTTPRequestService.updateUser(el.data.id, el.data);
                            });
                        });
                    });




                });
        };

        fc.followUser = function () {

            HTTPRequestService.getUserByID(sessionStorage.id)
                .then(function (result) {
                    var user = result.data;
                    HTTPRequestService.getUser()
                        .then(function (result) {
                            var userToFollow = result.data.filter(function (el) {
                                if(el.name == fc.nickname){
                                    return el
                                }
                            });

                            if(user !== 'undefined' && userToFollow !== 'undefined'){
                                user.following.push(userToFollow[0].id);
                                userToFollow[0].followers.push(user.id);

                                HTTPRequestService.updateUser(sessionStorage.id, user);
                                HTTPRequestService.updateUser(userToFollow[0].id, userToFollow[0]);

                                userToFollow[0].posts.forEach(function (item) {
                                    console.log(userToFollow[0].posts);
                                    console.log(item);
                                    user.feed.push(item);
                                    fc.items.push(item);
                                });
                            }




                        })
                });

            // var userToFollow = HTTPRequestService.getUser()
            //     .then(function (result) {
            //         result.data.filter(function (el) {
            //             if(el.name == fc.nickname){
            //                 return el
            //             }
            //         });
            //         user.following.push(userToFollow.id);
            //         userToFollow.followers.push(user.id);
            //
            //         console.log(user);
            //         console.log(userToFollow);
            //
            //         HTTPRequestService.updateUser(sessionStorage.id, user);
            //         HTTPRequestService.updateUser(userToFollow.id, userToFollow);
            //     });

            // fc.getFeed();
        };

        fc.logOff = function () {
            sessionStorage.clear();
            $location.path('/');
        };

        fc.goProfile = function () {
            $location.path('/profile');
        }
    };

    FeedController.$inject = ['$scope', 'HTTPRequestService', '$mdDialog', '$location', '$timeout'];
    myApp.controller('FeedController', FeedController);

}());