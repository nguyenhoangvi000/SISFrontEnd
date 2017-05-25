(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('intakeCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function(appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
            var baseUrl = appService.baseUrl
            init();

            function init() {
                console.log('studentCtrl');
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
                $scope.posts = objectService.Intake.query(function() {
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
                    DTColumnDefBuilder.newColumnDef(3).withTitle('action'),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateIntake('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteIntake('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.createIntake = function() {
                    $scope.intake = new objectService.Intake();
                    $ngConfirm({
                        useBootstrap: true,
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Intake!',
                        content: `<form name="intakeFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputCode" class="col-sm-2 control-label">Code:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.code" type="text" name="code" required id="inputCode" class="form-control" value="" title="">
                                     <div ng-show="intakeFromCreate.code.$touched">
                                    <div style="color: red" ng-show="intakeFromCreate.code.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.name" type="text" name="name"required id="inputName" class="form-control" value=""  title="">
                                    <div ng-show="intakeFromCreate.name.$touched">
                                    <div style="color: red" ng-show="intakeFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success btn-sm',
                                action: function(scope, button) {
                                    console.log('handler create here');
                                    $scope.intake.$save(function() {
                                        objectService.Intake.query(function(data) {
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
                $scope.updateIntake = function(intakeId) {
                    $scope.intake = objectService.Intake.get({ id: intakeId }, function(data) {
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Intake!',
                            content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputCode" class="col-sm-2 control-label">Code:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.code" type="text" name="" id="inputCode" class="form-control" value="" required="required" pattern="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.name" type="text" name="" id="inputName" class="form-control" value="" required="required" pattern="" title="">
                                </div>
                            </div>
                        </form>`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Update',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        console.log('handler create here');
                                        scope.intake.$update(function() {
                                            objectService.Intake.query(function(data) {
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
                $scope.deleteIntake = function(intakeId) {
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Remove Intake!',
                        content: `Are you sure to delete this Intake ?`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Yes',
                                btnClass: 'btn-danger btn-sm',
                                action: function(scope, button) {
                                    console.log('handler create here');
                                    objectService.Intake.delete({ id: intakeId }, function() {
                                        objectService.Intake.query(function(data) {
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
                    DTColumnBuilder.newColumn('code').withTitle('Intake Code'),
                    DTColumnBuilder.newColumn('name').withTitle('Intake Name'),
                    DTColumnBuilder.newColumn('action').withTitle('Hành động').notSortable()
                    .renderWith(actionsHtml),
                ];

            }
        }])

}());