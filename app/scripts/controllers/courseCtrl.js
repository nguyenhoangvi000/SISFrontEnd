(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('courseCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function(appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
            var baseUrl = appService.baseUrl;

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
                objectService.CourseType.query(function(data) {
                    return data;
                }); //query() trả về một mảng words
            }

            function loadCourseType() {
                $scope.courseTypes.availableOptions = objectService.CourseType.query(function(data) {
                    console.log(data);
                }); //query() trả về một mảng words
            }

            function getAllPosts() {
                $scope.createdRow = function(row, data, dataIndex) {
                    $compile(angular.element(row).contents())($scope);
                }
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
                $scope.createCourse = function() {
                    $scope.course = new objectService.Course();
                    $scope.courseTypes = {
                        selectedOption: null,
                        availableOptions: [

                        ]
                    };
                    loadCourseType();
                    $ngConfirm({
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Course!',
                        columnClass: 'col-md-6 col-md-offset-3',
                        content: `<form name="courseFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputCode" class="col-sm-2 control-label">CodeName:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.codeName" type="text" name="codeName" required id="codeName" class="form-control" value="" title="">
                                     <div ng-show="courseFromCreate.code.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.code.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="codeNumber" class="col-sm-2 control-label">CodeNumber:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.codeNumber" type="text" name="codeNumber"required id="codeNumber" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">Name:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.name" type="text" name="name"required id="name" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="credits" class="col-sm-2 control-label">Credits:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.credits" type="text" name="credits"required id="credits" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="course" class="col-sm-2 control-label">Cost:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.course" type="text" name="course"required id="course" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="courseType" class="col-sm-2 control-label">CourseType:</label>
                                <div class="col-sm-10">
                                     <select name="courseType" id="courseType" ng-options="option.name for option in courseTypes.availableOptions track by option.id" ng-model="courseTypes.selectedOption" required="" class="form-control">
                            </select>
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                        </form>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success',
                                action: function(scope, button) {
                                    $scope.course.CourseType = $scope.courseTypes.selectedOption;
                                    $scope.course.$save(function() {
                                        objectService.Course.query(function(data) {
                                            // something
                                            scope.courses = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
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
                                    btnClass: 'btn-success',
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
                    DTColumnBuilder.newColumn('codeName').withTitle('codeName'),
                    DTColumnBuilder.newColumn('codeNumber').withTitle('codeNumber'),
                    DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                    .renderWith(actionsHtml),
                ];

            }
        }])

}());