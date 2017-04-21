'use strict';

angular
    .module('studentinfo')
    .controller('productCtrl', ['$scope', 'pizzaFactory', '$http',
        function ProductController($scope, pizzaFactory, $http) {

            getAll();

            function getAll() {
                console.log('ok');
                pizzaFactory.getAllPizzas()
                    .then(function(response) {
                        $scope.products = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }


            $scope.tags = [
                { text: 'just' },
                { text: 'some' },
                { text: 'cool' },
                { text: 'tags' }
            ];


            $scope.editProduct = function(id) {
                console.log('ok');
            }

            $scope.loadTags = function(query) {
                console.log(query);
                // return $http.get('/tags?query=' + query);
                return $scope.tags;
            };


            $scope.deletePizza = function(id) {
                pizzaFactory.deletePizza(id).then(function(response) {
                    console.log(response.data);
                    getAll();
                }, function(error) {
                    console.log(error);
                })
            }

            $scope.insertPizza = function() {
                var pizza = {
                    id: "23",
                    name: $scope.productName,
                    description: $scope.description,
                    quantity: $scope.quantity,
                    price: $scope.price,
                    category: $scope.category,
                    recipe: [{
                            "id": 3,
                            "name": "Chili",
                            "price": 2
                        },
                        {
                            "id": 4,
                            "name": "Pepper",
                            "price": 2.5
                        }
                    ]
                }
                $http.post('http://localhost:3000/products', pizza).then(function() {
                    $scope.products.push(pizza);
                    getAll();
                    console.log('ok');
                }, function() {

                });

            }
        }
    ]);