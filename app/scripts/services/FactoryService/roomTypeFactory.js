(function() {
    angular.module('studentinfo')
        .factory('roomTypeFactory', function($resource, appService) {
            return $resource(appService.baseUrl + '/room-types/:id', {id: '@id'}, {
                update: {
                    method: 'PUT'
                }
            });
        })
}());