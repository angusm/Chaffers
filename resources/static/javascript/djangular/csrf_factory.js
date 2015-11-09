(function() {
    angular.module('djangular').factory('csrfService', [
        '$cookies',
        csrfService
    ]);

    function csrfService($cookies) {
        return {
            getCSRFToken: getCSRFToken
        };

        function getCSRFToken() {
            return $cookies['csrftoken'];
        }
    }

})();