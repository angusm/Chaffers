(function() {
    angular.module('djangular').factory('csrfService', csrfService);

    csrfService.$inject = ['$cookies'];
    function csrfService($cookies) {
        return {
            getCSRFToken: getCSRFToken
        };

        function getCSRFToken() {
            return $cookies.get('csrftoken');
        }
    }

})();