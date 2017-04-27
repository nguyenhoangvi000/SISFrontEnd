(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('appService', function() {
            var protocol = 'http';
            var host = 'localhost';
            var port = '8081';
            this.baseUrl = `${protocol}://${host}:${port}/stuinfo` // http://localhost:8080  
        })
}());