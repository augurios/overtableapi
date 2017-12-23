(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('dashboard', [
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
            

                $stateProviderRef.state('dashboard', {
                    url: '/dashboard',                    
                    //templateUrl: 'public/app/modules/dashboard/dashboard.html',
                    templateUrl: path.TEMPLATE+'dashboard/dashboard.html',
                    controller  : 'dashboardController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Dashboard',bodyClass:"dashboard"},
                    resolve: {
                        session: sessionfn,
                        //getEmployee: ResolveEmployee
                    }
                });
                sessionfn.$inject = ['SessionService','socket'];
                function sessionfn(SessionService, socket) {
                    if(navigator.onLine){
                        
                        return SessionService.loginResolver().then(function(data){ return data });
                    }
                    else{
                        
                        
                         if(!SessionService.isLoggedIn()){}
                    }
                }
                //ResolveEmployee.$inject = ['employeeprofileService'];
                //function ResolveEmployee(employeeprofileService) {
                //    if (navigator.onLine) {
                //        //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                //        return employeeprofileService.CurrentEmployee().then(function (data) { return data }); //temp
                //    }
                //    else {
                //        return employeeprofileService.CurrentEmployee().then(function (data) { return data });
                //    }

                //}
        }])
})();





