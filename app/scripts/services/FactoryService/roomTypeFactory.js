(function() {
    angular.module('studentinfo')
        .constant('serverUri', 'http://localhost:8081/stuinfo')
        .factory('roomTypeFactory', function($resource, serverUri) {
            return $resource(serverUri + '/room-types/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                }
            });
        })
}());