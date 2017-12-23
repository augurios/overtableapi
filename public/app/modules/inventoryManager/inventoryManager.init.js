(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('inventoryManager', [
            'application.thirdparty',
            'autocomplete'
        ])
        .config(['$stateProvider', 
            '$urlRouterProvider', 
            '$locationProvider', 
            '$httpProvider', 
            '$compileProvider',
            'PATHS',
            function (
                     $stateProvider,
                     $urlRouterProvider, 
                     $locationProvider, 
                     $httpProvider, 
                     $compileProvider,
                     path
                    ) 
            {  
            
            $urlRouterProviderRef = $urlRouterProvider;
            $stateProviderRef = $stateProvider;

            console.log("path service");

            console.log(path);

                $stateProviderRef.state('inventoryManager', {
                    url: '/inventory',                    
                    templateUrl: path.TEMPLATE+'inventoryManager/inventoryManager.html',
                    controller  : 'inventoryManagerController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'inventory Manager',bodyClass:"menuavaled inventorymanager"},
                    resolve: {
                        employee: auth,
                        getEmployee : ResolveEmployee
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();


