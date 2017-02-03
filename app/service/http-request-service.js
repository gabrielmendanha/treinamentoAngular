/**
 * Created by gabrieloliveiramendanha on 31/01/17.
 */

(function () {
    var myApp = angular.module('MyApp');
    var api = "http://rest.learncode.academy/api/instajs/users7";

    var HTTPRequestService = function($http) {
        this.addUser = function (userObject) {
            return $http.post(api, userObject);
        };

        this.getUser = function() {
            return $http.get(api);
        };

        this.getUserByID = function(id){
            return $http.get(api + '/' + id);
        };

        this.updateUser = function(id, userObject) {
            return $http.put(api+ '/' + id, userObject);
        };
    };

    HTTPRequestService.$inject = ['$http'];
    myApp.service('HTTPRequestService', HTTPRequestService);
}());