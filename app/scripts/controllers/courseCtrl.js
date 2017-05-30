(function() {
    'use strict';

    angular
        .module('studentinfo')
        .controller('courseCtrl', ['appService', 'objectService', '$ngConfirm', '$scope', '$state', '$stateParams', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'toastr', function(appService, objectService, $ngConfirm, $scope, $state, $stateParams, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, toastr) {
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
                objectService.Course.query(function(data) {
                    $scope.Prerequisites = data.map(function(value) {
                        return { "id": value.id, label: value.codeName }
                    })
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
                    $state.go("addcourse", { add: true });
                }
                $scope.updateCourse = function(courseId) {
                    $state.go("updatecourse", { "update": courseId });
                }

                if ($stateParams.update) {
                    var courseId = $stateParams.update;
                    $scope.courseTypes = {
                        selectedOption: null,
                        availableOptions: [

                        ]
                    };

                    loadPrerequisites();
                    loadCourseType();

                    $scope.premodel = [];
                    $scope.settings = { enableSearch: true, scrollableHeight: '200px', scrollable: true };
                    $scope.saveCourse = function() {
                        $scope.course.courseType = $scope.courseTypes.selectedOption.id;
                        //   $scope.Prerequisites.model == null ? $scope.course.prerequisites = [] : $scope.course.prerequisites = $scope.Prerequisites.model;
                        $scope.course.prerequisites = $scope.premodel.map(function(value) {
                                return value.id;
                            })
                            // $scope.course.$update(function() {

                        // })
                        $http.put(appService.baseUrl + '/courses/' + courseId, $scope.course)
                            .then(function(res) {
                                    if (res.status == 200)
                                        toastr.success('Course was updated!', 'Success!', { timeOut: 2000 });
                                    else
                                        toastr.error('There an error, Check again!', 'Error!', { timeOut: 2000 });
                                },
                                function(res) {
                                    console.log(res);
                                })
                    }
                    $scope.onSelectionChanged = function() {
                        $scope.preDisplay = '';
                        $scope.premodel.map(function(selected) {
                            $scope.preDisplay += (selected.label + ', ')
                        })
                    }
                    $scope.course = objectService.Course.get({ id: courseId }, function(data) {
                        $scope.courseTypes.selectedOption = data.courseType;
                        $scope.premodel = data.prerequisites.map(function(value) {
                            return { "id": value.id, label: value.codeName }
                        })
                    });

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