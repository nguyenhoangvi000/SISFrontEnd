(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('appService', function() {
            var protocol = 'http';
            var host = 'localhost';
            var port = '8081';
            // var port = '8081';
            this.baseUrl = `${protocol}://${host}:${port}/isc-stuinfo` // http://localhost:8080/isc-stuinfo/  

        })
}());