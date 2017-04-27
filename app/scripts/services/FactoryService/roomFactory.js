(function() {
    angular.module('studentinfo')
        .constant('serverUri', 'http://localhost:8081/stuinfo')
        .factory('roomFactory', function($resource, serverUri) {
            return $resource(serverUri + '/rooms/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                }
            });
        })
}());