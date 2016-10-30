import DjangoModelFactory from './django_model';
import csrfService from './csrf_service';
import djangoHTTPFactory from './django_http'

import djangoModelTableDirective from './directives/django_model_table/django_model_table';
import djangoModelViewDirective from './directives/django_model_view/django_model_view';


let module = angular.module('djangular', [
    'ngCookies',
]);

// Factories
module.factory('DjangoModel', DjangoModelFactory);
module.factory('csrfService', csrfService);
module.factory('djangoHTTP', djangoHTTPFactory);

// Directives
module.directive('djangoModelTable', djangoModelTableDirective);
module.directive('djangoModelView', djangoModelViewDirective);

export default module;