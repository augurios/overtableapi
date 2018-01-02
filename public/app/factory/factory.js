angular
    .module('mainServerapp')
    .factory('pathservice', ['$http', 'pouchDB', 'PATHS', '$rootScope', function ($http, pouchDB, PATHS, $rootScope) {
     var db =  pouchDB('lanapp', {adapter : 'idb'});
     var consts = {
         consts: function (callback) {
             console.log("fetching path ");
             if ($rootScope.online) {
                      $http.get('/auth/getpaths')
                      .success(function (data) {
                          console.log("constatnt data");
                          console.log(data);
                          db.put({
                             _id: 'constants',
                            paths : data
                          }).then(function (response) {
                            //console.log("response", response);
                            callback(data);
                          }).catch(function (err) {
//                            console.log("err put Paths", err);
                            callback(data);
                          });
                      })
                      .error(function (data) {
                          console.log('Error auth/paths: ' + data)
                          db.get('constants', function(err, doc) {
                            if (err) { return console.log(err); }
                              callback(doc.paths);
                          });
                      });
                    }
                    else{
                      console.log("Offline Path Fecthing")
                      db.get('constants', function(err, doc) {
                        if (err) { return console.log(err); }
                          callback(doc.paths);
                      });
                    }
                }
     }
    return consts;
}]);
(function() {
  'use strict';

  angular
    .module('mainServerapp')
    .factory('SessionService', sessionService)
    .factory('httpRequestInterceptor',httpRequestInterceptor)
    .factory('socket', socketService)
  sessionService.$inject = ['$http', '$location', '$window', 'toaster', '$q', '$state', 'pouchDB', '$rootScope', 'alertservice'];
    /* @ngInject */
  function sessionService($http, $location, $window, toaster, $q, $state, pouchDB, $rootScope, alertservice) {
      var db = pouchDB('lanapp', { adapter: 'idb' });

      var Session = {
          data: {
              role_id: ''
          },
          status: {
              status_id: 0
          },
          sessions: {
              sess: {}
          },
          getSession: function () {
              console.log("getSession method");
              if (navigator.onLine) {
                  $http.get('/auth/get_session', { cache: false })
                .success(function (data) {


                    if (typeof data.userid == "undefined" || data.userid == null || data == 0) {
                        var userIsAuthenticated = false;
                        $location.path('/login');
                    }
                    else {
                        var userIsAuthenticated = true;
                    }
                })
                  .error(function (data) {
                      var userIsAuthenticated = false;
                      $location.path('/login');
                      console.log('Error: ' + data);
                  });
              }
              else {

                  console.log("Offline Session Fecthing getSession")
                  db.get('usersess', function (err, doc) {
                      if (err) { console.log(err); $location.path('/login'); }

                      var data = doc.usermoment;
                      console.log(doc.usermoment)
                      if (typeof data.userid == "undefined" || data.userid == null || data == 0) {
                          var userIsAuthenticated = false;
                          $location.path('/login');
                      }
                      else {
                          var userIsAuthenticated = true;
                      }
                  });
              }
          },   // get session
          loginResolver: function () {
              console.log("getSession loginResolver");
              if (navigator.onLine) {
                  var deferred = $q.defer();
                  $http.get('/auth/get_session', { cache: false })
                    .success(function (data) {

                        /*db.put({
                           _id: 'usersess',
                           usermoment : data
                        }).then(function (response) {
                          console.log("response session", response);
                        }).catch(function (err) {
  //                        console.log("err put session", err);
                        });
                        */

                        db.get('usersess', function (err, doc) {
                            if (err) {
                                console.log("error on updating session on loginResolver")
                                console.log(err)
                                //since usersessoin is not found here we add the session data to pounchDB
                                db.put({
                                    _id: 'usersess',
                                    usermoment: data
                                });
                            }
                            else {

                                /*db.put({
                                  _id: 'usersess',
                                  usermoment: data
                                });*/
                                //console.log("loginResolver Else")
                                /* $http.get('/api/get/employee')
                                 .success(function(employess) {
       
                                    db.put({
                                             _id: 'employee',
                                             emplyoeedata: employess.data
                                           });
                                   deferred.resolve({success: true, data: data});
                                 })*/
                                /* db.put({
                                  _id: 'usersess',
                                  _rev: doc._rev,
                                  usermoment: data
                                });*/

                            }

                        })
                        if (data == 0 || data == null) {
                            $state.go('/login');
                            deferred.resolve({ success: false, data: null });
                        }
                        else {
                            deferred.resolve({ success: true, data: data });
                        }
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                    });
                  return deferred.promise;
              }
              else {
                  var deferred = $q.defer();
                  console.log("Offline Session Fecthing loginResolver")
                  /*db.get('usersess', function(err, doc) {
                    if (err) { return console.log(err); }
                      console.log(doc.usermoment);
                       deferred.resolve({success: true, data: doc.usermoment});
                  });*/
                  /* db.get('usersess').then(function (doc) {
                     console.log(doc.usermoment);
                     return doc.usermoment
                   }).catch(function (err) {
                     console.log(err);
                   });*/
                  //return $q.when(_db.get('usersess'));
                  /*db.get('usersess')
                    .then(function(res) {

                        return res


                    });*/
              }

          },
          rootPage: function () {
              console.log("getSession rootPage");
              var deferred = $q.defer();
              if (navigator.onLine) {
                  $http.get('/auth/get_session', { cache: false })
                .success(function (data) {
                    $http.get('/api/get/employee')
                        .success(function (employess) {
                            console.log(employess)
                            db.put({
                                _id: 'employee',
                                emplyoeedata: employess.data
                            });
                            deferred.resolve({ success: true, data: data });
                        })
                    if (data == 0 || data == null) {
                        $state.go('/login');
                        deferred.resolve({ success: false, data: null });
                    }
                    else {
                        //$state.reload();
                        deferred.resolve({ success: true, data: data });
                    }
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });
                  return deferred.promise;
              } else {
                  console.log("Offline Session Fecthing isLoggedIn")
                  console.log("Offline getSession isLoggedIn");
                  db.get('usersess', function (err, doc) {
                      if (err) { console.log(err); $state.go('/login'); return false }

                      var data = doc.usermoment;
                      console.log(doc.usermoment)
                      if (data == 0 || data == null) {
                          $state.go('/login');
                          return false
                          deferred.resolve(false);
                      }
                      else {
                          //$location.path('/dashboard');
                          return true
                          deferred.resolve(true);
                      }
                  });
              }
          },
          isLoggedIn: function () {
              console.log("getSession isLoggedIn");
              if (navigator.onLine) {
                  var deferred = $q.defer();
                  $http.get('/auth/get_session', { cache: false })
                    .success(function (data) {

                        if (data == 0 || data == null) {
                            $state.go('/login');
                            deferred.resolve(false);
                        }
                        else {
                            //$location.path('/dashboard');
                            deferred.resolve(true);
                        }
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                    });
                  return deferred.promise;
              }
              else {

                  console.log("Offline Session Fecthing isLoggedIn")
                  db.get('usersess', function (err, doc) {
                      if (err) { console.log(err); $state.go('/login'); return false }

                      var data = doc.usermoment;
                      console.log(doc.usermoment)
                      if (data == 0 || data == null) {
                          $state.go('/login');
                          return false
                          //deferred.resolve(false);
                      }
                      else {
                          $location.path('/dashboard');
                          return true
                          // deferred.resolve(true);
                      }
                  });
              }
          },
          isLoggedIn: function () {
              console.log("getSession isLoggedIn 2");
              var deferred = $q.defer();
              if (navigator.onLine) {
                  $http.get('/auth/get_session', { cache: false })
                    .success(function (data) {

                        if (data == 0 || data == null) {
                            $state.go('/login');
                            deferred.resolve(false);
                        }
                        else {
                            $location.path('/dashboard');
                            deferred.resolve(true);
                        }
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                    });
                  return deferred.promise;
              }
              else {

                  console.log("Offline Session Fecthing isLoggedIn")
                  console.log("Offline getSession isLoggedIn");
                  db.get('usersess', function (err, doc) {
                      if (err) { console.log(err); $state.go('/login'); return false }

                      var data = doc.usermoment;
                      console.log(doc.usermoment)
                      if (data == 0 || data == null) {
                          $state.go('/login');
                          return false
                          deferred.resolve(false);
                      }
                      else {
                          //$location.path('/dashboard');
                          return true
                          deferred.resolve(true);
                      }
                  });
              }
          },
          logOut: function () {
              console.log("logOut mthod")
              if (navigator.onLine) {
                  $http.post('/api/logout')
                         .success(function (data) {
                             if (data.user == null) {
                                 db.destroy().then(function (response) {
                                     // success
                                     window.location = '/';
                                     alertservice.showAlert('success', "Success", "You have successfully logged out")
                                 }).catch(function (err) {
                                     console.log(err);
                                 });
                                 /*  db.get('employee').then(function(doc) {
                                     db.remove(doc);
      
                                  }).then(function (result) {
      
                                  }).catch(function (err) {
                                    console.log(err);
      
                                  });
      
                                  db.get('usersess').then(function(doc) {
                                        db.remove(doc);
                                         $state.go('/login');
                                      }).then(function (result) {
                                         $state.go('/login');
                                      }).catch(function (err) {
                                        console.log(err);
                                         $state.go('/login');
                                      });*/

                                 // $location.path('/login'); // fix for refresh

                             }
                         })
                         .error(function (data) {
                             console.log('Error: ' + data);
                         });
              }
              else {

                  db.get('employee').then(function (doc) {
                      db.remove(doc);

                  }).then(function (result) {

                  }).catch(function (err) {
                      console.log(err);

                  });
                  db.get('usersess').then(function (doc) {
                      db.remove(doc);

                      window.location = '/';
                      alertservice.showAlert('success', "Success", "You have successfully logged out")
                  }).then(function (result) {
                      window.location = '/';
                      alertservice.showAlert('success', "Success", "You have successfully logged out")
                  }).catch(function (err) {
                      console.log(err);
                      window.location = '/';
                      alertservice.showAlert('success', "Success", "You have successfully logged out")
                  });

              }
          },// log out everyone
          userInfo: function (callback) {
              console.log("logOut mthod")
              if (navigator.onLine) {
                  $http.get('/auth/get_session', { cache: false })
                .success(function (data) {
                    return callback(data);
                })
                  .error(function (data) {
                      var userIsAuthenticated = false;
                      $location.path('/login');
                      console.log('Error: ' + data);
                  });
              } else {

                  console.log("Offline Session Fecthing isLoggedIn")
                  db.get('usersess', function (err, doc) {
                      if (err) { console.log(err); $state.go('/login'); return false }

                      var data = doc.usermoment;
                      console.log(doc.usermoment)
                      if (data == 0 || data == null) {
                          $state.go('/login');
                          return false
                          //deferred.resolve(false);
                      }
                      else {
                          $location.path('/dashboard');
                          return true
                          // deferred.resolve(true);
                      }
                  });
              }
          }
      };

      return Session;

  }//fn session service

    httpRequestInterceptor.$inject = ['$rootScope','localStorageService'];
    /* @ngInject */
    function httpRequestInterceptor($rootScope,localStorageService) {
      return {
         request: function($config) {
             $config.headers['x-access-token'] = localStorageService.get('_meanLanApp');
          return $config;
        }
      }
    }//fn httpRequestInterceptor service

    socketService.$inject = ['$rootScope'];
    function socketService($rootScope) {
      var socket = io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          })
        },
      };
    }

})()

angular
.module('mainServerapp').factory('PermissionService', ['$http', '$uibModal', '$location', '$state', '$window', 'toaster', 'alertservice', function ($http, $uibModal, $location, $state, $window, toaster, alertservice) {

var permissionModule = {
    checkPermission: function (data) {
        //var params = { pos : $location.$$path}
        var urlRq = typeof data == "undefined" ? $location.$$path : data
        var params = { pos : urlRq }
        var promise = $http.post('/api/v1/check_permission',params)
          .then(function (response) {

            if(response.data == 1){
              return true
            }
            else{
                alertservice.showAlert("error", "Unauthenticated access", "You are not permitted.")
              $state.go('404')
            }

        });
    }
}
return permissionModule;
}]);


(function () {
  'use strict';
  angular
    .module('mainServerapp')
    .factory('translationService', translationService);
  /* @ngInject */
  translationService.$inject = ['$window'];
  function translationService($window) {
    var langKey;
    var Service = {
      get: get,
      set: set,
      put: put
    };

    return Service;

    function get(name) {
      if (!langKey) {
        langKey = $window.localStorage.getItem(name);
      }

      return langKey;
    }

    function set(name, value) {
      var isoCode;

      if (!value || value === '') {
        value = 'en';
      }
      isoCode = value;
      langKey = value;
      // $window.moment.locale(isoCode);
      $window.localStorage.setItem(name, value);
    }

    function put(name, value) {
      var isoCode;

      if (!value || value === '') {
        value = 'en';
      }
      isoCode = value;
      langKey = value;
      // $window.moment.locale(isoCode);
      $window.localStorage.setItem(name, value);
    }
  }
})();

angular
    .module('mainServerapp')
    .factory('dataservice',['$http','pouchDB','breeze','$timeout', dataserviceFn])

    function dataserviceFn($http,pouchDB,breeze,$timeout) {

        // convert server PascalCase property names to camelCase
        breeze.NamingConvention.camelCase.setAsDefault();

        // create a new manager talking to sample service
        var host="http://sampleservice.breezejs.com";
        var serviceName = host+"/api/todos";
        var manager = new breeze.EntityManager(serviceName);



        var service = {
          getAllTodos: getAllTodos,
          save: save,
          reset: reset
        };
        return service;

        /*** implementation ***/

        function getAllTodos() {
          console.log("Getting Todos");
          return breeze.EntityQuery.from("Todos")
                .using(manager).execute()
                .then(success)
                .catch(function(error){ opFailed('Get Todos', error)} );

          function success(data) {
              console.log("Retrieved " + data.results.length);
              return data.results;
          }
        }

        function opFailed(operation, error){
          console.log(operation + " failed: \n"+error);
          throw error; // re-throw so next in promise chain sees it
        }

        function save(){
          var changeCount = manager.getChanges().length;
          var msg = (save)
            ? "Saving "+ changeCount + " change(s) ..."
            : "No changes to save";

          console.log(msg);
          return manager
            .saveChanges()
            .then( function (data) {
              console.log("Saved  " + changeCount);}
            )
            .catch(function(error) { opFailed('Save', error)} );
        }

        function reset() {
          console.log("Resetting the data to initial state");
          manager.clear();

          return $http.post(serviceName + '/reset')
            .then( function (data) { console.log("Database reset");} )
            .catch(function(error) { opFailed('Database reset', error)} );

        }

    }



angular
    .module('mainServerapp')
    .factory('socket',['$rootScope', function ($rootScope) {
      var socket = io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          })
        }
      };
    }]);


angular
    .module('mainServerapp')
    .factory('configservice', ['appconfig', appconfigserviceFn])

function appconfigserviceFn() {

    var service = {
        orderStatusContants: orderStatusContants
    };

    function orderStatusContants() {
        this.New = "New"
    };

}


angular
    .module('mainServerapp')
    .factory('alertservice', ['toaster', alertserviceFn])

function alertserviceFn(toaster) {

    var service = {
        showAlert: showAlert
    };
    return service;

    /*** implementation ***/

    function showAlert(type, title, message, timeout, closeCallback) {

        var options = {
            content: message, // text of the snackbar
            style: "toast", // add a custom class to your snackbar
            htmlAllowed: true
        }

        if (timeout)
            Option.timeout = timeout;
        else
            Option.timeout = 2000;

        if (closeCallback)
            options.onClose = closeCallback // callback called when the snackbar gets closed.

        var isSnackBar = true;                                                         ;

        if (isSnackBar)
            $.snackbar(options);
        else
            toaster.pop(type, title, message);
    }
}



angular
    .module('mainServerapp')
    .factory('utilservice', ['$http','$rootScope','$q','pouchDB', utilserviceFn])

function utilserviceFn($http, $rootScope, $q, pouchDB) {

    var service = {
        idMatcher: idMatcher,
        isOnline, isOnline,
        loadShift: loadShift,
        loadRooms: loadRooms,
        printOrder: printOrder,
        loadTables: loadTables,
        loadCategory: loadCategory,
        loadIngedients: loadIngedients,
        loadSides, loadSides,
        loadProduct, loadProduct,
        loadEmployee: loadEmployee,
        getEmployees:getEmployees,
        generateGUID: generateGUID,
        getResId: getResId,
        syncInventory: syncInventory,
        syncProductInventory: syncProductInventory,
        syncIngredientsInventory: syncIngredientsInventory,
        syncINVOICES: syncINVOICES,
        syncSidesInventry: syncSidesInventry,
        syncShift: syncShift,
        addOrUpdateDocInPouchDB: addOrUpdateDocInPouchDB,
        getDocFromPouchDB: getDocFromPouchDB,
        removeDocFromPouchDB: removeDocFromPouchDB,
        setDocIntoPouchDB: setDocIntoPouchDB,
    };
    return service;


    function loadShift() {
        var _shelf = angular.copy(this);
        var db = pouchDB('lanapp', { adapter: 'idb' });
        return $q((resolve, reject) => {
            if ($rootScope.online) {
                db.get('usersess', function (err, doc) {
                    if (err) {
                        console.log("err end session ")
                        console.log(err)
                    }
                    else {
                        var datas = doc;
                        var id = doc.usermoment.employee._id;
                        console.log(doc);
                        $http.post('/api/get/getshiftWithOutLogout', { id: doc.usermoment.userid }).then(function (res) {
                            if (res.data && res.data.isopen) {
                                $rootScope.shiftOpen = true;
                                $rootScope.shift = res.data.shift;
                                localStorage.setItem('ShiftUser', JSON.stringify(res.data.shift));
                                localStorage.setItem("currentShiftid", res.data.shift.clientId);
                                function mofiyfn(isExist, catid, doctomanage, existDocument) {
                                    var time = new Date();
                                    var newDoc = existDocument || {};
                                    newDoc.shiftdata = doctomanage;
                                    newDoc.lastupdatetime = time;
                                    newDoc._id = catid;
                                    newDoc.lastsynctime = time;
                                    return newDoc;
                                }
                                console.log(_shelf);    
                                _shelf.addOrUpdateDocInPouchDB('CurrentShift', res.data.shift, mofiyfn)
                                resolve(true);
                            } else
                                resolve(false);
                        }, function (res) {
                            console.log();
                        });
                    }
                });
            } else {
                db.get('CurrentShift').then(function (existDocument) {
                    var shiftdata = existDocument.shiftdata;
                    localStorage.setItem('ShiftUser', JSON.stringify(shiftdata));
                    localStorage.setItem("currentShiftid", shiftdata.clientId);
                    resolve(true);
                });
            }
        });
    }

    function loadRooms() {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        return $q((resolve, reject) => {
            if ($rootScope.online) {
                db.get('usersess', function (err, doc) {
                    if (err) {
                        console.log("err end session ")
                        console.log(err)
                    }
                    else {
                        var datas = doc;
                        var id = doc.usermoment.employee._id;
                        console.log(doc);
                        $http.post('/api/room/getrooms', { id: doc.usermoment.userid }).then(function (res) {
                            if (res.data) {
                                $rootScope.restoRooms = res.data;
                                db.get('Rooms').then(function (existDocument) {
                                    console.log(existDocument);
                                    existDocument.docdata = res.data;
                                    db.put(existDocument).then(function () {
                                        console.log("Doc updated in poch Db\n for  exisinng doc");
                                        resolve(res.data);
                                    }).catch(function (err) {
                                        console.log("Error while updating Data to poch Db\n");
                                        console.log(err);
                                        reject(err);
                                    });
                                }).catch(function (err) {
                                    if (err && err.status == 404) {
                                        var doc = {
                                            _id: 'Rooms',
                                            docdata: res.data
                                        }
                                        db.put(doc).then(function () {
                                            console.log("Doc updated in poch Db\n");
                                            resolve(res.data);
                                        }).catch(function (err) {
                                            console.log("Error while updating Data to poch Db\n");
                                            console.log(err);
                                            reject(err);
                                        });
                                    }
                                });
                            }
                        }, function (res) {
                            console.log();
                        });
                    }
                });
            } else {
                db.get('Rooms').then(function (existDocument) {
                    resolve(existDocument.docdata);
                });
            }
        });
    }

    function loadTables() {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        return $q((resolve, reject) => {
            if ($rootScope.online) {
                db.get('usersess', function (err, doc) {
                    if (err) {
                        console.log("err end session ")
                        console.log(err)
                    }
                    else {
                        var datas = doc;
                        var id = doc.usermoment.employee._id;
                        console.log(doc);
                        $http.get('/api/get/tables', '').then(function (res) {
                            db.get('Tables').then(function (existDocument) {
                                console.log(existDocument);
                                existDocument.docdata = res.data;
                                db.put(existDocument).then(function () {
                                    console.log("Doc updated in poch Db\n for  exisinng doc");
                                    resolve(res.data);
                                }).catch(function (err) {
                                    console.log("Error while updating Data to poch Db\n");
                                    console.log(err);
                                    reject(err);
                                });
                            }).catch(function (err) {
                                if (err && err.status == 404) {
                                    var doc = {
                                        _id: 'Tables',
                                        docdata: res.data
                                    }
                                    db.put(doc).then(function () {
                                        console.log("Doc updated in poch Db\n");
                                        resolve(res.data);
                                    }).catch(function (err) {
                                        console.log("Error while updating Data to poch Db\n");
                                        console.log(err);
                                        reject(err);
                                    });
                                }
                            });
                        }, function (apierr) {
                            console.log('Error getting all tables');
                        });
                    }
                });
            } else {
                db.get('Tables').then(function (existDocument) {
                    resolve(existDocument.docdata);
                });
            }
        });
    }

    function generateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return "CUSTOM-GENERETED-ID-" + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    function getResId() {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        return $q((resolve, reject) => {
            db.get('usersess', function (err, doc) {
                if (err) {
                    console.log("err end session ")
                    console.log(err)
                }
                else {
                    var datas = doc;
                    var id = doc.usermoment.employee.restaurant; //changed for solving inventory not listed
                    localStorage.setItem("resId", id);
                    resolve(id);
                }
            });
        });
        /*** implementation ***/
    }

    function triggerCB(pro, count, data) {
        // if (count == 4) {
        pro(data);
        // }
    }

    function restorModfiyfn(isExist, catid, doctomanage, existDocument) {
        var time = new Date();
        if (isExist) {
            existDocument.docdata = doctomanage;
            existDocument.lastupdatetime = time;
            existDocument.lastsynctime = time;
        } else {
            existDocument = {
                _id: catid,
                docdata: doctomanage,
                lastupdatetime: time,
                lastsynctime: time
            }
        }
        return existDocument;
    }

    function loadSides() {
        var _self = this;
        return $q((resolve, reject) => {
            _self.getResId().then(function (resid) {
                $http.post('/api/get/Sides', { id: resid }).then(function (res) {
                    _self.addOrUpdateDocInPouchDB('Sides', res.data, restorModfiyfn).then(function (localreponse) {
                        console.log("Sides addded successfully");
                    }).catch(function (err) {
                        console.log("error in adding Sides");
                    });
                    resolve(res.data);
                }, handleError('Error getting all users'));
            });
        });
    }

    function loadCategory() {
        var _self = this;
        return $q((resolve, reject) => {
            _self.getResId().then(function (resid) {
                $http.post('/api/get/Category', { id: resid }).then(function (res) {
                    _self.addOrUpdateDocInPouchDB('Category', res.data, restorModfiyfn).then(function (localreponse) {
                        console.log("category added successfuly");
                    }).catch(function (err) {
                        console.log("error in addinf category");
                    });
                    resolve(res.data);
                }, handleError('Error getting all users'));
            });
        });
    }

    function loadIngedients() {
        var _self = this;
        return $q((resolve, reject) => {
            _self.getResId().then(function (resid) {
                $http.post('/api/get/Ingredients', { id: resid }).then(function (res) {
                    _self.addOrUpdateDocInPouchDB('Ingredients', res.data, restorModfiyfn).then(function (localreponse) {
                        console.log("Ingredients addded successfully");
                    }).catch(function (err) {
                        console.log("error in adding Ingredients");
                    });
                    resolve(res.data);
                }, handleError('Error getting all users'));
            });
        });
    }

    function loadProduct() {
        var _self = this;
        return $q((resolve, reject) => {
            _self.getResId().then(function (resid) {
                $http.post('/api/get/Product', { id: resid }).then(function (res) {
                    _self.addOrUpdateDocInPouchDB('Product', res.data, restorModfiyfn).then(function (localreponse) {
                        console.log("Product addded successfully");
                    }).catch(function (err) {
                        console.log("error in adding Product");
                    });
                    resolve(res.data);
                }, handleError('Error getting all users'));
            });
        });
    }

    function loadInventory() {
        loadCategory();
        loadIngedients();
        loadIngedients();
        loadProduct();
    }

    function handleError() { }

    function loadEmployee() {
        //$http.get('/api/get/employee', getEmployee.restaurant).then(function (res) {
        //    $scope.Allemployee = [{ _id: -1, firstname: 'No Waiter' }];
        //    for (var i = 0; i < res.data.data.length; i++) {
        //        $scope.Allemployee.push(res.data.data[i]);
        //    }
        //}, failPayload);

        var _selfobj = this;
        console.log(_selfobj);
        return $q((resolve, reject) => {
            _selfobj.getResId().then(function (resid) {
                $http.get('/api/get/employee', { id: resid }).then(function (res) {
                    _selfobj.addOrUpdateDocInPouchDB('EMPLOYEES', res.data.data, restorModfiyfn).then(function (localreponse) {
                        console.log("Product addded successfully");
                    }).catch(function (err) {
                        console.log("error in adding Product");
                    });
                    resolve(res.data.data);
                }, handleError('Error getting all users'));
            });
        });
    }


    function getEmployees() {
        var _self1 = this;
        if (navigator.onLine)
            return _self1.loadEmployee();
        else {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('EMPLOYEES').then(function (existDocument) {
                resolve(existDocument.docdata);
            });
        }
    }

    function syncInventory() {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        var counter = 0;
        var syncData = {};

        return $q((resolve, reject) => {
            if ($rootScope.online) {

                db.get('Category').then(function (existDocument) {
                    if (!existDocument.lastupdatetime || existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/category', existDocument.docdata).then(function (response) {
                            //syncData.Category = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

                db.get('Ingredients').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/ingredients', existDocument.docdata).then(function (response) {
                            //syncData.Ingedients = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

                db.get('Sides').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/sides', existDocument.docdata).then(function (response) {
                            //syncData.Sides = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

                db.get('Product').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/product', existDocument.docdata).then(function (response) {
                            //syncData.Product = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

                db.get('CATTODELETE').then(function (existDocument) {
                    debugger;
                    if (!existDocument.lastupdatetime || existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        console.log("Cat Id to be delete");
                        console.log(existDocument.docdata);
                        for (var cnt = 0; cnt < existDocument.IDS.length; cnt++) {
                            $http.post('/api/sync/deletcategory', { id: existDocument.IDS[cnt] }).then(function (response) {
                                //syncData.Category = response.data;
                                //triggerCB(resolve, counter + 1, syncData);
                            });
                        }
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

            }
            resolve(true);
        });
    }

    function syncProductInventory() {
        return $q((resolve, reject) => {

            if ($rootScope.online) {
                var db = pouchDB('lanapp', { adapter: 'idb' });

                db.get('Product').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/product', existDocument.docdata).then(function (response) {
                            //var syncData = {};
                            //syncData.Product = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });
            }
        });
    }

    function syncIngredientsInventory() {
        return $q((resolve, reject) => {

            if ($rootScope.online) {
                var db = pouchDB('lanapp', { adapter: 'idb' });

                db.get('Ingredients').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/ingredients', existDocument.docdata).then(function (response) {
                            //var syncData = {}; var counter = 0;
                            //syncData.Ingedients = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

            }
        });
    }

    function syncSidesInventry() {
        return $q((resolve, reject) => {

            if ($rootScope.online) {
                var db = pouchDB('lanapp', { adapter: 'idb' });

                db.get('Sides').then(function (existDocument) {
                    if (existDocument.lastupdatetime > existDocument.lastsynctime) {
                        var time = new Date();
                        existDocument.lastupdatetime = time;
                        existDocument.lastsynctime = time;
                        $http.post('/api/sync/sides', existDocument.docdata).then(function (response) {
                            //syncData.Sides = response.data;
                            //triggerCB(resolve, counter + 1, syncData);
                        });
                        db.put(existDocument).then(function () {
                            console.log("Doc updated in poch Db\n for  exisinng doc");
                        }).catch(function (err) {
                            console.log("Error while updating Data to poch Db\n");
                            console.log(err);
                        });
                    }
                });

            }
        });
    }


    function syncProductInventory1() {
        if ($rootScope.online) {
            var db = pouchDB('lanapp', { adapter: 'idb' });

            db.get('Product').then(function (existDocument) {
                var time = new Date();
                existDocument.lastupdatetime = time;
                existDocument.lastsynctime = time;
                $http.post('/api/sync/productInventory', existDocument.docdata).then(function (response) {

                });
                db.put(existDocument).then(function (doctomanage) {
                    console.log("Doc updated in poch Db\n for  exisinng doc");
                   return doctomanage;
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
                });
            });
        }
    }

    function syncIngredientsInventory1() {
        if ($rootScope.online) {
            var db = pouchDB('lanapp', { adapter: 'idb' });

            db.get('Ingredients').then(function (existDocument) {
                var time = new Date();
                existDocument.lastupdatetime = time;
                existDocument.lastsynctime = time;
                $http.post('/api/sync/ingredientsInventory', existDocument.docdata).then(function (response) {

                });
                db.put(existDocument).then(function () {
                    console.log("Doc updated in poch Db\n for  exisinng doc");
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
                });
            });
        }
    }

    function syncShift() {
        alert("syncing shift");
    }

    function getInvoicesToUpdate() {
        var invToReturn =[];
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('INVOICES').then(function (invoices) {
                var invoiceList = invoices.docdata;
                for (var cnt = 0; cnt < invoiceList.length; cnt++) {
                    var singleInvoice = invoiceList[cnt];
                    if (!singleInvoice.lastupdatetime || !singleInvoice.lastsynctime ||
                        singleInvoice.lastupdatetime > singleInvoice.lastsynctime) {
                        var time = new Date();
                        singleInvoice.lastupdatetime = time;
                        singleInvoice.lastsynctime = time;
                        invoiceList[cnt] = singleInvoice;
                        invToReturn.push(singleInvoice);
                    }
                }
                invoices.docdata = invoiceList;
                if (invToReturn.length > 0)
                    db.put(invoices);
                resolve(invToReturn);
            }).catch(function (err) {
                resolve([]);
            });
        });
    }

    function getOrdersToUpdate(){
        var orderToReturn =[];
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('ORDERS').then(function (orders) {
                var ordersList = orders.docdata;
                for (var cnt1 = 0; cnt1 < ordersList.length; cnt1++) {
                    var singleOrder = ordersList[cnt1];
                    if (!singleOrder.lastupdatetime || !singleOrder.lastsynctime ||
                        singleOrder.lastupdatetime > singleOrder.lastsynctime) {
                        var time = new Date();
                        singleOrder.lastupdatetime = time;
                        singleOrder.lastsynctime = time;
                        ordersList[cnt1] = singleOrder;
                        orderToReturn.push(singleOrder);
                    }
                }
                orders.docdata = ordersList;
                if (orderToReturn.length > 0)
                    db.put(orders);
                resolve(orderToReturn);
            }).catch(function (err) {
                resolve([]);
            });
        });
    }

    function getOrdersIDToDELETE() {
        var orderToReturn = [];
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('ORDERTODELETE').then(function (orders) {
                var ordersList = orders.docdata;
                for (var cnt1 = 0; cnt1 < ordersList.length; cnt1++) {
                    var singleOrder = ordersList[cnt1];
                    if (!singleOrder.lastupdatetime || !singleOrder.lastsynctime ||
                        singleOrder.lastupdatetime > singleOrder.lastsynctime) {
                        var time = new Date();
                        singleOrder.lastupdatetime = time;
                        singleOrder.lastsynctime = time;
                        ordersList[cnt1] = singleOrder;
                        orderToReturn.push(singleOrder);
                    }
                }
                orders.docdata = ordersList;
                if (orderToReturn.length > 0)
                    db.put(orders);
                resolve(orderToReturn);
            }).catch(function (err) {
                resolve([]);
            });
        });
    }

    function getAllShiftToUpdate() {
        var allShiftToReturn = [];
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('ALLSHIFTS').then(function (orders) {
                var ordersList = orders.docdata;
                for (var cnt1 = 0; cnt1 < ordersList.length; cnt1++) {
                    var singleOrder = ordersList[cnt1];
                    if (!singleOrder.lastupdatetime || !singleOrder.lastsynctime ||
                        singleOrder.lastupdatetime > singleOrder.lastsynctime) {
                        var time = new Date();
                        singleOrder.lastupdatetime = time;
                        singleOrder.lastsynctime = time;
                        ordersList[cnt1] = singleOrder;
                        allShiftToReturn.push(singleOrder);
                    }
                }
                orders.docdata = ordersList;
                if (allShiftToReturn.length > 0)
                    db.put(orders);
                resolve(allShiftToReturn);
            }).catch(function (err) {
                resolve([]);
            });
        });
    }

    function getCurrentShiftToUpdate(){
        var currentShift =null;
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get('CurrentShift').then(function (shift) {
                if (!shift.lastupdatetime || !shift.lastsynctime ||
                    shift.lastupdatetime > shift.lastsynctime) {
                    var time = new Date();
                    shift.lastupdatetime = time;
                    shift.lastsynctime = time;
                    currentShift = shift.shiftdata;
                    db.put(shift);
                }
                resolve(currentShift);
            }).catch(function (err) {
                resolve(null);
            });;
        });
    }

    function syncINVOICES() {
        if ($rootScope.online) {
            var TBMData = {
                INVOICES: [],
                ORDERS: [],
                SHIFT: null,
                ALLSHIFT: [],
                ORDERTODELETE: []
            };
            getInvoicesToUpdate().then(function (invoices) {
                TBMData.INVOICES = invoices;
                getOrdersToUpdate().then(function (orders) {
                    TBMData.ORDERS = orders;
                    getCurrentShiftToUpdate().then(function (currentShift) {
                        TBMData.SHIFT = currentShift;
                        getAllShiftToUpdate().then(function (allshifts) {
                            TBMData.ALLSHIFT = allshifts;
                            getOrdersIDToDELETE().then(function (idToDeletes) {
                                TBMData.ORDERTODELETE = idToDeletes;
                                console.log(TBMData);
                                console.log("Start syncing bills module");
                                $http.post('/api/sync/billsModule', TBMData).then(function (res) {
                                    return res.data;
                                }, function (error) { });
                            });
                        });
                    })
                })
            })
        }
    }

    function printOrder(printObj) {
	    return $http.post('http://localhost:10086/printorder', printObj, {headers:{'Content-Type': 'text/plain'},data: printObj}).then(function (res) {
                return res.data;
            }, function(error) {
	            
            });
    }

    function addOrUpdateDocInPouchDB(id, doctomanage, mofiyfn) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        return $q((resolve, reject) => {
            db.get(id).then(function (existDocument) {
                console.log(existDocument);
                var doc = mofiyfn(true, id, doctomanage, existDocument);
                db.put(doc).then(function () {
                    console.log("Doc updated in pouch db for exisinng doc and doc id is " + id);
                    resolve(doctomanage);
                }).catch(function (err) {
                    console.log("Error while updating Data for exisinng doc and doc id is " + id);
                    console.log(err);
                    reject(err);
                });
            }).catch(function (err) {
                if (err && err.status == 404) {
                    var doc = mofiyfn(false, id, doctomanage, null);
                    db.put(doc).then(function () {
                        console.log("Update doc method -" + "Doc updated in pouch db for exisinng doc and doc id is " + id);
                        resolve(doctomanage);
                    }).catch(function (err) {
                        console.log("Update doc method -" + "Error while updating Data for exisinng doc and doc id is " + id);
                        console.log(err);
                        reject(err);
                    });
                }
            });
        });
    }

    function removeDocFromPouchDB(id) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        db.get(id).then(function (doc) {
            return db.remove(doc);
        });
    }

    function getDocFromPouchDB (id,isMandatory){
        return $q((resolve, reject) => {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            db.get(id).then(function (existDocument) {
                if (isMandatory)
                    resolve({ isFound: true, underlyingdoc: existDocument });
                else
                    resolve(existDocument);
            }).catch(function (err) {
                if (err && err.status == 404) {
                    if (isMandatory)
                        resolve({ isFound: false, underlyingdoc: null });
                    else
                        resolve({});
                } else {
                    if (isMandatory)
                        resolve({ isFound: false, underlyingdoc: null });
                    else
                        resolve({});
                }
            });
        });
    }

    function idMatcher(source, targetobj) {
        return source == targetobj.clientId || source == targetobj._id;
    }


    function setDocIntoPouchDB(id, doc) {

    }

    function isOnline() {
        return navigator.onLine;
    }

}


