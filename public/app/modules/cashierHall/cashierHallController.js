(function() {
    'use strict';

    angular
        .module('cashierHall')
        .controller('cashierHallController', Controller);

     Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'cashierBillsServiceFn','serviceFun','pouchDB','$stateParams','utilservice','$q'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, cashierBillsServiceFn, serviceFun, pouchDB, $stateParams, utilservice, $q) {

        //rooms module specific code
        $scope.tableActive = false;
        $scope.currentOpenTable = null;
        $('.table-box').click(function() {
            $scope.tableActive = true;
            $('.container.tri-column-wrap').addClass('tableactive');
        });

        $scope.activateTable = function (table) {
            console.log(table);
            $scope.currentOpenTable = table;
            $scope.tableActive = true;
            $('.container.tri-column-wrap').addClass('tableactive');
            $scope.tableInvoices = _.reject($scope.invoiceRepo, function (num) { return num.tables._id != $scope.currentOpenTable._id; });
            $scope.allCloseInvoice = _.reject($scope.tableInvoices, function (num) { return num.invoiceStatus != "CLOSED"; });
            $scope.allInvoice = _.reject($scope.tableInvoices, function (num) { return num.invoiceStatus == "CLOSED"; });
            if ($scope.allInvoice && $scope.allInvoice.length > 0)
                $scope.Tabledetail($scope.allInvoice[0], true);
        }

        $scope.getStyle = function(tableStyle) {
          if(!tableStyle) return;
          var values = tableStyle.match(/-?\d+/g);
          if(!values) return;
          values[1] = parseInt(values[1])*0.85;
          values[0] = parseInt(values[0])+195;
          if( $scope.tableActive) {
            values[0] = values[0]/2;
          }
          return 'position:absolute;'+tableStyle;
          //return 'position:absolute;left:'+ values[0] + 'px; top: '+values[1] + 'px;';
        };

        $scope.closeTable = function() {
            $scope.tableActive = false;
            $('.container.tri-column-wrap').removeClass('tableactive');
        }

        $scope.roomid = $stateParams.id;
        $scope.roombj = null;

        var vm = this;
        var db = pouchDB('lanapp', { adapter: 'idb' });
        $scope.cashierBillsServiceFn = cashierBillsServiceFn;
        
        
        //load printer module
        $scope.printEnabled = false;
        $scope.printOrderEnabled = false;
        if(localStorage.getItem("currentPrinters")) {
		 	var printers = JSON.parse(localStorage.getItem("currentPrinters"));
		 	if(printers.Printer1.length > 0) {
			 	$scope.printEnabled = true;
			 	$scope.printerName = printers.Printer1;
			 	
			 	if ( printers.printOnOrderPlace ) {
				 	$scope.printOrderEnabled = true;
				 	console.log('print on order enabled');
			 	} else {
				 	$scope.printOrderEnabled = false;
				 	console.log('print on order disabled');
			 	}
		 	}
		 	
		} else {
		 	$scope.printEnabled = false;
		 	$scope.printOrderEnabled = false;
		}

        function failPayload(err) {
            console.log(err)
        }
        function getInvoiceIndex(allInvoice, clientId) {
            var index = -1;
            if (allInvoice) {
                for (var invCounter = 0; invCounter < allInvoice.length; invCounter++) {
                    if (allInvoice[invCounter] && $scope.allInvoice[invCounter].orders) {
                        index = invCounter;
                    }
                }
            }
            return index;
        }
        function getOrderIndex(invoice, clientId, invoiceid) {
            var index = -1;
            if (invoice && invoice.orders) {
                for (var odCounter = 0; odCounter < invoice.orders.length; odCounter++) {
                    if (invoice.orders[odCounter].clientId == clientId) {
                        index = odCounter;
                    }
                }
            }
            return index;
        }
        $scope.deepCopy = function (data) {
            return angular.copy(data);
        }
        $scope.openModal = function (modalid) {
            $('#' + modalid).modal('show');
        }
        $scope.hideModal = function (modalid) {
            $('#' + modalid).modal('hide');
        }

        this.employee = getEmployee
        $scope.table = "Select Table";
        $scope.allIngedientsName = [];
        $scope.ingredientsInventory = [];
        $scope.allCloseInvoiceShow = false;
        $scope.tax = 15;
        $scope.Allproducts = [];
        $scope.allSubCategory = [];
        $scope.allCategory = [];
        $scope.extraIngredients = [];
        this.change = function () {
            employeeprofileService.updateUser(this.employee).then(function successcallback(res) {
                if (navigator.onLine) {
                    if (res.success) {
                        $rootScope.$broadcast('updatemployeelocaly');
                        alertservice.showAlert('success', "Success", res.message)
                    }
                    else {
                        alertservice.showAlert('failed', "Failed", res.message)
                    }
                }
                else {
                    alertservice.showAlert('success', "Success", "Updated")
                }
            }, failPayload)
        }

        $scope.isTableFull = function(id) {
          if(!$scope.invoiceRepo) return false;
          return $scope.invoiceRepo.some(function(invoice) {
            if(invoice.tables._id===id) {
              return true;
            }
            return false;
          })
        }

        $scope.initModule = function () {
            cashierBillsServiceFn.GetInvoice().then(function (res) {
                $scope.allInvoice = [];
                $scope.invoiceRepo = [];
                for (var i = 0 ; i < res.length; i++) {
                    if (res[i].restaurant == getEmployee.restaurant && $scope.tableIds.indexOf(res[i].tables._id) >= 0) {
                        res[i].css = 'list-group-item';
                        res[i].prices = cashierBillsServiceFn.priceCalculation(res[i].orders);
                        cashierBillsServiceFn.updateSingleInvoiceToLocalDB(res[i]);
                        //$scope.allInvoice.push(res[i]);
                        $scope.invoiceRepo.push(res[i]);
                    }
                }
                //$scope.allCloseInvoice = _.reject($scope.allInvoice, function (num) { return num.invoiceStatus != "CLOSED"; });
                //$scope.allInvoice = _.reject($scope.allInvoice, function (num) { return num.invoiceStatus == "CLOSED"; });
                //if ($scope.allInvoice && $scope.allInvoice.length > 0)
                //    $scope.Tabledetail($scope.allInvoice[0], true);
                $scope.invoiceActive = false;
            }, failPayload);

            utilservice.loadTables().then(function (res) {
                var tbs = [{ _id: -1, number: 'No Table' }];
                for (var i = 0; i < res.length; i++) {

                    if (res[i].restaurant == getEmployee.restaurant) {
                        tbs.push(res[i]);
                    }
                    else {
                        //res.splice(i, 1);
                    }

                }
                $scope.tables = tbs;
            }, failPayload)

            serviceFun.GetIngedients().then(function (res) {
                $scope.allIngedients = res;
                $scope.ingredientsInventory = angular.copy(res)
                if ($scope.allIngedients) {
                    for (var i = 0; i < $scope.allIngedients.length; i++) {
                        if ($scope.allIngedientsName.indexOf($scope.allIngedients[i].Name) > 0) {
                        } else {
                            $scope.allIngedientsName.push($scope.allIngedients[i].Name);
                        }
                    }
                }
            }, failPayload)

            //$http.get('/api/get/employee', getEmployee.restaurant).then(function (res) {
            //    $scope.Allemployee = [{ _id: -1, firstname: 'No Waiter' }];
            //    for (var i = 0; i < res.data.data.length; i++) {
            //        $scope.Allemployee.push(res.data.data[i]);
            //    }
            //}, failPayload);


            utilservice.getEmployees().then(function (emps) {
                console.log(emps);
                $scope.Allemployee = [{ _id: -1, firstname: 'No Waiter' }];
                for (var i = 0; i < emps.length; i++) {
                    $scope.Allemployee.push(emps[i]);
                }
                console.log("$scope.Allemployee data");
                console.log($scope.Allemployee);
            });

            utilservice.loadShift().then(function (isopen) {
                if (!isopen) window.location = '/employee';
            });


        }

        $scope.tableIds = [];
        
        /// Rooms initialization ////
        
        $scope.initRoom = function () {
            //$http.post('/api/room/getrooms', { id: getEmployee.restaurant }).then(function (res) {
            //    if (res.data) {
            //        console.log(res.data);
            //        for (var r = 0; r < res.data.length; r++) {
            //            if (res.data[r]._id == $scope.roomid) {
            //                $scope.roombj = res.data[r];
            //                console.log($scope.roombj);
            //                if ($scope.roombj.tableNum && $scope.roombj.tableNum.length > 0) {
            //                    for (var cnt = 0; cnt < $scope.roombj.tableNum.length; cnt++) {
            //                        $scope.tableIds.push($scope.roombj.tableNum[cnt]._id);
            //                    }
            //                } else {
            //                    $scope.allCloseInvoice = [];
            //                    $scope.allInvoice = [];
            //                }
            //                $scope.initModule();
            //            }
            //        }
            //    }
            //}, function (res) { console.log(); });

            utilservice.loadRooms().then(function (rooms) {
                for (var r = 0; r < rooms.length; r++) {
                    if (rooms[r]._id == $scope.roomid) {
                        $scope.roombj = rooms[r];
                        console.log($scope.roombj);
                        if ($scope.roombj.tableNum && $scope.roombj.tableNum.length > 0) {
                            for (var cnt = 0; cnt < $scope.roombj.tableNum.length; cnt++) {
                                $scope.tableIds.push($scope.roombj.tableNum[cnt]._id);
                            }
                        } else {
                            $scope.allCloseInvoice = [];
                            $scope.allInvoice = [];
                        }
                        $scope.initModule();
                    }
                }
            });
        }

        $scope.initRoom();
        
        //printing function 
         $scope.remotePrint = function(data) {
	        //prepare invoice object for printing
	        
	        var invoicePrint = {};
	        invoicePrint.restName = restaurantMetadata.rName;
	        invoicePrint.legalName = restaurantMetadata.lName;
	        invoicePrint.phone = restaurantMetadata.telefono;
	        invoicePrint.address = restaurantMetadata.direccion;
	        invoicePrint.cJuridica = restaurantMetadata.cJuridica;
	        invoicePrint.disclaimer = restaurantMetadata.disclaimer;
	        invoicePrint.wifi = restaurantMetadata.wifi;
	        
	        
	        invoicePrint.clientName = data.clientName;
	        invoicePrint.date = data.created_at;
	        invoicePrint.number = data.invoiceNumber;
	        if(data.tables && typeof data.tables != 'undefined') {
	        	invoicePrint.table = data.tables.roomid.name+' - '+(data.tables.number).toString();
	        }
	        invoicePrint.open = data.editable;
	        invoicePrint.servedBy = data.servedby.firstname+' '+data.servedby.lastname;
	        invoicePrint.prices = data.prices;
	        invoicePrint.orders = data.orders;
	        invoicePrint.restaurant = data.restaurant;
	        invoicePrint.printer = $scope.printerName;
	        console.log("invoice to print: ",invoicePrint);
	        cashierBillsServiceFn.printInvoice(invoicePrint).then(function (res) {
				console.log("printed: ",res);
            }, failPayload);
        }

        $scope.updateToAllInvoice = function (activeinvoice) {
            for (var iCounter = 0; iCounter < $scope.allInvoice.length; iCounter++) {
                if ($scope.allInvoice[iCounter].clientId == activeinvoice.clientId)
                    $scope.allInvoice[iCounter] == activeinvoice;
            }
        }
        //Module Code end

        //UI View states
        $scope.invoiceActive = false;
        $scope.invoiceFocus = false;
        $scope.tricolInventoryActive = false;
        $scope.compareBillActive = false;
        $scope.procesorActive = false;
        $('.product-category > .panel-heading, .product-category > img').click(function () {
            $(this).parent('.product-category').toggleClass("active");
        });
        $('.product-panel').click(function () {
            $('#addOrderItem').modal('show');
        });

        $scope.backInvoice = function () {
            $scope.invoiceActive = false;
            $scope.tricolInventoryActive = false;
            $scope.compareBillActive = false;
            $scope.procesorActive = false;
            $scope.invoiceFocus = false;
            $scope.currentSplitOrder = false;
        }

        $scope.compareBill = function () {
            $scope.invoiceFocus = false;
            $scope.tempddata =  $scope.showData;
            $scope.tricolInventoryActive = false;
            if ($scope.compareBillActive) {
                $scope.compareBillActive = false;
                $scope.currentSplitOrder = false;
            } else {
                $scope.compareBillActive = true;
              $scope.createNewSplitInvoice($scope.showData);
            }
          if(!($scope.compareBillActive && !$scope.currentSplitOrder)){
            $scope.createNewSplitInvoice($scope.showData);
          }
        }

        $scope.compareBill1 = function () {
            $scope.invoiceFocus = false;
            $scope.tricolInventoryActive = false;
            $scope.currentSplitOrder = false;
            $scope.compareBillActive = true;

        }

        $scope.unfocusInvoice = function () {
            $scope.invoiceFocus = false;
            $('.product-category').removeClass("active");
        }

        $scope.focusInvoice = function () {
            $scope.invoiceFocus = true;
            $scope.currentSplitOrder = true;
            $scope.splittedInvoice.tables = $scope.selectedTable;
            $scope.splittedSelectedTable = angular.copy($scope.selectedTable);
            $scope.splittedInvoice.clientName = $scope.splittedInvoice.SplitinvoiceName;
            $scope.addSlittedInvoice();
        }

        $scope.Tabledetail = function (invoicedata, editable) {
            $scope.invoiceActive = true;
            $scope.hideRow = true;;
            $scope.showData = invoicedata;
            $scope.showData.editable = editable;
            if ($scope.showData.orders && $scope.showData.orders.length > 0)
                $scope.hideRow = false;
            else
                $scope.showData.orders = [];
            $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            $scope.setActiveInvoiceTableAndEmployeeIndex();
        }
        //UI View states

         //Invoice create/update code
        $scope.$on("syncInvoice", function (evt, invoice) {
            console.log(invoice);
            var sokectObj = { Invoice: invoice, ResId: getEmployee.restaurant };
            $rootScope.socket.emit('newInvoice', sokectObj);
            //delete invoice._id;
            //$http.post('/api/v1/invoice', invoice).then(function (res) {
            //  $scope.allInvoice[$scope.allInvoice.length-1]._id = res.data._id;
            //    cashierBillsServiceFn.addInvoinAndOrderInShift(res.data._id, 'INVOICE').then(function (response) {
            //    }, function (err) { });
            //}, failPayload);
        });

        $scope.$on("syncInvoiceMetaData", function (evt, invoice) {
            //db.get(invoice.clientId).then(function (existDocument) {
            //    console.log(existDocument);
            //    var doc = invoice;
            //    doc._rev = existDocument._rev;
            //    db.put(doc).then(function () {
            //        console.log("Doc updated in poch Db\n for  exisinng doc");
            //    }).catch(function (err) {
            //        console.log("Error while updating Data to poch Db\n");
            //        console.log(err);
            //    });
            //})
            console.log(invoice);
            cashierBillsServiceFn.syncInvoiceMetaData(invoice).then(function () {
                //alert("Invoice sync successfully");
            });
            var sokectObj ={ Invoice: invoice, ResId: getEmployee.restaurant };
            $rootScope.socket.emit('changeInvoiceMetaData', sokectObj);
        });

        $scope.reinitlizeAddInvoiceModal = function () {
            $scope.name = '';
            $scope.people = 1;
            $scope.table = 'Select Table';
            $('#modalNewBill').modal('hide');
        }
        $scope.getInvoiceNumber = function () {
          return $q(function(resolve,reject){
            cashierBillsServiceFn.getBillNo()
              .then(function(response) {
                 resolve({no:response});
              })
          })
        }

        $scope.addInvoice = function () {
            if ($scope.InvoiceName != undefined && $scope.InvoiceName != '') {
                var tbtoadd = _.find($scope.tables, { _id: $scope.currentOpenTable._id });
                 var emtoadd = _.find($scope.Allemployee,{_id:$scope.Allemployee[1]._id});
                var obj = cashierBillsServiceFn.defaultInvoiceObject($scope.InvoiceName, tbtoadd, emtoadd, getEmployee.restaurant, $scope.people)
                 $scope.getInvoiceNumber()
                   .then(function(data){
                     obj.invoiceNumber =data.no;
                     cashierBillsServiceFn.addSingleInvoiceToLocalDB(obj).then(function (response) {
                       console.log("add invoice rsponse");
                       console.log(response);
                       $scope.reinitlizeAddInvoiceModal();
                       $scope.Tabledetail(response, true);
                       $scope.$emit("syncInvoice", response);
                       $scope.InvoiceName = "";
                     });
                   });
            } else {
                var tbtoadd = _.find($scope.tables, { _id: $scope.currentOpenTable._id });
                var emtoadd = _.find($scope.Allemployee,{_id:$scope.Allemployee[1]._id});
                var obj = cashierBillsServiceFn.defaultInvoiceObject("cliente", tbtoadd, emtoadd, getEmployee.restaurant, $scope.people)
                 $scope.getInvoiceNumber()
                   .then(function(data){
	         
                     obj.invoiceNumber = data.no;
                     obj.clientName = obj.clientName + data.no.toString();
                     cashierBillsServiceFn.addSingleInvoiceToLocalDB(obj).then(function (response) {
                       console.log("add invoice rsponse");
                       console.log(response);
                       $scope.reinitlizeAddInvoiceModal();
                       $scope.Tabledetail(response, true);
                       $scope.$emit("syncInvoice", response);
                     });
                   });
            }
        }

        $scope.EditInvoice = function (currentinvoice,modalid) {
            if (currentinvoice.clientName != undefined && currentinvoice.clientName != '') {
                $scope.hideModal(modalid);
                $scope.$emit("syncInvoiceMetaData", currentinvoice);
            }
            else { alert("Name cannot be null..") }
        }
        //INvoice  create update code

        //Invoice metadata logic
        $scope.stuff = {};
        $scope.people = 1;
        $scope.stuff.isTableEditing = false;
        $scope.isWaiterEditing = false;
        $scope.InvoicePeople = false;
        $scope.SplittedPeople = false;
        $scope.EditTable = function () {
            $scope.isTableEditing = false;
            $scope.showData.tables = $scope.selectedTable;
            $scope.$emit("syncInvoiceMetaData", $scope.showData);
        }

        $scope.EditSplittedTable = function () {
            $scope.isSplittedTableEditing = false;
            $scope.splittedInvoice.tables = $scope.splittedSelectedTable;
            $scope.$emit("syncInvoiceMetaData", $scope.splittedInvoice);
        }

        $scope.editWaiter = function () {
            $scope.isWaiterEditing = false;
            $scope.showData.servedby = $scope.selectedWaiter;//JSON.parse($scope.showData.servedby);
            $scope.$emit("syncInvoiceMetaData", $scope.showData);
        }

        $scope.editSplittedWaiter = function () {
            $scope.isSplittedWaiterEditing = false;
            $scope.splittedInvoice.servedby = $scope.splittedSelectedWaiter;//JSON.parse($scope.showData.servedby);
            $scope.$emit("syncInvoiceMetaData", $scope.splittedInvoice);
        }

        $scope.setActiveInvoiceTableAndEmployeeIndex = function () {
            //adding a check to come to know that there are tables 
            if ($scope.tables && $scope.tables.length > 0) {
                for (var i = 0; i < $scope.tables.length; i++) {
                    if ($scope.tables[i]._id == $scope.showData.tables._id) {
                        $scope.selectedTable = $scope.tables[i];
                    }
                }
            }
            if ($scope.showData.servedby != undefined) {
                for (var i = 0; i < $scope.Allemployee.length; i++) {
                    if ($scope.Allemployee[i]._id == $scope.showData.servedby._id) {
                        $scope.selectedWaiter = $scope.Allemployee[i];
                    }

                }
            }
            else {
                $scope.selectedWaiter = $scope.Allemployee[0];
            }
        }

        $scope.ChangeSplittedTable = function () {
            $scope.isSplittedTableEditing = true;
            for (var i = 0; i < $scope.tables.length; i++) {
                if ($scope.tables[i]._id == $scope.splittedInvoice.tables._id) {
                    $scope.splittedSelectedTable = $scope.tables[i];
                }
            }
            if ($scope.showData.servedby) {
                for (var i = 0; i < $scope.Allemployee.length; i++) {
                    if ($scope.Allemployee[i]._id == $scope.splittedInvoice.servedby._id) {
                        $scope.splittedSelectedWaiter = $scope.Allemployee[i];
                    }
                }
            }
            else {
                $scope.splittedSelectedWaiter = $scope.Allemployee[0];
            }
        }

         //Invoice metadata logic

        //Order logic code start
        $scope.activateInventory = function () {
            $('.product-category').removeClass("active");
            $scope.invoiceFocus = false;
            if ($scope.tricolInventoryActive)
                $scope.tricolInventoryActive = false;
            else
                $scope.tricolInventoryActive = true;
            $("#pdbox").addClass("active");
            if ($scope.showSubCategory.length > 0) {
                // $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                // $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
            }
        }

        $scope.resetOrderForm = function () {
            $scope.selectedExtIn = [];
            $scope.selecctIngredients = '';
            $scope.extraIngredients = [];
            $scope.note = '';
            $scope.selectedVari = [];
            $scope.selectedIngredient = [];
        }

        $scope.showOrder = function (product) {
            if (cashierBillsServiceFn.validateProduct(product, $scope.ingredientsInventory, $scope.Allproducts)) {
                $('#addOrderItem').modal('show');
                $scope.productList = product;
            } else
                $("#modalProductSoldOut").modal('show');
        }

        $scope.$on("updateInvoice", function (evt, invoice) {
            console.log(invoice);
        });

        $scope.getProductById = function (productId) {
            var product = null;
            for (var pcon = 0; pcon < $scope.Allproducts.length; pcon++) {
                if ($scope.Allproducts[pcon].clientId == productId)
                    product = $scope.Allproducts[pcon];
            }
            return product;
        }


        $scope.reduceLocalInventory = function (productId, quantity) {
            var product = $scope.getProductById(productId);
            if (product) {
                if (product.type == "Retail") {
                    product.Quantity = parseInt(product.Quantity) - 1;
                } else {
                    var inds = product.Ingradients;
                    var ingSide = product.Sides;
                    for (var icont = 0; icont < inds.length; icont++) {
                        //var iid = -1;
                        //if (inds[icont].name.clientId)
                        //    iid = inds[icont].name.clientId;
                        //else
                        //    iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic].clientId == inds[icont].ingradientClientId) {
                                $scope.ingredientsInventory[ic].Quantity = $scope.ingredientsInventory[ic].Quantity - inds[icont].quantity;
                            }
                        }
                    }
                    // Code to reduce Side Ingredients from inventory
                    //for (var scount = 0; scount < ingSide.length; scount++ ) {
                    //    var indsInner = product.Sides[scount].Ingradients;
                    //    for (var icont = 0; icont < indsInner.length; icont++) {
                    //        var iid = -1;
                    //        if (indsInner[icont].name.clientId)
                    //            iid = indsInner[icont].name.clientId;
                    //        else
                    //            iid = indsInner[icont].name;
                    //        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                    //            if ($scope.ingredientsInventory[ic].clientId == iid) {
                    //                $scope.ingredientsInventory[ic].Quantity = parseFloat($scope.ingredientsInventory[ic].Quantity) - parseFloat(indsInner[icont].quantity);
                    //            }
                    //        }
                    //    }
                    //}
                }
            }
        }

        $scope.restoreLocalInventory = function (productId, quantity) {
            var product = $scope.getProductById(productId);
            if (product) {
                if (product.type == "Retail") {
                    product.Quantity = parseInt(product.Quantity) + parseInt(quantity);
                } else {
                    var inds = product.Ingradients;
                    var ingSide = product.Sides;
                    for (var icont = 0; icont < inds.length; icont++) {
                        //var iid = -1;
                        //if (inds[icont].name.clientId)
                        //    iid = inds[icont].name.clientId;
                        //else
                        //    iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic].clientId == inds[icont].ingradientClientId) {
                                $scope.ingredientsInventory[ic].Quantity = parseFloat($scope.ingredientsInventory[ic].Quantity) + parseFloat(inds[icont].quantity) * parseFloat(quantity);
                            }
                        }
                    }
                    // Code to restore Side Ingredients to inventory
                    //for (var scount = 0; scount < ingSide.length; scount++ ) {
                    //    var indsInner = product.Sides[scount].Ingradients;
                    //    for (var icont = 0; icont < indsInner.length; icont++) {
                    //        var iid = -1;
                    //        if (indsInner[icont].name.clientId)
                    //            iid = indsInner[icont].name.clientId;
                    //        else
                    //            iid = indsInner[icont].name;
                    //        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                    //            if ($scope.ingredientsInventory[ic].clientId == iid) {
                    //                $scope.ingredientsInventory[ic].Quantity = parseFloat(ingredientsInventory[ic].Quantity) + parseFloat(indsInner[icont].quantity);
                    //            }
                    //        }
                    //    }
                    //}
                }
            }
        }

        $scope.ChangeSplittedWaiter = function () {
            $scope.isSplittedWaiterEditing = false;
            for (var i = 0; i < $scope.tables.length; i++) {
                if ($scope.tables[i]._id == $scope.splittedInvoice.tables._id) {
                    $scope.splittedSelectedTable = $scope.tables[i];
                }
            }
            if ($scope.showData.servedby) {
                for (var i = 0; i < $scope.Allemployee.length; i++) {
                    if ($scope.Allemployee[i]._id == $scope.splittedInvoice.servedby._id) {
                        $scope.splittedSelectedWaiter = $scope.Allemployee[i];
                    }

                }
            }
            else {
                $scope.splittedSelectedWaiter = $scope.Allemployee[0];
            }
        }



        $scope.$on("onAddOrder", function (evt, productId) {
            console.log("onAddOrder event" + productId);
            $scope.reduceLocalInventory(productId, 1);
            if (cashierBillsServiceFn.isSoldOut(productId, $scope.ingredientsInventory, $scope.Allproducts))
                $("#prid" + productId).addClass("sold-out");
            var pro = $scope.getProductById(productId);
            if (pro.type == "Retail")
                cashierBillsServiceFn.reduceProduct(productId, 1);
            else
                cashierBillsServiceFn.reduceInventory(productId, 1);
        });

        $scope.$on("onCancelOrder", function (evt, args) {
            var productId = args.Id;
            var quantity = args.QNTY;
            console.log("onCancelOrder event" + productId);
            $scope.restoreLocalInventory(productId, quantity);
            if (!cashierBillsServiceFn.isSoldOut(productId, $scope.ingredientsInventory, $scope.Allproducts))
                $("#prid" + productId).removeClass("sold-out");
            var pro = $scope.getProductById(productId);
            if (pro.type == "Retail")
                cashierBillsServiceFn.restoreProduct(productId, quantity);
            else
                cashierBillsServiceFn.restoreInventory(productId, quantity);
        });

        $scope.confirmItem = function () {
            $('#addOrderItem').modal('hide');
            $scope.invoiceFocus = true;
            $scope.bookOrder();
        }

        $scope.bookOrder = function () {
            if (cashierBillsServiceFn.validateProduct($scope.productList.clientId, $scope.ingredientsInventory, $scope.Allproducts)) {
                if (!$scope.showData.orders)
                    $scope.showData.orders = [];
                var isExisting = false;
                for (var ocount = 0; ocount < $scope.showData.orders.length; ocount++) {
                    if ($scope.showData.orders[ocount].product.clientId == $scope.productList._id) {
                        $scope.showData.orders[ocount].quantity++;
                        if ($scope.showData.orders[ocount].temporalQuantity)
                            $scope.showData.orders[ocount].temporalQuantity++;
                        else
                            $scope.showData.orders[ocount].temporalQuantity = 1;
                        isExisting = true;
                    }
                }
                if (!isExisting) {
                    var order = {
                        clientId: utilservice.generateGUID(),
                        note: $scope.note,
                        quantity: 1,
                        invoiceId: $scope.showData._id,
                        product: $scope.productList,
                        ingredient: $scope.selectedIngredient,
                        variation: $scope.selectedVari,
                        extraingredient: $scope.extraIngredients,
                        status: $rootScope.orderStatusmanager.TEMPORAL,
                        temporalQuantity: 1
                    };
                    $scope.showData.orders.push(order);
                }
                $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
                alertservice.showAlert('error', "success", "Item added to the order successfully");
                $scope.resetOrderForm();
                $scope.updateToAllInvoice($scope.showData);
                $scope.$emit("onAddOrder", $scope.productList.clientId);
                var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
                $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj);
            } else {
                $("#modalProductSoldOut").modal('show');
            }
        }

        $scope.addquantity = null;

        $scope.increaseQuantityModal = function (or,index) {
            $scope.addquantity =or;
            $scope.addqunatityIndex = index;
            $scope.openModal('modalMoreItem');
        }
        $scope.addQuantityInItem = function () {
            $('#modalMoreItem').modal('hide');
                if ($scope.showData.orders[$scope.addqunatityIndex].product.clientId == $scope.addquantity.product.clientId) {
                    if (cashierBillsServiceFn.validateProduct($scope.showData.orders[$scope.addqunatityIndex].product.clientId, $scope.ingredientsInventory, $scope.Allproducts)) {
                        $scope.showData.orders[$scope.addqunatityIndex].quantity++;
                        if ($scope.showData.orders[$scope.addqunatityIndex].temporalQuantity)
                            $scope.showData.orders[$scope.addqunatityIndex].temporalQuantity++;
                        else
                            $scope.showData.orders[$scope.addqunatityIndex].temporalQuantity = 1;
                        $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
                        $scope.$emit("onAddOrder", $scope.showData.orders[$scope.addqunatityIndex].product.clientId);
                        $scope.updateToAllInvoice($scope.showData);
                      $scope.startPlaceOrder(1);
                    } else {
                        $("#modalProductSoldOut").modal('show');
                    }
                }
            var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj)
        }

        $scope.CancelOrder = function () {
            $scope.activateInventory();
            $('#modalCancelOrder').modal('hide');
            if ($scope.showData.orders) {
                var filterOrdered = [];
                for (var ocounter = 0; ocounter < $scope.showData.orders.length; ocounter++) {
                    if ($scope.showData.orders[ocounter].temporalQuantity) {
                        $scope.showData.orders[ocounter].quantity = parseInt($scope.showData.orders[ocounter].quantity) - parseInt($scope.showData.orders[ocounter].temporalQuantity);
                        $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[ocounter].product.clientId, QNTY: $scope.showData.orders[ocounter].temporalQuantity });
                        $scope.showData.orders[ocounter].temporalQuantity = null;
                    }
                    else
                        $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[ocounter].product.clientId, QNTY: 1 });
                    if ($scope.showData.orders[ocounter].status != $rootScope.orderStatusmanager.TEMPORAL) {
                        if (parseInt($scope.showData.orders[ocounter].quantity) > 0)
                            filterOrdered.push($scope.showData.orders[ocounter]);
                    }
                }
                $scope.showData.orders = filterOrdered;
            }
            $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            alertservice.showAlert('success', "success", "Temporary  items removed successfully from the order..")
            var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj)
        }

        $scope.item = null;
        $scope.openRemoveModal = function (or) {
            $scope.item = or;
            $scope.openModal('modalRemoveOrder')
        }

        $scope.removeItem = function () {
            $('#modalRemoveOrder').modal('hide');
            for (var i = 0; i < $scope.showData.orders.length; i++) {
                if ($scope.showData.orders[i].clientId == $scope.item.clientId) {
                    if ($scope.item.status == $rootScope.orderStatusmanager.TEMPORAL
                        || $scope.item.status == $rootScope.orderStatusmanager.PLACED) {
                        if ($scope.showData.orders[i].temporalQuantity) {
                            $scope.showData.orders[i].quantity = parseInt($scope.showData.orders[i].quantity) - 1;
                            $scope.showData.orders[i].temporalQuantity = parseInt($scope.showData.orders[i].temporalQuantity) - 1;
                            $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[i].product.clientId, QNTY: 1 });
                            //$scope.showData.orders[i].temporalQuantity = null;
                            if (parseInt($scope.showData.orders[i].quantity) == 0)
                                $scope.showData.orders.splice(i, 1);
                        }
                        else {
                            $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[i].product.clientId, QNTY: 1 });
                            $scope.showData.orders.splice(i, 1);
                            if ($scope.item.status == $rootScope.orderStatusmanager.PLACED) {
                                //delete from the database as well if it is in placced mode
                                var obj = {
                                    Invoice: $scope.showData,
                                    Order: $scope.item
                                }
                                cashierBillsServiceFn.removeOrder(obj).then(function (response) {
                                    console.log(response);
                                    alertservice.showAlert('failed', "Failed", "Item has been removed successfully")
                                }, function (err) { });
                                //restore inventoty here
                            }
                        }
                    }
                }
            }
            $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            $scope.updateToAllInvoice($scope.showData);
            var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj);
        }

        $scope.startPlaceOrder = function (noActive) {
            console.log($scope.showData);
            var orderToPlaced = [];
            if ($scope.showData && $scope.showData.orders && $scope.showData.orders.length > 0) {
                if (!noActive) $scope.activateInventory();
                //add orders to the database those are temporal state
                var isAnyNewOrderPlacced = false;
                for (var ocounter = 0; ocounter < $scope.showData.orders.length; ocounter++) {
                    if ($scope.showData.orders[ocounter].status == $rootScope.orderStatusmanager.TEMPORAL) {
                        isAnyNewOrderPlacced = true;
                        $scope.showData.orders[ocounter].status = $rootScope.orderStatusmanager.PLACED;
                        var orderObj = $scope.showData.orders[ocounter];
                        var obj = {
                            clientId: orderObj.clientId,
                            note: orderObj.note,
                            invoiceId: $scope.showData.clientId,
                            quantity: orderObj.quantity,
                            product: orderObj.product._id,
                            ingredient: orderObj.ingredient,
                            variation: orderObj.variation,
                            extraingredient: orderObj.extraingredient,
                            status: orderObj.status,
                            restaurantId: getEmployee.restaurant
                        };
                        orderToPlaced.push(obj);
                    } else {
                        //check for temporal quantity
                        if ($scope.showData.orders[ocounter].temporalQuantity) {
                            //set quantity for  order
                            //$scope.showData.orders[ocounter].quantity = quantity;
                            var obj = $scope.showData.orders[ocounter];
                            obj.invoiceId = $scope.showData.clientId;
                            cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                console.log(response);
                                $('#modalCancelOrder').modal('hide');
                            }, function (err) { });
                            $scope.showData.orders[ocounter].temporalQuantity = null;
                        }
                    }
                }
                if (isAnyNewOrderPlacced) {
                    $scope.showData.invoiceStatus = $rootScope.invoiceStatusmanager.STARTED;
                    cashierBillsServiceFn.UpdateInvoiceStatus($scope.showData).then(function (response) {
                        console.log(response);
                    }, function (err) { });

                    for (var olist = 0; olist < orderToPlaced.length; olist++) {
                        var obj = orderToPlaced[olist];
                        $rootScope.socket.emit('orderPlaced', { Order: obj, ResId: getEmployee.restaurant });
                        if ($scope.printOrderEnabled) {

                            var printObj = orderObj;

                            printObj.client = $scope.showData.clientName;
                            if ($scope.showData.tables && typeof $scope.showData.tables != 'undefined') {
                                printObj.tableName = $scope.showData.tables.roomid.name;
                                printObj.tableNum = $scope.showData.tables.number;
                            }
                            printObj.time = $scope.showData.created_at;
                            console.log('show data: ', $scope.showData);

                            utilservice.printOrder(printObj);
                        }
                    }

                    cashierBillsServiceFn.placeOrder(orderToPlaced).then(function (res) {
                        $scope.showData.invoiceStatus = $rootScope.invoiceStatusmanager.STARTED;
                        cashierBillsServiceFn.UpdateInvoiceStatus($scope.showData).then(function (response) {
                            console.log(response);
                        }, function (err) { });
                    }, failPayload)
                }
            } else {
                alertservice.showAlert('failed', "Failed", "There is no item in this invoice")
            }
        }
        //Order logic code end

        //Split invoice logic start
        $scope.allCloseInvoice = [];
        $scope.currentSplitOrder = false;
        $scope.splittedInvoice = null;
        $scope.currentSplitItem = {
            Item: null,
            Direction: null
        }
        $scope.MoveItem = function (item, direction) {
            if ($scope.currentSplitOrder) {
                $scope.currentSplitItem = {
                    Item: item,
                    Direction: direction //$rootScope.SplitItemDirection.FORWARD
                }
                $("#modalMoveItem").modal('show');
            } else {
                alertservice.showAlert('success', "Success", "Create new bill before splitting the item")
            }
        }


        $scope.SplitItem = function () {
            var splitItemDetails = angular.copy($scope.currentSplitItem)
            var item = splitItemDetails.Item;
            $("#modalMoveItem").modal('hide');
            if ($rootScope.SplitItemDirection.FORWARD == splitItemDetails.Direction) {
                //left hand
                var isQuantityGreaterThanZero = true;
                for (var odCounter = 0; odCounter < $scope.showData.orders.length; odCounter++) {
                    if ($scope.showData.orders[odCounter].clientId == item.clientId) {
                        var quantity = $scope.showData.orders[odCounter].quantity;
                        if (quantity > 0) {
                            isQuantityGreaterThanZero = true;
                            quantity--;
                            if (quantity == 0) {
                                $scope.showData.orders.splice(odCounter, 1);
                                //remove the order from invoice
                                cashierBillsServiceFn.removeOrderFromInvoice({ clientId: item.clientId, invoiceId: $scope.showData.clientId }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');
                                }, function (err) { });
                            } else {
                                $scope.showData.orders[odCounter].quantity = quantity;
                                var obj = $scope.showData.orders[odCounter];
                                obj.invoiceId = $scope.showData.clientId;
                                cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');
                                }, function (err) { });
                            }
                        }
                    }
                }

                //right hand
                if (isQuantityGreaterThanZero) {
                    var isItemExistInSplittedInvoice = false;
                    if ($scope.splittedInvoice.orders && $scope.splittedInvoice.orders.length > 0) {
                        for (var odCounter = 0; odCounter < $scope.splittedInvoice.orders.length; odCounter++) {
                            if ($scope.splittedInvoice.orders[odCounter].clientId == item.clientId) {
                                isItemExistInSplittedInvoice = true;
                                var quantity = $scope.splittedInvoice.orders[odCounter].quantity;
                                quantity++;
                                $scope.splittedInvoice.orders[odCounter].quantity = quantity;
                                var obj = $scope.splittedInvoice.orders[odCounter];
                                //set the quantity of the order
                                obj.invoiceId = $scope.showData.clientId;
                                cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');

                                }, function (err) { });
                            }
                        }
                        if (!isItemExistInSplittedInvoice) {
                            var itemToAdd = angular.copy(item);
                            itemToAdd.quantity = 1;
                            itemToAdd.invoiceId = $scope.splittedInvoice.clientId;
                            //item.clientId = guid();
                            $scope.splittedInvoice.orders.push(item);
                            //add the order to the invoice
                            delete itemToAdd._id;
                            cashierBillsServiceFn.addOrderToSplittedInvoice({ item: itemToAdd }).then(function (response) {
                                console.log(response);
                                $('#modalCancelOrder').modal('hide');
                            }, function (err) { });
                        }
                    }
                    else {
                        $scope.splittedInvoice.orders = [];
                        var itemToAdd = angular.copy(item);
                        itemToAdd.quantity = 1;
                        itemToAdd.invoiceId = $scope.splittedInvoice.clientId;
                        $scope.splittedInvoice.orders.push(itemToAdd);
                        delete itemToAdd._id;
                        cashierBillsServiceFn.addOrderToSplittedInvoice({ item: itemToAdd }).then(function (response) {
                            console.log(response);
                            $('#modalCancelOrder').modal('hide');
                        }, function (err) { });
                    }
                }
            }
            else if ($rootScope.SplitItemDirection.BACKWORD == splitItemDetails.Direction) {
                //left hand
                var isQuantityGreaterThanZero = true;
                for (var odCounter = 0; odCounter < $scope.splittedInvoice.orders.length; odCounter++) {
                    if ($scope.splittedInvoice.orders[odCounter].clientId == item.clientId) {
                        var quantity = $scope.splittedInvoice.orders[odCounter].quantity;
                        if (quantity > 0) {
                            isQuantityGreaterThanZero = true;
                            quantity--;
                            if (quantity == 0) {
                                $scope.splittedInvoice.orders.splice(odCounter, 1);
                                cashierBillsServiceFn.removeOrderFromInvoice({ clientId: item.clientId, invoiceId: $scope.splittedInvoice.clientId }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');

                                }, function (err) { });
                            } else {
                                $scope.splittedInvoice.orders[odCounter].quantity = quantity;
                                var obj = $scope.splittedInvoice.orders[odCounter];
                                obj.invoiceId = $scope.splittedInvoice.clientId;
                                cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');

                                }, function (err) { });
                            }
                        }
                    }
                }

                //right hand
                if (isQuantityGreaterThanZero) {
                    var isItemExistInExistingInvoice = false;
                    if ($scope.showData.orders && $scope.showData.orders.length > 0) {
                        for (var odCounter = 0; odCounter < $scope.showData.orders.length; odCounter++) {
                            if ($scope.showData.orders[odCounter].clientId == item.clientId) {
                                isItemExistInExistingInvoice = true;
                                var quantity = $scope.showData.orders[odCounter].quantity;
                                quantity++;
                                $scope.showData.orders[odCounter].quantity = quantity;
                                var obj = $scope.showData.orders[odCounter];
                                //set the quantity of the order
                                obj.invoiceId = $scope.showData.clientId;
                                cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                    console.log(response);
                                    $('#modalCancelOrder').modal('hide');

                                }, function (err) { });
                            }
                        }
                        if (!isItemExistInExistingInvoice) {
                            var itemToAdd = angular.copy(item);
                            itemToAdd.quantity = 1;
                            itemToAdd.invoiceId = $scope.showData.clientId;
                            item.quantity = 1;
                            $scope.showData.orders.push(item);
                            delete itemToAdd._id;
                            cashierBillsServiceFn.addOrderToSplittedInvoice({ item: itemToAdd }).then(function (response) {
                                console.log(response);
                                $('#modalCancelOrder').modal('hide');

                            }, function (err) { });
                        }
                    }
                    else {
                        $scope.showData.orders = [];
                        $scope.showData.orders.push(item);
                        var itemToAdd = angular.copy(item);
                        itemToAdd.quantity = 1;
                        itemToAdd.invoiceId = $scope.showData.clientId;
                        delete itemToAdd._id;
                        cashierBillsServiceFn.addOrderToSplittedInvoice({ item: itemToAdd }).then(function (response) {
                            console.log(response);
                            $('#modalCancelOrder').modal('hide');

                        }, function (err) { });
                    }
                }
            }
            alertservice.showAlert('failed', "Failed", "Successfully Order Move..")

            for (var i = 0; i < $scope.allInvoice.length; i++) {
                if ($scope.allInvoice[i].clientId == $scope.splittedInvoice.clientId) {
                    $scope.allInvoice[i].orders = $scope.splittedInvoice.orders
                    $scope.allInvoice[i].prices = cashierBillsServiceFn.priceCalculation($scope.splittedInvoice.orders);
                }
            }

            $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            $scope.splittedInvoice.prices = cashierBillsServiceFn.priceCalculation($scope.splittedInvoice.orders);

            var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj);

            var sokectObjSplit = { Invoice: $scope.splittedInvoice, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObjSplit);
        }


        $scope.createNewSplitInvoice = function (invoice) {
            $scope.splittedInvoice = angular.copy(invoice);
            $scope.splittedInvoice.clientId = utilservice.generateGUID();
            $scope.splittedInvoice.updated_at = new Date();
            $scope.splittedInvoice.created_at = new Date();
            var invoices = angular.copy($scope.allInvoice);
            if($scope.allCloseInvoice.length) {
              invoices = invoices.concat($scope.allCloseInvoice);
            }
            var obj = _.filter(invoices, function (num) { return num.clientName.split("(")[0] == $scope.splittedInvoice.clientName.split("(")[0]; });
            $scope.splittedInvoice.SplitinvoiceName = $scope.splittedInvoice.clientName.split("(")[0] + "(" + obj.length + ")";
            $scope.splittedSelectedTable ={};
          $scope.splittedSelectedTable = invoice.tables?invoice.tables:$scope.tables[0];
          $scope.selectedTable = invoice.tables?invoice.tables:$scope.tables[0];
            $scope.splittedInvoice.orders = [];
            $scope.splittedInvoice.prices = cashierBillsServiceFn.priceCalculation($scope.splittedInvoice.orders);
            $scope.splittedInvoice.people = 1;
            $scope.splittedInvoice.editable = false;
        }

        $scope.ChangeSplitInvoice = function (invoice) {
            $scope.splittedInvoice = angular.copy(invoice);
            $scope.splittedInvoice.editable = false;
            $scope.invoiceFocus = true;
            $scope.currentSplitOrder = true;
        }

        $scope.cancelSlitted = function () {
            if ($scope.splittedInvoice.orders.length > 0) {
                for (var scount = 0; scount < $scope.splittedInvoice.orders.length; scount++) {
                    for (var icount = 0; icount < $scope.showData.orders.length; icount++) {
                        if ($scope.showData.orders[icount]._id == $scope.splittedInvoice.orders[scount]._id) {
                            $scope.showData.orders[icount].quantity = parseInt($scope.showData.orders[icount].quantity) + parseInt($scope.splittedInvoice.orders[scount].quantity)
                        }
                    }
                }
                $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            }
            $('#modalCancelSplit').modal('hide');
            $scope.splittedInvoice.orders = [];
            $scope.compareBill1();
        }

        $scope.addSlittedInvoice = function () {
            delete $scope.splittedInvoice['_id'];
            delete $scope.splittedInvoice.invoiceNumber;
            $scope.splittedInvoice.orders = [];
            $scope.splittedInvoice.updated_at = new Date();
            $scope.splittedInvoice.created_at = new Date();
            $scope.getInvoiceNumber().then(function(number) {
                $scope.splittedInvoice.invoiceNumber  = number.no;
                cashierBillsServiceFn.addSingleInvoiceToLocalDB($scope.splittedInvoice).then(function (response) {
                $scope.allInvoice.push(response);
                $scope.splittedInvoice.prices = cashierBillsServiceFn.priceCalculation($scope.splittedInvoice.orders);
                $scope.$emit("syncInvoice", response);
                alertservice.showAlert('error', "success", "Successfully Invoice Split.. ");
              });
              });
             //$scope.splittedInvoice.invoiceNumber = res.invoiceNumber;

        }

        $scope.cancelSlittedInvoice = function () {
            if ($scope.splittedInvoice.orders.length > 0) {
                for (var scount = 0; scount < $scope.splittedInvoice.orders.length; scount++) {
                    for (var icount = 0; icount < $scope.showData.orders.length; icount++) {
                        if ($scope.showData.orders[icount]._id == $scope.splittedInvoice.orders[scount]._id) {
                            $scope.showData.orders[icount].quantity = parseInt($scope.showData.orders[icount].quantity) + parseInt($scope.splittedInvoice.orders[scount].quantity)
                        }
                    }
                }
                $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            }

            $('#modalCancelSplitOrder').modal('hide');
            // $scope.splittedInvoice = null;
            $scope.invoiceFocus = false;
            $scope.tricolInventoryActive = false;
            if ($scope.compareBillActive) {
                $scope.compareBillActive = false;
                $scope.currentSplitOrder = false;
            } else {
                $scope.compareBillActive = true;
            }
        }

        $scope.Splitpayment = function () {
            for (var scount = 0; scount < $scope.splittedInvoice.orders.length; scount++) {
                cashierBillsServiceFn.addInvoinAndOrderInShift($scope.splittedInvoice.orders[scount]._id, 'ORDER');
            }
            $scope.splittedInvoice.invoiceStatus = "PAID";
            cashierBillsServiceFn.SplitInvoiceStatus($scope.splittedInvoice).then(function (response) {
                $scope.processPayment();
                $scope.compareBill1();
                alertservice.showAlert('error', "Failed", "Payment successfully done");
            }, function (err) { console.log(err) });
        }
        //Split invoice logic end

        //Product logic start
        $scope.getCategories = function () {
            serviceFun.GetCategory().then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].ParentCategory) {
                        res[i].NameSpace = res[i].Name.replace(/\s/g, '');
                        $scope.allSubCategory.push(res[i]);
                    }
                    else {
                        $scope.allCategory.push(res[i]);
                    }
                }
              
                for (var i = 0; i < $scope.allCategory.length; i++) {
                    for (var j = 0; j < $scope.Allproducts.length; j++) {
                        if ($scope.Allproducts[j].ParentCategory && $scope.Allproducts[j].ParentCategory.clientId == $scope.allCategory[i].clientId) {
                            $scope.allCategory[i].image = $scope.Allproducts[j].image;
                        }
                    }
                }
                if ($scope.allCategory.length > 0) {
                    $scope.getProductdetail($scope.allCategory[0], 0)
                    $("#pdbox").addClass("active");
                }
            }, failPayload)
        }

        $scope.getProduct = function () {
            serviceFun.GetProducts().then(function (res) {
                $scope.getCategories();
                $scope.Allproducts = res;
                for (var i = 0; i < $scope.allCategory.length; i++) {
                    for (var j = 0; j < $scope.Allproducts.length; j++) {
                        //$scope.Allproducts[j].ParentCategory.clientId == $scope.allCategory[i].clientId
                        if ($scope.Allproducts[j].ParentCategory.clientId == $scope.allCategory[i].clientId) {
                            $scope.allCategory[i].image = $scope.Allproducts[j].image;
                        }
                    }
                }
            }, failPayload)
        }

        $scope.getProductdetail = function (data, ref) {
            $scope.categoryName1 = data;
            $scope.showProduct = [];
            $scope.copy_categoryName1 = angular.copy($scope.categoryName1);
            $scope.showSubCategory = [];
            var checkAvailability = false;
            $scope.showSubCategory = _.filter($scope.allSubCategory, function (num) { return num.ParentCategory.clientId == data.clientId; });
           // if ($scope.showSubCategory.length > 0) {
                $scope.showProduct = _.filter($scope.Allproducts, function (num) {
                    if (num.ParentCategory) {
                        return utilservice.idMatcher(data.clientId, num.ParentCategory)
                    }
                    //return _.each($scope.showSubCategory, function (sub) {
                    //     if(num && num.Category)
                    //         return utilservice.idMatcher(num.Category.clientId, sub.ParentCategory)
                    //});
                });
                // $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                // $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
          //  }
            $("#pdbox").addClass("active");
        }


        $scope.getImagefromCat = function (category) {
            var imgUrl = '';
            $scope.Allproducts.some(function (product) {
                if (product.Category && category._id == product.ParentCategory._id) {
                    imgUrl = product.image;
                    return true;
                }
                return false;
            })
            return imgUrl;
        };


        $scope.getProductdetailBySubcateId = function (data) {
            for (var count = 0; count < $scope.showSubCategory.length; count++) {
                if ($scope.showSubCategory[count]._id == data._id) {
                    $("#" + $scope.showSubCategory[count].NameSpace).css('background-color', '#ff5722');
                    $("#" + $scope.showSubCategory[count].NameSpace).css('color', 'white');
                }
                else {
                    $("#" + $scope.showSubCategory[count].NameSpace).css('background-color', '');
                    $("#" + $scope.showSubCategory[count].NameSpace).css('color', '');
                }
            }
            $scope.showProduct = _.filter($scope.Allproducts, function (num) { return num.Category._id == data._id; });
        }
        $scope.getProduct();
        //product logic end

        //Add prodct logic start
        $('#addOrderItem').on('shown.bs.modal', function () {
            $.material.checkbox();
            $.material.radio();
            $.material.input()
            try { $("#txtnotearea").parent().css('margin-top', '0px'); }
            catch (err) { }
        });
        $scope.selectedIngredient = []
        $scope.selectedVari;
        $scope.selectedExtIn = []
        $scope.selectExtIn = function (ing) {
            var check = true;
            if ($scope.selectedExtIn.length > 0) {
                for (var i = 0; i < $scope.selectedExtIn.length; i++) {
                    if ($scope.selectedExtIn[i] == ing)
                        $scope.selectedExtIn.splice(i, 1);
                    else
                        check = false;
                }
                if (!check)
                    $scope.selectedExtIn.push(ing);
            }
            else {
                $scope.selectedExtIn.push(ing);
            }
        }

        $scope.selectIngredient = function (ing) {
            var check = true;
            if ($scope.selectedIngredient.length > 0) {
                for (var i = 0; i < $scope.selectedIngredient.length; i++) {
                    if ($scope.selectedIngredient[i] == ing.name.Name) {

                        $scope.selectedIngredient.splice(i, 1);
                    }
                    else {
                        check = false;
                    }
                }
                if (!check)
                    $scope.selectedIngredient.push(ing.name.Name);
            }
            else {
                $scope.selectedIngredient.push(ing.name.Name);
            }

        }

        $scope.selectVari = function (ing) {
            $scope.selectedVari = ing.Name;
        }

        $scope.onAddExtraIngredients = function (suggestion) {
            if ($scope.extraIngredients.indexOf(suggestion) > 0) { } else {
                $scope.extraIngredients.push(suggestion)
            }
            console.log($scope.extraIngredients);
            setTimeout(function () {
                $.material.checkbox();
                $.material.radio();
            }, 200);

        }

        $scope.onSelectExtraIngredient = function (imgname) {
            var i = $scope.extraIngredients.indexOf(imgname);
            $scope.extraIngredients.splice(i, 0);
        }
        //Add product logic end

        //Payment board related code start
        $scope.payAmount = 0;
        $scope.enableDoneButton = true;
        $scope.invoiceAmount = null;
        $scope.getCurrentInvoiceTotal = function (type) {
            if (type != 'SplitInvoice')
                return angular.copy($scope.showData.prices.grandtotal);
            else
                return angular.copy($scope.splittedInvoice.prices.grandtotal);
        }

        $scope.enterNumber = function (number, type) {
            var total = $scope.getCurrentInvoiceTotal(type);
            if ($scope.payAmount == 0)
                $scope.payAmount = parseInt(number);
            else
                $scope.payAmount = parseInt(String($scope.payAmount) + String(number));
            $scope.payAmount1 = parseInt($scope.payAmount) - total;
            $scope.invoiceAmount = total;
        }

        $scope.addNumber = function (number, type) {
            var total = $scope.getCurrentInvoiceTotal(type);
            if ($scope.payAmount && $scope.payAmount != "") {
                $scope.payAmount = parseInt($scope.payAmount) + parseInt(number);
                $scope.payAmount1 = parseInt($scope.payAmount) - total;
            }
            else
                $scope.payAmount = parseInt(number);
        }

        $scope.backspace = function (type) {
            var total = $scope.getCurrentInvoiceTotal(type);
            if ($scope.payAmount < 10) {
                $scope.payAmount = 0;
                $scope.payAmount1 = parseInt($scope.payAmount) - total;
            }
            else {
                $scope.payAmount = parseInt(String($scope.payAmount).slice(0, -1));
                $scope.payAmount1 = parseInt($scope.payAmount) - total;
            }
        }

        $scope.Exact = function (type) {
            $scope.payAmount = $scope.getCurrentInvoiceTotal(type);
            $scope.payAmount1 = 0;
        }

        $scope.processPayment = function (type) {
            $scope.invoiceFocus = false;
            $scope.procesorActive = !$scope.procesorActive;
            $scope.payAmount = 0;
            var total = $scope.getCurrentInvoiceTotal(type);
            if (total > 0) {
                $scope.payAmount1 = -total;
                $scope.invoiceAmount = angular.copy(total);
            }
            else
                alertservice.showAlert('error', "Failed", "There is no order.. ");
        }

        $scope.processPaymentInvoice = function (type) {
            $scope.payAmount = 0;
            if (type == 'Invoice') {
                if ($scope.showData.orders.length > 0) {
                    $scope.payAmount1 = -$scope.showData.prices.grandtotal;
                    $scope.invoiceAmount = angular.copy($scope.showData.prices.grandtotal);
                    $scope.invoiceFocus = false;
                    $scope.procesorActive = !$scope.procesorActive;
                }
                else
                    alertservice.showAlert('error', "Failed", "There is no order.. ");
            }
            else if (type == 'SplitInvoice') {
                if ($scope.splittedInvoice.orders.length > 0) {
                    $scope.payAmount1 = -$scope.splittedInvoice.prices.grandtotal;
                    $scope.invoiceAmount = angular.copy($scope.splittedInvoice.prices.grandtotal);
                    $scope.invoiceFocus = false;
                    $scope.procesorActive = !$scope.procesorActive;
                }
                else
                    alertservice.showAlert('error', "Failed", "There is no order.. ");
            }
        }

        $scope.paymentDone = function (type) {
            debugger;
            $scope.processPayment("");
            if (type != 'Invoice') {
                $scope.splittedInvoice.invoiceStatus = "CLOSED";
                cashierBillsServiceFn.closeInvoice($scope.splittedInvoice.clientId).then(function (response) {
                    console.log(response);
                    if (response.Error) {
                        for (var i = 0; i < $scope.allInvoice.length; i++) {
                            if ($scope.allInvoice[i].clientId == $scope.splittedInvoice.clientId) {
                                $scope.allInvoice[i].invoiceStatus = "STARTED";
                                $scope.splittedInvoice.editable = true;
                                $scope.allCloseInvoiceShow = false;
                            }
                        }
                        alertservice.showAlert('error', "Failed", "Something Goes Wrong try again ");
                    } else {
                        for (var i = 0; i < $scope.allInvoice.length; i++) {
                            if ($scope.allInvoice[i].clientId == $scope.splittedInvoice.clientId) {
                                $scope.allInvoice[i].invoiceStatus = "CLOSED";

                                $scope.allCloseInvoice.push($scope.allInvoice[i]);
                                $scope.allInvoice.splice(i, 1);
                            }
                        }
                        alertservice.showAlert('error', "Failed", "Payment done successfully..");
                        $scope.invoiceFocus = false;
                        $scope.tricolInventoryActive = false;
                        $scope.compareBill1();
                        $scope.createNewSplitInvoice($scope.showData);
                    }
                }, failPayload);
                var sokectObj = { Invoice: $scope.splittedInvoice, ResId: getEmployee.restaurant };
                $rootScope.raiseSocketEvent('invoiceClose', sokectObj);
            }
            else {
                $scope.showData.invoiceStatus = "CLOSED";
                $scope.showData.editable = false;
                cashierBillsServiceFn.closeInvoice($scope.showData.clientId).then(function (response) {
                    console.log(response);
                    if (response.Error) {
                        for (var i = 0; i < $scope.allInvoice.length; i++) {
                            if ($scope.allInvoice[i].clientId == $scope.showData.clientId) {
                                $scope.allInvoice[i].invoiceStatus = "STARTED";
                                $scope.showData.editable = true;
                                $scope.allCloseInvoiceShow = false;
                            }
                        }
                        alertservice.showAlert('error', "Failed", "Something Goes Wrong try again ");
                    } else {
                        for (var i = 0; i < $scope.allInvoice.length; i++) {
                            if ($scope.allInvoice[i].clientId == $scope.showData.clientId) {
                                $scope.allInvoice[i].invoiceStatus = "CLOSED";
                                $scope.allCloseInvoice.push($scope.allInvoice[i]);
                                $scope.allInvoice.splice(i, 1);
                            }
                        }
                        alertservice.showAlert('error', "Failed", "Payment done successfully..");
                    }
                }, failPayload);
                var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
                $rootScope.raiseSocketEvent('invoiceClose', sokectObj);
            }
        }

        $scope.$watch('payAmount', function () {
            var amoutToCheck = 0;
            if ($scope.payAmount != '')
                amoutToCheck = $scope.payAmount;
            if (parseFloat(amoutToCheck) >= parseFloat($scope.invoiceAmount))
                $scope.enableDoneButton = true;
            else
                $scope.enableDoneButton = false;
        });
        //Payment  board releated code end

        $scope.finish = function () {
            cashierBillsServiceFn.finishSplit($scope.showData).then(function (response) {
                $scope.compareBill();
                alertservice.showAlert('error', "Failed", "Split successfully finish");
            }, function (err) { console.log(err) });
        }

        $scope.editClose = function (index) {
            $("#cat" + index).parent('.product-category').toggleClass("active");
        }

        $scope.isCurrentRoomInvoice = function (invoice) {
            if ($scope.roombj) {
                if (invoice.tables.roomid._id == $scope.roombj._id)
                    return true;
                else
                    return false;
            } else
                return false;
        }

        $scope.isCurrentTableInvoice = function (invoice) {
            if ($scope.isCurrentRoomInvoice(invoice)) {
                if ($scope.currentOpenTable) {
                    if ($scope.currentOpenTable._id == invoice.tables._id)
                        return true;
                    else
                        return false;
                } else
                    return false;
            } else
                return false;
        }

        //Real time order tracking code start
        $scope.$on('onOrderStarted', function (eve, orderDetails) {
            var order = orderDetails.orderId;
            var index = getOrderIndex($scope.showData, order.clientId, order.invoiceId)
            if (index >= 0)
                $scope.showData.orders[index].status = $rootScope.orderStatusmanager.STARTED;

            var invoice = orderDetails.INV;
            if ($scope.allInvoice) {
                for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                    if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                        for (var odCounter = 0; odCounter < $scope.allInvoice[invCounter].orders.length; odCounter++) {
                            if ($scope.allInvoice[invCounter].orders[odCounter].clientId == order.clientId) {
                                $scope.allInvoice[invCounter].orders[odCounter].status = $rootScope.orderStatusmanager.STARTED;
                            }
                        }
                    }
                }
            }
            $scope.$apply();
        });

        $scope.$on('onChangeInvoiceMetaData', function (eve, sokectObj) {
            var invoice = sokectObj.Invoice;
            if ($scope.isCurrentRoomInvoice(invoice)) {
                if ($scope.allInvoice) {
                    for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                        if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                            $scope.allInvoice[invCounter].clientName = invoice.clientName;
                            $scope.allInvoice[invCounter].servedby = invoice.servedby;
                            $scope.allInvoice[invCounter].people = invoice.people;
                            $scope.allInvoice[invCounter].tables = invoice.tables;
                        }
                    }
                }
                if ($scope.isCurrentTableInvoice(invoice)) {
                    if ($scope.invoiceRepo) {
                        for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                            if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                                $scope.invoiceRepo[invCounter].clientName = invoice.clientName;
                                $scope.invoiceRepo[invCounter].servedby = invoice.servedby;
                                $scope.invoiceRepo[invCounter].people = invoice.people;
                                $scope.invoiceRepo[invCounter].tables = invoice.tables;
                            }
                        }
                    }
                    if ($scope.showData && $scope.showData.clientId == invoice.clientId) {
                        $scope.showData.clientName = invoice.clientName;
                        $scope.showData.servedby = invoice.servedby;
                        $scope.showData.people = invoice.people;
                        $scope.showData.tables = invoice.tables;
                    }
                }
                $scope.$apply();
            }
        });

        $scope.$on('onNewInvoice', function (eve, sokectObj) {
            var invoice = sokectObj.Invoice;
            if ($scope.isCurrentRoomInvoice(invoice)) {
                if ($scope.invoiceRepo && $scope.invoiceRepo.length > 0) {
                    var isExist = false;
                    for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                        if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                            isExist = true;
                        }
                    }
                    if (!isExist)
                        $scope.invoiceRepo.push(invoice);
                }
                else
                    $scope.invoiceRepo = [invoice];

                if ($scope.isCurrentTableInvoice(invoice)) {
                    if ($scope.allInvoice && $scope.allInvoice.length > 0) {
                        var isExist = false;
                        for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                            if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                isExist = true;
                            }
                        }
                        if (!isExist)
                            $scope.allInvoice.push(invoice);
                    }
                    else
                        $scope.allInvoice = [invoice];
                }
                $scope.$apply();
            }
        });

        $scope.$on('onChangeInvoiceOrders', function (eve, sokectObjNative) {
            var sokectObj = angular.copy(sokectObjNative);

            console.log("recieved client id -" + sokectObj.Invoice.clientId);
            var invoice = sokectObj.Invoice;

            if ($scope.isCurrentRoomInvoice(invoice)) {
                if ($scope.invoiceRepo) {
                    for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                        if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                            console.log("allinvoice match");
                            console.log("match index is - " + invCounter)
                            $scope.invoiceRepo[invCounter].orders = angular.copy(invoice.orders);
                        }
                    }
                }

                if ($scope.isCurrentTableInvoice(invoice)) {
                    if ($scope.showData && $scope.showData.clientId == invoice.clientId) {
                        console.log("showdata match");
                        $scope.showData.orders = angular.copy(invoice.orders);
                    }
                    if ($scope.allInvoice) {
                        for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                            if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                console.log("allinvoice match");
                                console.log("match index is - " + invCounter)
                                $scope.allInvoice[invCounter].orders = angular.copy(invoice.orders);
                            }
                        }
                    }
                }
            }
            $scope.$apply();
        });

        $scope.$on('onInvoiceTableChange', function (eve, sokectObj) {
            console.log(sokectObj);
            var invoice = sokectObj.Invoice;
            if ($scope.roombj) {
                if (sokectObj.TBLS.NEW.roomid._id == $scope.roombj._id) {
                    //add to the invoicerepo
                    if ($scope.invoiceRepo && $scope.invoiceRepo.length > 0) {
                        var isExist = false;
                        for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                            if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                                isExist = true;
                                $scope.invoiceRepo[invCounter] = invoice;
                            }
                        }
                        if (!isExist)
                            $scope.invoiceRepo.push(invoice);
                    }
                    else
                        $scope.invoiceRepo = [invoice];
                    if ($scope.currentOpenTable) {
                        if (sokectObj.TBLS.NEW._id == $scope.currentOpenTable._id) {
                            //add to the allinvoice
                            if ($scope.allInvoice && $scope.allInvoice.length > 0) {
                                isExist = false;
                                for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                                    if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                        isExist = true;
                                        $scope.allInvoice[invCounter] = invoice;
                                    }
                                }
                                if (!isExist)
                                    $scope.allInvoice.push(invoice);
                            }
                            else
                                $scope.allInvoice = [invoice];
                        }
                        if (sokectObj.TBLS.OLD._id == $scope.currentOpenTable._id) {
                            if ($scope.allInvoice && $scope.allInvoice.length > 0) {
                                for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                                    if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                        $scope.allInvoice.splice(invCounter, 1);
                                    }
                                }
                            }
                        }
                    }
                }
                else if (sokectObj.TBLS.OLD.roomid._id == $scope.roombj._id) {
                    //remove from teh invoice repo
                    if ($scope.invoiceRepo && $scope.invoiceRepo.length > 0) {
                        for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                            if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                                $scope.invoiceRepo.splice(invCounter, 1);
                            }
                        }
                    }
                    if ($scope.currentOpenTable) {
                        if (sokectObj.TBLS.OLD._id == $scope.currentOpenTable._id) {
                            //remove from the allinvoice
                            if ($scope.allInvoice && $scope.allInvoice.length > 0) {
                                for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                                    if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                        $scope.allInvoice.splice(invCounter, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $scope.$apply();
        });

        $scope.$on('onInvoiceClose', function (eve, sokectObj) {
            var invoice = sokectObj.Invoice;
            if ($scope.isCurrentRoomInvoice(invoice)) {
                if ($scope.invoiceRepo) {
                    for (var invCounter = 0; invCounter < $scope.invoiceRepo.length; invCounter++) {
                        if ($scope.invoiceRepo[invCounter] && $scope.invoiceRepo[invCounter].clientId == invoice.clientId) {
                            $scope.invoiceRepo[invCounter].invoiceStatus = "CLOSED";
                            $scope.invoiceRepo[invCounter].editable = false;
                            $scope.invoiceRepo.splice(invCounter, 1);
                        }
                    }
                }

                if ($scope.isCurrentTableInvoice(invoice)) {
                    if ($scope.showData && $scope.showData.clientId == invoice.clientId) {
                        $scope.showData.invoiceStatus = "CLOSED";
                        $scope.showData.editable = false;
                    }
                    if ($scope.allInvoice) {
                        for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                            if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                                $scope.allInvoice[invCounter].invoiceStatus = "CLOSED";
                                $scope.allInvoice[invCounter].editable = false;
                                $scope.allCloseInvoice.push($scope.allInvoice[invCounter]);
                                $scope.allInvoice.splice(invCounter, 1);
                            }
                        }
                    }
                    $scope.$apply();
                }
            }
        });

        $scope.$on('onShiftClosed', function (eve, sokectObj) {
            console.log(sokectObj);
            $("#shiftCloseModal").modal('show');
            //alert("Shift has been closed by manager, All orders will be archived automcatically");
            $scope.invoiceRepo = [];
            $scope.allInvoice = [];
            $scope.showData = {};
            $scope.splittedInvoice = {};
            $scope.allCloseInvoice = [];
            //$scope.$apply();
            setTimeout(function () {
                window.location = '/employee';
            }, 5000);
        });
        //Real time order tracking code end
    }

})();
