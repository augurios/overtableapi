(function () {
    'use strict';

    angular
        .module('cashierBills')
        .factory('cashierBillsService.js', cashierServiceFn)
        .service('cashierBillsServiceFn', cashierServiceFn);


    cashierServiceFn.$inject = ['$http', 'pouchDB', 'localStorageService', '$rootScope', '$q', 'utilservice'];
    /* @ngInject */
    function cashierServiceFn($http, pouchDB, localStorageService, $rootScope, $q, utilservice) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        console.log("testiado fresh");
        var service = {};
        service.GetEmp = GetEmp;
        service.getPrinters = getPrinters;
        service.printInvoice = printInvoice;
        service.CurrentEmployee = CurrentEmployee;
        service.updateUser = CurrentEmployeeUpdate;
        service.GetInvoice = GetInvoice;
        //service.EditInvoice = EditInvoice;
        service.EditingTable = EditingTable;
        service.placeOrder = placeOrder;
        //service.addOrderToInvoice = addOrderToInvoice;
        //service.updateOrder = updateOrder;
        service.UpdateInvoiceStatus = UpdateInvoiceStatus;
        //service.updateOrderStatus = updateOrderStatus;
        //service.cancelOrder = cancelOrder;
        service.addSplitInvoice_updateInvoice = addSplitInvoice_updateInvoice;
        service.removeOrder = removeOrder;
        service.SplitInvoiceStatus = SplitInvoiceStatus;
        service.finishSplit = finishSplit;
        service.removeOrderFromInvoice = removeOrderFromInvoice;
        service.setQuantityForInvoice = setQuantityForInvoice;
        service.addOrderToSplittedInvoice = addOrderToSplittedInvoice;
        service.addInvoinAndOrderInShift = addInvoinAndOrderInShift;
        service.UpdateInvoiceStatusById = UpdateInvoiceStatusById;
        service.reduceInventory = reduceInventory;
        service.restoreInventory = restoreInventory;
        service.restoreProduct = restoreProduct;
        service.reduceProduct = reduceProduct;
        service.getProductPriceWithQuantity = getProductPriceWithQuantity;
        service.priceCalculation = priceCalculation;
        service.defaultInvoiceObject = defaultInvoiceObject;
        //service.generateGUID = generateGUID;
        service.restoreInvoiceToLocalDb = restoreInvoiceToLocalDb;
        service.updateSingleInvoiceToLocalDB = updateSingleInvoiceToLocalDB;
        service.addSingleInvoiceToLocalDB = addSingleInvoiceToLocalDB;
        service.isSoldOut = isSoldOut;
        service.validateProduct = validateProduct;
        service.syncInvoiceMetaData = syncInvoiceMetaData;
        service.closeInvoice = closeInvoice;
        service.getBillNo = getBillNo;
        service.addMultipleOrderInShift = addMultipleOrderInShift;
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


		function getPrinters() {
			return $http.get('http://localhost:10086/printers').then(function (res) {
                return res.data;
            }, handleError('Error Getting Printers'));
		}
		
		
		function printInvoice(data) {
			console.log(data);
			
			return $http.post('http://localhost:10086/printinvoice', data, {headers:{'Content-Type': 'text/plain'},data: data}).then(function (res) {
                return res.data;
            }, handleError('Error Printing'));
		}




        function CurrentEmployee() {

            if (navigator.onLine) {
                return $http.get('/api/v1/employeedetails').then(handleSuccessLocally, handleError('Error getting all users'));
            }
            else {

                return db.query(myMapFunction).then(function (result) {
                    return result.rows[0].key
                }).catch(function (err) {
                    console.log(err)
                });
            }

        }

        function CurrentEmployeeUpdate(data) {

            if (navigator.onLine) {
                return $http.post('/api/v1/currentemployeeUpdate', data).then(handleSuccess, handleError('Error getting all users'));
            }
            else {

                data.flag = 1;
                return db.query(getMapByID, { include_docs: true }).then(function (result) {
                    //console.log(result.rows[0].key)
                    var empIds = []
                    empIds = data._id
                    var indexed;

                    var filteredArray = result.rows[0].key.filter(function (itm) {
                        return empIds.indexOf(itm._id) > -1;
                    });

                    //console.log(filteredArray)


                    for (var i = 0, len = result.rows[0].key.length; i < len; i++) {

                        if (result.rows[0].key[i]._id == data._id) {
                            indexed = i;

                            db.get('employee').then(function (doc) {
                                var newdata = doc

                                delete doc.emplyoeedata[indexed];
                                doc.emplyoeedata[indexed] = data

                                var syncData = {
                                    edit: data._id,
                                    data: data,
                                    syncstatus: 0
                                }


                                if (localStorageService.get('_meanLanAppSync')) {
                                    // put employee data on 1st array node
                                    //localStorageService.set('_meanLanAppSync',{employeeprofile : syncData});//
                                    var arr = localStorageService.get('_meanLanAppSync');
                                    // arr.push(localStorageService.get('_meanLanAppSync'));
                                    if ("1" in arr) {
                                        delete arr[1];
                                        arr[1] = { employeeprofile: syncData }
                                    }
                                    else {
                                        arr[1] = { employeeprofile: syncData }
                                    }
                                    console.log("New struct")
                                    console.log(arr)
                                    localStorageService.set('_meanLanAppSync', arr)
                                }


                                return db.put({
                                    _id: 'employee',
                                    _rev: doc._rev,
                                    emplyoeedata: doc.emplyoeedata
                                });

                            });

                        }
                    }

                }).catch(function (err) {
                    console.log(err)
                });

                /*   db.get('employee').then(function(doc) {
                     return db.put({
                       _id: 'employee',
                       _rev: doc._rev,

                     });
                   }).then(function(response) {
                     // handle response
                   }).catch(function (err) {
                     console.log(err);
                   });*/
                //session  update
                /*db.get('usersess').then(function(doc) {
                     console.log(doc)
                     var doc_rev =  doc._rev
                     var data = doc.usermoment
                     delete doc.usermoment.employee;
                     var updataion;
                     doc.usermoment.employee = data;
                     updataion = doc.usermoment.employee

                    db.put({
                         _id: 'usersess',
                         _rev: doc_rev,
                         usermoment: updataion
                       });

                 }).then(function(response) {
                   // handle response
                    console.log(response)
                 }).catch(function (err) {
                   console.log(err);
                 });*/
            }

        }





        function GetEmp(data) {
            return $http.get('/api/get/employee', data).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function GetInvoice() {
            if ($rootScope.online)
                return $http.get('/api/get/invoice', '').then(getInvoiceSuccess, handleError('Error getting all users'));
            else {
                return utilservice.getDocFromPouchDB('INVOICES', false);
            }
        }


        function closeInvoice(clientId, iscash) {

            console.log("sending clientid -" + clientId)
            var toSend = {
                clientId: clientId,
                iscash: iscash
            };

            //return $http.post('/api/v1/closeInvoice', toSend).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            function closeInvoiceMofiyfn(isExist, catid, doctomanage, existDocument) {
                try {
                    doctomanage.lastupdatetime = new Date();;
                    for (var cnt = 0; existDocument.docdata.length > 0; cnt++) {
                        if (existDocument.docdata[cnt].clientId == doctomanage.clientId) {
                            existDocument.docdata[cnt].iscash = doctomanage.iscash;
                            existDocument.docdata[cnt].iscash = doctomanage.iscash;
                        }
                    }
                    return existDocument;
                } catch (err) {
                    return existDocument;
                }
            }

            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', toSend, closeInvoiceMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function getBillNo() {

            function billmofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.billNo = doctomanage;
                newDoc.lastupdatetime = time;
                newDoc.lastsynctime = time;
                return newDoc;
            }

            return $q(function (resolve, reject) {
                if ($rootScope.online) {
                    $http.get('/api/v1/getBillno').then(function (response) {
                        var billno = response.data.billNo;
                        billno++;
                        utilservice.addOrUpdateDocInPouchDB('BILLNUMBR', billno, billmofiyfn)
                        resolve(billno);
                    });
                }
                else {
                    utilservice.getDocFromPouchDB('BILLNUMBR', true).then(function (docdetails) {
                        var billno = 0;
                        if (docdetails.isFound)
                            billno = docdetails.billNo;
                        billno++;
                        utilservice.addOrUpdateDocInPouchDB('BILLNUMBR', billno, billmofiyfn)
                        resolve(billno);
                    });
                }
            });
        }

        function invoiceMofiyfn(isExist, catid, doctomanage, existDocument) {
            try {
                doctomanage.lastupdatetime = new Date();;
                for (var cnt = 0; cnt < existDocument.docdata.length ; cnt++) {
                    if (existDocument.docdata[cnt].clientId == doctomanage.clientId) {
                        existDocument.docdata[cnt] = doctomanage;
                    }
                }
                return existDocument;
            } catch (err) {
                return existDocument;
            }
        }

        function orderMofiyfn(isExist, catid, doctomanage, existDocument) {
            try {
                doctomanage.lastupdatetime = new Date();;
                for (var cnt = 0; cnt < existDocument.docdata.length ; cnt++) {
                    if (existDocument.docdata[cnt].clientId == doctomanage.clientId) {
                        existDocument.docdata[cnt] = doctomanage;
                        existDocument.docdata[cnt].lastupdatetime = new Date();
                    }
                }
                return existDocument;
            } catch (err) {
                return existDocument;
            }
        }


        function UpdateInvoiceStatus(data) {

            //return $http.post('/api/v1/updateinvoicestatus', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', data, invoiceMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateInvoiceStatusById(invoiceStatus) {
            return $http.post('/api/v1/updateinvoicestatusbyid', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));
        }

        function SplitInvoiceStatus(invoiceStatus) {
            //return $http.post('/api/v1/splitinvoicestatus', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));

            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', data, invoiceMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }


        

        

       

        //function EditInvoice(data) {
        //    return $http.post('/api/v1/updateinvoice', data).then(function (res) {

        //        return res.data;

        //    }, handleError('Error getting all users'));

        //}


        function finishSplit(data) {
            //return $http.post('/api/v1/finishsplit', data).then(function (res) {

            //    return res.data;

            //}, handleError('Error getting all users'));
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', data, invoiceMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });

        }



        function restoreInventory(productId, quantity) {

            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        var product = existDocument.docdata[pcon];

                        function removeSideINg(map) {
                            db.get('Sides').then(function (ingredientsInventoryDoc) {

                                var dbSides = ingredientsInventoryDoc.docdata;
                                var proSides = product.Sides;

                                for (var icont = 0; icont < proSides.length; icont++) {
                                    //var iid = -1;
                                    //iid = inds[icont].name._id;
                                    for (var ic = 0; ic < dbSides.length; ic++) {
                                        if (dbSides[ic].clientId == proSides[icont].clientId) {

                                            //remove from ingredientsInventory
                                            for (var i = 0; i < dbSides[ic].Ingradients.length; i++) {

                                                //f (map.)

                                                for (var mapingcouterm = 0; mapingcouterm < map.length; mapingcouterm++) {
                                                    if (map[mapingcouterm].ingradientClientId == dbSides[ic].Ingradients[i].ingradientClientId) {
                                                        dbSides[ic].Ingradients[i].quantity = parseFloat(dbSides[ic].Ingradients[i].quantity) + parseFloat(map[mapingcouterm].quantity);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                ingredientsInventoryDoc.docdata = dbSides;
                                ingredientsInventoryDoc.lastupdatetime = new Date();
                                db.put(ingredientsInventoryDoc).then(function () {
                                    console.log("Doc updated in poch Db\n for  exisinng doc");
                                    utilservice.syncSidesInventry();
                                }).catch(function (err) {
                                    console.log("Error while updating Data to poch Db\n");
                                    console.log(err);
                                });

                            });
                        }

                        db.get('Ingredients').then(function (ingredientsInventoryDoc) {
                            var map = [];
                            var ingredientsInventory = ingredientsInventoryDoc.docdata;
                            var inds = product.Ingradients;
                            var ingSide = product.Sides;
                            for (var icont = 0; icont < inds.length; icont++) {
                                var iid = -1;
                                if (inds[icont].name.clientId)
                                    iid = inds[icont].name.clientId;
                                else
                                    iid = inds[icont].name;
                                for (var ic = 0; ic < ingredientsInventory.length; ic++) {
                                    if (ingredientsInventory[ic].clientId == iid) {
                                        ingredientsInventory[ic].Quantity = parseFloat(ingredientsInventory[ic].Quantity) + parseFloat(inds[icont].quantity) * parseFloat(quantity);
                                        map.push({ ingradientClientId: inds[icont].ingradientClientId, quantity: parseFloat(inds[icont].quantity) })
                                    }
                                }
                            }
                           
                            
                            ingredientsInventoryDoc.docdata = ingredientsInventory;
                            ingredientsInventoryDoc.lastupdatetime = new Date();

                            removeSideINg(map);

                            db.put(ingredientsInventoryDoc).then(function () {
                                console.log("Doc updated in poch Db\n for  exisinng doc");
                                utilservice.syncIngredientsInventory();
                            }).catch(function (err) {
                                console.log("Error while updating Data to poch Db\n");
                                console.log(err);
                            });

                        });

                       
                       
                    }
                }
            });
        }

        function reduceInventory(productId, quanity) {
            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        var product = existDocument.docdata[pcon];
                        console.log('current product ordered: ', product);

                        function removeSideINg(map) {
                            db.get('Sides').then(function (ingredientsInventoryDoc) {

                                var dbSides = ingredientsInventoryDoc.docdata;
                                var proSides = product.Sides;

                                for (var icont = 0; icont < proSides.length; icont++) {
                                    //var iid = -1;
                                    //iid = inds[icont].name._id;
                                    for (var ic = 0; ic < dbSides.length; ic++) {
                                        if (dbSides[ic].clientId == proSides[icont].clientId) {

                                            //remove from ingredientsInventory
                                            for (var i = 0; i < dbSides[ic].Ingradients.length; i++) {

                                                //f (map.)

                                                for (var mapingcouterm = 0; mapingcouterm < map.length; mapingcouterm++) {
                                                    if (map[mapingcouterm].ingradientClientId == dbSides[ic].Ingradients[i].ingradientClientId) {
                                                        dbSides[ic].Ingradients[i].quantity = parseFloat(dbSides[ic].Ingradients[i].quantity) - parseFloat(map[mapingcouterm].quantity);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                ingredientsInventoryDoc.docdata = dbSides;
                                ingredientsInventoryDoc.lastupdatetime = new Date();
                                db.put(ingredientsInventoryDoc).then(function () {
                                    console.log("Doc updated in poch Db\n for  exisinng doc");
                                    utilservice.syncSidesInventry();
                                }).catch(function (err) {
                                    console.log("Error while updating Data to poch Db\n");
                                    console.log(err);
                                });

                            });
                        }

                        db.get('Ingredients').then(function (ingredientsInventoryDoc) {
                            var map = [];
                            var ingredientsInventory = ingredientsInventoryDoc.docdata;
                            var inds = product.Ingradients;
                            console.log('ingredients request: ', inds);
                            var ingSide = product.Sides;
                            for (var icont = 0; icont < inds.length; icont++) {
                                //var iid = -1;
                                //iid = inds[icont].name._id;
                                for (var ic = 0; ic < ingredientsInventory.length; ic++) {
                                    if (ingredientsInventory[ic].clientId == inds[icont].ingradientClientId) {
                                        ingredientsInventory[ic].Quantity = parseFloat(ingredientsInventory[ic].Quantity) - parseFloat(inds[icont].quantity);
                                        map.push({ ingradientClientId: inds[icont].ingradientClientId, quantity: parseFloat(inds[icont].quantity) })
                                    }
                                }
                            }

                            ingredientsInventoryDoc.docdata = ingredientsInventory;
                            ingredientsInventoryDoc.lastupdatetime = new Date();

                            removeSideINg(map);

                            db.put(ingredientsInventoryDoc).then(function () {
                                console.log("Doc updated in poch Db\n for  exisinng doc");
                                utilservice.syncIngredientsInventory();
                            }).catch(function (err) {
                                console.log("Error while updating Data to poch Db\n");
                                console.log(err);
                            });


                        });

                       
                    }
                }
            });
        }

        function restoreProduct(productId, quantity) {
            console.log(quantity);
            //return $http.post('/api/inventory/restoreProduct', obj).then(function (res) {
            db.get('Product').then(function (existDocument) {
                console.log(quantity);
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        existDocument.docdata[pcon].Quantity = parseInt(existDocument.docdata[pcon].Quantity) + parseInt(quantity);
                        existDocument.lastupdatetime = new Date();
                    }
                }
                db.put(existDocument).then(function () {
                    console.log("Doc updated in poch Db\n for  exisinng doc");
                    utilservice.syncProductInventory();
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
                });
            });
        }

        function reduceProduct(productId, quanity) {
            //return $http.post('/api/inventory/reduceProduct', obj).then(function (res) {
            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        existDocument.docdata[pcon].Quantity = parseInt(existDocument.docdata[pcon].Quantity) - 1
                        existDocument.lastupdatetime = new Date();
                    }
                }
                db.put(existDocument).then(function () {
                    console.log("Doc updated in poch Db\n for  exisinng doc");
                    utilservice.syncProductInventory();
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
                });
            });
        }



        function addSplitInvoice_updateInvoice(data) {
            return $http.post('/api/v1/splitinvoice', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

        function placeOrder(orderToPlaced) {

            //return $http.post('/api/v1/order', data).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            function innerAddMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.docdata = newDoc.docdata || [];
                for (var olist = 0; olist < doctomanage.length; olist++) {
                    var onedoc =doctomanage[olist];
                    onedoc.lastupdatetime = time;
                    newDoc.docdata.push(onedoc)
                }
                newDoc.lastupdatetime = time;
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('ORDERS', orderToPlaced, innerAddMofiyfn).then(function (res) {
                    _self.addMultipleOrderInShift(orderToPlaced).then(function (response) {
                        utilservice.syncINVOICES();
                        console.log(orderToPlaced);
                        console.log("placeorder done");
                        resolve(orderToPlaced);
                    }, function (err) { });
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        //function updateOrder(data) {
        //    return $http.post('/api/v1/updateOrder', data).then(function (res) {

        //        return res.data;

        //    }, handleError('Error getting all users'));

        //    //return $http.post('/api/v1/placeOrder', data).then(function (res) {

        //    //    return res.data;

        //    //}, handleError('Error getting all users'));

        //}


        //function updateOrderStatus(data) {      
        //    return $http.post('/api/v1/updateStatusOrder', data).then(function (res) {

        //        return res.data;

        //    }, handleError('Error getting all users'));

        //    //return $http.post('/api/v1/placeOrder', data).then(function (res) {

        //    //    return res.data;

        //    //}, handleError('Error getting all users'));

        //}

        //function cancelOrder(item) {
        //    return $http.post('/api/v1/cancelOrder', item).then(function (res) {
        //        return res.data;
        //    }, handleError('Error getting all users'));
        //}

        function removeOrderFromInvoice(item) {
            //return $http.post('/api/v1/removeOrderFromInvoice', item).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));
            //remove order from local
            //find invoice and remove order id 
            //save the ionvoice

          return  dbRemoveloRemoveOrder(item);

        }

        function addOrderToSplittedInvoice(orderobj) {
            //return $http.post('/api/v1/addOrderToSplittedInvoice', item).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));
            //add order to local 
            //find invoice and add order id and save
            //sync services
            return $q((resolve, reject) => {
                var item = orderobj.item;

                db.get('INVOICES', true).then(function (invfromdb) {
                    var invdoc = { _id: 'INVOICES' };
                    if (invfromdb.isFound)
                        invdoc = invfromdb.underlyingdoc;
                    var invcs = invdoc.docdata || [];
                    for (var cnt = 0; cnt < invcs.length; cnt++) {
                        if (utilservice.idMatcher(item.invoiceId, invcs[cnt])) {
                            invcs[cnt].orders = invcs[cnt].orders || [];
                            invcs[cnt].orders.push(item.clientId);
                            invcs[cnt].lastupdatetime = new Date();
                        }
                    }
                    invdoc.docdata = invcs;
                    db.put(invdoc).then(function () {
                        db.get('ORDERS', true).then(function (oddocfromdb) {
                            var oddoc = { _id: 'ORDERS' };
                            if (oddocfromdb.isFound)
                                oddoc = oddocfromdb.underlyingdoc;
                            item.lastupdatetime = new Date();
                            oddoc.docdata = oddoc.docdata || [];
                            oddoc.docdata.push(item);
                            db.put(oddoc).then(function () {
                                utilservice.syncINVOICES();
                            });
                            resolve(item);
                        });
                    });
                });
            });
        }

        function setQuantityForInvoice(item) {
            //return $http.post('/api/v1/setQuantityForInvoice', item).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('ORDERS', item.obj, orderMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });

        }


        function dbRemoveloRemoveOrder(item, invoice) {

            function orderDeleteModifyn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.docdata = newDoc.docdata || [];
                newDoc.docdata.push({ clientId: item.clientId, lastupdatetime: new Date() });
                console.log("delete order data");
                console.log(newDoc);
                return newDoc;
            }


            return $q((resolve, reject) => {
                var db = pouchDB('lanapp', { adapter: 'idb' });
                db.get('INVOICES').then(function (invfromdb) {
                    var invdoc = { _id: 'INVOICES' };
                    if (invfromdb.isFound)
                        invdoc = invfromdb.underlyingdoc;
                    var invcs = invdoc.docdata || [];
                    for (var cnt = 0; cnt < invcs.length; cnt++) {
                        if (invcs[cnt].clientId == invoice.clientId) {
                            for (var odCounter = 0; odCounter < invcs[cnt].orders.length; odCounter++) {
                                var odid = invcs[cnt].orders[odCounter].clientId || invcs[cnt].orders[odCounter];
                                if (utilservice.idMatcher(odid , item)) {
                                    invcs[cnt].orders.splice(odCounter, 1);
                                }
                            }
                            invcs[cnt].lastupdatetime = new Date();
                        }
                    }
                    invdoc.docdata = invcs;
                    db.put(invdoc).then(function () {
                        //remove order from local as well
                        utilservice.addOrUpdateDocInPouchDB('ORDERTODELETE', item, orderDeleteModifyn).then(function (res) {
                            removeOrderFromShift(item).then(function (item) {
                                utilservice.syncINVOICES();
                                resolve(item);
                            });
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
            });
        }

        function removeOrder(item) {
            //return $http.post('/api/v1/removeOrder', item).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));
            return dbRemoveloRemoveOrder(item.Order, item.Invoice);
        }

        //function addOrderToInvoice(data) {
        //    return $http.post('/api/v1/addOrderToInvoice', data).then(function (res) {

        //        return res.data;

        //    }, handleError('Error getting all users'));
        //}

        function EditWaiter(data) {
            return $http.post('/api/v1/waiter', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

        function syncInvoiceMetaData(data) {
            //return $http.post('/api/invoice/syncInvoiceMetaData', data).then(function (res) {
            //    return res.data;
            //}, function (err) {
            //    console.log(err);
            //});
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', data, invoiceMofiyfn).then(function (res) {
                    utilservice.syncINVOICES();
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function EditingTable(data) {
            return $http.post('/api/v1/updatetable', data).then(function (res) {

                return res.data;

            }, handleError('Error getting'));

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

        function addMultipleOrderInShift(orderToPlaced) {
            function addMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.shiftdata = newDoc.shiftdata || {};
                newDoc.shiftdata.orders = newDoc.shiftdata.orders || [];
                for (var olist = 0; olist < doctomanage.length; olist++) {
                    newDoc.shiftdata.orders.push(doctomanage[olist].clientId)
                }
                newDoc.lastupdatetime = time;
                return newDoc;
            }
            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('CurrentShift', orderToPlaced, addMofiyfn).then(function (res) {
                    //utilservice.syncShift();
                    console.log(res);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function addInvoinAndOrderInShift(id, type) {
            var toSend = {
                shid: localStorage.getItem("currentShiftid"),
                id: id,
                type: type
            };

            //return $http.post('/api/v1/insertInvoiceAndOrderInShift', toSend).then(function (res) {
            //    return res.data;
            //}, handleError('Error getting all users'));

            function addMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.shiftdata = newDoc.shiftdata || {};
                if (doctomanage.type == 'INVOICE') {
                    newDoc.shiftdata.invoices = newDoc.shiftdata.invoices || [];
                    newDoc.shiftdata.invoices.push(doctomanage.id)
                } else {
                    newDoc.shiftdata.orders = newDoc.shiftdata.orders || [];
                    newDoc.shiftdata.orders.push(doctomanage.id)
                }
                newDoc.lastupdatetime = time;
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('CurrentShift', toSend, addMofiyfn).then(function (res) {
                    //utilservice.syncShift();
                    console.log(res);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function removeOrderFromShift(order) {

            function removeOrderMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.shiftdata = newDoc.shiftdata || {};
                for (var odc = 0; odc < newDoc.shiftdata.orders.length; odc++) {
                    if (newDoc.shiftdata.orders[odc] == order.clientId || newDoc.shiftdata.orders[odc] == order._id) {
                        newDoc.shiftdata.orders.splice(odc);
                    }
                }
                newDoc.lastupdatetime = time;
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('CurrentShift', order, removeOrderMofiyfn).then(function (res) {
                    //utilservice.syncShift();
                    console.log(res);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function getProductPriceWithQuantity(order) {
            var price = 0.0;
            try {
                price = parseFloat(order.product.Price) * parseFloat(order.quantity);
            }
            catch (err) {
                price = 0.0;
            }
            return price;
        }

        function priceCalculation(orders) {
            var tax = 0;
            var prices = { total: 0, grandtotal: 0 };
            if (orders && orders.length) {
                for (var i = 0; i < orders.length; i++) {
                  if(orders[i].product) {
                    prices.total = prices.total + (orders[i].product.Price * orders[i].quantity)
                  } else {
                    prices.total = 0;
                  }

                }
                prices.grandtotal = prices.total + (prices.total * tax) / 100
            }
            //console.log(prices);
            return prices;
        }

        //function generateGUID() {
        //    function s4() {
        //        return Math.floor((1 + Math.random()) * 0x10000)
        //          .toString(16)
        //          .substring(1);
        //    }
        //    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        //      s4() + '-' + s4() + s4() + s4();
        //}

        function defaultInvoiceObject(name, table, servedby, restaurant, people) {
            var obj = {
                clientId: utilservice.generateGUID(),
                invoiceNumber: '',
                clientName: name,
                tables: table,
                iscash: true,
                servedby: servedby,
                invoiceStatus: $rootScope.invoiceStatusmanager.NEW,
                created_by: 'Admin',
                updated_by: 'Admin',
                restaurant: restaurant,
                people: people,
                updated_at: new Date(),
                created_at: new Date()
            }
            return obj;
        }

        function updateSingleInvoiceToLocalDB(invoice) {
            delete invoice["__v"];
            db.get(invoice.clientId).then(function (existDocument) {
                console.log(existDocument);
                var doc = invoice;
                doc._rev = existDocument._rev;
                db.put(doc).then(function () {
                    console.log("Doc updated in poch Db\n for  exisinng doc");
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
                });
            }).catch(function (err) {
                if (err && err.status == 404) {
                    db.put(invoice).then(function () {
                        console.log("Doc updated in poch Db\n");
                    }).catch(function (err) {
                        console.log("Error while updating Data to poch Db\n");
                        console.log(err);
                    });
                }
            });
        }

        function addSingleInvoiceToLocalDB(invoice) {
            function addMofiyfn(isExist, catid, doctomanage, existDocument) {
                var time = new Date();
                var newDoc = existDocument || { _id: catid };
                newDoc.docdata = newDoc.docdata || [];
                doctomanage.lastupdatetime = time;
                newDoc.docdata.push(doctomanage)
                return newDoc;
            }

            var _self = this;
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('INVOICES', invoice, addMofiyfn).then(function (res) {
                    console.log(res);
                    _self.addInvoinAndOrderInShift(res.clientId, 'INVOICE').then(function (response) {
                        utilservice.syncINVOICES();
                        resolve(res);
                    }, function (err) { });
                }).catch(function (err) {
                    reject(err);
                });
            });

        }

        function restoreInvoiceToLocalDb(allInvoice) {
            allInvoice.map(function (invoice) {
                this.updateSingleInvoiceToLocalDB(invoice);
            });
        }

        function isSoldOut(productId, ingredientsInventory, Allproducts) {
            var product = null;
            for (var pcon = 0; pcon < Allproducts.length; pcon++) {
                if (Allproducts[pcon].clientId == productId)
                    product = Allproducts[pcon];
            }
            var sufficientIngrdeitns = true;
            if (product) {
                if (product.type == "Retail") {
                    if (parseInt(product.Quantity) == 0)
                        sufficientIngrdeitns = false;
                } else {
                    var inds = product.Ingradients;
                    for (var icont = 0; icont < inds.length; icont++) {
                        var iid = -1;
                        if (inds[icont].name._id)
                            iid = inds[icont].name._id;
                        else
                            iid = inds[icont].name;
                        var ingref = _.find(ingredientsInventory, function (num) {
                            return num._id == iid;
                        });
                        if (ingref) {
                            if (parseFloat(inds[icont].quantity) > parseFloat(ingref.Quantity))
                                sufficientIngrdeitns = false;
                        } else {
                            sufficientIngrdeitns = false;
                        }
                    }
                }
            }

            return !sufficientIngrdeitns;
        }

        function validateProduct(productId, ingredientsInventory, Allproducts) {
            var isSoldOut = this.isSoldOut(productId, ingredientsInventory, Allproducts);
            return !isSoldOut;
        }


    }

})();
