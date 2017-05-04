(function () {
    'use strict';

    angular
        .module('studentinfo')
        .service('catalogService', ['$resource', 'appService', function ($resource, appService) {
            return $resource(appService.baseUrl + '/catalogs/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DETELE'
                },
            });
        }])
}());