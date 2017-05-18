(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('catalogCtrl', ['$scope', '$ngConfirm', 'objectService', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
            function($scope, $ngConfirm, objectService, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
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
                    $('td', nRow).bind('click', function() {
                        $scope.$apply(function() {
                            $scope.someClickHandler(aData);
                        });
                    });
                    return nRow;
                }

                // function



                function getAllPosts() {
                    $scope.createdRow = function(row, data, dataIndex) {
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
                        return `<div >
                        <button class="btn btn-primary btn-xs" ng-click="catalogDetail('${full.id}')">
                          <i class="fa fa-list-alt" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-success btn-xs" ng-click="updateCatalog('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteCatalog('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                    }

                    load();

                    function load() {
                        objectService.Catalog.query(function(data) {
                            $scope.catalogs = data;
                        });
                    }
                    $scope.createCatalog = function() {
                        $ngConfirm({
                            icon: 'fa fa-plus-circle',
                            theme: 'material',
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Create Catalog!',
                            content: `<form ng-model="catalog" class="form-horizontal" role="form">
                         
                            <div class="form-group">
                                <label for="catalogname" class="col-sm-2 control-label">Catalog Name</label>
                                <div class="col-sm-10">
                                    <input ng-model="catalog.name" ng-change="textChange()" type="text" name="" id="catalogname" class="form-control" value="" title="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="catalognote" class="col-sm-2 control-label">Catalog Note</label>
                                <div class="col-sm-10">
                                    <textarea ng-model="catalog.note" type="text" name="" id="catalognote" class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                        </form>`,
                            scope: $scope,
                            buttons: {
                                create: {
                                    disabled: true,
                                    text: 'Save',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        console.log('handler create here');
                                        // console.log(scope.catalog);
                                        console.log(scope.catalog);
                                        objectService.Catalog.save(scope.catalog, function() {
                                            load();
                                            scope.catalog = null;
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
                            },
                            onScopeReady: function(scope) {
                                var self = this;
                                scope.textChange = function() {
                                    scope.catalog.name != null ?
                                        self.buttons.create.setDisabled(false) :
                                        self.buttons.create.setDisabled(true);

                                }
                            }
                        });
                    }
                    $scope.catalogDetail = function(id) {
                        $scope.courses = [];
                        objectService.Course.query(function(data) {
                            data.map(function(value, key) {
                                $scope.courses.push({ course: value, checked: false })
                            })

                            // something
                            $ngConfirm({
                                icon: 'fa fa-plus-circle',
                                theme: 'material',
                                animation: 'rotateYR',
                                closeAnimation: 'rotateYR (reverse)',
                                title: 'Add Course!',
                                contentUrl: 'views/catalog-course.html',
                                scope: $scope,
                                buttons: {
                                    sayBoo: {
                                        text: 'Save',
                                        btnClass: 'btn-success btn-sm',
                                        action: function(scope, button) {
                                            $scope.courses.map(function(value, key) {
                                                if (value.checked) {
                                                    console.log(value); // lay dc gia tri da check
                                                }
                                            })
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
                        });

                    }
                    $scope.updateCatalog = function(catalogId) {
                        console.log(catalogId);
                        $scope.catalog = objectService.Catalog.get({ id: catalogId }, function(data) {});
                        $ngConfirm({
                            icon: 'fa fa-pencil-square',
                            theme: 'material',
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
                                    <textarea ng-model="catalog.note" type="text" name="" id="catalognote" class="form-control" rows="3"></textarea>
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
                                        console.log(scope.catalog);
                                        scope.catalog.$update(function() {
                                            load();
                                            scope.catalog = null;
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

                    $scope.deleteCatalog = function(catalogId) {

                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Remove Catalog!',
                            content: `Are you sure to delete this Catalog ?`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Yes',
                                    btnClass: 'btn-danger btn-sm',
                                    action: function(scope, button) {
                                        console.log(catalogId);
                                        objectService.Catalog.delete({ id: catalogId }, function() {
                                            load();
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