(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('addstudentCtrl', ['appService', 'objectService', '$scope', '$state', '$stateParams', 'Upload', '$timeout', '$http', function(appService, objectService, $scope, $state, $stateParams, Upload, $timeout, $http) {
            //upload image
            $scope.files = "";
            $scope.errFiles = "";

            $scope.uploadFiles = function(files, errFiles) {
                console.log(files[0].$ngfBlobUrl);
                $('#avatar').css('background-image', 'url(' + (files[0].$ngfBlobUrl) + ')');
                $scope.files = files;
                $scope.errFiles = errFiles;
            }
            var startUpload = function(id) {
                angular.forEach($scope.files, function(file) {
                    file.upload = Upload.upload({
                        url: appService.baseUrl + '/students/' + id + '/avatar',
                        data: { file: file }
                    });

                    file.upload.then(function(response) {
                        $timeout(function() {
                            file.result = response.data;
                        });
                    }, function(response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function(evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                });
            }
            $scope.student = new objectService.Student();
            $scope.genders = {
                selectedOption: { id: 0, name: "Male" },
                availableOptions: [
                    { id: 0, name: "Male" },
                    { id: 1, name: "FeMale" }
                ]
            };
            $scope.intakes = {
                selectedOption: null,
                availableOptions: [

                ]
            };
            $scope.programes = {
                availableOptions: [

                ],
                selectedOption: null
            };
            $scope.catalogs = {
                availableOptions: [

                ],
                selectedOption: null
            };

            function loadIntake() {
                $scope.intakes.availableOptions = objectService.Intake.query(function(data) {
                    console.log(data);

                })
            }

            function loadPrograme() {
                $scope.programes.availableOptions = objectService.Programe.query(function(data) {
                    console.log(data);
                })
            }

            function loadCatalog() {
                $scope.catalogs.availableOptions = objectService.Catalog.query(function(data) {

                })
            }
            loadIntake();
            loadPrograme();
            loadCatalog();

            if ($stateParams.id != null) {
                $scope.student2 = objectService.Student.get({ id: $stateParams.id }, function(data) {
                    console.log(data.intake);
                    $scope.catalogs.selectedOption = data.catalog;
                    $scope.intakes.selectedOption = data.intake;
                    $scope.programes.selectedOption = data.programe;
                    $scope.student2.birthday = new Date(data.birthday);

                    $scope.update = function(valid) {
                        if (valid) {
                            $scope.student2.intake = $scope.intakes.selectedOption;
                            $scope.student2.catalog = $scope.catalogs.selectedOption;
                            $scope.student2.programe = $scope.programes.selectedOption;
                            $scope.student2.birthday = new Date($scope.student2.birthday);
                            $scope.student2.$update(function() {
                                $state.go('student');
                            });
                        }
                    }
                })

            }

            function convertDate(date) {
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString();
                var dd = date.getDate().toString();

                var mmChars = mm.split('');
                var ddChars = dd.split('');

                return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
            }

            $scope.submit = function(valid) {
                ///console.log(valid);
                // console.log();
                if (valid) {
                    $scope.student.intake = $scope.intakes.selectedOption.id;
                    $scope.student.catalog = $scope.catalogs.selectedOption.id;
                    $scope.student.programe = $scope.programes.selectedOption.id;
                    $scope.student.gender = $scope.genders.selectedOption.id;
                    // $scope.student.$save(function(a1, a2, a3) {
                    //     console.log(arguments)
                    // });
                    $http.post(appService.baseUrl + '/students', $scope.student)
                        .then(function(res) {
                                var location = res.headers().location + '';
                                var url = location.split('/');
                                var id = url[url.length - 1];
                                if (id) {
                                    try {
                                        startUpload(id);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            },
                            function(res) {
                                console.log(res);
                            })
                }

            }
        }])
}());