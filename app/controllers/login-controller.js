/**
 * Created by gabrieloliveiramendanha on 30/01/17.
 */

(function () {

    var myApp = angular.module('MyApp');

    var LoginController = function ($scope, $location, HTTPRequestService) {
        var ic = this;
        $("#success").hide();
        $("#fail").hide();

        function verify_info(user){
            if (typeof user === 'undefined' ||
                typeof user.name === 'undefined' ||
                typeof user.password === 'undefined'){
                return false;
            } else {
                return true;
            }
        }

        ic.addUser = function (user) {
            console.log(user);

            if (!verify_info(user)){

                $("#fail").show();
                $("#success").hide();

            } else {
                user.feed = [];
                user.followers = [];
                user.following = [];
                user.posts = [];
                HTTPRequestService.addUser(user)

                    .then(function (result) {
                    console.log(result.data);
                    $("#success").show();
                    $("#fail").hide();

                })

                    .catch(function (result) {
                    var msg = result.message || 'Erro';
                    alert(msg);

                });
            }
        };

        ic.logUser = function (user) {
            console.log(user);
            if(!verify_info(user)){

                $("#fail").show();

            } else {
                HTTPRequestService.getUser(user)
                    .then(function (result) {
                        var person = result.data.filter(function (el) {
                            return user.name == el.name && user.password == el.password && el.id;
                        });
                        if(person.length == 0){
                            $("#fail").show();
                        } else {
                            sessionStorage.id = person[0].id;
                            sessionStorage.person = person[0].name;
                            $location.path('/feed');
                        }
                    });
            }
        };
    };

    LoginController.$inject = ['$scope', '$location', 'HTTPRequestService'];
    myApp.controller('LoginController', LoginController);

}());