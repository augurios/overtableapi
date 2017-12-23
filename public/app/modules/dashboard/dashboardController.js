(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', Controller);

    Controller.$inject = ['$scope','$state','$rootScope','$location','toaster','$http','SessionService','localStorageService','$uibModal','PATHS','PermissionService','dashboardService','$timeout','$translate','dataservice','pouchDB','alertservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, PATHS, PermissionService, dashboardService, $timeout, $translate, dataservice, pouchDB, alertservice) {

        //alertservice.showAlert('error', "Failed", "Login Failed");
        var bb= SessionService.getSession(); // get session details

        var vm = this;
        var db = pouchDB('lanapp', { adapter: 'idb' })
        vm.user = {};
        vm.disabled = false;
        vm.loader = false;
        this.auth = function(data){
            //var restaurantid = JSON.parse(localStorage.getItem('serverLan._meanLanAppSync'))[0].session.data.restaurant;
             if (data && data.length == 4) {
                 var pin = data

                vm.disabled = true;
                vm.loader = true;
                $timeout(function(){
                    if (navigator.onLine) {
                        //
                        db.get('usersess').then(function (doc) {
                            console.log(doc);
                            var obj = { pin: data, restaurantid: doc.usermoment.userid }
                            dashboardService.loginpad(obj).then(doneCallbacks, failCallbacks)
                        });


                  }
                  else{
                    db.get('employee').then(function (result) {

                        var empIds = []
                        empIds = pin


                        var filteredArray = result.emplyoeedata.filter(function(itm){
                          return empIds.indexOf(itm.pin) > -1;
                        });

                        filteredArray = {  filteredArray };

                        if(filteredArray.length <= 0){
                            alertservice.showAlert('error', "Failed", "Login Failed")
                        }
                        else{
                          if(typeof filteredArray !== "undefined" && filteredArray.filteredArray.length > 0){
                              alertservice.showAlert('success', "Done", "Login Successfully")
                            db.get('usersess', function(err, doc) {
                                  if (err) {
                                      console.log("err end session ")
                                      console.log(err)
                                  }
                                  else{
                                      console.log("Done handleSuccessLocal")
                                      //console.log(doc)

                                      var id= doc._rev;
                                      var datas = doc

                                      datas.usermoment.employee = {}
                                      /*var array = $.map(filteredArray.filteredArray[0], function(value, index) {
                                            return [value];
                                        });
                                      console.log(array)*/
                                      datas.usermoment.employee = filteredArray.filteredArray[0]

                                             db.put({
                                              _id: 'usersess',
                                              _rev: doc._rev,
                                              usermoment: datas.usermoment
                                            });

                                            // When Local session is established, set the same sesision in server via socket
                                            var syncData = {
                                                    session : true,
                                                    data : filteredArray.filteredArray[0],
                                                    syncstatus: 0
                                              }
                                     // Rootscope Deprecated

                                              if(localStorageService.get('_meanLanAppSync')){

                                                 /*var arr = [];
                                                 arr.push(localStorageService.get('_meanLanAppSync'));
                                                 arr.push([{session : syncData}])*/
                                                  var arr = [];
                                                  var arr = localStorageService.get('_meanLanAppSync');
                                                 /* if(0 in arr){
                                                  delete arr[0];

                                                  arr[0] = {session : syncData}
                                                  localStorageService.set('_meanLanAppSync',arr)
                                                  }
                                                */
                                                arr.splice(0, 0,  {session : syncData});
                                                (arr.join());
                                                localStorageService.set('_meanLanAppSync',arr)

                                              }
                                              else{
                                                  var arr = [];

                                                   arr.push({session : syncData})

                                                   localStorageService.set('_meanLanAppSync',arr)
                                                  //localStorageService.set('_meanLanAppSync',{session : syncData});
                                              }
                                    window.location= '/employee'
                                  //$location.path('/employee') // fix for refresh
                                  }

                              })

                        }
                        else{
                              alertservice.showAlert('error', "Failed", "Login Failed")
                        }
                        }
                        vm.user.auth = null
            vm.disabled = false;
            vm.loader = false;
                      // handle result
                    }).catch(function (err) {
                      console.log(err);
                      alertservice.showAlert('error', "Failed", "Login Failed")
                      vm.user.auth = null
            vm.disabled = false;
            vm.loader = false;
                    })
                  }
                },2000)
             }

        }


        function doneCallbacks(data){
          console.log(data);
          if (data.success) {
              $rootScope.connection( data.data._id);

                alertservice.showAlert('success', "Done", data.message)
                    db.get('usersess', function(err, doc) {
                       if (err) {
                            console.log("err end session ")
                            console.log(err)
                        }
                        else{
                           var datas = doc

                           datas.usermoment.employee = data.data

                           db.put({
                            _id: 'usersess',
                            _rev: doc._rev,
                            usermoment: datas.usermoment
                          });
                            var syncData = {
                                                    session : true,
                                                    data : data.data,
                                                    syncstatus: 1
                                              }

                           if(localStorageService.get('_meanLanAppSync')){
                                var arr = [];
                                // var arr = localStorageService.get('_meanLanAppSync');
                                // arr.splice(0, 0,  {session : syncData});
                                // (arr.join());
                             arr.push({session : syncData});
                                localStorageService.set('_meanLanAppSync',arr)
                                  window.location= '/employee'
                                  //$location.path('/employee') // fix for refresh
                           }
                           else{
                                var arr = [];
                                arr.push({session : syncData})
                                localStorageService.set('_meanLanAppSync',arr)
                                 window.location= '/employee'
                                  //$location.path('/employee') // fix for refresh
                           }
                        }
                    });

            }
            else{
                 vm.disabled = false;
                  vm.loader = false;
                  alertservice.showAlert('error', "Failed", data.message)
            }
           vm.user.auth = null

        }
        function failCallbacks(err){
            alertservice.showAlert('error', 'Error', err)
            console.log(err)
            vm.user.auth = null
            vm.disabled = false;
            vm.loader = false;
        }

        activateUserController()
        function activateUserController (){


        }//activateUserController

    }
})();
