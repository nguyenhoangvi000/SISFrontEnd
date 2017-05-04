(function() {
    angular.module('studentinfo')
    .factory('academicYearService', function($resource, appService) {
        return $resource(appService.baseUrl + '/academic-years/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        })
    })
}())