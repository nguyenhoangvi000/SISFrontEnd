(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('intakeCtrl', ['appService', 'intakeService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function(appService, intakeService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
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
                $scope.posts = intakeService.query(function() {
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
                    return `<div ><button style="" class="btn btn-xs" ng-click="updateIntake('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-xs" ng-click="deleteIntake('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.editpost = function(post) {
                    $state.go('postedit', { "id": post });
                }
                $scope.createIntake = function() {
                    $scope.intake = new intakeService();
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Intake!',
                        content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputCode" class="col-sm-2 control-label">Code:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.code" type="text" name="" id="inputCode" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="intake.name" type="text" name="" id="inputName" class="form-control" value=""  title="">
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success',
                                action: function(scope, button) {
                                    console.log('handler create here');
                                    $scope.intake.$save(function() {
                                        intakeService.query(function(data) {
                                            // something
                                            scope.posts = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                action: function(scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }
                $scope.updateIntake = function(intakeId) {
                    $scope.intake = intakeService.get({ id: intakeId }, function(data) {
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Intake!',
                            content: `<form action="" method="POST" class="form-horizontal" role="form">
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
                                    btnClass: 'btn-success',
                                    action: function(scope, button) {
                                        console.log('handler create here');
                                        scope.intake.$update(function() {
                                            intakeService.query(function(data) {
                                                // something
                                                scope.posts = data;
                                            });
                                        })
                                        return true; // not prevent close; / close box
                                    }
                                },
                                close: {
                                    text: 'Cancel',
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
                                btnClass: 'btn-danger',
                                action: function(scope, button) {
                                    console.log('handler create here');
                                    intakeService.delete({ id: intakeId }, function() {
                                        intakeService.query(function(data) {
                                            // something
                                            scope.posts = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
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