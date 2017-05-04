(function () {
    'use strict';
    angular
        .module('studentinfo')
        .controller('majorCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function (appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

            init();

            function init() {
                console.log('majorCtrl');
                getAllPosts();
            }

            load();

            function load() {
                $scope.majors = objectService.Major.query(function (data) {

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
                    DTColumnDefBuilder.newColumnDef(2).withTitle('action'),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateMajor('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteMajor('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }
                $scope.createMajor = function () {
                    $scope.Major = new objectService.Major();

                    $ngConfirm({
                        icon: 'fa fa-plus-circle',
                        theme: 'material',
                        columnClass: 'col-md-6 col-md-offset-3',
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Major!',
                        content: `<form action="" class="form-horizontal" role="form">
                         
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">name</label>
                                <div class="col-sm-10">
                                    <input ng-model="Major.name" type="text" name="" id="name" class="form-control" value="" title="">
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
                                    console.log(scope.Major);
                                    $scope.Major.$save(function () {
                                        objectService.Major.query(function (data) {

                                            // something
                                            scope.majors = data;
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
                $scope.updateMajor = function (MajorId) {
                    $scope.Major = objectService.Major.get({ id: MajorId }, function (data) {


                        $ngConfirm({
                            icon: 'fa fa-pencil-square',
                            theme: 'material',
                            columnClass: 'col-md-6 col-md-offset-3',
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Major!',
                            content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">name</label>
                                <div class="col-sm-10">
                                    <input ng-model="Major.name" type="text" name="" id="name" class="form-control" value="" title="">
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
                                        console.log(scope.Major);

                                        $scope.Major.$update(function () {
                                            majorservice.query(function (data) {
                                                // something
                                                scope.majors = data;
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
                    })
                    $scope.deleteMajor = function (MajorId) {
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Remove Major!',
                            content: `Are you sure to delete this Major ?`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Yes',
                                    btnClass: 'btn-danger',
                                    action: function (scope, button) {
                                        objectService.Major.delete({ id: MajorId }, function () {
                                            objectService.Major.query(function (data) {

                                                scope.majors = data;
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
                        DTColumnBuilder.newColumn('name').withTitle('Name'),
                        DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                            .renderWith(actionsHtml),
                    ];
                }
            }
        }]);
    /** @ngInject */
}());