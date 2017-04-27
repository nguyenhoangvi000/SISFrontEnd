(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('addcoursetypeCtrl', function($scope, courseTypeService) {

            $scope.coursetype = {
                "name": $scope.name
            }
            $scope.coursetype.save();
        })

}());