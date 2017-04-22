(function() {
    // Room Type Controller - list all room type
    function roomCtrl($scope) {

    }

    // Add Room Type Controller - new room type
    function addRoomCtrl($scope, roomFactory) {
        $scope.buttonName = 'Create';
        $scope.submit = function(form) {
            roomFactory.save(form);
        }
    }

    // Edit Room Type Controller - edit existed room type
    function editRoomCtrl($scope, $stateParams, roomFactory) {
        $scope.buttonName = 'Edit';
        $scope.submit = function(form) {
            form.id = $stateParams.id;
            roomFactory.update(form);
        }
    }

    // List Room Type Controller 
    function listRoomCtrl($scope) {
    }

    // Detail Room Type Controller
    function detailRoomCtrl($scope) {

    }

    angular.module('sbAdminApp')
    .controller('roomCtrl', roomCtrl)
    .controller('detailRoomCtrl', detailRoomCtrl)
    .controller('listRoomCtrl', listRoomCtrl)
    .controller('addRoomCtrl', addRoomCtrl)
    .controller('editRoomCtrl', editRoomCtrl)
}());