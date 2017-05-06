(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('coursetypeCtrl', function($scope, $http, appService, objectService) {
            var UrlcourseType = appService.baseUrl + '/course-types';
            console.log("load course Type");
            loadCourseType();
            //Update CourseType
            $scope.showFormUpdate = function(coursetypeID) {
                    $scope.coursetype = objectService.CourseType.get({ id: coursetypeID }, function(data) {});
                    //btn click update
                    $scope.Updatecoursetype = function(coursetypeNameUpdate) {
                            console.log("click update id : " + coursetypeID);
                            console.log("Name : " + coursetypeNameUpdate);
                            //  var id = $scope.coursetype.id;

                            $scope.coursetype.$update();
                            //  objectService.CourseType.update({ id: id }, $scope.coursetype);

                        } //end click update
                } //end showformUpdate



            //Delete Course Type
            $scope.deleteCoursetype = function(coursetypeID) {
                    console.log("course type  id" + coursetypeID);
                    //delete post with $resource
                    objectService.CourseType.delete({ id: coursetypeID }, function() {
                        objectService.CourseType.query(function(data) {
                            $scope.coursetypes = data;
                        });
                    })
                } //end deleteCoure type
                //Load CourseType
            function loadCourseType() {
                $scope.coursetypes = objectService.CourseType.query(function(data) {
                    // data.forEach(function(element) {
                    //     console.log("course type:" + element.name);
                    // }, this);
                });
            }
            $scope.coursetype = new objectService.CourseType();
            $scope.addcoursetype = function() {

                $scope.coursetype.$save();
                objectService.CourseType.query(function(data) {
                    $scope.coursetypes = data;
                });
            }

        }); // end .controller
});