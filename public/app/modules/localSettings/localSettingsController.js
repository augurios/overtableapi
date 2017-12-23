(function() {
    'use strict';

    angular
        .module('localSettings')
        .controller('localSettingsController', Controller);
  
    Controller.$inject = ['$scope','$state','$rootScope','$location','toaster','$http','SessionService','localStorageService','$uibModal','PATHS','PermissionService','settingService','getEmployee','alertservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope,$location,toaster,$http,SessionService,localStorageService,$uibModal,PATHS,PermissionService, settingService,getEmployee,alertservice) {
    		console.log("controller init");
    		
    		
        	
        	$scope.allPrinters = [];
        	
        	settingService.getPrinters();
        	
            settingService.getPrinters().then(function (response) {
                //console.log("printers raw data: ",response);
                
                for(var i = 0; i < response.length; i++) {
	               
	                $scope.allPrinters.push({'device' : response[i].deviceName, 'name' : response[i].printerName});
		            
                }
                
	                if(localStorage.getItem("currentPrinters")) {
		        	
			        	$scope.currentPrinters = JSON.parse(localStorage.getItem("currentPrinters"));;
			        	console.log('printers from local: ',$scope.currentPrinters);
			        	
		        	} else {
			        	$scope.currentPrinters = {};
		        	}
                
                
                //alert(localStorage.getItem("currentShiftid"))
            }, function (err) { });
            
            $scope.saveSettings = function() {
	            console.log(typeof $scope.currentPrinters, $scope.currentPrinters);
	            localStorage.setItem("currentPrinters", JSON.stringify($scope.currentPrinters));
	            
	            alertservice.showAlert('error', "success", "Settings Saved");
            }
              		
    }
})();