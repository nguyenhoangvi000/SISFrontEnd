'use strict';

angular
    .module('studentinfo', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngAnimate',
        'ngTagsInput',
        'ngResource',
        'datatables',
        'datatables.scroller',
        'cp.ngConfirm',
    ])
    .run(function(DTDefaultOptions) {
        DTDefaultOptions.setLoadingTemplate('<img src="images/gears.gif">');
    })
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
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
                controller: 'studentCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/studentCtrl.js',
                            ]
                        })
                    }
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
            .state('catalog', {
                templateUrl: 'views/catalog.html',
                url: '/catalog',
                controller: 'catalogCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/catalogCtrl.js',
                            ]
                        })
                    }
                }
            })

            /**
             *  Room Type Routing
             */
            .state('roomType', { // Main room state
                templateUrl: 'views/room-type/room-type.html',
                url: '/room-type',
                controller: 'roomTypeCtrl',
                abstract: true,
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/roomTypeCtrl.js',
                                'scripts/services/FactoryService/roomTypeFactory.js'
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
                                'scripts/services/FactoryService/roomFactory.js',
                                'scripts/services/FactoryService/roomTypeFactory.js'
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