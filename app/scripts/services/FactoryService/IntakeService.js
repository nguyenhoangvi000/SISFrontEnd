(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('intakeService', ['appService', '$resource', function(appService, $resource) {
            return $resource(appService.baseUrl + '/intakes/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DETELE'
                },
            });
        }]);

}());