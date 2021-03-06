'use strict';

angular
    .module('studentinfo', [
        'oc.lazyLoad',
        'ui.router',
        'angular-loading-bar',
        'ngAnimate',
        'ngTagsInput',
        'ngResource',
        'datatables',
        'datatables.scroller',
        'cp.ngConfirm',
        'angularjs-dropdown-multiselect',
        'ngFileUpload',
        'fxpicklist',
        '720kb.datepicker',
        'toastr'
    ])
    .run(function(DTDefaultOptions) {
        DTDefaultOptions.setLoadingTemplate('<img src="images/gears.gif">');
    })



.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', 'toastrConfig', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, toastrConfig) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            progressBar: true,
            timeout: 2500,
            extendedTimeout: '1000',
            closeHtml: '<button>&times;</button>',
        });
        $urlRouterProvider.otherwise('dashboard');
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/home.html',
                controller: 'homeCtrl',
                resolve: {
                    loadMyDirectives: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [

                            ]
                        })

                    }
                }
            })
            .state('dashboard.product', {
                templateUrl: 'views/product.html',
                url: '/product',
                controller: 'productCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/productCtrl.js',
                                'scripts/controllers/categoryCtrl.js',

                            ]
                        })
                    }
                }
            })
            .state('course', {
                templateUrl: 'views/course.html',
                url: '/course',
                controller: 'courseCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/courseCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('addcourse', {
                templateUrl: 'views/addCourse.html',
                url: '/course/add',
                controller: 'addCourseCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/addCourseCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('updatecourse', {
                templateUrl: 'views/updateCourse.html',
                url: '/course/update/{update}',
                params: {
                    "update": null
                },
                controller: 'courseCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/courseCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('coursetype', {
                templateUrl: 'views/coursetype.html',
                url: '/coursetype',
                controller: 'coursetypeCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/services/FactoryService/objectService.js',
                                'scripts/services/FactoryService/courseTypeService.js',
                                'js/notify.min.js',
                                'scripts/controllers/coursetypeCtrl.js',
                                'styles/scroller.dataTables.min.css'
                            ]
                        })
                    }
                }
            })

        .state('student', {
                templateUrl: 'views/student.html',
                url: '/student',
                controller: 'studentCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/studentCtrl.js',
                                'styles/scroller.dataTables.min.css'
                            ]
                        })
                    }
                }
            })
            .state('addstudent', {
                templateUrl: 'views/addstudent.html',
                url: '/student/add',
                controller: 'addstudentCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/addstudentCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('updatestudent', {
                templateUrl: 'views/updatestudent.html',
                url: '/student/update/{id}',
                controller: 'addstudentCtrl',
                params: {
                    "id": null
                },
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/addstudentCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('addcatalog', {
                templateUrl: 'views/addCatalog.html',
                url: '/catalog/add',
                controller: 'addcatalogCtrl',
                translations: 'appService',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/services/appService.js',
                                'scripts/services/catalogService.js',
                                'scripts/controllers/addcatalogCtrl.js',
                            ]
                        })
                    },

                }
            })
            .state('programe', {
                templateUrl: 'views/programe.html',
                url: '/programe',
                controller: 'programeCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/programeCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('addMajor', {
                templateUrl: 'views/addMajor.html',
                url: '/Major/add',
                controller: 'addmajorCtrl',
                translations: 'appService',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [

                                'scripts/controllers/addmajorCtrl.js',
                            ]
                        })
                    },

                }
            })
            .state('intake', {
                templateUrl: 'views/intake.html',
                url: '/intake',
                controller: 'intakeCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/intakeCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('semester', {
                templateUrl: 'views/semester.html',
                url: '/semester',
                controller: 'semesterCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/semesterCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('opencourse', {
                templateUrl: 'views/opencourse.html',
                url: '/opencourse',
                controller: 'opencourseCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/opencourseCtrl.js',
                                // 'js/picklist.js',
                            ]
                        })
                    }
                }
            })
            .state('catalog', {
                templateUrl: 'views/catalog.html',
                url: '/catalog',
                controller: 'catalogCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/services/appService.js',
                                'scripts/services/catalogService.js',
                                'scripts/controllers/catalogCtrl.js'
                            ]
                        })
                    }
                }
            })
            .state('academicYear', { // Main room state
                templateUrl: 'views/academic-year/academic-year.html',
                url: '/academic-year',
                controller: 'academicYearCtrl',
                abstract: true,
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/academicYearCtrl.js',
                                'scripts/services/FactoryService/academicYearService.js'
                            ]
                        })
                    }
                }
            })
            .state('academicYear.add', { // Add state
                templateUrl: 'views/academic-year/academic-year-form.html',
                url: '/add',
                controller: 'addAcademicYearCtrl'
            })
            .state('academicYear.edit', { // Edit state
                templateUrl: 'views/academic-year/academic-year-form.html',
                url: '/edit/:id',
                controller: 'editAcademicYearCtrl'
            })
            .state('academicYear.list', { // View all state
                templateUrl: 'views/academic-year/academic-year-list.html',
                url: '/list',
                controller: 'listAcademicYearCtrl'
            })
            .state('academicYear.detail', { // Detail state
                templateUrl: 'views/academic-year/academic-year-detail.html',
                url: '/detail/{id}',
                controller: 'detailAcademicYearCtrl'
            })
            /**
             * End of Room Type routing
             */

        /**
         *  Room Type Routing
         */
        .state('roomType', { // Main room state
                templateUrl: 'views/room-type/room-type-list.html',
                url: '/room-type',
                controller: 'roomTypeCtrl',
                abstract: true,

                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/roomTypeCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('roomType.add', { // Add state
                templateUrl: 'views/room-type/room-type-form.html',
                url: '/add',
                controller: 'addRoomTypeCtrl'
            })
            .state('roomType.edit', { // Edit state
                templateUrl: 'views/room-type/room-type-form.html',
                url: '/edit/:id',
                controller: 'editRoomTypeCtrl'
            })
            .state('roomType.list', { // View all state
                templateUrl: 'views/room-type/room-type-list.html',
                url: '/list',
                controller: 'listRoomTypeCtrl'
            })
            .state('roomType.detail', { // Detail state
                templateUrl: 'views/room-type/room-type-detail.html',
                url: '/detail/{id}',
                controller: 'detailRoomTypeCtrl'
            })
            /**
             * End of Room Type routing
             */

        /**
         *  Room Routing
         */
        .state('room', { // Main room state
                templateUrl: 'views/room/room.html',
                url: '/room',
                controller: 'roomCtrl',
                abstract: true,
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/roomCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('major', {
                templateUrl: 'views/major.html',
                url: '/major',
                controller: 'majorCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/majorCtrl.js',
                            ]
                        })
                    }
                }
            })
            .state('room.add', { // Add state
                templateUrl: 'views/room/room-form.html',
                url: '/add',
                controller: 'addRoomCtrl'
            })
            .state('room.edit', { // Edit state
                templateUrl: 'views/room/room-form.html',
                url: '/edit/:id',
                controller: 'editRoomCtrl'
            })
            .state('room.list', { // View all state
                templateUrl: 'views/room/room-list.html',
                url: '/list',
                controller: 'listRoomCtrl'
            })
            .state('room.detail', { // Detail state
                templateUrl: 'views/room/room-detail.html',
                url: '/detail/{id}',
                controller: 'detailRoomCtrl'
            })
            /**
             * End of Room routing
             */

        .state('dashboard.table', {
            templateUrl: 'views/table.html',
            url: '/table'
        })
    }])
    .controller('homeCtrl', function() {
        console.log('in homeCtrl');
    });