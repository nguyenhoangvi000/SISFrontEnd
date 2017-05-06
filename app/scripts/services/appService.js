(function() {
    'use strict';

    angular
        .module('studentinfo')
        .service('appService', function() {
            var protocol = 'http';
            var host = 'localhost';
            var port = '8081';
<<<<<<< HEAD
            // var port = '8081';
            this.baseUrl = `${protocol}://${host}:${port}/stuinfo` // http://localhost:8080  
=======
            this.baseUrl = `${protocol}://${host}:${port}/isc-stuinfo` // http://localhost:8080  
>>>>>>> 1c0d080377624f980ffbee76b5e9faf4c0fed71e
        })
}());