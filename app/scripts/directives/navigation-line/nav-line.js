'use strict'

angular.module('sbAdminApp')
    .directive('header', function () {
        return {
            templateUrl: 'scripts/directives/navigation-line/nav-line.html',
            restrict: 'E',
            replace: true,
        }
    });

