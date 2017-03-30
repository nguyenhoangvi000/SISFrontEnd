(function () {
    'use strict';
    angular
        .module('sbAdminApp')
        .controller('studentController', ['$scope', '$state', '$compile', '$timeout', '$http', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
            function ($scope, $state, $compile, $timeout, $http, $resource, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
                init();
                function init() {
                    console.log('studentController');
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

                function getAllPosts() {
                    $scope.createdRow = function (row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                    }
                    $scope.posts = [];
                    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withOption('createdRow', $scope.createdRow)
                        .withDisplayLength(5)
                        .withOption('rowCallback', rowCallback)
                        ;
                    $scope.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(4).withTitle('action'),
                    ];
                    function actionsHtml(data, type, full, meta) {
                        return '<div style="width:100px"><button class="btn" ng-click="editpost(' + full._id + ')">' +
                            '   <i class="fa fa-edit"></i>' +
                            '</button>&nbsp;' +
                            '<button class="btn " ng-click="deletepost(' + full._id + ')">' +
                            '   <i class="fa fa-trash-o"></i>' +
                            '</button> </div>';
                    }
                    $scope.editpost = function (post) {
                        $state.go('postedit', { "id": post });
                    }
                    $scope.deletepost = function (post) {
                        console.log(post);
                        $scope.name = 'Sia: cheap thrills';
                        // $ngConfirm({
                        //     animation: 'rotateYR',
                        //     closeAnimation: 'rotateYR (reverse)',
                        //     title: 'Confirm!',
                        //     content: '<strong>Bài viết</strong> sẽ bị xoá khỏi database',
                        //     scope: $scope,
                        //     buttons: {
                        //         sayBoo: {
                        //             text: 'Đồng ý',
                        //             btnClass: 'btn-danger',
                        //             action: function (scope, button) {
                        //                 scope.name = 'Booo!!';
                        //                 console.log('handler xoá ở đây');
                        //                 //delete post with $resource
                        //                 postsFactory.delete({ id: post }, function (data) {
                        //                     console.log(data);
                        //                 })
                        //                 //reload , get all posts
                        //                 postsFactory.query().$promise.then(function (posts) {
                        //                     $scope.posts = posts;
                        //                 })
                        //                 return true; // not prevent close; / close box
                        //             }
                        //         },

                        //         close: {
                        //             text: 'Hoy',
                        //             action: function (scope, button) {
                        //                 // closes the modal
                        //                 console.log('cancel xoá ở đây');
                        //             }
                        //         }
                        //     }
                        // });
                    }

                    $scope.dtColumns = [
                        DTColumnBuilder.newColumn('id').withTitle('Mã'),
                        DTColumnBuilder.newColumn('firstName').withTitle('Tiêu đề'),
                        DTColumnBuilder.newColumn('lastName').withTitle('Nội dung'),
                        DTColumnBuilder.newColumn('action').withTitle('Hành động').notSortable()
                            .renderWith(actionsHtml),
                    ];


                    $scope.posts = [{
                        "id": 860,
                        "firstName": "Superman",
                        "lastName": "Yoda"
                    }, {
                        "id": 870,
                        "firstName": "Foo",
                        "lastName": "Whateveryournameis"
                    }, {
                        "id": 590,
                        "firstName": "Toto",
                        "lastName": "Titi"
                    }, {
                        "id": 803,
                        "firstName": "Luke",
                        "lastName": "Kyle"
                    },
                    ]
                        ;
                    // var url = adminService.baseUrl + '/posts';
                    // postsFactory.query().$promise.then(function(posts){
                    //     $scope.posts = posts;
                    // })
                    // postsFactory.query(function(posts){
                    //     console.log(posts);
                    // })
                }

            }]);
    /** @ngInject */
}());