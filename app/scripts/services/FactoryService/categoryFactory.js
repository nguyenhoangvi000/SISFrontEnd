angular.module('sbAdminApp').factory('categoryFactory', ['$http', function ($http) {
    
    var urlBase = "http://localhost:3000/categories";
    var categoryFactory = {};

    categoryFactory.getAllCategories = function () {
        return $http.get(urlBase);
    };

    categoryFactory.getCategory = function (categoryid) {
        return $http.get(urlBase + '/' + categoryid);
    }
    categoryFactory.deleteCategory = function (categoryid) {
        return $http.delete(urlBase + '/' + categoryid);
    }
    categoryFactory.insertCategory = function (category) {
        return $http.put(urlBase + '/' + category);
    }

    console.log(categoryFactory);

    return categoryFactory;
}]);