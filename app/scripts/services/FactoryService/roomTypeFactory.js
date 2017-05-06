(function() {
    angular.module('studentinfo')
<<<<<<< Updated upstream
        .factory('roomTypeFactory', function($resource, appService) {
            return $resource(appService.baseUrl + '/room-types/:id', {id: '@id'}, {
=======
        .constant('serverUri', 'http://localhost:8081/stuinfo')
        .factory('roomTypeFactory', function($resource, serverUri) {
            return $resource(serverUri + '/room-types/:id', { id: '@id' }, {
>>>>>>> Stashed changes
                update: {
                    method: 'PUT'
                }
            });
        })
}());