(function () {
    'use strict';

    angular
        .module('welcomeEmployee')
        .controller('employeeWelcomeController', Controller);

    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'PATHS', 'PermissionService', 'empService', 'getEmployee', 'utilservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, PATHS, PermissionService, empService, getEmployee, utilservice) {

        //SessionService.getSession(); // get session details
        var vm = this;

        activateUserController()
        function activateUserController() {


        }//activateUserController

        // $scope.shiftOpen = false;

        $scope.shiftOff = function () {
            $rootScope.shift = JSON.parse(localStorage.getItem('ShiftUser'));
            var objTOSend = {
                SHID: localStorage.getItem("currentShiftid"),
                endtime: new Date()
            }
            var sokectObj = {
                ShiftId: localStorage.getItem("currentShiftid"),
                ResId: getEmployee.restaurant
            };
            console.log(objTOSend);
            $rootScope.shift.endtime = new Date();
            empService.endtShift($rootScope.shift).then(function (response) {
                console.log(response);
                //$scope.shift = response;
                $rootScope.shiftOpen = false;
                localStorage.setItem('ShiftUser', null);
                $rootScope.socket.emit('shiftClosed', sokectObj);
            }, function (err) { });
            console.log(getEmployee)
        }

        $scope.shiftOn = function () {
            var obj = {
                idsshiftopenedby: getEmployee._id,
                restaurant: getEmployee.restaurant,
                created_by: getEmployee.firstname,
                updated_by: getEmployee.firstname,
                clientId: utilservice.generateGUID()
            }
            empService.startShift(obj).then(function (response) {
                console.log(response);
                $rootScope.shift = response;
                $rootScope.shiftOpen = true;
                localStorage.setItem('ShiftUser', JSON.stringify(response));
                localStorage.setItem("currentShiftid", response.clientId);
            }, function (err) { });
            console.log(getEmployee)
        }
    }
})();