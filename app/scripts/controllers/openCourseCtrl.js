(function () {
    'use strict';

    angular
        .module('studentinfo')
        .controller('opencourseCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', function (appService, objectService, $ngConfirm, $scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

            var baseUrl = appService.baseUrl;
            init();

            function init() {
                console.log('openCourseCtrl');
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

            load();

            function load() {
                objectService.OpenCourse.query(function (data) {
                    // something
                    $scope.opencourse = data;
                });
            }


            function loadSemester() {
                $scope.Semester.availableOptions = objectService.Semester.query(function (data) {
                    console.log(data);
                    // $scope.semester = data;
                }); //query() trả về một mảng words
            }

            function loadAcademicYear() {
                $scope.AcademicYear.availableOptions = objectService.AcademicYear.query(function (data) {

                    console.log(data);
                    // $scope.academicyear = data;
                });
            }

            // function loadCourse() {
            //     $scope.Courses.availableOptions = objectService.AcademicYear.query(function (data) {

            //         console.log(data);
            //         // $scope.academicyear = data;
            //     });
            // }


            function getAllPosts() {

                $scope.createdRow = function (row, data, dataIndex) {
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
                    // DTColumnDefBuilder.newColumnDef(2),
                    // DTColumnDefBuilder.newColumnDef(3),
                    // DTColumnDefBuilder.newColumnDef(4),
                    // DTColumnDefBuilder.newColumnDef(5),
                    DTColumnDefBuilder.newColumnDef(2).withTitle('action'),
                ];
                $scope.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('No'),
                    // DTColumnBuilder.newColumn('codeName').withTitle('codeName'),
                    DTColumnBuilder.newColumn('name').withTitle('codeNumber'),
                    // DTColumnBuilder.newColumn('cost').withTitle('cost'),
                    // DTColumnBuilder.newColumn('credits').withTitle('credits'),
                    // DTColumnBuilder.newColumn('name').withTitle('name'),
                    DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                        .renderWith(actionsHtml),
                ];

                function actionsHtml(data, type, full, meta) {
                    return `<div ><button style="" class="btn btn-success btn-xs" ng-click="updateopenCourse('${full.id}')">
                         <i class="fa fa-edit"></i>
                        </button>&nbsp;
                        <button class="btn btn-danger btn-xs" ng-click="deleteopenCourse('${full.id}')">
                          <i class="fa fa-trash-o"></i>
                        </button> </div>`;
                }



                $scope.createopenCourse = function () {
                    $scope.opencourse = new objectService.OpenCourse();
                    $scope.Semester = {
                        selectedOption: null,
                        availableOptions: [
                        ]
                    };

                    $scope.AcademicYear = {
                        selectedOption: null,
                        availableOptions: [

                        ]
                    };

                    $scope.Courses = {
                        model: null,
                        availableOptions: [

                        ]
                    };

                    $scope.toptions = new Array();
                    $scope.toptions = objectService.Course.query(function () {

                    })

                    $scope.tselected = [];
                    // $scope.intake = new objectService.Intake();
                    loadSemester();
                    loadAcademicYear();
                    // loadCourse();

                    $ngConfirm({
                        useBootstrap: true,
                        columnClass: 'col-md-offset-2 col-md-10',
                        animation: 'rotateYR',
                        closeAnimation: 'rotateYR (reverse)',
                        title: 'Create Course!',
                        content: `<div class="panel panel-primary">
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="semester" class="col-sm-2 control-label">Semester:</label>
                                                        <div class="col-sm-10">
                                                            <select name="semester" id="semester" ng-options="option.name for option in Semester.availableOptions track by option.id" ng-model="Semester.selectedOption" class="form-control">
                                                    </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="academicYear" class="col-sm-2 control-label">Academic Year:</label>
                                                        <div class="col-sm-10">
                                                            <select name="academicYear" id="academicYear" ng-options="option.year for option in AcademicYear.availableOptions track by option.id" ng-model="AcademicYear.selectedOption" class="form-control">
                                                    </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <form class="form-horizontal" name="test">
                                                        <div class="form-group">
                                                            <label class="col-md-2 control-label">Subjects List:</label>
                                                            <div class="col-md-8">
                                                                <picklist name="pktest" size="20" data-picklist="" data-pick-model="tselected" data-pick-options="v.name for v in toptions"/>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`,
                        scope: $scope,
                        buttons: {
                            sayBoo: {
                                text: 'Create',
                                btnClass: 'btn-success btn-sm',
                                action: function (scope, button) {
                                    // console.log('handler create here');

                                    $scope.opencourse.semester = $scope.Semester.selectedOption.id;
                                    $scope.opencourse.academicYear = $scope.AcademicYear.selectedOption.id;

                                    console.log($scope.tselected);


                                    $scope.opencourse.courses = [];
                                    for (var index = 0; index < $scope.tselected.length; index++) {
                                        console.log($scope.tselected[index]);
                                        $scope.opencourse.courses.push(parseInt($scope.tselected[index].id));
                                    }
                                    console.log($scope.opencourse);

                                    $scope.opencourse.$save(function () {
                                        objectService.OpenCourse.query(function (data) {
                                            // something
                                            scope.opencourse = data;
                                        });
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                btnClass: 'btn-default btn-sm',
                                action: function (scope, button) {
                                }
                            }
                        }
                    });
                }

                $scope.deleteopenCourse = function (courseId) {
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
                                action: function (scope, button) {
                                    console.log('handler create here');
                                    objectService.Course.delete({ id: courseId }, function () {
                                        load();
                                    });
                                    return true; // not prevent close; / close box
                                }
                            },
                            close: {
                                text: 'Cancel',
                                btnClass: 'btn-default btn-sm',
                                action: function (scope, button) {
                                    // closes the modal
                                    console.log('cancel xoá ở đây');
                                }
                            }
                        }
                    });
                }

                $scope.updateopenCourse = function (courseId) {

                }
            }

        }])

}());

            // $scope.toptions = new Array();

            // for (var i = 0; i < 10; i++) {
            //     $scope.toptions.push({
            //         name: " display name" + i,
            //         value: "value" + i,
            //         index: i
            //     });
            // }

            // $scope.tselected = [$scope.toptions[4], $scope.toptions[5]];
