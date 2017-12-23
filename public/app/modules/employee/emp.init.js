(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('welcomeEmployee', [
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
            

                $stateProviderRef.state('employeedashboard', {
                    url: '/employee',                    
                    templateUrl: path.TEMPLATE+'employee/welcome.html',
                    controller  : 'employeeWelcomeController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Welcome Employee',bodyClass:"menuavaled employeescreen"},
                    resolve: {
                        session: sessionfn,
                        employee: auth,
                        getEmployee: ResolveEmployee
                    }
                });
                sessionfn.$inject = ['SessionService'];
                function sessionfn(SessionService) {
                   // return SessionService.loginResolver().then(function(data){ return data });
                   if(navigator.onLine){

                        return SessionService.loginResolver().then(function(data){ return data });
                    }
                    else{
                        return true;
                          //if(!SessionService.isLoggedIn()){}
                    }
                }
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){

                        return empService.authEmployee().then(function(data){  return data });
                    }
                    else{
                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if (navigator.onLine) {
                        //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                        return employeeprofileService.CurrentEmployee().then(function (data) { return data }); //temp
                    }
                    else {
                        return employeeprofileService.CurrentEmployee().then(function (data) { return data });
                    }

                }

        }])
})();