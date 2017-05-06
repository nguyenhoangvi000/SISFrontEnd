(function() {
    'use strict';

    angular
        .module('studentinfo')
        //   .service('courseTypeService', function() { /* ... */ })
        .controller('coursetypeCtrl', function($scope, $http, appService, objectService) {
            $scope.coursetype = new objectService.CourseType();
            $scope.addcoursetype = function(addcourstypeform) {
                console.log($scope.coursetype);
                $scope.coursetype.$save(function() {
                    objectService.CourseType.query(function(data) {
                        // something
                        $scope.lists = data;
                    });
                });
            }
            load();

            function load() {
                $scope.lists = objectService.CourseType.query(function(data) {
                    // something
                });
            }
            //end function add courseType
        }) // end .controller

}());