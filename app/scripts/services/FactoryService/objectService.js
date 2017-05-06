(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('objectService', ['appService', '$resource', function(appService, $resource) {
            this.Intake = $resource(appService.baseUrl + '/intakes/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DETELE'
                },
            });
            this.Programe = $resource(appService.baseUrl + '/programes/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DETELE'
                },
            });
            this.Student = $resource(appService.baseUrl + '/students/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.Catalog = $resource(appService.baseUrl + '/catalogs/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.CourseType = $resource(appService.baseUrl + '/course-types/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
        }]);

}());