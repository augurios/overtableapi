(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('cashierHall', [
            'application.thirdparty'
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
            

                $stateProviderRef.state('cashierHall', {
                    url: '/hall/:id',                    
                    templateUrl: path.TEMPLATE+'cashierHall/cashierHall.html',
                    controller  : 'cashierHallController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Hall',bodyClass:"menuavaled cashierhall"},
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


