(function() {
    // Room Type Controller - list all room type
    function roomTypeCtrl($scope) {

    }

    // Add Room Type Controller - new room type
    function addRoomTypeCtrl($scope, roomTypeFactory) {
        $scope.buttonName = 'Create';
        $scope.submit = function(form) {
            roomTypeFactory.save(form);
        }
    }

    // Edit Room Type Controller - edit existed room type
    function editRoomTypeCtrl($scope, $stateParams, roomTypeFactory) {
        $scope.buttonName = 'Edit';
        $scope.submit = function(form) {
            form.id = $stateParams.id;
            roomTypeFactory.update(form);
        }
    }

    // List Room Type Controller 
    function listRoomTypeCtrl($scope) {
    }

    // Detail Room Type Controller
    function detailRoomTypeCtrl($scope) {

    }

    angular.module('sbAdminApp')
    .controller('roomTypeCtrl', roomTypeCtrl)
    .controller('detailRoomTypeCtrl', detailRoomTypeCtrl)
    .controller('listRoomTypeCtrl', listRoomTypeCtrl)
    .controller('addRoomTypeCtrl', addRoomTypeCtrl)
    .controller('editRoomTypeCtrl', editRoomTypeCtrl)
}());