(function() {
    'use strict';
    angular
        .module('studentinfo')
        .controller('addcatalogCtrl', ['$scope', '$resource', 'appService', 'catalogService', function($scope, $resource, appService, catalogService) {
            console.log('in addcatalogCtrl');
            // console.log(catalogService);
            console.log('ok');


            $scope.addCatalog = function(catalog) {

                console.log(catalog);

                catalogService.save(catalog, function(response) {
                    // console.log(response);
                })
            }

            $scope.deleteCatalog = function() {

            }



        }])
}());