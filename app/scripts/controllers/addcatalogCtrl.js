(function () {
    'use strict';
    angular
        .module('studentinfo')
        .controller('addcatalogCtrl', ['appService', function () {
            console.log('in addcatalogCtrl');
            console.log(appService);

        }])
}());