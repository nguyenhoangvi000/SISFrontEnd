(function() {
    angular.module('studentinfo')
        .factory('courseTypeService', function($scope, appService, $http) {
            console.log("vao trong courseTypeService");
            return {
                createCourseType: function(coursetypename) {
                    var data = {
                        name: coursetypename
                    };
                    var UrlcourseType = appService.baseUrl + '/course-types';
                    return $http.post(UrlcourseType, data);
                }
            };
        })
}());