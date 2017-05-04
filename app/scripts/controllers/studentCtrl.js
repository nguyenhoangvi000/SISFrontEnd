(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('studentCtrl', ['appService', 'objectService', '$scope', '$state', '$ngConfirm', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
            function(appService, objectService, $scope, $state, $ngConfirm, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
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
                    $scope.students = objectService.Student.query(function(data) {
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
                    $scope.dtColumns = [
                        DTColumnBuilder.newColumn('id').withTitle('code'),
                        DTColumnBuilder.newColumn('name').withTitle('name'),
                        DTColumnBuilder.newColumn('gender').withTitle('gender'),
                        DTColumnBuilder.newColumn('email').withTitle('email'),
                        DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                        .renderWith(actionsHtml),
                    ];

                    function actionsHtml(data, type, full, meta) {
                        return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateStudent('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteStudent('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                    }
                    $scope.updateStudent = function(studentId) {
                        $state.go('updatestudent', { "id": studentId })
                    }
                    $scope.deleteStudent = function(studentId) {
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Confirm!',
                            content: '<strong>Student</strong> sẽ bị xoá khỏi database',
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Yes',
                                    btnClass: 'btn-danger',
                                    action: function(scope, button) {
                                        console.log(studentId);
                                        //delete post with $resource
                                        objectService.Student.delete({ id: studentId }, function() {
                                            objectService.Student.query(function(data) {
                                                scope.students = data;
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

                }
            }
        ]);
    /** @ngInject */
}());