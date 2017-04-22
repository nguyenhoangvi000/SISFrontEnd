(function() {
    angular.module('sbAdminApp')
    .constant('serverUri', 'http://localhost:8080/stuinfo')
    .factory('roomTypeFactory', function($resource, serverUri) {
        return $resource(serverUri + '/room-types/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
}());