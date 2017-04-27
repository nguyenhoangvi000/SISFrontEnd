(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('appService', function() {
            var protocol = 'http';
            var host = 'localhost';
            var port = '8080';
            this.baseUrl = `${protocol}://${host}:${port}/isc-stuinfo` // http://localhost:8080  
        })
}()); 