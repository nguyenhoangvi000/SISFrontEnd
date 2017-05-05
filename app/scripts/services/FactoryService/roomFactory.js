(function() {
    angular.module('studentinfo')
        .factory('roomFactory', function($resource, appService) {
            return $resource(appService.baseUrl + '/rooms/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                }
            });
        })
}());