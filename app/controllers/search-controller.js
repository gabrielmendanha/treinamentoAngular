// /**
//  * Created by gabrieloliveiramendanha on 02/02/17.
//  */
//
// (function () {
//     var myApp = angular.module('MyApp');
//
//     var SearchController = function ($scope, HTTPRequestService, $mdDialog) {
//         var sc = this;
//         sc.nickname = "";
//
//         sc.followUser = function () {
//             if(sc.nickname == sessionStorage.person){
//                 return
//             }
//
//             var user = HTTPRequestService.getUserByID(sessionStorage.id);
//             var userToFollow = HTTPRequestService.getUser()
//                 .then(function () {
//                     var allUsers = userToFollow.filter(function (el) {
//                         if(el.name == sc.nickname){
//                             return el
//                         }
//                 });
//             });
//
//             user.following.push(userToFollow.id);
//             userToFollow.followers.push(user.id);
//
//
//
//             console.log(user);
//             console.log(userToFollow);
//
//             HTTPRequestService.updateUser(sessionStorage.id, user);
//             HTTPRequestService.updateUser(userToFollow.id, userToFollow);
//
//         };
//     };
//
//     SearchController.$inject = ['$scope', 'HTTPRequestService', '$mdDialog'];
//     myApp.controller('SearchController', SearchController);
//
// }());