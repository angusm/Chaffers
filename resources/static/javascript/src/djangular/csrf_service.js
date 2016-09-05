csrfService.$inject = ['$cookies'];
function csrfService($cookies) {
    return {
        getCSRFToken: () => {
            return $cookies.get('csrftoken');
        }
    };
}

export default csrfService;