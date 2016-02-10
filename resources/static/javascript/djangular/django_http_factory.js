(function() {

    angular.module('djangular').factory('djangoHTTP', [
        'csrfService',
        '$http',
        djangoHTTPFactory
    ]);

    function djangoHTTPFactory(csrfService, $http) {
        $http.defaults.headers.post['X-CSRFToken'] = csrfService.getCSRFToken();
        return $http;
    }

})();