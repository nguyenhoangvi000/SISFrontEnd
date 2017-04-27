(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('programeService', ['appService', '$resource', function(appService, $resource) {
            return $resource(appService.baseUrl + '/programes/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DETELE'
                },
            });
        }]);

}());