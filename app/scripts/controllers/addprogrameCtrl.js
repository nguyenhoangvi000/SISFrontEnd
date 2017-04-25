(function () {
    'use strict';
    angular
        .module('studentinfo')
        .controller('addprogrameCtrl', ['appService', function () {
            console.log('in addprogrameCtrl');
            console.log(appService);

        }])
}());