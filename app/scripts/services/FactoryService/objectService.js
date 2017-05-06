(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('objectService', ['appService', '$resource', function(appService, $resource) {
            this.Intake = $resource(appService.baseUrl + '/intakes/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            });
            this.Programe = $resource(appService.baseUrl + '/programes/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
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
<<<<<<< HEAD
            })
=======
            });
            this.Course = $resource(appService.baseUrl + '/courses/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            });
            this.Major = $resource(appService.baseUrl + '/majors/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            });
>>>>>>> 1c0d080377624f980ffbee76b5e9faf4c0fed71e
        }]);

}());