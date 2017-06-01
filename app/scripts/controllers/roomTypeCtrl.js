(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('roomTypeCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function(appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
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
                $scope.posts = objectService.RoomType.query(function(data) {
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
                    DTColumnDefBuilder.newColumnDef(2).withTitle('action'),
                ];
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('No'),
                    DTColumnBuilder.newColumn('name').withTitle('Name'),
                    DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                    .renderWith(actionsHtml),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateRoomType('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteRoomType('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.createRoomType = function() {
                    $scope.roomType = new objectService.RoomType();
                    $ngConfirm({
                        useBootstrap: true,
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Room Type!',
                        content: `<form name="intakeFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="roomType.name" type="text" name="name"id="name" class="form-control" value="" title="">
                                  
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success btn-sm',
                                action: function(scope, button) {
                                    $scope.roomType.$save(function() {
                                        objectService.RoomType.query(function(data) {
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
                $scope.updateRoomType = function(id) {
                    $scope.roomType = objectService.RoomType.get({ id: id }, function(data) {
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Room Type!',
                            content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="roomType.name" type="text" name="" id="inputName" class="form-control" value="" required="required" pattern="" title="">
                                </div>
                            </div>
                        </form>`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Update',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        scope.roomType.$update(function() {
                                            objectService.RoomType.query(function(data) {
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
                $scope.deleteRoomType = function(id) {
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Remove Room type!',
                        content: `Are you sure to delete this Intake ?`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Yes',
                                btnClass: 'btn-danger btn-sm',
                                action: function(scope, button) {
                                    objectService.RoomType.delete({ id: id }, function() {
                                        objectService.RoomType.query(function(data) {
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


            }
        }])

}());