(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('cashierBills', [
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
            

                $stateProviderRef.state('cashierBills', {
                    url: '/bills',                    
                    templateUrl: path.TEMPLATE+'cashierBills/cashierBills.html',
                    controller  : 'cashierBillsController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Bills',bodyClass:"menuavaled cashbills"},
                    resolve: {
                        employee: auth,
                        getEmployee: ResolveEmployee
                        
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if ($rootScope.online) {
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if ($rootScope.online) {
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();


