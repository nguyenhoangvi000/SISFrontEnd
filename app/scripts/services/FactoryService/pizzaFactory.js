angular.module('sbAdminApp').factory('pizzaFactory', ['$http','appService', function ($http,appService) {
    var urlBase = appService.baseUrl+"/products";
    var pizzaFactory = {};
    pizzaFactory.getAllPizzas = function () {
        return $http.get(urlBase);
    };

    pizzaFactory.getPizza = function (id) {
        return $http.get(urlBase + '/' + id);
    }
    pizzaFactory.deletePizza = function (id) {
        return $http.delete(urlBase + '/' + id);
    }
    pizzaFactory.insertPizza = function (pizza) {
        return $http.put(urlBase + '/' + pizza);
    }

    console.log(pizzaFactory);

    return pizzaFactory;
}]);