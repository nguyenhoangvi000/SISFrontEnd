(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('objectService', ['appService', '$resource', function(appService, $resource) {

            this.OpenCourse = $resource(appService.baseUrl + '/open-courses/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.RoomType = $resource(appService.baseUrl + '/room-types/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.Room = $resource(appService.baseUrl + '/rooms/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.Intake = $resource(appService.baseUrl + '/intakes/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })


            this.AcademicYear = $resource(appService.baseUrl + '/academic-years/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })

            this.Semester = $resource(appService.baseUrl + '/semester/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.Programe = $resource(appService.baseUrl + '/programes/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
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

            this.Course = $resource(appService.baseUrl + '/courses/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },
            })
            this.Major = $resource(appService.baseUrl + '/majors/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' },

            })

        }]);

}());