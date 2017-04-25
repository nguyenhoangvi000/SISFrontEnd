(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('programeCtrl', ['$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
            function($scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
                init();

                function init() {
                    console.log('programeCtrl');
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
                        return '<div ><button style="" class="btn" ng-click="editpost(' + full._id + ')">' +
                            '   <i class="fa fa-edit"></i>' +
                            '</button>&nbsp;' +
                            '<button class="btn " ng-click="deletepost(' + full._id + ')">' +
                            '   <i class="fa fa-trash-o"></i>' +
                            '</button> </div>';
                    }
                    $scope.editpost = function(post) {
                        $state.go('postedit', { "id": post });
                    }
                    $scope.deletepost = function(post) {
                        console.log(post);
                        $scope.name = 'Sia: cheap thrills';
                    }
                    $scope.dtColumns = [
                        DTColumnBuilder.newColumn('id').withTitle('ID'),
                        DTColumnBuilder.newColumn('speccode').withTitle('Spec Code'),
                        DTColumnBuilder.newColumn('specname').withTitle('Spec Name'),
                        DTColumnBuilder.newColumn('rcredits').withTitle('Rcredits'),
                        DTColumnBuilder.newColumn('ecredits').withTitle('Ecredits'),
                        DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                        .renderWith(actionsHtml),
                    ];


                    $scope.posts = [{
                        "id": 1,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 2,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 3,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 4,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 5,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 6,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                       "id": 7,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 8,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 9,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 10,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 11,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 12,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 13,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 14,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 15,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                       "id": 16,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 17,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 18,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                       "id": 19,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }, {
                        "id": 20,
                        "speccode": "Management",
                        "specname": "Management IT",
                        "rcredits" : "65",
                        "ecredits" : "0"
                    }];
                    // var url = adminService.baseUrl + '/posts';
                    // postsFactory.query().$promise.then(function(posts){
                    //     $scope.posts = posts;
                    // })
                    // postsFactory.query(function(posts){
                    //     console.log(posts);
                    // })
                }
            }
        ]);
    /** @ngInject */
}());