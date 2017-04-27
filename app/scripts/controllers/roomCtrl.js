(function() {
    // Room Type Controller - list all room type
    function roomCtrl($scope) {
        $scope.path = {value: ''};
    }

    // Add Room Type Controller - new room type
    function addRoomCtrl($scope, roomFactory, roomTypeFactory) {
        $scope.buttonName = 'Add';
        $scope.submit = function(form) {
            if($scope.room.$valid) {
                roomFactory.save(form, function() {
                    $scope.form = {};
                    $scope.room.$setPristine();
                    $scope.room.$setUntouched();
                });
            }
        }

        roomTypeFactory.query(function(data) {
            $scope.roomTypes = data;
        })

        $scope.$on('$stateChangeSuccess', function() {
             $scope.path.value = 'Add';
        })
    }

    // Edit Room Type Controller - edit existed room type
    function editRoomCtrl($scope, $stateParams, roomFactory, roomTypeFactory) {
        $scope.buttonName = 'Edit';
        $scope.submit = function(form) {
            if($scope.room.$valid)
                roomFactory.update(form);
        }

        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Edit';
        })

        roomFactory.get({id: $stateParams.id}, function(data) {
            $scope.form = data;
            $scope.form.roomType = data.roomType.id;
        })

        roomTypeFactory.query(function(data) {
            $scope.roomTypes = data;
        })
    }

    // List Room Type Controller 
    function listRoomCtrl($scope, roomFactory) {
        $scope.$on('$stateChangeSuccess', function() {
            $scope.path.value = 'Data';
        })

        roomFactory.query(function(data) {
            $scope.items = data;
        })

        $scope.remove = function(id) {
            var isOk = confirm('Do you want to remove this item?');
            if(isOk) {
                roomFactory.delete({id: id}, function() {
                    var deletedIndx = null;
                    $scope.items.forEach(function(element, index) {
                        if(element.id == id) 
                            deletedIndx = index;
                    });
                    if(deletedIndx != null)$scope.items.splice(deletedIndx,1);
                });
            }
        }
    }

    // Detail Room Type Controller
    function detailRoomCtrl($scope, $stateParams, roomFactory) {
        $scope.path.value = 'Detail';

        roomFactory.get({id: $stateParams.id}, function(data) {
            $scope.item = data;
        })
    }

    angular.module('studentinfo')
    .controller('roomCtrl', roomCtrl)
    .controller('detailRoomCtrl', detailRoomCtrl)
    .controller('listRoomCtrl', listRoomCtrl)
    .controller('addRoomCtrl', addRoomCtrl)
    .controller('editRoomCtrl', editRoomCtrl)
}());