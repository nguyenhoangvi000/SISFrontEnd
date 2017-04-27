(function() {
    angular.module('studentinfo')
        .factory('courseTypeService', function($resource, $http, appService) {
            return $resource(appService.baseUrl + '/course-types/:id', { id: '@id' }, {
                save: {
                    method: 'POST'
                }
            });
        })
}());