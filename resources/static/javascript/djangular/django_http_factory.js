(function() {

    angular.module('djangular').factory('djangoHTTP', [
        'csrfService',
        '$http',
        '$injector',
        djangoHTTPFactory
    ]);

    function djangoHTTPFactory(csrfService, $http, $injector) {
        $http.defaults.headers.post['X-CSRFToken'] = csrfService.getCSRFToken();
        return $http;
    }

})();