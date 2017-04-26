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
            .state('addcourse', {
                templateUrl: 'views/addCourse.html',
                url: '/addcourse',
                controller: 'addCourseCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/addCourseCtrl.js',
                                'styles/scroller.dataTables.min.css'
                            ]
                        })
                    }
                }
            })
            .state('addcoursetype', {
                templateUrl: 'views/addcoursetype.html',
                url: '/addcoursetype',
                controller: 'addcoursetypeCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'studentinfo',
                            files: [
                                'scripts/controllers/addcoursetypeCtrl.js',
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

    }])
    .controller('homeCtrl', function() {
        console.log('in homeCtrl');
    });