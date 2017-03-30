(function(){
    'use strict';

    angular
        .module('sbAdmin')
        .service('appService',()=>{
            let protocol='http';
            let host='localhost';
            let port='8080';
            this.baseUrl=`${protocol}://${host}:${port}` // http://localhost:8080  
        })
}());