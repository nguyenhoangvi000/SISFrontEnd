(function() {
    
    // Parent academic year ctrl
    function academicYearCtrl($scope) {
        $scope.path = {value: ''};
    }

    // Add
    function addAcademicYearCtrl($scope, academicYearService) {
        $scope.buttonName = 'Add';
        $scope.isProcess = false;

        // Submit data
        $scope.submit = function(form) {
            if($scope.academicYear.$valid) {
                $scope.isProcess = true;
                academicYearService.save(form, function() {
                    $scope.form = {};
                    $scope.academicYear.$setPristine();
                    $scope.academicYear.$setUntouched();
                    $scope.isProcess = false;
                });
            }
        }

        // Change url
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Add';
        })
    }

    // Edit academic year
    function editAcademicYearCtrl($scope, $stateParams, academicYearService) {
        $scope.buttonName = 'Edit';
        $scope.isProcess = true;

        // Edit
        $scope.submit = function(form) {
            if($scope.academicYear.$valid) {
                $scope.isProcess = true;
                form.id = $stateParams.id;
                academicYearService.update(form, function() {
                    $scope.isProcess = false;
                    $scope.academicYear.$setPristine();
                    $scope.academicYear.$setUntouched();
                });
            }
        }

        academicYearService.get({id: $stateParams.id}, function(data) {
            $scope.form = data;
            $scope.isProcess = false;
        })

        // Change url
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Edit';
        })
    }

    // List all academic year
    function listAcademicYearCtrl($scope, academicYearService) {
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Data';
        })

        // Query data
        academicYearService.query(function(data) {
            $scope.items = data;
        })

        $scope.remove = function(id) {
            var isOK = confirm('Do you want to remove this item?');
            if(isOK) {
                academicYearService.delete({id: id}, function() {
                    var deletedIndx = null;
                    $scope.items.forEach(function(element, index) {
                        if(element.id == id) 
                            deletedIndx = index;
                    });
                    if(deletedIndx != null)$scope.items.splice(deletedIndx,1);
                }, function(data) {
                    alert('Can\'t renmove this instance!');
                });
            }
        }
    }

    // View detail of AcademicYear
    function detailAcademicYearCtrl($scope, academicYearService) {
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Detail';
        })

        roomTypeFactory.get({id: $stateParams.id}, function(data) {
            $scope.data = data;
        })
    }

    angular.module('studentinfo')
    .controller('academicYearCtrl', academicYearCtrl)
    .controller('addAcademicYearCtrl', addAcademicYearCtrl)
    .controller('detailAcademicYearCtrl', detailAcademicYearCtrl)
    .controller('listAcademicYearCtrl', listAcademicYearCtrl)
}())