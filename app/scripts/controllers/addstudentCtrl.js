(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('addstudentCtrl', ['appService', 'objectService', '$scope', '$state', '$stateParams', function(appService, objectService, $scope, $state, $stateParams) {
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


            $scope.submit = function(valid) {
                if (valid) {
                    $scope.student.intake = $scope.intakes.selectedOption;
                    $scope.student.catalog = $scope.catalogs.selectedOption;
                    $scope.student.programe = $scope.programes.selectedOption;
                    $scope.student.birthday = new Date($scope.student.birthday);
                    $scope.student.$save(function() {
                        objectService.Student.query(function(data) {
                            console.log(data);
                            $state.go('student');
                        });
                    });
                }

            }
        }])
}());