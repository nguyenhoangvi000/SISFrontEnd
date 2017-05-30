(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('addCourseCtrl', function($scope, objectService, toastr, $http, appService) {
            function loadCourseType() {
                $scope.courseTypes.availableOptions = objectService.CourseType.query(function(data) {
                    console.log(data);
                }); //query() trả về một mảng words
            }

            function loadPrerequisites() {
                objectService.Course.query(function(data) {
                    $scope.Prerequisites = data.map(function(value) {
                        return { "id": value.id, label: value.codeName }
                    })
                });
            }
            $scope.course = new objectService.Course();
            $scope.courseTypes = {
                selectedOption: null,
                availableOptions: [

                ]
            };
            loadCourseType();
            loadPrerequisites();
            $scope.premodel = [];
            $scope.settings = { enableSearch: true, scrollableHeight: '200px', scrollable: true };
            $scope.saveCourse = function() {
                console.log($scope.premodel);
                $scope.course.courseType = $scope.courseTypes.selectedOption.id;
                //   $scope.Prerequisites.model == null ? $scope.course.prerequisites = [] : $scope.course.prerequisites = $scope.Prerequisites.model;
                $scope.course.prerequisites = $scope.premodel.map(function(value) {
                        return value.id;
                    })
                    // console.log($scope.course.prerequisites);
                    // $scope.course.$save(function() {

                // })
                $http.post(appService.baseUrl + '/courses/', $scope.course)
                    .then(function(res) {
                            if (res.status == 200)
                                toastr.success('New Course was created!', 'Success!', { timeOut: 2000, closeButton: true });
                        },
                        function(res) {
                            console.log(res);
                        })
            }
            $scope.onSelectionChanged = function() {
                $scope.preDisplay = '';
                $scope.premodel.map(function(selected) {
                    $scope.preDisplay += (selected.label + ', ')
                })
            }
        })

}());