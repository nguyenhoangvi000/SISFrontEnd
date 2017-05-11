(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('coursetypeCtrl', function($scope, $state, $http, appService, objectService) {

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
                            $scope.coursetype.$update(function() {
                                $.notify("Update success", "success");
                                objectService.CourseType.query(function(data) {
                                    $scope.coursetypes = data;
                                });
                            }, function() {
                                $.notify("Update error", "error");
                            });

                            //  objectService.CourseType.update({ id: id }, $scope.coursetype);
                        } //end click update
                } //end showformUpdate

            //Delete Course Type
            $scope.deleteCoursetype = function(coursetypeID) {
                console.log("course type  id" + coursetypeID);
                //delete post with $resource
                objectService.CourseType.delete({ id: coursetypeID }, function() {
                    $.notify("Delete success", "success");
                    objectService.CourseType.query(function(data) {
                        $scope.coursetypes = data;
                    });

                });

            }

            $scope.closeModal = function() {

                    // data-dismiss="modal"
                    $(document).ready(function() {
                        console.log("close modal");
                        $("#xbtn").attr("data-dismiss", "modal");
                        $($("#xbtn").attr("data-dismiss", "modal")).click(function() {
                            $(this).click();

                        });
                        //$("#xbtn").attr("data-dismiss", "modal");
                    });
                }
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
                // $scope.coursetype = new objectService.CourseType();
                $scope.coursetype.$save(function() {
                    $scope.coursetype = new objectService.CourseType();
                    objectService.CourseType.query(function(data) {
                        $scope.coursetypes = data;
                    });
                    $.notify("Add success", "success");
                }, function() {
                    $scope.coursetype.$promise.catch(function(errorResponse) {
                        console.log(errorResponse);
                        //  self.errorMessage = true;
                    });
                    $.notify("Add error", "error");
                });

                objectService.CourseType.query(function(data) {
                    $scope.coursetypes = data;
                });
                $state.go('coursetype');
            }
        }) //end controller

}());