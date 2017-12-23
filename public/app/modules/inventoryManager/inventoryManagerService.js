(function () {
    'use strict';

    angular
        .module('inventoryManager')
        .factory('inventoryManagerService.js', serviceFn)
        .service('serviceFun', serviceFn);

    serviceFn.$inject = ['$http', 'pouchDB', 'localStorageService', '$rootScope', 'utilservice', '$q'];
    /* @ngInject */
    function serviceFn($http, pouchDB, localStorageService, $rootScope, utilservice, $q) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        var service = {};
        service.AddCategory = AddCategory;
        service.GetSides = GetSides;
        service.GetCategory = GetCategory;
        service.GetIngedients = GetIngedients;
        service.AddIngedient = AddIngedient;
        service.AddProduct = AddProduct;
        service.AddSide = AddSide;
        service.UpdateIngedient = UpdateIngedient;
        service.UpdateSide = UpdateSide;
        service.DisableIngedient = DisableIngedient;
        service.GetProducts = GetProducts;
        service.UpdateCategory = UpdateCategory;
        service.UploadImage = UploadImage;
        service.UpdateProduct = UpdateProduct;
        service.DeleteCategory = DeleteCategory;

        return service;

        /////////
        function myMapFunction(doc) {
            if (doc._id == 'usersess') {
                if (doc.usermoment.employee) {
                    emit(doc.usermoment.employee);
                } else {
                    emit(doc.name);
                }
            }
        }

        function getMapByID(doc) {
            if (doc._id == 'employee') {
                if (doc.emplyoeedata) {
                    emit(doc.emplyoeedata);
                } else {
                    emit(doc.name);
                }
            }
        }

      
        function addMofiyfn(isExist, catid, doctomanage, existDocument) {
            var time = new Date();
            if (isExist) {
                if (existDocument && existDocument.docdata) {
                    existDocument.docdata.push(doctomanage);
                } else {
                    existDocument.docdata = [doctomanage];
                }
                existDocument.lastupdatetime = time;
            } else {
                existDocument = {
                    _id: catid,
                    docdata: [doctomanage],
                    lastupdatetime: time,
                    lastsynctime: time
                }
            }
            return existDocument;
        }

        function AddCategory(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Category', data, addMofiyfn).then(function (res) {
                    utilservice.syncInventory().then(function (syncData) {
                        console.log(syncData.Category);
                    });
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddSide(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, addMofiyfn).then(function (res) {
                    // resolve(res);
                    utilservice.syncInventory().then(function (syncData) {
                        //resolve(syncData.Sides);
                    });
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddProduct(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Product', data, addMofiyfn).then(function (res) {
                    // resolve(res);
                    utilservice.syncInventory().then(function (syncData) {
                        //resolve(syncData.Product);
                    });
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddIngedient(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Ingredients', data, addMofiyfn).then(function (res) {
                    // resolve(res);
                    utilservice.syncInventory().then(function (syncData) {
                        //resolve(syncData.Ingedients);
                    });
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function updateMofiyfn(isExist, catid, doctomanage, existDocument) {
            var time = new Date();
            if (isExist) {
                existDocument.lastupdatetime = time;
                if (catid == 'Category') {
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata[i].Name = doctomanage.Name;
                        }
                    }
                } else if (catid == 'Ingredients') {
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata[i].Cost = doctomanage.Cost;
                            existDocument.docdata[i].Edits = doctomanage.Edits;
                            existDocument.docdata[i].Merma = doctomanage.Merma;
                            existDocument.docdata[i].Name = doctomanage.Name;
                            existDocument.docdata[i].Quantity = doctomanage.Quantity;
                            existDocument.docdata[i].UnitType = doctomanage.UnitType;
                            existDocument.docdata[i].message = doctomanage.message;
                        }
                    }
                }
                else if (catid == 'Sides') {
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata[i].Name = doctomanage.Name;
                            existDocument.docdata[i].Ingradients = doctomanage.Ingradients;
                        }
                    }
                }
                else if (catid == 'Product') {
                    if (doctomanage.type == "Retail") {
                        for (var i = 0; i < existDocument.docdata.length; i++) {
                            if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                                existDocument.docdata[i].Category = doctomanage.Category;
                                existDocument.docdata[i].Edits = doctomanage.Edits;
                                existDocument.docdata[i].Ingradients = doctomanage.Ingradients;
                                existDocument.docdata[i].Name = doctomanage.Name;
                                existDocument.docdata[i].ParentCategory = doctomanage.ParentCategory;
                                existDocument.docdata[i].Price = doctomanage.Price;
                                existDocument.docdata[i].Quantity = doctomanage.Quantity;
                                existDocument.docdata[i].Sides = doctomanage.Sides;
                                existDocument.docdata[i].image = doctomanage.image;
                                existDocument.docdata[i].variations = doctomanage.variations;
                            }
                        }
                    } else {
                        for (var i = 0; i < existDocument.docdata.length; i++) {
                            if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                                existDocument.docdata[i].Category = doctomanage.Category;
                                existDocument.docdata[i].Edits = doctomanage.Edits;
                                existDocument.docdata[i].Ingradients = doctomanage.Ingradients;
                                existDocument.docdata[i].Name = doctomanage.Name;
                                existDocument.docdata[i].ParentCategory = doctomanage.ParentCategory;
                                existDocument.docdata[i].Price = doctomanage.Price;
                                existDocument.docdata[i].Quantity = doctomanage.Quantity;
                                existDocument.docdata[i].Sides = doctomanage.Sides;
                                existDocument.docdata[i].image = doctomanage.image;
                                existDocument.docdata[i].variations = doctomanage.variations;
                            }
                        }
                    }
                } else {
                    throw new Error("Error in updating the data of -" + catid + " and type is not defined");
                }
            } else {
                throw new Error("Error in updating the data of -" + catid);
            }
            return existDocument;
        }

        function UpdateProduct(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Product', data, updateMofiyfn).then(function (res) {
                    utilservice.syncInventory().then(function (syncData) {
                        //resolve(res);
                    });
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateIngedient(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Ingredients', data, updateMofiyfn).then(function (res) {
                    //resolve(res);
                    utilservice.syncInventory();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateSide(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, updateMofiyfn).then(function (res) {
                    //resolve(res);
                    utilservice.syncInventory();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateCategory(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Category', data, updateMofiyfn).then(function (res) {
                    //resolve(res);
                    utilservice.syncInventory();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
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

        function GetSides() {
            return $q((resolve, reject) => {
                if ($rootScope.online) {
                    utilservice.getResId().then(function (resid) {
                        $http.post('/api/get/Sides', { id: resid }).then(function (res) {
                            utilservice.addOrUpdateDocInPouchDB('Sides', res.data, restorModfiyfn).then(function (localreponse) {
                                console.log("Sides addded successfully");
                            }).catch(function (err) {
                                console.log("error in adding Sides");
                            });
                            resolve(res.data);
                        }, handleError('Error getting all users'));
                    });
                } else {
                    db.get('Sides', function (err, doc) {
                        resolve(doc.docdata);
                    });
                }
            });
        }

        function GetCategory() {
            return $q((resolve, reject) => {
                if ($rootScope.online) {
                    utilservice.getResId().then(function (resid) {
                        $http.post('/api/get/Category', { id: resid }).then(function (res) {
                            utilservice.addOrUpdateDocInPouchDB('Category', res.data, restorModfiyfn).then(function (localreponse) {
                                console.log("category added successfuly");
                            }).catch(function (err) {
                                console.log("error in addinf category");
                            });
                            resolve(res.data);
                        }, handleError('Error getting all users'));
                    });
                } else {
                    db.get('Category', function (err, doc) {
                        resolve(doc.docdata);
                    });
                }
            });
        }

        function GetIngedients() {
            return $q((resolve, reject) => {
                if ($rootScope.online) {
                    utilservice.getResId().then(function (resid) {
                        $http.post('/api/get/Ingredients', { id: resid }).then(function (res) {
                            utilservice.addOrUpdateDocInPouchDB('Ingredients', res.data, restorModfiyfn).then(function (localreponse) {
                                console.log("Ingredients addded successfully");
                            }).catch(function (err) {
                                console.log("error in adding Ingredients");
                            });
                            resolve(res.data);
                        }, handleError('Error getting all users'));
                    });
                } else {
                    db.get('Ingredients', function (err, doc) {
                        resolve(doc.docdata);
                    });
                }
            });
        }

        function GetProducts() {
            return $q(function(resolve, reject){
                if ($rootScope.online) {
                    utilservice.getResId().then(function (resid) {
                        $http.post('/api/get/Product', { id: resid }).then(function (res) {
                            utilservice.addOrUpdateDocInPouchDB('Product', res.data, restorModfiyfn).then(function (localreponse) {
                                console.log("Product addded successfully");
                            }).catch(function (err) {
                                console.log("error in adding Product");
                            });
                            resolve(res.data);
                        }, handleError('Error getting all users'));
                    });
                } else {
                    db.get('Product', function (err, doc) {
                        resolve(doc.docdata);
                    });
                }
            });
        }

        function InvoiceSuccess(res) {
            return res.data;
        }
        function getInvoiceSuccess(res) {
            return res.data;
        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleSuccessLocally(res) {
            return res.data.data[0];
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        function UploadImage(data) {
            return $http.post('/api/v1/uploadImage', data).then(function (res) {

                return res;

            }, function (error) {

                return error;
            });

        }

        function DeleteCategory(doctomanage,subids) {
            var db = pouchDB('lanapp', { adapter: 'idb' });
            return $q(function(resolve, reject) {
                db.get('Category').then(function (existDocument) {
                    console.log(existDocument);
                    existDocument.lastupdatetime = new Date();
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata.splice(i, 1)
                        }
                    }

                    console.log(utilservice);
                    function mofiyfn(isExist, catid, doctomanage, existDocument) {
                        var time = new Date();
                        var newDoc = existDocument || {};
                        
                        newDoc.IDS = newDoc.IDS || [];

                        if (newDoc.IDS.length > 0) {
                            var even = _.find(newDoc.IDS, function (num) { return num == doctomanage });
                            if (!even) {
                                newDoc.IDS.push(doctomanage);
                            }
                            for (var i = 0; i < subids.length; i++) {
                                var even = _.find(newDoc.IDS, function (num) { return num == subids[i] });
                                if (!even) {
                                    newDoc.IDS.push(subids[i]);
                                }
                            }
                            //for (var j = 0; j < newDoc.IDS.length; i++) {
                             //   if (newDoc.IDS[j] == doctomanage) { }
                             //   else {
                             //       newDoc.IDS.push(doctomanage);
                             //   }
                             ///   for (var i = 0; i < subids.length; i++) {
                             //       if (newDoc.IDS[j] == subids[i]) {
                             //       }
                             ////       else {
                             //           newDoc.IDS.push(subids[i]);
                             //       }
                            //    }
                          //  }
                        } else {
                            newDoc.IDS.push(doctomanage);
                            for (var i = 0; i < subids.length; i++) {
                                newDoc.IDS.push(subids[i]);
                            }
                        }
                        console.log(newDoc.IDS)
                        newDoc.lastupdatetime = time;
                        newDoc._id = catid;
                        //newDoc.lastsynctime = time;
                        return newDoc;
                    }

                    utilservice.addOrUpdateDocInPouchDB('CATTODELETE', doctomanage.clientId, mofiyfn).then(function () {
                        utilservice.syncInventory();
                    });
                   
                    db.put({_id: 'Category',
                      _rev: existDocument._rev,
                      docdata: existDocument.docdata}).then(function () {
                        console.log("Doc updated in poch Db\n for  exisinng doc");
                        utilservice.syncInventory();
                        resolve(doctomanage);
                    }).catch(function (err) {
                        console.log("Error while updating Data to poch Db\n");
                        console.log(err);
                        reject(err);
                    });
                })
            });
        }

        function disbaleMofiyfn(isExist, catid, doctomanage, existDocument) {
            var time = new Date();
            if (isExist) {
                existDocument.lastupdatetime = time;
                if (catid == 'Ingredients') {
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata[i].isactive = doctomanage.isactive;
                        }
                    }
                }
                else if (catid == 'Sides') {
                    for (var i = 0; i < existDocument.docdata.length; i++) {
                        if (existDocument.docdata[i].clientId == doctomanage.clientId) {
                            existDocument.docdata[i].isactive = doctomanage.isactive;
                        }
                    }
                }
            } else {
                throw new Error("Error in updating the data of -" + catid);
            }
            return existDocument;
        }

        function DisableIngedient(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Ingredients', data, updateMofiyfn).then(function (res) {
                    //resolve(res);
                    utilservice.syncInventory();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function DisableSides(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, disbaleMofiyfn).then(function (res) {
                    //resolve(res);
                    utilservice.syncInventory();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

    }
})();
