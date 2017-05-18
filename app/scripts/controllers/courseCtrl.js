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
                objectService.Course.query(function(data) {
                    // something
                    $scope.courses = data;
                });
            }

            function loadCourseType() {
                $scope.courseTypes.availableOptions = objectService.CourseType.query(function(data) {
                    console.log(data);
                }); //query() trả về một mảng words
            }

            function loadPrerequisites() {
                $scope.Prerequisites.availableOptions = objectService.Course.query(function(data) {
                    console.log(data);
                });
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
                    DTColumnDefBuilder.newColumnDef(3),
                    DTColumnDefBuilder.newColumnDef(4),
                    DTColumnDefBuilder.newColumnDef(5),
                    DTColumnDefBuilder.newColumnDef(6).withTitle('action'),
                ];
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('No'),
                    DTColumnBuilder.newColumn('codeName').withTitle('codeName'),
                    DTColumnBuilder.newColumn('codeNumber').withTitle('codeNumber'),
                    DTColumnBuilder.newColumn('cost').withTitle('cost'),
                    DTColumnBuilder.newColumn('credits').withTitle('credits'),
                    DTColumnBuilder.newColumn('name').withTitle('name'),
                    DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                    .renderWith(actionsHtml),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateCourse('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteCourse('${full.id}')">
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

                    $scope.Prerequisites = {
                        model: null,
                        availableOptions: [

                        ]
                    };

                    loadCourseType();
                    loadPrerequisites();
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
                                     <div ng-show="courseFromCreate.codeName.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.codeName.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="codeNumber" class="col-sm-2 control-label">CodeNumber:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.codeNumber" type="text" name="codeNumber"required id="codeNumber" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.codeNumber.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.codeNumber.$error.required">This field can not be null.</div>
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
                                    <input ng-model="course.credits" type="number" name="credits"required id="credits" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="course" class="col-sm-2 control-label">Cost:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.cost" type="number" name="course"required id="course" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.name.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                             <div class="form-group">
                                <label for="courseType" class="col-sm-2 control-label">Prerequisite:</label>
                                <div class="col-sm-10">
                                     <select name="ngvalueselect" class="form-control" ng-model="Prerequisites.model" multiple>
                                        <option ng-repeat="option in Prerequisites.availableOptions" ng-value="option.id">{{option.name}}</option>
                                        </select>
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
                                btnClass: 'btn-success btn-sm',
                                action: function(scope, button) {
                                    $scope.course.courseType = $scope.courseTypes.selectedOption.id;
                                    $scope.Prerequisites.model == null ? $scope.course.prerequisites = [] : $scope.course.prerequisites = $scope.Prerequisites.model;
                                    console.log($scope.course);
                                    $scope.course.$save(function() {
                                        objectService.Course.query(function(data) {
                                            scope.courses = data;
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
                $scope.updateCourse = function(courseId) {
                    $scope.courseTypes = {
                        selectedOption: null,
                        availableOptions: [

                        ]
                    };
                    $scope.Prerequisites = {
                        model: null,
                        availableOptions: [

                        ]
                    }
                    loadPrerequisites();
                    loadCourseType();
                    $scope.course = objectService.Course.get({ id: courseId }, function(data) {
                        $scope.courseTypes.selectedOption = data.courseType;
                        console.log(data);
                        $ngConfirm({
                            animation: 'rotateYR',
                            closeAnimation: 'rotateYR (reverse)',
                            columnClass: 'col-md-6 col-md-offset-3',
                            title: 'Update Course!',
                            content: `<form name="courseFromCreate" novalidate class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputCode" class="col-sm-2 control-label">CodeName:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.codeName" type="text" name="codeName" required id="codeName" class="form-control" value="" title="">
                                     <div ng-show="courseFromCreate.codeName.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.codeName.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="codeNumber" class="col-sm-2 control-label">CodeNumber:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.codeNumber" type="text" name="codeNumber"required id="codeNumber" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.codeNumber.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.codeNumber.$error.required">This field can not be null.</div>
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
                                    <input ng-model="course.credits" type="number" name="credits"required id="credits" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.name.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.credits.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="course" class="col-sm-2 control-label">Cost:</label>
                                <div class="col-sm-10">
                                    <input ng-model="course.cost" type="number" name="cost"required id="cost" class="form-control" value=""  title="">
                                    <div ng-show="courseFromCreate.cost.$touched">
                                    <div style="color: red" ng-show="courseFromCreate.cost.$error.required">This field can not be null.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="courseType" class="col-sm-2 control-label">Prerequisite:</label>
                                <div class="col-sm-10">
                                     <select size="3"  name="ngvalueselect" class="form-control" ng-model="Prerequisites.model" multiple>
                                        <option ng-repeat="option in Prerequisites.availableOptions" ng-value="option.id">{{option.name}}</option>
                                        </select>
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
                                    text: 'Update',
                                    btnClass: 'btn-success btn-sm',
                                    action: function(scope, button) {
                                        console.log('handler create here');
                                        $scope.course.courseType = $scope.courseTypes.selectedOption.id;
                                        $scope.Prerequisites.model == null ? $scope.course.prerequisites = [] : $scope.course.prerequisites = $scope.Prerequisites.model;

                                        console.log($scope.course);
                                        scope.course.$update(function() {
                                            objectService.Course.query(function(data) {
                                                load();
                                            });
                                        })
                                        return true; // not prevent close; / close box
                                    }
                                },
                                close: {
                                    btnClass: 'btn-default btn-sm',
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
                $scope.deleteCourse = function(courseId) {
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
                                    objectService.Course.delete({ id: courseId }, function() {
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

            }
        }])

}());