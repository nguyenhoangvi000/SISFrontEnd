(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('roomCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function(appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
            var baseUrl = appService.baseUrl
            init();

            function init() {
                getAllPosts();
            }
            $scope.someClickHandler = someClickHandler;

            function someClickHandler(info) {
                var message = info._id + ' - ' + info.title;
            }

            function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', nRow).unbind('click');
                $('td', nRow).bind('click', function() {
                    $scope.$apply(function() {
                        $scope.someClickHandler(aData);
                    });
                });
                return nRow;
            }
            load();

            function load() {
                $scope.posts = objectService.Room.query(function(data) {
                    console.log(data);
                    // something
                }); //query() trả về một mảng words
            }

            function getAllPosts() {
                $scope.createdRow = function(row, data, dataIndex) {
                    $compile(angular.element(row).contents())($scope);
                }
                $scope.posts = [];
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                    .withPaginationType('full_numbers')
                    .withOption('createdRow', $scope.createdRow)
                    .withOption('rowCallback', rowCallback)
                    // .withScroller()
                    // .withOption('scrollY', 500);

                $scope.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(0),
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2),
                    DTColumnDefBuilder.newColumnDef(3),
                    DTColumnDefBuilder.newColumnDef(4).withTitle('action'),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateRoom('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteRoom('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.roomTypes = {
                    availableOptions: [

                    ],
                    selectedOption: null
                };

                function loadRoomType() {
                    $scope.roomTypes.availableOptions = objectService.RoomType.query(function(data) {
                        console.log(data);
                    })
                }
                $scope.createRoom = function() {
                    $scope.room = new objectService.Room();
                    loadRoomType();
                    $ngConfirm({
                        useBootstrap: true,
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Room Type!',
                        content: `<form name="intakeFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.name" type="text" name="name"id="name" class="form-control" value="" title="">
                                  
                                </div>
                            </div>
                            <div class="form-group">
                        <label for="catalog" class="col-sm-2 control-label">Room Type</label>
                        <div class="col-sm-10">
                            <select name="roomType" id="roomType" ng-options="option.name for option in roomTypes.availableOptions track by option.id" ng-model="roomTypes.selectedOption" class="form-control">
                            </select>
                        </div>
                    </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Location:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.location" type="text" name="location" id="location" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Capacity:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.capacity" type="number" name="capacity id="capacity" class="form-control" value=""  title="">
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create Room',
                                btnClass: 'btn-success btn-sm',
                                action: function(scope, button) {
                                    $scope.room.roomType = $scope.roomTypes.selectedOption.id;
                                    //console.log($scope.roomTypes.selectedOption.id);
                                    $scope.room.$save(function() {
                                        objectService.Room.query(function(data) {
                                            // something
                                            scope.posts = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                btnClass: 'btn-default btn-sm',
                                action: function(scope, button) {
                                    // closes the modal

                                }
                            }
                        }
                    });
                }
                $scope.updateRoom = function(id) {
                    loadRoomType();
                    $scope.room = objectService.Room.get({ id: id }, function(data) {
                        $scope.roomTypes.selectedOption = data.roomType;
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Room Type!',
                            content: `<form name="intakeFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.name" type="text" name="name"id="name" class="form-control" value="" title="">
                                  
                                </div>
                            </div>
                            <div class="form-group">
                        <label for="catalog" class="col-sm-2 control-label">Room Type</label>
                        <div class="col-sm-10">
                            <select name="roomType" id="roomType" ng-options="option.name for option in roomTypes.availableOptions track by option.id" ng-model="roomTypes.selectedOption" class="form-control">
                            </select>
                        </div>
                    </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Location:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.location" type="text" name="location" id="location" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Capacity:</label>
                                <div class="col-sm-10">
                                    <input ng-model="room.capacity" type="number" name="capacity id="capacity" class="form-control" value=""  title="">
                                </div>
                            </div>
                        </form>`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Update',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        $scope.room.roomType = $scope.roomTypes.selectedOption.id;
                                        scope.room.$update(function() {
                                            objectService.Room.query(function(data) {
                                                // something
                                                scope.posts = data;
                                            });
                                        })
                                        return true; // not prevent close; / close box
                                    }
                                },
                                close: {
                                    text: 'Cancel',
                                    btnClass: 'btn-default btn-sm',
                                    action: function(scope, button) {
                                        // closes the modal
                                        console.log('cancel xoá ở đây');
                                    }
                                }
                            }
                        });
                    }); // get() trả về một word

                }
                $scope.deleteRoom = function(id) {
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Remove Room!',
                        content: `Are you sure to delete this Room ?`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Yes',
                                btnClass: 'btn-danger btn-sm',
                                action: function(scope, button) {
                                    objectService.Room.delete({ id: id }, function() {
                                        objectService.Room.query(function(data) {
                                            // something
                                            scope.posts = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                btnClass: 'btn-default btn-sm',
                                action: function(scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('No'),
                    DTColumnBuilder.newColumn('name').withTitle('Name'),
                    DTColumnBuilder.newColumn('location').withTitle('Location'),
                    DTColumnBuilder.newColumn('capacity').withTitle('Capacity'),
                    DTColumnBuilder.newColumn('action').withTitle('Hành động').notSortable()
                    .renderWith(actionsHtml),
                ];

            }
        }])

}());