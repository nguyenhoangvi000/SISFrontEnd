(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('coursetypeCtrl', ['$scope', '$ngConfirm', 'objectService', 'appService', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'toastr',

            function($scope, $ngConfirm, objectService, appService, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, toastr) {
                init();

                function init() {
                    getAllPosts();

                }

                function getAllPosts() {
                    $scope.createdRow = function(row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                    }
                    $scope.posts = [];
                    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withOption('createdRow', $scope.createdRow)

                    $scope.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2).withTitle('action'),
                    ];
                    $scope.dtColumns = [
                        DTColumnBuilder.newColumn('id').withTitle('No'),
                        DTColumnBuilder.newColumn('name').withTitle('Catalog Name'),
                        DTColumnBuilder.newColumn('action').withTitle('Actions').notSortable()
                        .renderWith(actionsHtml),
                    ];

                    function actionsHtml(data, type, full, meta) {
                        return `<div >
                        <button class="btn btn-success btn-xs" ng-click="updateCourseType('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteCourseType('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                    }

                    load();

                    function load() {
                        objectService.CourseType.query(function(data) {
                            $scope.courseTypes = data;
                        });
                    }
                    $scope.createCourseType = function() {
                        $scope.courseType = new objectService.Catalog();
                        $ngConfirm({
                            icon: 'fa fa-plus-circle',
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Create Course Type!',
                            content: `<form ng-model="catalog" class="form-horizontal" role="form">
                         
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Catalog Name</label>
                                <div class="col-sm-10">
                                    <input ng-model="courseType.name" ng-change="textChange()" type="text" name="" id="name" class="form-control" value="" title="">
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
                                        $http.post(appService.baseUrl + '/course-types', scope.courseType)
                                            .then(function(res) {
                                                if (res.status == 200) {
                                                    load();
                                                    toastr.success('Success!', 'Course type was removed!', { timeOut: 2000 })
                                                } else
                                                    toastr.error('Error!', 'There an error, Check again!', { timeOut: 2000 })
                                            }, function(res) {
                                                console.log(res);
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
                            },
                            onScopeReady: function(scope) {
                                var self = this;
                                scope.textChange = function() {
                                    scope.courseType.name.length != 0 ?
                                        self.buttons.create.setDisabled(false) :
                                        self.buttons.create.setDisabled(true);

                                }
                            }
                        });
                    }

                    $scope.updateCourseType = function(id) {
                        $scope.courseType = objectService.CourseType.get({ id: id }, function(data) {});
                        $ngConfirm({
                            icon: 'fa fa-pencil-square',
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Update Catalog!',
                            content: `<form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Course Type Name</label>
                                <div class="col-sm-10">
                                    <input ng-model="courseType.name" type="text" name="" id="name" ng-change="textChange()" class="form-control" value="" title="">
                                </div>
                            </div>
                        </form>`,
                            scope: $scope,
                            buttons: {
                                update: {
                                    text: 'Update',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        $http.put(appService.baseUrl + '/course-types/' + id, scope.courseType)
                                            .then(function(res) {
                                                if (res.status == 200) {
                                                    toastr.success('Success!', 'Course type was updated!', { timeOut: 2000 })
                                                    load();
                                                } else
                                                    toastr.error('Error!', 'There an error, Check again!', { timeOut: 2000 })
                                            }, function(res) {
                                                console.log(res);
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
                            },
                            onScopeReady: function(scope) {
                                var self = this;
                                scope.textChange = function() {
                                    console.log(scope.courseType.name);
                                    scope.courseType.name.length != 0 ?
                                        self.buttons.update.setDisabled(false) :
                                        self.buttons.update.setDisabled(true);

                                }
                            }
                        });
                    }

                    $scope.deleteCourseType = function(id) {

                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            title: 'Remove CourseType!',
                            content: `Are you sure to delete this type ?`,
                            scope: $scope,
                            buttons: {
                                sayBoo: {
                                    text: 'Yes',
                                    btnClass: 'btn-danger btn-sm',
                                    action: function(scope, button) {

                                        try {
                                            $http.delete(appService.baseUrl + '/course-types/' + id)
                                                .then(function(res) {
                                                    if (res.status == 200) {
                                                        toastr.success('Success!', 'Course type was removed!', { timeOut: 2000 })
                                                        load();
                                                    } else
                                                        toastr.error('Error!', 'There an error, Check again!', { timeOut: 2000 })
                                                }, function(res) {
                                                    console.log(res);
                                                })
                                            return true;
                                        } catch (error) {
                                            toastr.error('Error!', 'There an error, Check again!', { timeOut: 2000 })
                                        }

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
            }
        ]);
    /** @ngInject */
}());