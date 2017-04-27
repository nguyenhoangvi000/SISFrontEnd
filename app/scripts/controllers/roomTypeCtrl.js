(function() {
    // Room Type Controller - list all room type
    function roomTypeCtrl($scope) {
        $scope.path = {value: ''};
    }

    // Add Room Type Controller - new room type
    function addRoomTypeCtrl($scope, roomTypeFactory) {
        $scope.buttonName = 'Add';
        $scope.isProcess = false;

        // Submit data
        $scope.submit = function(form) {
            if($scope.roomType.$valid) {
                $scope.isProcess = true;
                roomTypeFactory.save(form, function() {
                    $scope.form = {};
                    $scope.roomType.$setPristine();
                    $scope.roomType.$setUntouched();
                    $scope.isProcess = false;
                });
            }
        }

        // Change url
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Add';
        })
    }

    // Edit Room Type Controller - edit existed room type
    function editRoomTypeCtrl($scope, $stateParams, roomTypeFactory) {
        $scope.buttonName = 'Edit';
        $scope.isProcess = true;

        // Edit
        $scope.submit = function(form) {
            if($scope.roomType.$valid) {
                $scope.isProcess = true;
                form.id = $stateParams.id;
                roomTypeFactory.update(form, function() {
                    $scope.isProcess = false;
                });
            }
        }

        roomTypeFactory.get({id: $stateParams.id}, function(data) {
            $scope.form = data;
            $scope.isProcess = false;
        })

        // Change url
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Edit';
        })
    }

    // List Room Type Controller 
    function listRoomTypeCtrl($scope, roomTypeFactory) {
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Data';
        })

        // Query data
        roomTypeFactory.query(function(data) {
            $scope.items = data;
        })

        $scope.remove = function(id) {
            var isOK = confirm('Do you want to remove this item?');
            if(isOK) {
                roomTypeFactory.delete({id: id}, function() {
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

    // Detail Room Type Controller
    function detailRoomTypeCtrl($scope, $stateParams, roomTypeFactory) {
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Detail';
        })

        roomTypeFactory.get({id: $stateParams.id}, function(data) {
            $scope.data = data;
        })
    }

    angular.module('studentinfo')
    .controller('roomTypeCtrl', roomTypeCtrl)
    .controller('detailRoomTypeCtrl', detailRoomTypeCtrl)
    .controller('listRoomTypeCtrl', listRoomTypeCtrl)
    .controller('addRoomTypeCtrl', addRoomTypeCtrl)
    .controller('editRoomTypeCtrl', editRoomTypeCtrl)
}());