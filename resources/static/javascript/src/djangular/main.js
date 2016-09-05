import DjangoModelFactory from './django_model';
import csrfService from './csrf_service';
import djangoHTTPFactory from './django_http'
import populateDjangoModelFactory from './populate_django_model_factory';
import createPopulatedDjangoModelFactory from './create_populated_django_model';

import djangoModelTableDirective from './directives/django_model_table/django_model_table';
import djangoModelViewDirective from './directives/django_model_view/django_model_view';


let module = angular.module('djangular', [
    'ngCookies',
]);

// Factories
module.factory('DjangoModel', DjangoModelFactory);
module.factory('createPopulatedDjangoModel', createPopulatedDjangoModelFactory);
module.factory('csrfService', csrfService);
module.factory('djangoHTTP', djangoHTTPFactory);
module.factory('populateDjangoModel', populateDjangoModelFactory);

// Directives
module.directive('djangoModelTable', djangoModelTableDirective);
module.directive('djangoModelView', djangoModelViewDirective);

export default module;