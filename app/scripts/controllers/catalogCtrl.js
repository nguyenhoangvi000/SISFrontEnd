(function () {
    'use strict';
    angular
        .module('studentinfo')
        .controller('catalogCtrl', ['$scope', '$ngConfirm', 'catalogService', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
            function ($scope, $ngConfirm, catalogService, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
                init();

                function init() {
                    console.log('catalogCtrl');
                    getAllPosts();

                }
                $scope.someClickHandler = someClickHandler;

                function someClickHandler(info) {
                    var message = info._id + ' - ' + info.title;
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

                $scope.updateCatalog = function (catalogId) {
                    console.log(catalogId);
                    $scope.catalog = catalogService.get({ id: catalogId }, function (data) { });
                    $ngConfirm({
                        icon: 'fa fa-pencil-square',
                        theme: 'material',
                        columnClass: 'col-md-6 col-md-offset-3',
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Update Catalog!',
                        content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="catalogname" class="col-sm-2 control-label">Catalog Name</label>
                                <div class="col-sm-10">
                                    <input ng-model="catalog.name" type="text" name="" id="catalogname" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="catalogcode" class="col-sm-2 control-label">Catalog Code</label>
                                <div class="col-sm-10">
                                    <input ng-model="catalog.note" type="text" name="" id="catalogcode" class="form-control" value="" title="">
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
                                    console.log(scope.catalog);
                                    scope.catalog.$update(function () {
                                        catalogService.query(function (data) {
                                            // something
                                            scope.catalogs = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                action: function (scope, button) {
                                    // closes the modal

                                }
                            }
                        }
                    });
                }


                function getAllPosts() {
                    $scope.createdRow = function (row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                    }
                    $scope.posts = [];
                    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withOption('createdRow', $scope.createdRow)
                        .withOption('rowCallback', rowCallback)

                    $scope.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3).withTitle('action'),
                    ];

                    function actionsHtml(data, type, full, meta) {
                        return `<div ><button style="" class="btn btn-xs" ng-click="updateCatalog('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-xs" ng-click="deleteCatalog('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                    }

                    catalogService.query(function (data) {
                        // something
                        $scope.catalogs = data;
                        $scope.catalog = {};
                        console.log();
                    });

                    $scope.createCatalog = function () {
                        $ngConfirm({
                            icon: 'fa fa-plus-circle',
                            theme: 'material',
                            columnClass: 'col-md-6 col-md-offset-3',
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Create Catalog!',
                            content: `<form ng-model="catalog" class="form-horizontal" role="form">
                         
                            <div class="form-group">
                                <label for="catalogname" class="col-sm-2 control-label">Catalog Name</label>
                                <div class="col-sm-10">
                                    <input ng-model="catalog.name" type="text" name="" id="catalogname" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="catalognote" class="col-sm-2 control-label">Catalog Note</label>
                                <div class="col-sm-10">
                                    <input ng-model="catalog.note" type="text" name="" id="catalognote" class="form-control" value="" title="">
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
                                        // console.log(scope.catalog);
                                        console.log(scope.catalog);
                                        catalogService.save(scope.catalog, function () {
                                            catalogService.query(function (data) {
                                                // something
                                                scope.catalogs = data;
                                                scope.catalog = {};
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

                                    }
                                }
                            }
                        });
                    }


                    // $scope.editCatalog = function (catalog) {
                    //     $state.go('postedit', { "id": catalog });
                    // }
                    $scope.deleteCatalog = function (catalogId) {

                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Remove Catalog!',
                            content: `Are you sure to delete this Catalog ?`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Yes',
                                    btnClass: 'btn-danger',
                                    action: function (scope, button) {
                                        console.log(catalogId);
                                        catalogService.delete({ id: catalogId }, function () {
                                            catalogService.query(function (data) {
                                                scope.catalogs = data;
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
                        DTColumnBuilder.newColumn('id').withTitle('No'),
                        DTColumnBuilder.newColumn('code').withTitle('Catalog Code'),
                        DTColumnBuilder.newColumn('name').withTitle('Catalog Name'),
                        DTColumnBuilder.newColumn('action').withTitle('Actions').notSortable()
                            .renderWith(actionsHtml),
                    ];
                }
            }
        ]);
    /** @ngInject */
}());