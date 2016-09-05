djangoHTTPFactory.$inject = ['csrfService', '$http'];
function djangoHTTPFactory(csrfService, $http) {
    $http.defaults.headers.post['X-CSRFToken'] = csrfService.getCSRFToken();
    return $http;
}
export default djangoHTTPFactory;
