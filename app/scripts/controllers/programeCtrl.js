(function () {
    'use strict';
    angular
        .module('studentinfo')
        .controller('programeCtrl', ['appService', 'programeService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function (appService, programeService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
            init();

            function init() {
                console.log('programeCtrl');
                getAllPosts();
            }

            load();

            function load() {
                $scope.programes = programeService.query(function (data) {
                    console.log(data);
                    // something
                }); //query() trả về một mảng words
            }
            $scope.someClickHandler = someClickHandler;

            function someClickHandler(info) {
                var message = info._id + ' - ' + info.title;
            }

            $scope.editpost = function (post) {
                $state.go('postedit', { "id": post });
            }

            function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', nRow).unbind('click');
                $('td', nRow).bind('click', function () {
                    $scope.$apply(function () {
                        $scope.someClickHandler(aData);
                    });
                });
                return nRow;
            }

            // function

            function getAllPosts() {
                $scope.createdRow = function (row, data, dataIndex) {
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
                    DTColumnDefBuilder.newColumnDef(4),
                    DTColumnDefBuilder.newColumnDef(5).withTitle('action'),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updatePrograme('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deletePrograme('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.createPrograme = function () {
                    $scope.programe = new programeService();
                    $ngConfirm({
                        icon: 'fa fa-plus-circle',
                        theme: 'material',
                        columnClass: 'col-md-6 col-md-offset-3',
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Intake!',
                        content: `<form action="" class="form-horizontal" role="form">
                         
                            <div class="form-group">
                                <label for="speccode" class="col-sm-2 control-label">speccode</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.specCode" type="text" name="" id="speccode" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="specname" class="col-sm-2 control-label">specname</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.specName" type="text" name="" id="specname" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="rCredit" class="col-sm-2 control-label">rcredits</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.rCredit" type="text" name="" id="rCredit" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="eCredit" class="col-sm-2 control-label">eCredit</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.eCredit" type="text" name="" id="ecredit" class="form-control" value="" title="">
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success',
                                action: function (scope, button) {
                                    console.log('handler create here');
                                    console.log(scope.programe);
                                    $scope.programe.$save(function () {
                                        programeService.query(function (data) {
                                            // something
                                            scope.programes = data;
                                            console.log();
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                action: function (scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }
                $scope.updatePrograme = function (programeId) {
                    $scope.programe = programeService.get({ id: programeId }, function (data) { });
                    $ngConfirm({
                        icon: 'fa fa-pencil-square',
                        theme: 'material',
                        columnClass: 'col-md-6 col-md-offset-3',
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Update Programe!',
                        content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="speccode" class="col-sm-2 control-label">speccode</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.specCode" type="text" name="" id="speccode" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="specname" class="col-sm-2 control-label">specname</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.specName" type="text" name="" id="specname" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="rCredit" class="col-sm-2 control-label">rcredits</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.rCredit" type="text" name="" id="rCredit" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="eCredit" class="col-sm-2 control-label">eCredit</label>
                                <div class="col-sm-10">
                                    <input ng-model="programe.eCredit" type="text" name="" id="ecredit" class="form-control" value="" title="">
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Update',
                                btnClass: 'btn-success',
                                action: function (scope, button) {
                                    console.log('handler create here');
                                    console.log(scope.programe);
                                    $scope.programe.$update(function () {
                                        programeService.query(function (data) {
                                            // something
                                            scope.programes = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                action: function (scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }
                $scope.deletePrograme = function (programeId) {
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Remove Programe!',
                        content: `Are you sure to delete this Programe ?`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Yes',
                                btnClass: 'btn-danger',
                                action: function (scope, button) {
                                    programeService.delete({ id: programeId }, function () {
                                        programeService.query(function (data) {
                                            scope.programes = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                action: function (scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('specCode').withTitle('Spec Code'),
                    DTColumnBuilder.newColumn('specName').withTitle('Spec Name'),
                    DTColumnBuilder.newColumn('rCredit').withTitle('Rcredits'),
                    DTColumnBuilder.newColumn('eCredit').withTitle('Ecredits'),
                    DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                        .renderWith(actionsHtml),
                ];
            }
        }]);
    /** @ngInject */
}());