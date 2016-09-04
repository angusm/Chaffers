(() => {
    angular.module('djangular').factory('csrfService', csrfService);

    csrfService.$inject = ['$cookies'];
    function csrfService($cookies) {
        return {
            getCSRFToken: () => {
                return $cookies.get('csrftoken');
            }
        };
    }

})();