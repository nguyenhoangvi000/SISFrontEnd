
(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('categoryController', ['$scope', 'categoryFactory', categoryController])

    /** @ngInject */
    function categoryController($scope, categoryFactory) {

        getAllCategory();

        function getAllCategory() {
            console.log('ok');
            categoryFactory.getAllCategories()
                .then(function (response) {
                    $scope.categories = response.data;
                }, function (error) {
                    console.log(error);
                })
        }

    }

}());
