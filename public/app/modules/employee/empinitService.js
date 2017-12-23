
(function () {
    'use strict';

    angular
        .module('welcomeEmployee')
        .factory('empService', serviceFn);

    serviceFn.$inject = ['$http', '$location', 'toaster', '$q', '$state', 'pouchDB', 'localStorageService', 'alertservice','utilservice'];
    /* @ngInject */
    function serviceFn($http, $location, toaster, $q, $state, pouchDB, localStorageService, alertservice, utilservice) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        var service = {};
        service.terminateEmployeeSession = endsession;
        service.authEmployee = authenticate;
        service.startShift = startShift
        service.endtShift = endtShift
        //service.authEmployeeLocal              = authenticateLocal;
        return service;

        /////////



        function endsession() {
            //return $http.post('/api/v1/authenticateemployee'}).then(handleSuccess, handleError('Error getting all users'));
            if (navigator.onLine) {
                $http.post('/api/v1/terminateempsession')
                         .success(function (data) {
                             console.log(data)
                             if (!data.data.employee) {
                                 var sessonwohe = localStorageService.get('_meanLanAppSync')
                                 console.log(sessonwohe[0])
                                 //delete sessonwohe[0];
                                 sessonwohe.splice(0, 1);
                                 //delete sessonwohe[0]["session"];
                                 console.log(sessonwohe)
                                 //arr.push(sessonwohe)
                                 localStorageService.set('_meanLanAppSync', sessonwohe)
                                 db.get('usersess', function (err, doc) {
                                     if (err) {
                                         console.log("err end session")
                                         console.log(err)
                                     }
                                     else {
                                         delete doc.usermoment.employee;
                                         var termination = doc.usermoment;
                                         //console.log("datas", doc)
                                         /* var id= doc._rev;
                                          var datas = doc
                                          doc.usermoment.employee = {}
                                          datas.usermoment = doc.usermoment
                                          console.log("datas", datas)*/
                                         db.put({
                                             _id: 'usersess',
                                             _rev: doc._rev,
                                             usermoment: termination
                                         });

                                     }

                                 })
                                 $location.path('/dashboard');
                                 alertservice.showAlert('success', "Success", "You have terminated session")
                             }
                             else {
                                 alert("Failed")
                             }
                         })
                         .error(function (data) {
                             console.log('Error: ' + data);
                         });
            }
            else {
                db.get('usersess', function (err, doc) {
                    if (err) {
                        console.log("err end session")
                        console.log(err)
                    }
                    else {

                        var sessonwohe = localStorageService.get('_meanLanAppSync')
                        console.log(sessonwohe[0])
                        //delete sessonwohe[0];
                        sessonwohe.splice(0, 1);
                        //delete sessonwohe[0]["session"];
                        console.log(sessonwohe)
                        //arr.push(sessonwohe)
                        // add flag that the user has logged out

                        localStorageService.set('_meanLanAppSync', sessonwohe)



                        delete doc.usermoment.employee;
                        var termination = doc.usermoment;
                        //console.log("datas", doc)
                        /* var id= doc._rev;
                         var datas = doc
                         doc.usermoment.employee = {}
                         datas.usermoment = doc.usermoment
                         console.log("datas", datas)*/
                        db.put({
                            _id: 'usersess',
                            _rev: doc._rev,
                            usermoment: termination
                        });
                        $location.path('/dashboard');
                        alertservice.showAlert('success', "Success", "You have terminated session")

                    }

                })
                /**/
            }
        }

        function authenticate() {
            if (navigator.onLine) {
                //alert("online entered on offline")
                var deferred = $q.defer();
                $http.get('/api/v1/authenticateemployee', { cache: false })
                  .success(function (data) {
                      console.log(data)
                      if (data.data == 0 || data.data == null) {
                          $location.path('/dashboard');
                          deferred.resolve({ success: false, data: null });
                      }
                      else {
                          deferred.resolve({ success: true, data: data });
                      }
                  }).error(function (msg, code) {
                      $location.path('/dashboard');
                      deferred.reject(msg);
                  });
                return deferred.promise;
            }
            else {

                db.get('usersess', function (err, doc) {
                    if (err) {
                        console.log("err authenticate empoyee")
                        console.log(err)
                    }
                    else {
                        console.log("check authenticate empoyee")
                        console.log(doc.usermoment.employee)

                        if (!doc.usermoment.employee) {
                            $location.path('/dashboard');
                        }
                        else {
                            return true
                            // $location.path('/employee');
                        }
                    }

                })
                /**/
            }
        }



        function handleSuccess(res) {
            return res.data;
        }

        function handleSuccessLocal(res) {
            var return_data = res.data;
            db.get('usersess', function (err, doc) {
                if (err) {
                    console.log("err end session")
                    console.log(err)
                }
                else {
                    console.log("Done handleSuccessLocal")
                    console.log(doc)
                    var id = doc._rev;
                    var datas = doc
                    datas.employee = return_data
                    db.get('usersess').then(function (doc) {
                        db.put({
                            _id: 'usersess',
                            _rev: doc._rev,
                            usermoment: datas
                        });
                        return res.data;
                    }).then(function (response) {
                    }).catch(function (err) {
                        console.log(err, "err on employee login");
                    });
                }

            })
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        
        function markInvoiceAndOrderArchive(shift) {

            return $q((resolve, reject) => {
                utilservice.getDocFromPouchDB('CurrentShift', false).then(function (shift) {
                    var invs = shift.shiftdata.invoices || [];
                    var ords = shift.shiftdata.orders || [];
                    console.log(shift);
                    utilservice.getDocFromPouchDB('INVOICES', false).then(function (invdoc) {
                        invdoc.docdata = invdoc.docdata || [];                        
                        for (var cnt = 0; cnt < invdoc.docdata.length; cnt++) {
                            for (var cnt1 = 0; cnt1 < invs.length; cnt1++) {
                                if (utilservice.idMatcher(invs[cnt1], invdoc.docdata[cnt])) {
                                    invdoc.docdata[cnt].invoiceStatus = "ARCHIVED";
                                    invdoc.docdata[cnt].lastupdatetime = new Date();;
                                }
                            }
                        }
                        db.put(invdoc).then(function (onsuccess) {
                            utilservice.getDocFromPouchDB('ORDERS', false).then(function (orddoc) {
                                orddoc.docdata = orddoc.docdata || [];
                                for (var cnt2 = 0; cnt2 < orddoc.docdata.length; cnt2++) {
                                    for (var cnt3 = 0; cnt3 < ords.length; cnt3++) {
                                        if (utilservice.idMatcher(ords[cnt3], orddoc.docdata[cnt2])) {
                                            orddoc.docdata[cnt2].status = "ARCHIVED";
                                            orddoc.docdata[cnt2].lastupdatetime = new Date();;
                                        }
                                    }
                                }
                                db.put(orddoc).then(function (onsuccess) {
                                    resolve(shift);
                                });
                            });
                        });
                    });
                });
            });
        }

        function startShift(data) {
            //return $http.post('/api/v1/createshift', data).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            function addMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.shiftdata = doctomanage
                newDoc.lastupdatetime = time;
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('CurrentShift', data, addMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    console.log(res);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function endtShift(shift) {
            //return $http.post('/api/v1/endshift', data).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            function editMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.shiftdata.endtime = time;
                newDoc.lastupdatetime = time;
                return newDoc;
            }

            function addALLSHIFTMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.docdata = newDoc.docdata || [];
                doctomanage.lastupdatetime = time;
                newDoc.docdata.push(doctomanage);
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('CurrentShift', shift, editMofiyfn).then(function (shift) {
                    utilservice.addOrUpdateDocInPouchDB('ALLSHIFTS', shift, addALLSHIFTMofiyfn).then(function (shift) {
                        markInvoiceAndOrderArchive(shift).then(function (shift) {
                            utilservice.removeDocFromPouchDB('CurrentShift');
                            utilservice.syncINVOICES();
                            resolve(shift);
                        });
                    });
                    console.log(shift);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }
})();
