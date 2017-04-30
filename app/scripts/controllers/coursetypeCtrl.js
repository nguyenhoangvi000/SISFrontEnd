(function() {
    'use strict';

    angular
        .module('studentinfo')
        //   .service('courseTypeService', function() { /* ... */ })
        .controller('coursetypeCtrl', function($scope, $http, appService) {
            var UrlcourseType = appService.baseUrl + '/course-types';

            $scope.addcoursetype = function(addcourstypeform) {

                    console.log("name course type : " + $scope.coursetypename);
                    console.log("submit form ");
                    $http.post(UrlcourseType, {
                        name: $scope.coursetypename
                    }).then(function(response) {
                        console.log("data" + response);
                    }, function(err) {
                        console.log("error roi" + err);
                    });

                }
                //end function add courseType
        }) // end .controller

}());