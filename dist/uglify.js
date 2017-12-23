!function(){"use strict";var e=null,l=null;angular.module("cashierBills",["application.thirdparty","autocomplete"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(r,t,i,o,n,a){function c(e){if(navigator.onLine)return e.authEmployee().then(function(e){return e});e.authEmployee()}function u(e){return navigator.onLine,e.CurrentEmployee().then(function(e){return e})}e=t,(l=r).state("cashierBills",{url:"/bills",templateUrl:a.TEMPLATE+"cashierBills/cashierBills.html",controller:"cashierBillsController",controllerAs:"vm",data:{pageTitle:"Bills",bodyClass:"menuavaled cashbills"},resolve:{employee:c,getEmployee:u}}),c.$inject=["empService"],u.$inject=["employeeprofileService"]}])}();
(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('cashierBills', [
            'application.thirdparty',
            'autocomplete'
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
            

                $stateProviderRef.state('cashierBills', {
                    url: '/bills',                    
                    templateUrl: path.TEMPLATE+'cashierBills/cashierBills.html',
                    controller  : 'cashierBillsController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Bills',bodyClass:"menuavaled cashbills"},
                    resolve: {
                        employee: auth,
                        getEmployee: ResolveEmployee
                        
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();



!function(){"use strict";function e(e,t,o,n,a,i,r,l,c,s,d,u,v,I,p,h,g,m,y){function f(e){console.log(e)}function w(e,t,o){var n=-1;if(e&&e.orders)for(var a=0;a<e.orders.length;a++)e.orders[a].clientId==t&&(n=a);return n}var D=g("lanapp",{adapter:"idb"});e.cashierBillsServiceFn=p,e.deepCopy=function(e){return angular.copy(e)},e.openModal=function(e){$("#"+e).modal("show")},e.hideModal=function(e){$("#"+e).modal("hide")},this.employee=v,e.table="Select Table",e.allIngedientsName=[],e.ingredientsInventory=[],e.allCloseInvoiceShow=!1,e.tax=15,e.Allproducts=[],e.allSubCategory=[],e.allCategory=[],e.extraIngredients=[],this.change=function(){s.updateUser(this.employee).then(function(e){navigator.onLine?e.success?(o.$broadcast("updatemployeelocaly"),I.showAlert("success","Success",e.message)):I.showAlert("failed","Failed",e.message):I.showAlert("success","Success","Updated")},f)},e.initModule=function(){p.GetInvoice().then(function(t){e.allInvoice=[];for(var o=0;o<t.length;o++)t[o].restaurant==v.restaurant&&(t[o].css="list-group-item",t[o].prices=p.priceCalculation(t[o].orders),p.updateSingleInvoiceToLocalDB(t[o]),e.allInvoice.push(t[o]));e.allCloseInvoice=_.reject(e.allInvoice,function(e){return"CLOSED"!=e.invoiceStatus}),e.allInvoice=_.reject(e.allInvoice,function(e){return"CLOSED"==e.invoiceStatus}),t&&t.length>0&&e.Tabledetail(e.allInvoice[0],!0),e.invoiceActive=!1},f),m.loadTables().then(function(t){console.log("tble respnse"),console.log(t);for(var o=[{_id:-1,number:"No Table"}],n=0;n<t.length;n++)t[n].restaurant==v.restaurant&&o.push(t[n]);e.tables=o},f),h.GetIngedients().then(function(t){if(e.allIngedients=t,e.ingredientsInventory=angular.copy(t),e.allIngedients)for(var o=0;o<e.allIngedients.length;o++)e.allIngedientsName.indexOf(e.allIngedients[o].Name)>0||e.allIngedientsName.push(e.allIngedients[o].Name)},f),i.get("/api/get/employee",v.restaurant).then(function(t){e.Allemployee=[{_id:-1,firstname:"No Waiter"}];for(var o=0;o<t.data.data.length;o++)e.Allemployee.push(t.data.data[o])},f),m.loadShift().then(function(e){e||(window.location="/employee")})},e.updateToAllInvoice=function(t){for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==t.clientId&&e.allInvoice[o]},e.initModule(),e.invoiceActive=!1,e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBillActive=!1,e.procesorActive=!1,$(".product-category > .panel-heading, .product-category > img").click(function(){$(this).parent(".product-category").toggleClass("active")}),$(".product-panel").click(function(){$("#addOrderItem").modal("show")}),e.backInvoice=function(){e.invoiceActive=!1,e.tricolInventoryActive=!1,e.compareBillActive=!1,e.procesorActive=!1,e.invoiceFocus=!1,e.currentSplitOrder=!1},e.compareBill=function(){e.invoiceFocus=!1,e.tempddata=e.showData,e.tricolInventoryActive=!1,e.compareBillActive?(e.compareBillActive=!1,e.currentSplitOrder=!1):(e.compareBillActive=!0,e.createNewSplitInvoice(e.showData)),e.compareBillActive&&!e.currentSplitOrder||e.createNewSplitInvoice(e.showData)},e.compareBill1=function(){e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.currentSplitOrder=!1,e.compareBillActive=!0},e.unfocusInvoice=function(){e.invoiceFocus=!1,$(".product-category").removeClass("active")},e.focusInvoice=function(){e.invoiceFocus=!0,e.currentSplitOrder=!0,e.splittedInvoice.tables=e.selectedTable,e.splittedSelectedTable=angular.copy(e.selectedTable),e.splittedInvoice.clientName=e.splittedInvoice.SplitinvoiceName,e.addSlittedInvoice()},e.Tabledetail=function(t,o){e.invoiceActive=!0,e.hideRow=!0,e.showData=t,e.showData.editable=o,e.showData.orders&&e.showData.orders.length>0?e.hideRow=!1:e.showData.orders=[],e.showData.prices=p.priceCalculation(e.showData.orders),e.setActiveInvoiceTableAndEmployeeIndex()},e.$on("syncInvoice",function(t,n){console.log(n);var a={Invoice:n,ResId:v.restaurant};o.socket.emit("newInvoice",a),delete n._id,i.post("/api/v1/invoice",n).then(function(t){e.allInvoice[e.allInvoice.length-1]._id=t.data._id,p.addInvoinAndOrderInShift(t.data._id,"INVOICE").then(function(e){},function(e){})},f)}),e.$on("syncInvoiceMetaData",function(e,t){D.get(t.clientId).then(function(e){console.log(e);var o=t;o._rev=e._rev,D.put(o).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc")}).catch(function(e){console.log("Error while updating Data to poch Db\n"),console.log(e)})}),console.log(t),p.syncInvoiceMetaData(t).then(function(){});var n={Invoice:t,ResId:v.restaurant};o.socket.emit("changeInvoiceMetaData",n)}),e.reinitlizeAddInvoiceModal=function(){e.name="",e.people=1,e.table="Select Table",$("#modalNewBill").modal("hide")},e.getInvoiceNumber=function(){return y(function(e,t){p.getBillNo().then(function(t){e({no:t.data.billNo})})})},e.addInvoice=function(){if(void 0!=e.name&&""!=e.name&&"Select Table"!=e.table){var t=_.find(e.tables,{_id:e.table}),o=_.find(e.Allemployee,{_id:e.Allemployee[1]._id}),n=p.defaultInvoiceObject(e.name,t,o,v.restaurant,e.people);e.getInvoiceNumber().then(function(t){n.invoiceNumber=t.no,p.addSingleInvoiceToLocalDB(n).then(function(t){console.log("add invoice rsponse"),console.log(t),e.reinitlizeAddInvoiceModal(),e.Tabledetail(t,!0),e.$emit("syncInvoice",t)})})}else alert("Fields cannot be null..")},e.EditInvoice=function(t,o){void 0!=t.clientName&&""!=t.clientName?(e.hideModal(o),e.$emit("syncInvoiceMetaData",t)):alert("Name cannot be null..")},e.people=1,e.isTableEditing=!1,e.isWaiterEditing=!1,e.InvoicePeople=!1,e.SplittedPeople=!1,e.EditTable=function(){e.isTableEditing=!1;var t={Invoice:e.showData,ResId:v.restaurant,TBLS:{NEW:angular.copy(e.selectedTable),OLD:angular.copy(e.showData.tables)}};e.showData.tables=e.selectedTable,e.$emit("syncInvoiceMetaData",e.showData),o.raiseSocketEvent("invoiceTableChange",t)},e.EditSplittedTable=function(){e.isSplittedTableEditing=!1,e.splittedInvoice.tables=e.splittedSelectedTable,e.$emit("syncInvoiceMetaData",e.splittedInvoice)},e.editWaiter=function(){e.isWaiterEditing=!1,e.showData.servedby=e.selectedWaiter,e.$emit("syncInvoiceMetaData",e.showData)},e.editSplittedWaiter=function(){e.isSplittedWaiterEditing=!1,e.splittedInvoice.servedby=e.splittedSelectedWaiter,e.$emit("syncInvoiceMetaData",e.splittedInvoice)},e.setActiveInvoiceTableAndEmployeeIndex=function(){for(t=0;t<e.tables.length;t++)e.showData.tables&&e.tables[t]._id==e.showData.tables._id&&(e.selectedTable=e.tables[t]);if(void 0!=e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.showData.servedby._id&&(e.selectedWaiter=e.Allemployee[t]);else e.selectedWaiter=e.Allemployee[0]},e.ChangeSplittedTable=function(){e.isSplittedTableEditing=!0;for(t=0;t<e.tables.length;t++)e.tables[t]._id==e.splittedInvoice.tables._id&&(e.splittedSelectedTable=e.tables[t]);if(e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.splittedInvoice.servedby._id&&(e.splittedSelectedWaiter=e.Allemployee[t]);else e.splittedSelectedWaiter=e.Allemployee[0]},e.ChangeSplittedWaiter=function(){e.isSplittedWaiterEditing=!1;for(t=0;t<e.tables.length;t++)e.tables[t]._id==e.splittedInvoice.tables._id&&(e.splittedSelectedTable=e.tables[t]);if(e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.splittedInvoice.servedby._id&&(e.splittedSelectedWaiter=e.Allemployee[t]);else e.splittedSelectedWaiter=e.Allemployee[0]},e.activateInventory=function(){$(".product-category").removeClass("active"),e.invoiceFocus=!1,e.tricolInventoryActive?e.tricolInventoryActive=!1:e.tricolInventoryActive=!0,$("#pdbox").addClass("active"),e.showSubCategory.length>0&&($("#"+e.showSubCategory[0].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[0].NameSpace).css("color","white"))},e.resetOrderForm=function(){e.selectedExtIn=[],e.selecctIngredients="",e.extraIngredients=[],e.note="",e.selectedVari=[],e.selectedIngredient=[]},e.showOrder=function(t){p.validateProduct(t,e.ingredientsInventory,e.Allproducts)?($("#addOrderItem").modal("show"),e.productList=t):$("#modalProductSoldOut").modal("show")},e.$on("updateInvoice",function(e,t){console.log(t)}),e.getProductById=function(t){for(var o=null,n=0;n<e.Allproducts.length;n++)e.Allproducts[n].clientId==t&&(o=e.Allproducts[n]);return o},e.reduceLocalInventory=function(t,o){var n=e.getProductById(t);if(n)if("Retail"==n.type)n.Quantity=parseInt(n.Quantity)-1;else for(var a=n.Ingradients,i=0;i<a.length;i++){var r=-1;r=a[i].name.clientId?a[i].name.clientId:a[i].name;for(var l=0;l<e.ingredientsInventory.length;l++)e.ingredientsInventory[l].clientId==r&&(e.ingredientsInventory[l].Quantity=e.ingredientsInventory[l].Quantity-a[i].quantity)}},e.restoreLocalInventory=function(t,o){var n=e.getProductById(t);if(n)if("Retail"==n.type)n.Quantity=parseInt(n.Quantity)+parseInt(o);else for(var a=n.Ingradients,i=0;i<a.length;i++){var r=-1;r=a[i].name.clientId?a[i].name.clientId:a[i].name;for(var l=0;l<e.ingredientsInventory.length;l++)e.ingredientsInventory[l].clientId==r&&(e.ingredientsInventory[l].Quantity=parseFloat(e.ingredientsInventory[l].Quantity)+parseFloat(a[i].quantity)*parseFloat(o))}},e.$on("onAddOrder",function(t,o){console.log("onAddOrder event"+o),e.reduceLocalInventory(o,1),p.isSoldOut(o,e.ingredientsInventory,e.Allproducts)&&$("#prid"+o).addClass("sold-out"),"Retail"==e.getProductById(o).type?p.reduceProduct(o,1):p.reduceInventory(o,1)}),e.$on("onCancelOrder",function(t,o){var n=o.Id,a=o.QNTY;console.log("onCancelOrder event"+n),e.restoreLocalInventory(n,a),p.isSoldOut(n,e.ingredientsInventory,e.Allproducts)||$("#prid"+n).removeClass("sold-out"),"Retail"==e.getProductById(n).type?p.restoreProduct(n,a):p.restoreInventory(n,a)}),e.confirmItem=function(){$("#addOrderItem").modal("hide"),e.invoiceFocus=!0,e.bookOrder()},e.bookOrder=function(){if(p.validateProduct(e.productList.clientId,e.ingredientsInventory,e.Allproducts)){e.showData.orders||(e.showData.orders=[]);for(var t=!1,n=0;n<e.showData.orders.length;n++)e.showData.orders[n].product.clientId==e.productList._id&&(e.showData.orders[n].quantity++,e.showData.orders[n].temporalQuantity?e.showData.orders[n].temporalQuantity++:e.showData.orders[n].temporalQuantity=1,t=!0);if(!t){var a={clientId:p.generateGUID(),note:e.note,quantity:1,invoiceId:e.showData._id,product:e.productList,ingredient:e.selectedIngredient,variation:e.selectedVari,extraingredient:e.extraIngredients,status:o.orderStatusmanager.TEMPORAL,temporalQuantity:1};e.showData.orders.push(a)}e.showData.prices=p.priceCalculation(e.showData.orders),I.showAlert("error","success","Item added to the order successfully"),e.resetOrderForm(),e.updateToAllInvoice(e.showData),e.$emit("onAddOrder",e.productList.clientId);var i={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",i)}else $("#modalProductSoldOut").modal("show")},e.addquantity=null,e.increaseQuantityModal=function(t,o){e.addquantity=t,e.addqunatityIndex=o,e.openModal("modalMoreItem")},e.addQuantityInItem=function(){$("#modalMoreItem").modal("hide"),e.showData.orders[e.addqunatityIndex].product.clientId==e.addquantity.product.clientId&&(p.validateProduct(e.showData.orders[e.addqunatityIndex].product.clientId,e.ingredientsInventory,e.Allproducts)?(e.showData.orders[e.addqunatityIndex].quantity++,e.showData.orders[e.addqunatityIndex].temporalQuantity?e.showData.orders[e.addqunatityIndex].temporalQuantity++:e.showData.orders[e.addqunatityIndex].temporalQuantity=1,e.showData.prices=p.priceCalculation(e.showData.orders),e.$emit("onAddOrder",e.showData.orders[e.addqunatityIndex].product.clientId),e.updateToAllInvoice(e.showData),e.startPlaceOrder(1)):$("#modalProductSoldOut").modal("show"));var t={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",t)},e.CancelOrder=function(){if(e.activateInventory(),$("#modalCancelOrder").modal("hide"),e.showData.orders){for(var t=[],n=0;n<e.showData.orders.length;n++)e.showData.orders[n].temporalQuantity?(e.showData.orders[n].quantity=parseInt(e.showData.orders[n].quantity)-parseInt(e.showData.orders[n].temporalQuantity),e.$emit("onCancelOrder",{Id:e.showData.orders[n].product.clientId,QNTY:e.showData.orders[n].temporalQuantity}),e.showData.orders[n].temporalQuantity=null):e.$emit("onCancelOrder",{Id:e.showData.orders[n].product.clientId,QNTY:1}),e.showData.orders[n].status!=o.orderStatusmanager.TEMPORAL&&parseInt(e.showData.orders[n].quantity)>0&&t.push(e.showData.orders[n]);e.showData.orders=t}e.showData.prices=p.priceCalculation(e.showData.orders),I.showAlert("success","success","Temporary  items removed successfully from the order..");var a={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",a)},e.item=null,e.openRemoveModal=function(t){e.item=t,e.openModal("modalRemoveOrder")},e.removeItem=function(){$("#modalRemoveOrder").modal("hide");for(var t=0;t<e.showData.orders.length;t++)if(e.showData.orders[t].clientId==e.item.clientId&&(e.item.status==o.orderStatusmanager.TEMPORAL||e.item.status==o.orderStatusmanager.PLACED)){if(e.showData.orders[t].temporalQuantity)e.showData.orders[t].quantity=parseInt(e.showData.orders[t].quantity)-1,e.showData.orders[t].temporalQuantity=parseInt(e.showData.orders[t].temporalQuantity)-1,e.$emit("onCancelOrder",{Id:e.showData.orders[t].product.clientId,QNTY:1});else if(e.showData.orders[t].quantity=parseInt(e.showData.orders[t].quantity)-1,e.$emit("onCancelOrder",{Id:e.showData.orders[t].product.clientId,QNTY:1}),e.item.status==o.orderStatusmanager.PLACED)if(0==parseInt(e.showData.orders[t].quantity)){var n={Invoice:e.showData,Order:e.item};p.removeOrder(n).then(function(e){console.log(e),I.showAlert("failed","Failed","Item has been removed successfully")},function(e){})}else(n=e.showData.orders[t]).invoiceId=e.showData.clientId,p.setQuantityForInvoice({obj:n}).then(function(e){console.log(e)},function(e){});0==parseInt(e.showData.orders[t].quantity)&&e.showData.orders.splice(t,1)}e.showData.prices=p.priceCalculation(e.showData.orders),e.updateToAllInvoice(e.showData);var a={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",a)},e.startPlaceOrder=function(t){if(console.log(e.showData),e.showData&&e.showData.orders&&e.showData.orders.length>0){t||e.activateInventory();for(var n=!1,a=0;a<e.showData.orders.length;a++)if(e.showData.orders[a].status==o.orderStatusmanager.TEMPORAL){n=!0,e.showData.orders[a].status=o.orderStatusmanager.PLACED;var i=e.showData.orders[a],r={clientId:i.clientId,note:i.note,invoiceId:e.showData.clientId,quantity:i.quantity,product:i.product._id,ingredient:i.ingredient,variation:i.variation,extraingredient:i.extraingredient,status:i.status};p.placeOrder(r).then(function(e){p.addInvoinAndOrderInShift(e._id,"ORDER"),o.socket.emit("orderPlaced",{Order:e,ResId:v.restaurant})},f)}else e.showData.orders[a].temporalQuantity&&((r=e.showData.orders[a]).invoiceId=e.showData.clientId,p.setQuantityForInvoice({obj:r}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){}),e.showData.orders[a].temporalQuantity=null);n&&(e.showData.invoiceStatus=o.invoiceStatusmanager.STARTED,p.UpdateInvoiceStatus(e.showData).then(function(e){console.log(e)},function(e){}))}else I.showAlert("failed","Failed","There is no item in this invoice")},e.allCloseInvoice=[],e.currentSplitOrder=!1,e.splittedInvoice=null,e.currentSplitItem={Item:null,Direction:null},e.MoveItem=function(t,o){e.currentSplitOrder?(e.currentSplitItem={Item:t,Direction:o},$("#modalMoveItem").modal("show")):I.showAlert("success","Success","Create new bill before splitting the item")},e.SplitItem=function(){var t=angular.copy(e.currentSplitItem),n=t.Item;if($("#modalMoveItem").modal("hide"),o.SplitItemDirection.FORWARD==t.Direction){for(var a=!0,i=0;i<e.showData.orders.length;i++)e.showData.orders[i].clientId==n.clientId&&(c=e.showData.orders[i].quantity)>0&&(a=!0,0==--c?(e.showData.orders.splice(i,1),p.removeOrderFromInvoice({clientId:n.clientId,invoiceId:e.showData.clientId}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})):(e.showData.orders[i].quantity=c,(s=e.showData.orders[i]).invoiceId=e.showData.clientId,p.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})));if(a){var r=!1;if(e.splittedInvoice.orders&&e.splittedInvoice.orders.length>0){for(i=0;i<e.splittedInvoice.orders.length;i++)if(e.splittedInvoice.orders[i].clientId==n.clientId){r=!0;c=e.splittedInvoice.orders[i].quantity;c++,e.splittedInvoice.orders[i].quantity=c,(s=e.splittedInvoice.orders[i]).invoiceId=e.showData.clientId,p.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}r||((d=angular.copy(n)).quantity=1,d.invoiceId=e.splittedInvoice.clientId,e.splittedInvoice.orders.push(n),delete d._id,p.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){}))}else e.splittedInvoice.orders=[],(d=angular.copy(n)).quantity=1,d.invoiceId=e.splittedInvoice.clientId,e.splittedInvoice.orders.push(d),delete d._id,p.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}}else if(o.SplitItemDirection.BACKWORD==t.Direction){for(var a=!0,i=0;i<e.splittedInvoice.orders.length;i++)e.splittedInvoice.orders[i].clientId==n.clientId&&(c=e.splittedInvoice.orders[i].quantity)>0&&(a=!0,0==--c?(e.splittedInvoice.orders.splice(i,1),p.removeOrderFromInvoice({clientId:n.clientId,invoiceId:e.splittedInvoice.clientId}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})):(e.splittedInvoice.orders[i].quantity=c,(s=e.splittedInvoice.orders[i]).invoiceId=e.splittedInvoice.clientId,p.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})));if(a){var l=!1;if(e.showData.orders&&e.showData.orders.length>0){for(i=0;i<e.showData.orders.length;i++)if(e.showData.orders[i].clientId==n.clientId){l=!0;var c=e.showData.orders[i].quantity;c++,e.showData.orders[i].quantity=c;var s=e.showData.orders[i];s.invoiceId=e.showData.clientId,p.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}l||((d=angular.copy(n)).quantity=1,d.invoiceId=e.showData.clientId,n.quantity=1,e.showData.orders.push(n),delete d._id,p.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){}))}else{e.showData.orders=[],e.showData.orders.push(n);var d=angular.copy(n);d.quantity=1,d.invoiceId=e.showData.clientId,delete d._id,p.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}}}I.showAlert("failed","Failed","Successfully Order Move..");for(var u=0;u<e.allInvoice.length;u++)e.allInvoice[u].clientId==e.splittedInvoice.clientId&&(e.allInvoice[u].orders=e.splittedInvoice.orders,e.allInvoice[u].prices=p.priceCalculation(e.splittedInvoice.orders));e.showData.prices=p.priceCalculation(e.showData.orders),e.splittedInvoice.prices=p.priceCalculation(e.splittedInvoice.orders);var h={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",h);var g={Invoice:e.splittedInvoice,ResId:v.restaurant};o.raiseSocketEvent("changeInvoiceOrders",g)},e.createNewSplitInvoice=function(t){e.splittedInvoice=angular.copy(t),e.splittedInvoice.clientId=p.generateGUID(),e.splittedInvoice.updated_at=new Date,e.splittedInvoice.created_at=new Date;var o=angular.copy(e.allInvoice);e.allCloseInvoice.length&&(o=o.concat(e.allCloseInvoice));var n=_.filter(o,function(t){return t.clientName.split("(")[0]==e.splittedInvoice.clientName.split("(")[0]});e.splittedInvoice.SplitinvoiceName=e.splittedInvoice.clientName.split("(")[0]+"("+n.length+")",e.splittedSelectedTable={},e.splittedSelectedTable=t.tables?t.tables:e.tables[0],e.selectedTable=t.tables?t.tables:e.tables[0],e.splittedInvoice.orders=[],e.splittedInvoice.prices=p.priceCalculation(e.splittedInvoice.orders),e.splittedInvoice.people=1,e.splittedInvoice.editable=!1},e.ChangeSplitInvoice=function(t){e.splittedInvoice=angular.copy(t),e.splittedInvoice.editable=!1,e.invoiceFocus=!0,e.currentSplitOrder=!0},e.cancelSlitted=function(){if(e.splittedInvoice.orders.length>0){for(var t=0;t<e.splittedInvoice.orders.length;t++)for(var o=0;o<e.showData.orders.length;o++)e.showData.orders[o]._id==e.splittedInvoice.orders[t]._id&&(e.showData.orders[o].quantity=parseInt(e.showData.orders[o].quantity)+parseInt(e.splittedInvoice.orders[t].quantity));e.showData.prices=p.priceCalculation(e.showData.orders)}$("#modalCancelSplit").modal("hide"),e.splittedInvoice.orders=[],e.compareBill1()},e.addSlittedInvoice=function(){delete e.splittedInvoice._id,delete e.splittedInvoice.invoiceNumber,e.splittedInvoice.orders=[],e.splittedInvoice.updated_at=new Date,e.splittedInvoice.created_at=new Date,e.getInvoiceNumber().then(function(t){e.splittedInvoice.invoiceNumber=t.no,p.addSingleInvoiceToLocalDB(e.splittedInvoice).then(function(t){e.allInvoice.push(t),e.splittedInvoice.prices=p.priceCalculation(e.splittedInvoice.orders),e.$emit("syncInvoice",t),I.showAlert("error","success","Successfully Invoice Split.. ")})})},e.cancelSlittedInvoice=function(){if(e.compareBillActive&&!e.currentSplitOrder)return e.compareBill(),void $("#modalCancelSplitOrder").modal("hide");if(e.splittedInvoice.orders.length>0){for(var t=0;t<e.splittedInvoice.orders.length;t++)for(var o=0;o<e.showData.orders.length;o++)e.showData.orders[o]._id==e.splittedInvoice.orders[t]._id&&(e.showData.orders[o].quantity=parseInt(e.showData.orders[o].quantity)+parseInt(e.splittedInvoice.orders[t].quantity));e.showData.prices=p.priceCalculation(e.showData.orders)}$("#modalCancelSplitOrder").modal("hide"),e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBillActive?(e.compareBillActive=!1,e.currentSplitOrder=!1):e.compareBillActive=!0},e.Splitpayment=function(){for(var t=0;t<e.splittedInvoice.orders.length;t++)p.addInvoinAndOrderInShift(e.splittedInvoice.orders[t]._id,"ORDER");e.splittedInvoice.invoiceStatus="PAID",p.SplitInvoiceStatus(e.splittedInvoice).then(function(t){e.processPayment(),e.compareBill1(),I.showAlert("error","Failed","Payment successfully done")},function(e){console.log(e)})},e.getCategories=function(){h.GetCategory().then(function(t){for(o=0;o<t.length;o++)t[o].ParentCategory?(t[o].NameSpace=t[o].Name.replace(/\s/g,""),e.allSubCategory.push(t[o])):e.allCategory.push(t[o]);for(var o=0;o<e.allCategory.length;o++)for(var n=0;n<e.Allproducts.length;n++)e.Allproducts[n].ParentCategory&&e.Allproducts[n].ParentCategory.clientId==e.allCategory[o].clientId&&(e.allCategory[o].image=e.Allproducts[n].image);e.allCategory.length>0&&(e.getProductdetail(e.allCategory[0],0),$("#pdbox").addClass("active"))},f)},e.getProduct=function(){h.GetProducts().then(function(t){e.getCategories(),e.Allproducts=t;for(var o=0;o<e.allCategory.length;o++)for(var n=0;n<e.Allproducts.length;n++)e.Allproducts[n].ParentCategory.clientId==e.allCategory[o].clientId&&(e.allCategory[o].image=e.Allproducts[n].image)},f)},e.getProductdetail=function(t,o){e.categoryName1=t,e.showProduct=[],e.copy_categoryName1=angular.copy(e.categoryName1),e.showSubCategory=[];e.showSubCategory=_.filter(e.allSubCategory,function(e){return e.ParentCategory.clientId==t.clientId}),e.showSubCategory.length>0&&(e.showProduct=_.filter(e.Allproducts,function(t){return!!t.Category&&t.Category.clientId==e.showSubCategory[0].clientId}),$("#"+e.showSubCategory[0].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[0].NameSpace).css("color","white")),$("#pdbox").addClass("active")},e.getImagefromCat=function(t){var o="";return e.Allproducts.some(function(e){return!(!e.Category||t._id!=e.ParentCategory._id)&&(o=e.image,!0)}),o},e.getProductdetailBySubcateId=function(t){for(var o=0;o<e.showSubCategory.length;o++)e.showSubCategory[o]._id==t._id?($("#"+e.showSubCategory[o].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[o].NameSpace).css("color","white")):($("#"+e.showSubCategory[o].NameSpace).css("background-color",""),$("#"+e.showSubCategory[o].NameSpace).css("color",""));e.showProduct=_.filter(e.Allproducts,function(e){return e.Category._id==t._id})},e.getProduct(),$("#addOrderItem").on("shown.bs.modal",function(){$.material.checkbox(),$.material.radio(),$.material.input();try{$("#txtnotearea").parent().css("margin-top","0px")}catch(e){}}),e.selectedIngredient=[],e.selectedVari,e.selectedExtIn=[],e.selectExtIn=function(t){var o=!0;if(e.selectedExtIn.length>0){for(var n=0;n<e.selectedExtIn.length;n++)e.selectedExtIn[n]==t?e.selectedExtIn.splice(n,1):o=!1;o||e.selectedExtIn.push(t)}else e.selectedExtIn.push(t)},e.selectIngredient=function(t){var o=!0;if(e.selectedIngredient.length>0){for(var n=0;n<e.selectedIngredient.length;n++)e.selectedIngredient[n]==t.name.Name?e.selectedIngredient.splice(n,1):o=!1;o||e.selectedIngredient.push(t.name.Name)}else e.selectedIngredient.push(t.name.Name)},e.selectVari=function(t){e.selectedVari=t.Name},e.onAddExtraIngredients=function(t){e.extraIngredients.indexOf(t)>0||e.extraIngredients.push(t),console.log(e.extraIngredients),setTimeout(function(){$.material.checkbox(),$.material.radio()},200)},e.onSelectExtraIngredient=function(t){var o=e.extraIngredients.indexOf(t);e.extraIngredients.splice(o,0)},e.payAmount=0,e.enableDoneButton=!0,e.invoiceAmount=null,e.getCurrentInvoiceTotal=function(t){return"SplitInvoice"!=t?angular.copy(e.showData.prices.grandtotal):angular.copy(e.splittedInvoice.prices.grandtotal)},e.enterNumber=function(t,o){var n=e.getCurrentInvoiceTotal(o);0==e.payAmount?e.payAmount=parseInt(t):e.payAmount=parseInt(String(e.payAmount)+String(t)),e.payAmount1=parseInt(e.payAmount)-n,e.invoiceAmount=n},e.addNumber=function(t,o){var n=e.getCurrentInvoiceTotal(o);e.payAmount&&""!=e.payAmount?(e.payAmount=parseInt(e.payAmount)+parseInt(t),e.payAmount1=parseInt(e.payAmount)-n):e.payAmount=parseInt(t)},e.backspace=function(t){var o=e.getCurrentInvoiceTotal(t);e.payAmount<10?(e.payAmount=0,e.payAmount1=parseInt(e.payAmount)-o):(e.payAmount=parseInt(String(e.payAmount).slice(0,-1)),e.payAmount1=parseInt(e.payAmount)-o)},e.Exact=function(t){e.payAmount=e.getCurrentInvoiceTotal(t),e.payAmount1=0},e.processPayment=function(t){e.invoiceFocus=!1,e.procesorActive=!e.procesorActive,e.payAmount=0;var o=e.getCurrentInvoiceTotal(t);o>0?(e.payAmount1=-o,e.invoiceAmount=angular.copy(o)):I.showAlert("error","Failed","There is no order.. ")},e.processPaymentInvoice=function(t){if(e.payAmount=0,p.finishSplit(e.showData),"Invoice"==t)e.showData.orders.length>0?(e.payAmount1=-e.showData.prices.grandtotal,e.invoiceAmount=angular.copy(e.showData.prices.grandtotal),e.invoiceFocus=!1,e.procesorActive=!e.procesorActive):I.showAlert("error","Failed","There is no order.. ");else if("SplitInvoice"==t){var o=e.showData.people-e.splittedInvoice.people;e.showData.people=o>=1?o:1,e.splittedInvoice.orders.length>0?(e.payAmount1=-e.splittedInvoice.prices.grandtotal,e.invoiceAmount=angular.copy(e.splittedInvoice.prices.grandtotal),e.invoiceFocus=!1,e.procesorActive=!e.procesorActive):I.showAlert("error","Failed","There is no order.. ")}},e.paymentDone=function(t){if(e.processPayment(""),"Invoice"!=t){e.splittedInvoice.invoiceStatus="CLOSED",p.closeInvoice(e.splittedInvoice.clientId).then(function(t){if(console.log(t),t.Error){for(o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.splittedInvoice.clientId&&(e.allInvoice[o].invoiceStatus="STARTED",e.splittedInvoice.editable=!0,e.allCloseInvoiceShow=!1);I.showAlert("error","Failed","Something Goes Wrong try again ")}else{for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.splittedInvoice.clientId&&(e.allInvoice[o].invoiceStatus="CLOSED",e.allCloseInvoice.push(e.allInvoice[o]),e.allInvoice.splice(o,1));I.showAlert("error","Failed","Payment done successfully.."),e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBill1(),e.createNewSplitInvoice(e.showData)}},f);n={Invoice:e.splittedInvoice,ResId:v.restaurant};o.raiseSocketEvent("invoiceClose",n)}else{e.showData.invoiceStatus="CLOSED",e.showData.editable=!1,p.closeInvoice(e.showData.clientId).then(function(t){if(console.log(t),t.Error){for(o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.showData.clientId&&(e.allInvoice[o].invoiceStatus="STARTED",e.showData.editable=!0,e.allCloseInvoiceShow=!1);I.showAlert("error","Failed","Something Goes Wrong try again ")}else{for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.showData.clientId&&(e.allInvoice[o].invoiceStatus="CLOSED",e.allCloseInvoice.push(e.allInvoice[o]),e.allInvoice.splice(o,1));I.showAlert("error","Failed","Payment done successfully..")}},f);var n={Invoice:e.showData,ResId:v.restaurant};o.raiseSocketEvent("invoiceClose",n)}},e.$watch("payAmount",function(){var t=0;""!=e.payAmount&&(t=e.payAmount),parseFloat(t)>=parseFloat(e.invoiceAmount)?e.enableDoneButton=!0:e.enableDoneButton=!1}),e.finish=function(){if(!e.compareBillActive||e.currentSplitOrder){var t=e.showData.people-e.splittedInvoice.people;e.showData.people=t>=1?t:1,p.finishSplit(e.showData).then(function(t){e.compareBill(),I.showAlert("error","Failed","Split successfully finish")},function(e){console.log(e)})}else e.compareBill()},e.editClose=function(e){$("#cat"+e).parent(".product-category").toggleClass("active")},e.$on("onOrderStarted",function(t,n){var a=n.orderId,i=w(e.showData,a.clientId,a.invoiceId);i>=0&&(e.showData.orders[i].status=o.orderStatusmanager.STARTED);var r=n.INV;if(e.allInvoice)for(var l=0;l<e.allInvoice.length;l++)if(e.allInvoice[l]&&e.allInvoice[l].clientId==r.clientId)for(var c=0;c<e.allInvoice[l].orders.length;c++)e.allInvoice[l].orders[c].clientId==a.clientId&&(e.allInvoice[l].orders[c].status=o.orderStatusmanager.STARTED);e.$apply()}),e.$on("onChangeInvoiceMetaData",function(t,o){var n=o.Invoice;if(e.showData&&e.showData.clientId==n.clientId&&(e.showData.clientName=n.clientName,e.showData.servedby=n.servedby,e.showData.people=n.people,e.showData.tables=n.tables),e.allInvoice)for(var a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&(e.allInvoice[a].clientName=n.clientName,e.allInvoice[a].servedby=n.servedby,e.allInvoice[a].people=n.people,e.allInvoice[a].tables=n.tables);e.$apply()}),e.$on("onNewInvoice",function(t,o){var n=o.Invoice;if(e.allInvoice&&e.allInvoice.length>0){for(var a=!1,i=0;i<e.allInvoice.length;i++)e.allInvoice[i]&&e.allInvoice[i].clientId==n.clientId&&(a=!0);a||e.allInvoice.push(n)}else e.allInvoice=[n],e.showData=n;e.$apply()}),e.$on("onChangeInvoiceOrders",function(t,o){var n=angular.copy(o);console.log("recieved client id -"+n.Invoice.clientId);var a=n.Invoice;if(e.showData&&e.showData.clientId==a.clientId&&(console.log("showdata match"),e.showData.orders=angular.copy(a.orders),e.showData.prices=p.priceCalculation(e.showData.orders)),e.allInvoice)for(var i=0;i<e.allInvoice.length;i++)e.allInvoice[i]&&e.allInvoice[i].clientId==a.clientId&&(console.log("allinvoice match"),console.log("match index is - "+i),e.allInvoice[i].orders=angular.copy(a.orders),e.allInvoice[i].prices=p.priceCalculation(e.allInvoice[i].orders));e.$apply()}),e.$on("onInvoiceClose",function(t,o){var n=o.Invoice;if(e.showData&&e.showData.clientId==n.clientId&&(e.showData.invoiceStatus="CLOSED",e.showData.editable=!1),e.allInvoice)for(var a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&(e.allInvoice[a].invoiceStatus="CLOSED",e.allInvoice[a].editable=!1,e.allCloseInvoice.push(e.allInvoice[a]),e.allInvoice.splice(a,1));e.$apply()}),e.$on("onShiftClosed",function(t,o){console.log(o),$("#shiftCloseModal").modal("show"),e.allInvoice=[],e.showData={},e.splittedInvoice={},e.allCloseInvoice=[],setTimeout(function(){window.location="/employee"},5e3)})}angular.module("cashierBills").controller("cashierBillsController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","employeeprofileService","PATHS","PermissionService","getEmployee","alertservice","cashierBillsServiceFn","serviceFun","pouchDB","utilservice","$q"]}();
(function() {
    'use strict';
    angular
        .module('cashierBills')
        .controller('cashierBillsController', Controller);
    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'cashierBillsServiceFn','serviceFun','pouchDB','utilservice','$q'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, cashierBillsServiceFn, serviceFun, pouchDB, utilservice, $q) {
        //Module code start
        var vm = this;
        var db = pouchDB('lanapp', { adapter: 'idb' });
        $scope.cashierBillsServiceFn = cashierBillsServiceFn;

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

        $scope.initModule = function () {
            cashierBillsServiceFn.GetInvoice().then(function (res) {
                $scope.allInvoice = [];
                for (var i = 0 ; i < res.length; i++) {
                    if (res[i].restaurant == getEmployee.restaurant) {
                        res[i].css = 'list-group-item';
                        res[i].prices = cashierBillsServiceFn.priceCalculation(res[i].orders);
                        cashierBillsServiceFn.updateSingleInvoiceToLocalDB(res[i]);
                        $scope.allInvoice.push(res[i]);
                    }
                }
                $scope.allCloseInvoice = _.reject($scope.allInvoice, function (num) { return num.invoiceStatus != "CLOSED"; });
                $scope.allInvoice = _.reject($scope.allInvoice, function (num) { return num.invoiceStatus == "CLOSED"; });
                if (res && res.length > 0)
                    $scope.Tabledetail($scope.allInvoice[0], true);
                $scope.invoiceActive = false;
            }, failPayload);

            utilservice.loadTables().then(function (res) {
                console.log("tble respnse");
                console.log(res);
                var tbs = [{ _id: -1, number: 'No Table' }];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].restaurant == getEmployee.restaurant) {
                        tbs.push(res[i]);
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

            $http.get('/api/get/employee', getEmployee.restaurant).then(function (res) {
                $scope.Allemployee = [{ _id: -1, firstname: 'No Waiter' }];
                for (var i = 0; i < res.data.data.length; i++) {
                    $scope.Allemployee.push(res.data.data[i]);
                }
            }, failPayload);

            utilservice.loadShift().then(function (isopen) {
                if (!isopen) window.location = '/employee';
            });
        }

        $scope.updateToAllInvoice = function (activeinvoice) {
            for (var iCounter = 0; iCounter < $scope.allInvoice.length; iCounter++) {
                if ($scope.allInvoice[iCounter].clientId == activeinvoice.clientId)
                    $scope.allInvoice[iCounter] == activeinvoice;
            }
        }
        $scope.initModule()
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
            delete invoice._id;
            $http.post('/api/v1/invoice', invoice).then(function (res) {
              $scope.allInvoice[$scope.allInvoice.length-1]._id = res.data._id;
                cashierBillsServiceFn.addInvoinAndOrderInShift(res.data._id, 'INVOICE').then(function (response) {
                }, function (err) { });
            }, failPayload);
        });

        $scope.$on("syncInvoiceMetaData", function (evt, invoice) {
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
            })
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
                 resolve({no:response.data.billNo});
              })
          })
        }

        $scope.addInvoice = function () {
            if ($scope.name != undefined && $scope.name != '' && $scope.table != 'Select Table') {
                var tbtoadd = _.find($scope.tables, { _id: $scope.table });
                var emtoadd = _.find($scope.Allemployee,{_id:$scope.Allemployee[1]._id});
                var obj = cashierBillsServiceFn.defaultInvoiceObject($scope.name, tbtoadd, emtoadd, getEmployee.restaurant, $scope.people)
                 $scope.getInvoiceNumber()
                   .then(function(data){
                     obj.invoiceNumber =data.no;
                     cashierBillsServiceFn.addSingleInvoiceToLocalDB(obj).then(function (response) {
                       console.log("add invoice rsponse");
                       console.log(response);
                       $scope.reinitlizeAddInvoiceModal();
                       $scope.Tabledetail(response, true);
                       $scope.$emit("syncInvoice", response);
                     });
                   });
            }
            else { alert("Fields cannot be null..") }
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
        $scope.people = 1;
        $scope.isTableEditing = false;
        $scope.isWaiterEditing = false;
        $scope.InvoicePeople = false;
        $scope.SplittedPeople = false;
        $scope.EditTable = function () {
            $scope.isTableEditing = false;
            var sokectObj = {
                Invoice: $scope.showData,
                ResId: getEmployee.restaurant,
                TBLS: {
                    NEW: angular.copy($scope.selectedTable),
                    OLD: angular.copy($scope.showData.tables)
                }
            };
            $scope.showData.tables = $scope.selectedTable;
            $scope.$emit("syncInvoiceMetaData", $scope.showData);
            $rootScope.raiseSocketEvent('invoiceTableChange', sokectObj);
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
            for (var i = 0; i < $scope.tables.length; i++) {
                if ($scope.showData.tables && ($scope.tables[i]._id == $scope.showData.tables._id)) {
                    $scope.selectedTable = $scope.tables[i];
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
                $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
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
            if (cashierBillsServiceFn.validateProduct(product, $scope.ingredientsInventory,$scope.Allproducts)) {
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
                    for (var icont = 0; icont < inds.length; icont++) {
                        var iid = -1;
                        if (inds[icont].name.clientId)
                            iid = inds[icont].name.clientId;
                        else
                            iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic].clientId == iid) {
                                $scope.ingredientsInventory[ic].Quantity = $scope.ingredientsInventory[ic].Quantity - inds[icont].quantity;
                            }
                        }
                    }
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
                    for (var icont = 0; icont < inds.length; icont++) {
                        var iid = -1;
                        if (inds[icont].name.clientId)
                            iid = inds[icont].name.clientId;
                        else
                            iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic].clientId == iid) {
                                $scope.ingredientsInventory[ic].Quantity = parseFloat($scope.ingredientsInventory[ic].Quantity) + parseFloat(inds[icont].quantity) * parseFloat(quantity);
                            }
                        }
                    }
                }
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
                        clientId: cashierBillsServiceFn.generateGUID(),
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
                        }
                        else {
                            $scope.showData.orders[i].quantity = parseInt($scope.showData.orders[i].quantity) - 1;
                            $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[i].product.clientId, QNTY: 1 });
                            if ($scope.item.status == $rootScope.orderStatusmanager.PLACED) {
                                //delete from the database as well if it is in placced mode
                                if (parseInt($scope.showData.orders[i].quantity) == 0) {
                                    var obj = {
                                        Invoice: $scope.showData,
                                        Order: $scope.item
                                    }
                                    cashierBillsServiceFn.removeOrder(obj).then(function (response) {
                                        console.log(response);
                                        alertservice.showAlert('failed', "Failed", "Item has been removed successfully")
                                    }, function (err) { });
                                    //restore inventoty here
                                } else {
                                    var obj = $scope.showData.orders[i];
                                    //set the quantity
                                    obj.invoiceId = $scope.showData.clientId;
                                    cashierBillsServiceFn.setQuantityForInvoice({ obj }).then(function (response) {
                                        console.log(response);
                                    }, function (err) { });
                                }
                            }
                        }
                        if (parseInt($scope.showData.orders[i].quantity) == 0)
                            $scope.showData.orders.splice(i, 1);
                    }
                }
            }
            $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
            $scope.updateToAllInvoice($scope.showData);
            var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
            $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj)
        }

        $scope.startPlaceOrder = function (noActive) {
            console.log($scope.showData);
            if ($scope.showData && $scope.showData.orders && $scope.showData.orders.length > 0) {
                if(!noActive)$scope.activateInventory();
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
                            status: orderObj.status
                        };
                        cashierBillsServiceFn.placeOrder(obj).then(function (res) {
                            cashierBillsServiceFn.addInvoinAndOrderInShift(res._id, 'ORDER');
                            $rootScope.socket.emit('orderPlaced', { Order: res, ResId: getEmployee.restaurant });
                        }, failPayload)
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
            debugger;
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
            $scope.splittedInvoice.clientId = cashierBillsServiceFn.generateGUID();
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
          if(($scope.compareBillActive && !$scope.currentSplitOrder)) {
            $scope.compareBill();
            $('#modalCancelSplitOrder').modal('hide');
            return;
          }
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
            $scope.showSubCategory = _.filter($scope.allSubCategory, function (num) {
              return num.ParentCategory.clientId == data.clientId;
            });
            if ($scope.showSubCategory.length > 0) {
                $scope.showProduct = _.filter($scope.Allproducts, function (num) {
                  if(!num.Category){
                    return false;
                  }
                  return num.Category.clientId == $scope.showSubCategory[0].clientId;
                });
                $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
            }
            $("#pdbox").addClass("active");
        }

        $scope.getImagefromCat = function(category){
          var imgUrl = '';
          $scope.Allproducts.some(function(product){
              if(product.Category && category._id == product.ParentCategory._id){
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
          cashierBillsServiceFn.finishSplit($scope.showData);
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

              var people = $scope.showData.people- $scope.splittedInvoice.people;
              $scope.showData.people = people>=1? people: 1;
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
          if(($scope.compareBillActive && !$scope.currentSplitOrder)) {
            $scope.compareBill();
            return;
          }
          var people = $scope.showData.people- $scope.splittedInvoice.people;
          $scope.showData.people = people>=1? people: 1;
            cashierBillsServiceFn.finishSplit($scope.showData).then(function (response) {
                $scope.compareBill();
                alertservice.showAlert('error', "Failed", "Split successfully finish");
            }, function (err) { console.log(err) });
        }

        $scope.editClose = function (index) {
            $("#cat" + index).parent('.product-category').toggleClass("active");
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
            if ($scope.showData && $scope.showData.clientId == invoice.clientId) {
                $scope.showData.clientName = invoice.clientName;
                $scope.showData.servedby = invoice.servedby;
                $scope.showData.people = invoice.people;
                $scope.showData.tables = invoice.tables;
            }
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
            $scope.$apply();
        });

        $scope.$on('onNewInvoice', function (eve, sokectObj) {
            var invoice = sokectObj.Invoice;
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
            else {
                $scope.allInvoice = [invoice];
                $scope.showData = invoice;
            }
            $scope.$apply();
        });

        $scope.$on('onChangeInvoiceOrders', function (eve, sokectObjNative) {
            var sokectObj = angular.copy(sokectObjNative);
            console.log("recieved client id -" + sokectObj.Invoice.clientId);
            var invoice = sokectObj.Invoice;
            if ($scope.showData && $scope.showData.clientId == invoice.clientId) {
                {
                    console.log("showdata match");
                    $scope.showData.orders = angular.copy(invoice.orders);
                    $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
                }
            }
            if ($scope.allInvoice) {
                for (var invCounter = 0; invCounter < $scope.allInvoice.length; invCounter++) {
                    if ($scope.allInvoice[invCounter] && $scope.allInvoice[invCounter].clientId == invoice.clientId) {
                        console.log("allinvoice match");
                        console.log("match index is - "+invCounter)
                        $scope.allInvoice[invCounter].orders = angular.copy(invoice.orders);
                        $scope.allInvoice[invCounter].prices = cashierBillsServiceFn.priceCalculation($scope.allInvoice[invCounter].orders);
                    }
                }
            }
            $scope.$apply();
        });

        $scope.$on('onInvoiceClose', function (eve, sokectObj) {
            var invoice = sokectObj.Invoice;
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
        });

        $scope.$on('onShiftClosed', function (eve, sokectObj) {
            console.log(sokectObj);
            $("#shiftCloseModal").modal('show');
            //alert("Shift has been closed by manager, All orders will be archived automcatically");
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

!function(){"use strict";function t(t,n,e,o,r,a){function i(t){"usersess"==t._id&&(t.usermoment.employee?emit(t.usermoment.employee):emit(t.name))}function c(t){"employee"==t._id&&(t.emplyoeedata?emit(t.emplyoeedata):emit(t.name))}function u(t){return t.data}function l(t){return t.data}function d(t){return t.data.data[0]}function s(t){return function(){return{success:!1,message:t}}}var p=n("lanapp",{adapter:"idb"});console.log("test");var g={};return g.GetEmp=function(n){return t.get("/api/get/employee",n).then(function(t){return t.data},s("Error getting all users"))},g.CurrentEmployee=function(){return navigator.onLine?t.get("/api/v1/employeedetails").then(d,s("Error getting all users")):p.query(i).then(function(t){return t.rows[0].key}).catch(function(t){console.log(t)})},g.updateUser=function(n){return navigator.onLine?t.post("/api/v1/currentemployeeUpdate",n).then(l,s("Error getting all users")):(n.flag=1,p.query(c,{include_docs:!0}).then(function(t){var o=[];o=n._id,t.rows[0].key.filter(function(t){return o.indexOf(t._id)>-1});for(var r,a=0,i=t.rows[0].key.length;a<i;a++)t.rows[0].key[a]._id==n._id&&(r=a,p.get("employee").then(function(t){delete t.emplyoeedata[r],t.emplyoeedata[r]=n;var o={edit:n._id,data:n,syncstatus:0};if(e.get("_meanLanAppSync")){var a=e.get("_meanLanAppSync");"1"in a?(delete a[1],a[1]={employeeprofile:o}):a[1]={employeeprofile:o},console.log("New struct"),console.log(a),e.set("_meanLanAppSync",a)}return p.put({_id:"employee",_rev:t._rev,emplyoeedata:t.emplyoeedata})}))}).catch(function(t){console.log(t)}))},g.GetInvoice=function(){return t.get("/api/get/invoice","").then(u,s("Error getting all users"))},g.GetTables=function(){return t.get("/api/get/tables","").then(function(t){return t.data},s("Error getting all users"))},g.EditInvoice=function(n){return t.post("/api/v1/updateinvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.EditingTable=function(n){return t.post("/api/v1/updatetable",n).then(function(t){return t.data},s("Error getting"))},g.GetProducts=function(){return t.get("/api/get/Product","").then(function(t){return t.data},s("Error getting all users"))},g.GetCategory=function(){return t.get("/api/get/Category","").then(function(t){return t.data},s("Error getting all users"))},g.placeOrder=function(n){return t.post("/api/v1/order",n).then(function(t){return t.data},s("Error getting all users"))},g.addOrderToInvoice=function(n){return t.post("/api/v1/addOrderToInvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.updateOrder=function(n){return t.post("/api/v1/updateOrder",n).then(function(t){return t.data},s("Error getting all users"))},g.UpdateInvoiceStatus=function(n){return t.post("/api/v1/updateinvoicestatus",n).then(u,s("Error getting all users"))},g.updateOrderStatus=function(n){return t.post("/api/v1/updateStatusOrder",n).then(function(t){return t.data},s("Error getting all users"))},g.cancelOrder=function(n){return t.post("/api/v1/cancelOrder",n).then(function(t){return t.data},s("Error getting all users"))},g.addSplitInvoice_updateInvoice=function(n){return t.post("/api/v1/splitinvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.removeOrder=function(n){return t.post("/api/v1/removeOrder",n).then(function(t){return t.data},s("Error getting all users"))},g.SplitInvoiceStatus=function(n){return t.post("/api/v1/splitinvoicestatus",n).then(u,s("Error getting all users"))},g.finishSplit=function(n){return t.post("/api/v1/finishsplit",n).then(function(t){return t.data},s("Error getting all users"))},g.removeOrderFromInvoice=function(n){return t.post("/api/v1/removeOrderFromInvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.setQuantityForInvoice=function(n){return t.post("/api/v1/setQuantityForInvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.addOrderToSplittedInvoice=function(n){return t.post("/api/v1/addOrderToSplittedInvoice",n).then(function(t){return t.data},s("Error getting all users"))},g.addInvoinAndOrderInShift=function(n,e){var o={shid:localStorage.getItem("currentShiftid"),id:n,type:e};return t.post("/api/v1/insertInvoiceAndOrderInShift",o).then(function(t){return t.data},s("Error getting all users"))},g.UpdateInvoiceStatusById=function(n){return t.post("/api/v1/updateinvoicestatusbyid",n).then(u,s("Error getting all users"))},g.reduceInventory=function(t,n){p.get("Product").then(function(n){for(var e=0;e<n.docdata.length;e++)if(n.docdata[e].clientId==t){var o=n.docdata[e];p.get("Ingredients").then(function(t){for(var n=t.docdata,e=o.Ingradients,r=0;r<e.length;r++){var i=-1;i=e[r].name.clientId?e[r].name.clientId:e[r].name;for(var c=0;c<n.length;c++)n[c].clientId==i&&(n[c].Quantity=parseFloat(n[c].Quantity)-parseFloat(e[r].quantity))}t.docdata=n,p.put(t).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc"),a.syncIngredientsInventory()}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})}})},g.restoreInventory=function(t,n){p.get("Product").then(function(e){for(var o=0;o<e.docdata.length;o++)if(e.docdata[o].clientId==t){var r=e.docdata[o];p.get("Ingredients").then(function(t){for(var e=t.docdata,o=r.Ingradients,i=0;i<o.length;i++){var c=-1;c=o[i].name.clientId?o[i].name.clientId:o[i].name;for(var u=0;u<e.length;u++)e[u].clientId==c&&(e[u].Quantity=parseFloat(e[u].Quantity)+parseFloat(o[i].quantity)*parseFloat(n))}t.docdata=e,p.put(t).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc"),a.syncIngredientsInventory()}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})}})},g.restoreProduct=function(t,n){p.get("Product").then(function(n){for(var e=0;e<n.docdata.length;e++)n.docdata[e].clientId==t&&(n.docdata[e].Quantity=parseInt(n.docdata[e].Quantity)+parseInt(quantity));p.put(n).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc"),a.syncProductInventory()}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})},g.reduceProduct=function(t,n){p.get("Product").then(function(n){for(var e=0;e<n.docdata.length;e++)n.docdata[e].clientId==t&&(n.docdata[e].Quantity=parseInt(n.docdata[e].Quantity)-1);p.put(n).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc"),a.syncProductInventory()}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})},g.getProductPriceWithQuantity=function(t){var n=0;try{n=parseFloat(t.product.Price)*parseFloat(t.quantity)}catch(t){n=0}return n},g.priceCalculation=function(t){var n={total:0,grandtotal:0};if(t&&t.length){for(var e=0;e<t.length;e++)t[e].product?n.total=n.total+t[e].product.Price*t[e].quantity:n.total=0;n.grandtotal=n.total+0*n.total/100}return n},g.defaultInvoiceObject=function(t,n,e,r,a){return{clientId:this.generateGUID(),invoiceNumber:"",clientName:t,tables:n,servedby:e,invoiceStatus:o.invoiceStatusmanager.NEW,created_by:"Admin",updated_by:"Admin",restaurant:r,people:a,updated_at:new Date,created_at:new Date}},g.generateGUID=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},g.restoreInvoiceToLocalDb=function(t){t.map(function(t){this.updateSingleInvoiceToLocalDB(t)})},g.updateSingleInvoiceToLocalDB=function(t){delete t.__v,p.get(t.clientId).then(function(n){console.log(n);var e=t;e._rev=n._rev,p.put(e).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc")}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})}).catch(function(n){n&&404==n.status&&p.put(t).then(function(){console.log("Doc updated in poch Db\n")}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})},g.addSingleInvoiceToLocalDB=function(t){return r((n,e)=>{delete t.__v,delete t._rev;var o=t._id;t._id=t.clientId,p.put(t).then(function(){t._id=o,n(t)}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t)})})},g.isSoldOut=function(t,n,e){for(var o=null,r=0;r<e.length;r++)e[r]._id==t&&(o=e[r]);var a=!0;if(o)if("Retail"==o.type)0==parseInt(o.Quantity)&&(a=!1);else for(var i=o.Ingradients,c=0;c<i.length;c++){var u=-1;u=i[c].name._id?i[c].name._id:i[c].name;var l=_.find(n,function(t){return t._id==u});parseFloat(i[c].quantity)>parseFloat(l.Quantity)&&(a=!1)}return!a},g.validateProduct=function(t,n,e){return!this.isSoldOut(t,n,e)},g.syncInvoiceMetaData=function(n){return t.post("/api/invoice/syncInvoiceMetaData",n).then(function(t){return t.data},function(t){console.log(t)})},g.closeInvoice=function(n){console.log("sending clientid -"+n);var e={clientId:n};return t.post("/api/v1/closeInvoice",e).then(function(t){return t.data},s("Error getting all users"))},g.getBillNo=function(){return t.get("/api/v1/getBillno")},g}angular.module("cashierBills").factory("cashierBillsService.js",t).service("cashierBillsServiceFn",t),t.$inject=["$http","pouchDB","localStorageService","$rootScope","$q","utilservice"]}();
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
        console.log("test");
        var service = {};
        service.GetEmp = GetEmp;
        service.CurrentEmployee = CurrentEmployee;
        service.updateUser = CurrentEmployeeUpdate;
        service.GetInvoice = GetInvoice;
        service.GetTables = GetTables;
        service.EditInvoice = EditInvoice;
        service.EditingTable = EditingTable;
        service.GetProducts = GetProducts;
        service.GetCategory = GetCategory;
        service.placeOrder = placeOrder;
        service.addOrderToInvoice = addOrderToInvoice;
        service.updateOrder = updateOrder;
        service.UpdateInvoiceStatus = UpdateInvoiceStatus;
        service.updateOrderStatus = updateOrderStatus;
        service.cancelOrder = cancelOrder;
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
        service.generateGUID = generateGUID;
        service.restoreInvoiceToLocalDb = restoreInvoiceToLocalDb;
        service.updateSingleInvoiceToLocalDB = updateSingleInvoiceToLocalDB;
        service.addSingleInvoiceToLocalDB = addSingleInvoiceToLocalDB;
        service.isSoldOut = isSoldOut;
        service.validateProduct = validateProduct;
        service.syncInvoiceMetaData = syncInvoiceMetaData;
        service.closeInvoice = closeInvoice;
        service.getBillNo = getBillNo;
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
            return $http.get('/api/get/invoice', '').then(getInvoiceSuccess, handleError('Error getting all users'));

        }



        function UpdateInvoiceStatus(invoiceStatus) {
            return $http.post('/api/v1/updateinvoicestatus', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));
        }

        function UpdateInvoiceStatusById(invoiceStatus) {
            return $http.post('/api/v1/updateinvoicestatusbyid', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));
        }

        function SplitInvoiceStatus(invoiceStatus) {
            return $http.post('/api/v1/splitinvoicestatus', invoiceStatus).then(getInvoiceSuccess, handleError('Error getting all users'));
        }


        function GetProducts() {
            return $http.get('/api/get/Product', '').then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));
        }

        function GetTables() {
            return $http.get('/api/get/tables', '').then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

        function GetCategory() {
            return $http.get('/api/get/Category', '').then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

        function EditInvoice(data) {
            return $http.post('/api/v1/updateinvoice', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }


        function finishSplit(data) {
            return $http.post('/api/v1/finishsplit', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }



        function restoreInventory(productId, quantity) {
            //var obj = {
            //    productId: productId,
            //    quanity: quanity
            //};
            //return $http.post('/api/inventory/restoreInventory', obj).then(function (res) {

            //    return res.data;

            //}, handleError('Error getting all users'));

            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        var product = existDocument.docdata[pcon];
                        db.get('Ingredients').then(function (ingredientsInventoryDoc) {
                            var ingredientsInventory = ingredientsInventoryDoc.docdata;
                            var inds = product.Ingradients;
                            for (var icont = 0; icont < inds.length; icont++) {
                                var iid = -1;
                                if (inds[icont].name.clientId)
                                    iid = inds[icont].name.clientId;
                                else
                                    iid = inds[icont].name;
                                for (var ic = 0; ic < ingredientsInventory.length; ic++) {
                                    if (ingredientsInventory[ic].clientId == iid) {
                                        ingredientsInventory[ic].Quantity = parseFloat(ingredientsInventory[ic].Quantity) + parseFloat(inds[icont].quantity) * parseFloat(quantity);
                                    }
                                }
                            }
                            ingredientsInventoryDoc.docdata = ingredientsInventory;
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
            //var obj = {
            //    productId: productId,
            //    quanity: quanity
            //};
            //return $http.post('/api/inventory/reduceInventory', obj).then(function (res) {
            //    return res.data;
            //}, handleError('Error checking in inventory'));
            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        var product = existDocument.docdata[pcon];
                        db.get('Ingredients').then(function (ingredientsInventoryDoc) {
                            var ingredientsInventory = ingredientsInventoryDoc.docdata;
                            var inds = product.Ingradients;
                            for (var icont = 0; icont < inds.length; icont++) {
                                var iid = -1;
                                if (inds[icont].name.clientId)
                                    iid = inds[icont].name.clientId;
                                else
                                    iid = inds[icont].name;
                                for (var ic = 0; ic < ingredientsInventory.length; ic++) {
                                    if (ingredientsInventory[ic].clientId == iid) {
                                        ingredientsInventory[ic].Quantity = parseFloat(ingredientsInventory[ic].Quantity) - parseFloat(inds[icont].quantity);
                                    }
                                }
                            }
                            ingredientsInventoryDoc.docdata = ingredientsInventory;
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

        function restoreProduct(productId, quanity) {
            //return $http.post('/api/inventory/restoreProduct', obj).then(function (res) {
            db.get('Product').then(function (existDocument) {
                for (var pcon = 0; pcon < existDocument.docdata.length; pcon++) {
                    if (existDocument.docdata[pcon].clientId == productId) {
                        existDocument.docdata[pcon].Quantity = parseInt(existDocument.docdata[pcon].Quantity) + parseInt(quantity);
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

        function placeOrder(data) {

            return $http.post('/api/v1/order', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

            //return $http.post('/api/v1/placeOrder', data).then(function (res) {

            //    return res.data;

            //}, handleError('Error getting all users'));

        }

        function updateOrder(data) {

            return $http.post('/api/v1/updateOrder', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

            //return $http.post('/api/v1/placeOrder', data).then(function (res) {

            //    return res.data;

            //}, handleError('Error getting all users'));

        }


        function updateOrderStatus(data) {

            return $http.post('/api/v1/updateStatusOrder', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

            //return $http.post('/api/v1/placeOrder', data).then(function (res) {

            //    return res.data;

            //}, handleError('Error getting all users'));

        }

        function cancelOrder(item) {
            return $http.post('/api/v1/cancelOrder', item).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function removeOrderFromInvoice(item) {
            return $http.post('/api/v1/removeOrderFromInvoice', item).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function addOrderToSplittedInvoice(item) {
            return $http.post('/api/v1/addOrderToSplittedInvoice', item).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function setQuantityForInvoice(item) {
            return $http.post('/api/v1/setQuantityForInvoice', item).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function removeOrder(item) {
            return $http.post('/api/v1/removeOrder', item).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function addOrderToInvoice(data) {
            return $http.post('/api/v1/addOrderToInvoice', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));
        }

        function EditWaiter(data) {
            return $http.post('/api/v1/waiter', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }
        function syncInvoiceMetaData(data) {
            return $http.post('/api/invoice/syncInvoiceMetaData', data).then(function (res) {
                return res.data;
            }, function (err) {
                console.log(err);
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

        function closeInvoice(clientId) {
            console.log("sending clientid -" + clientId)
            var toSend = {
                clientId: clientId
            };
            return $http.post('/api/v1/closeInvoice', toSend).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function getBillNo() {
          return $http.get('/api/v1/getBillno');
        }
        function addInvoinAndOrderInShift(id, type) {
            var toSend = {
                shid: localStorage.getItem("currentShiftid"),
                id: id,
                type: type
            };
            return $http.post('/api/v1/insertInvoiceAndOrderInShift', toSend).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
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

        function generateGUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        function defaultInvoiceObject(name, table, servedby, restaurant, people) {
            var obj = {
                clientId: this.generateGUID(),
                invoiceNumber: '',
                clientName: name,
                tables: table,
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
            return $q((resolve, reject) => {
                delete invoice["__v"];
                delete invoice["_rev"];
                var temp =  invoice._id;
                invoice._id = invoice.clientId;
                db.put(invoice).then(function () {
                     invoice._id = temp;
                    resolve(invoice);
                }).catch(function (err) {
                    console.log("Error while updating Data to poch Db\n");
                    console.log(err);
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
                if (Allproducts[pcon]._id == productId)
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
                        if (parseFloat(inds[icont].quantity) > parseFloat(ingref.Quantity))
                            sufficientIngrdeitns = false;
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

!function(){"use strict";var e=null,l=null;angular.module("cashierHall",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(r,t,n,o,a,i){function c(e){if(navigator.onLine)return e.authEmployee().then(function(e){return e});e.authEmployee()}function u(e){return navigator.onLine,e.CurrentEmployee().then(function(e){return e})}e=t,(l=r).state("cashierHall",{url:"/hall/:id",templateUrl:i.TEMPLATE+"cashierHall/cashierHall.html",controller:"cashierHallController",controllerAs:"vm",data:{pageTitle:"Hall",bodyClass:"menuavaled cashierhall"},resolve:{employee:c,getEmployee:u}}),c.$inject=["empService"],u.$inject=["employeeprofileService"]}])}();
(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('cashierHall', [
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
            

                $stateProviderRef.state('cashierHall', {
                    url: '/hall/:id',                    
                    templateUrl: path.TEMPLATE+'cashierHall/cashierHall.html',
                    controller  : 'cashierHallController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Hall',bodyClass:"menuavaled cashierhall"},
                    resolve: {
                        employee: auth,
                        getEmployee : ResolveEmployee
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();



!function(){"use strict";function e(e,t,o,n,i,a,l,r,c,s,d,v,u,p,I,h,m,g,f){function y(e){console.log(e)}function w(e,t,o){var n=-1;if(e&&e.orders)for(var i=0;i<e.orders.length;i++)e.orders[i].clientId==t&&(n=i);return n}e.tableActive=!1,e.currentOpenTable=null,$(".table-box").click(function(){e.tableActive=!0,$(".container.tri-column-wrap").addClass("tableactive")}),e.activateTable=function(t){console.log(t),e.currentOpenTable=t,e.tableActive=!0,$(".container.tri-column-wrap").addClass("tableactive"),e.tableInvoices=_.reject(e.invoiceRepo,function(t){return t.tables._id!=e.currentOpenTable._id}),e.allCloseInvoice=_.reject(e.tableInvoices,function(e){return"CLOSED"!=e.invoiceStatus}),e.allInvoice=_.reject(e.tableInvoices,function(e){return"CLOSED"==e.invoiceStatus}),e.allInvoice&&e.allInvoice.length>0&&e.Tabledetail(e.allInvoice[0],!0)},e.getStyle=function(t){if(t){var o=t.match(/-?\d+/g);if(o)return o[1]=.55*parseInt(o[1]),o[0]=parseInt(o[0])+195,e.tableActive&&(o[0]=o[0]/2),"position:absolute;left:"+o[0]+"px; top: "+o[1]+"px;"}},e.closeTable=function(){e.tableActive=!1,$(".container.tri-column-wrap").removeClass("tableactive")},e.roomid=g.id,e.roombj=null;var D=m("lanapp",{adapter:"idb"});e.cashierBillsServiceFn=I,e.deepCopy=function(e){return angular.copy(e)},e.openModal=function(e){$("#"+e).modal("show")},e.hideModal=function(e){$("#"+e).modal("hide")},this.employee=u,e.table="Select Table",e.allIngedientsName=[],e.ingredientsInventory=[],e.allCloseInvoiceShow=!1,e.tax=15,e.Allproducts=[],e.allSubCategory=[],e.allCategory=[],e.extraIngredients=[],this.change=function(){s.updateUser(this.employee).then(function(e){navigator.onLine?e.success?(o.$broadcast("updatemployeelocaly"),p.showAlert("success","Success",e.message)):p.showAlert("failed","Failed",e.message):p.showAlert("success","Success","Updated")},y)},e.isTableFull=function(t){return!!e.invoiceRepo&&e.invoiceRepo.some(function(e){return e.tables._id===t})},e.initModule=function(){I.GetInvoice().then(function(t){e.allInvoice=[],e.invoiceRepo=[];for(var o=0;o<t.length;o++)t[o].restaurant==u.restaurant&&e.tableIds.indexOf(t[o].tables._id)>=0&&(t[o].css="list-group-item",t[o].prices=I.priceCalculation(t[o].orders),I.updateSingleInvoiceToLocalDB(t[o]),e.invoiceRepo.push(t[o]));e.invoiceActive=!1},y),f.loadTables().then(function(t){for(var o=[{_id:-1,number:"No Table"}],n=0;n<t.length;n++)t[n].restaurant==u.restaurant&&o.push(t[n]);e.tables=o},y),h.GetIngedients().then(function(t){if(e.allIngedients=t,e.ingredientsInventory=angular.copy(t),e.allIngedients)for(var o=0;o<e.allIngedients.length;o++)e.allIngedientsName.indexOf(e.allIngedients[o].Name)>0||e.allIngedientsName.push(e.allIngedients[o].Name)},y),a.get("/api/get/employee",u.restaurant).then(function(t){e.Allemployee=[{_id:-1,firstname:"No Waiter"}];for(var o=0;o<t.data.data.length;o++)e.Allemployee.push(t.data.data[o])},y),f.loadShift().then(function(e){e||(window.location="/employee")})},e.tableIds=[],e.initRoom=function(){a.post("/api/room/getrooms",{id:u.restaurant}).then(function(t){if(t.data){console.log(t.data);for(var o=0;o<t.data.length;o++)if(t.data[o]._id==e.roomid){if(e.roombj=t.data[o],console.log(e.roombj),e.roombj.tableNum&&e.roombj.tableNum.length>0)for(var n=0;n<e.roombj.tableNum.length;n++)e.tableIds.push(e.roombj.tableNum[n]._id);else e.allCloseInvoice=[],e.allInvoice=[];e.initModule()}}},function(e){console.log()})},e.initRoom(),e.updateToAllInvoice=function(t){for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==t.clientId&&e.allInvoice[o]},e.invoiceActive=!1,e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBillActive=!1,e.procesorActive=!1,$(".product-category > .panel-heading, .product-category > img").click(function(){$(this).parent(".product-category").toggleClass("active")}),$(".product-panel").click(function(){$("#addOrderItem").modal("show")}),e.backInvoice=function(){e.invoiceActive=!1,e.tricolInventoryActive=!1,e.compareBillActive=!1,e.procesorActive=!1,e.invoiceFocus=!1,e.currentSplitOrder=!1},e.compareBill=function(){e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBillActive?(e.compareBillActive=!1,e.currentSplitOrder=!1):e.compareBillActive=!0,e.createNewSplitInvoice(e.showData)},e.compareBill1=function(){e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.currentSplitOrder=!1,e.compareBillActive=!0},e.unfocusInvoice=function(){e.invoiceFocus=!1,$(".product-category").removeClass("active")},e.focusInvoice=function(){e.invoiceFocus=!0,e.currentSplitOrder=!0,e.splittedInvoice.tables=e.selectedTable,e.splittedSelectedTable=angular.copy(e.selectedTable),e.splittedInvoice.clientName=e.splittedInvoice.SplitinvoiceName,e.addSlittedInvoice()},e.Tabledetail=function(t,o){e.invoiceActive=!0,e.hideRow=!0,e.showData=t,e.showData.editable=o,e.showData.orders&&e.showData.orders.length>0?e.hideRow=!1:e.showData.orders=[],e.showData.prices=I.priceCalculation(e.showData.orders),e.setActiveInvoiceTableAndEmployeeIndex()},e.$on("syncInvoice",function(e,t){console.log(t);var n={Invoice:t,ResId:u.restaurant};o.socket.emit("newInvoice",n),delete t._id,a.post("/api/v1/invoice",t).then(function(e){I.addInvoinAndOrderInShift(e.data._id,"INVOICE").then(function(e){},function(e){})},y)}),e.$on("syncInvoiceMetaData",function(e,t){D.get(t.clientId).then(function(e){console.log(e);var o=t;o._rev=e._rev,D.put(o).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc")}).catch(function(e){console.log("Error while updating Data to poch Db\n"),console.log(e)})}),console.log(t),I.syncInvoiceMetaData(t).then(function(){});var n={Invoice:t,ResId:u.restaurant};o.socket.emit("changeInvoiceMetaData",n)}),e.reinitlizeAddInvoiceModal=function(){e.name="",e.people=1,e.table="Select Table",$("#modalNewBill").modal("hide")},e.getInvoiceNumber=function(){return e.allInvoice&&e.allInvoice.length>0?e.allInvoice.length+1:1},e.addInvoice=function(){if(void 0!=e.name&&""!=e.name){var t=_.find(e.tables,{_id:e.currentOpenTable._id}),o=_.find(e.Allemployee,{_id:e.Allemployee[1]._id}),n=I.defaultInvoiceObject(e.name,t,o,u.restaurant,e.people);n.invoiceNumber=e.getInvoiceNumber(),I.addSingleInvoiceToLocalDB(n).then(function(t){console.log("add invoice rsponse"),console.log(t),e.allInvoice&&e.allInvoice.length>0?e.allInvoice.push(t):e.allInvoice=[t],e.invoiceRepo&&e.invoiceRepo.length>0?e.invoiceRepo.push(t):e.invoiceRepo=[t],e.reinitlizeAddInvoiceModal(),e.Tabledetail(t,!0),e.$emit("syncInvoice",t)})}else alert("Fields cannot be null..")},e.EditInvoice=function(t,o){void 0!=t.clientName&&""!=t.clientName?(e.hideModal(o),e.$emit("syncInvoiceMetaData",t)):alert("Name cannot be null..")},e.people=1,e.isTableEditing=!1,e.isWaiterEditing=!1,e.InvoicePeople=!1,e.SplittedPeople=!1,e.EditTable=function(){e.isTableEditing=!1,e.showData.tables=e.selectedTable,e.$emit("syncInvoiceMetaData",e.showData)},e.EditSplittedTable=function(){e.isSplittedTableEditing=!1,e.splittedInvoice.tables=e.splittedSelectedTable,e.$emit("syncInvoiceMetaData",e.splittedInvoice)},e.editWaiter=function(){e.isWaiterEditing=!1,e.showData.servedby=e.selectedWaiter,e.$emit("syncInvoiceMetaData",e.showData)},e.editSplittedWaiter=function(){e.isSplittedWaiterEditing=!1,e.splittedInvoice.servedby=e.splittedSelectedWaiter,e.$emit("syncInvoiceMetaData",e.splittedInvoice)},e.setActiveInvoiceTableAndEmployeeIndex=function(){for(t=0;t<e.tables.length;t++)e.tables[t]._id==e.showData.tables._id&&(e.selectedTable=e.tables[t]);if(void 0!=e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.showData.servedby._id&&(e.selectedWaiter=e.Allemployee[t]);else e.selectedWaiter=e.Allemployee[0]},e.ChangeSplittedTable=function(){e.isSplittedTableEditing=!0;for(t=0;t<e.tables.length;t++)e.tables[t]._id==e.splittedInvoice.tables._id&&(e.splittedSelectedTable=e.tables[t]);if(e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.splittedInvoice.servedby._id&&(e.splittedSelectedWaiter=e.Allemployee[t]);else e.splittedSelectedWaiter=e.Allemployee[0]},e.ChangeSplittedWaiter=function(){e.isSplittedWaiterEditing=!1;for(t=0;t<e.tables.length;t++)e.tables[t]._id==e.splittedInvoice.tables._id&&(e.splittedSelectedTable=e.tables[t]);if(e.showData.servedby)for(var t=0;t<e.Allemployee.length;t++)e.Allemployee[t]._id==e.splittedInvoice.servedby._id&&(e.splittedSelectedWaiter=e.Allemployee[t]);else e.splittedSelectedWaiter=e.Allemployee[0]},e.activateInventory=function(){$(".product-category").removeClass("active"),e.invoiceFocus=!1,e.tricolInventoryActive?e.tricolInventoryActive=!1:e.tricolInventoryActive=!0,$("#pdbox").addClass("active"),e.showSubCategory.length>0&&($("#"+e.showSubCategory[0].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[0].NameSpace).css("color","white"))},e.resetOrderForm=function(){e.selectedExtIn=[],e.selecctIngredients="",e.extraIngredients=[],e.note="",e.selectedVari=[],e.selectedIngredient=[]},e.showOrder=function(t){I.validateProduct(t,e.ingredientsInventory,e.Allproducts)?($("#addOrderItem").modal("show"),e.productList=t):$("#modalProductSoldOut").modal("show")},e.$on("updateInvoice",function(e,t){console.log(t)}),e.getProductById=function(t){for(var o=null,n=0;n<e.Allproducts.length;n++)e.Allproducts[n]._id==t&&(o=e.Allproducts[n]);return o},e.reduceLocalInventory=function(t,o){var n=e.getProductById(t);if(n)if("Retail"==n.type)n.Quantity=parseInt(n.Quantity)-1;else for(var i=n.Ingradients,a=0;a<i.length;a++){var l=-1;l=i[a].name._id?i[a].name._id:i[a].name;for(var r=0;r<e.ingredientsInventory.length;r++)e.ingredientsInventory[r]._id==l&&(e.ingredientsInventory[r].Quantity=e.ingredientsInventory[r].Quantity-i[a].quantity)}},e.restoreLocalInventory=function(t,o){var n=e.getProductById(t);if(n)if("Retail"==n.type)n.Quantity=parseInt(n.Quantity)+parseInt(o);else for(var i=n.Ingradients,a=0;a<i.length;a++){var l=-1;l=i[a].name._id?i[a].name._id:i[a].name;for(var r=0;r<e.ingredientsInventory.length;r++)e.ingredientsInventory[r]._id==l&&(e.ingredientsInventory[r].Quantity=parseFloat(e.ingredientsInventory[r].Quantity)+parseFloat(i[a].quantity)*parseFloat(o))}},e.$on("onAddOrder",function(t,o){console.log("onAddOrder event"+o),e.reduceLocalInventory(o,1),I.isSoldOut(o,e.ingredientsInventory,e.Allproducts)&&$("#prid"+o).addClass("sold-out"),"Retail"==e.getProductById(o).type?I.reduceProduct(o,1):I.reduceInventory(o,1)}),e.$on("onCancelOrder",function(t,o){var n=o.Id,i=o.QNTY;console.log("onCancelOrder event"+n),e.restoreLocalInventory(n,i),I.isSoldOut(n,e.ingredientsInventory,e.Allproducts)||$("#prid"+n).removeClass("sold-out"),"Retail"==e.getProductById(n).type?I.restoreProduct(n,i):I.restoreInventory(n,i)}),e.confirmItem=function(){$("#addOrderItem").modal("hide"),e.invoiceFocus=!0,e.bookOrder()},e.bookOrder=function(){if(I.validateProduct(e.productList._id,e.ingredientsInventory,e.Allproducts)){e.showData.orders||(e.showData.orders=[]);for(var t=!1,n=0;n<e.showData.orders.length;n++)e.showData.orders[n].product._id==e.productList._id&&(e.showData.orders[n].quantity++,e.showData.orders[n].temporalQuantity?e.showData.orders[n].temporalQuantity++:e.showData.orders[n].temporalQuantity=1,t=!0);if(!t){var i={clientId:I.generateGUID(),note:e.note,quantity:1,invoiceId:e.showData._id,product:e.productList,ingredient:e.selectedIngredient,variation:e.selectedVari,extraingredient:e.extraIngredients,status:o.orderStatusmanager.TEMPORAL,temporalQuantity:1};e.showData.orders.push(i)}e.showData.prices=I.priceCalculation(e.showData.orders),p.showAlert("error","success","Item added to the order successfully"),e.resetOrderForm(),e.updateToAllInvoice(e.showData),e.$emit("onAddOrder",e.productList._id);var a={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",a)}else $("#modalProductSoldOut").modal("show")},e.addquantity=null,e.increaseQuantityModal=function(t){e.addquantity=t,e.openModal("modalMoreItem")},e.addQuantityInItem=function(){$("#modalMoreItem").modal("hide");for(var t=0;t<e.showData.orders.length;t++)e.showData.orders[t].product._id==e.addquantity.product._id&&(I.validateProduct(e.showData.orders[t].product._id,e.ingredientsInventory,e.Allproducts)?(e.showData.orders[t].quantity++,e.showData.orders[t].temporalQuantity?e.showData.orders[t].temporalQuantity++:e.showData.orders[t].temporalQuantity=1,e.showData.prices=I.priceCalculation(e.showData.orders),e.$emit("onAddOrder",e.showData.orders[t].product._id),e.updateToAllInvoice(e.showData)):$("#modalProductSoldOut").modal("show"));var n={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",n)},e.CancelOrder=function(){if(e.activateInventory(),$("#modalCancelOrder").modal("hide"),e.showData.orders){for(var t=[],n=0;n<e.showData.orders.length;n++)e.showData.orders[n].temporalQuantity?(e.showData.orders[n].quantity=parseInt(e.showData.orders[n].quantity)-parseInt(e.showData.orders[n].temporalQuantity),e.$emit("onCancelOrder",{Id:e.showData.orders[n].product._id,QNTY:e.showData.orders[n].temporalQuantity}),e.showData.orders[n].temporalQuantity=null):e.$emit("onCancelOrder",{Id:e.showData.orders[n].product._id,QNTY:1}),e.showData.orders[n].status!=o.orderStatusmanager.TEMPORAL&&parseInt(e.showData.orders[n].quantity)>0&&t.push(e.showData.orders[n]);e.showData.orders=t}e.showData.prices=I.priceCalculation(e.showData.orders),p.showAlert("success","success","Temporary  items removed successfully from the order..");var i={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",i)},e.item=null,e.openRemoveModal=function(t){e.item=t,e.openModal("modalRemoveOrder")},e.removeItem=function(){$("#modalRemoveOrder").modal("hide");for(var t=0;t<e.showData.orders.length;t++)if(e.showData.orders[t].clientId==e.item.clientId&&(e.item.status==o.orderStatusmanager.TEMPORAL||e.item.status==o.orderStatusmanager.PLACED))if(e.showData.orders[t].temporalQuantity)e.showData.orders[t].quantity=parseInt(e.showData.orders[t].quantity)-1,e.showData.orders[t].temporalQuantity=parseInt(e.showData.orders[t].temporalQuantity)-1,e.$emit("onCancelOrder",{Id:e.showData.orders[t].product._id,QNTY:1}),0==parseInt(e.showData.orders[t].quantity)&&e.showData.orders.splice(t,1);else if(e.$emit("onCancelOrder",{Id:e.showData.orders[t].product._id,QNTY:1}),e.showData.orders.splice(t,1),e.item.status==o.orderStatusmanager.PLACED){var n={Invoice:e.showData,Order:e.item};I.removeOrder(n).then(function(e){console.log(e),p.showAlert("failed","Failed","Item has been removed successfully")},function(e){})}e.showData.prices=I.priceCalculation(e.showData.orders),e.updateToAllInvoice(e.showData);var i={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",i)},e.startPlaceOrder=function(){if(console.log(e.showData),e.showData&&e.showData.orders&&e.showData.orders.length>0){e.activateInventory();for(var t=!1,n=0;n<e.showData.orders.length;n++)if(e.showData.orders[n].status==o.orderStatusmanager.TEMPORAL){t=!0,e.showData.orders[n].status=o.orderStatusmanager.PLACED;var i=e.showData.orders[n],a={clientId:i.clientId,note:i.note,invoiceId:e.showData.clientId,quantity:i.quantity,product:i.product._id,ingredient:i.ingredient,variation:i.variation,extraingredient:i.extraingredient,status:i.status};I.placeOrder(a).then(function(e){I.addInvoinAndOrderInShift(e.result._id,"ORDER"),o.socket.emit("orderPlaced",{Order:e.result,ResId:u.restaurant})},y)}t&&(e.showData.invoiceStatus=o.invoiceStatusmanager.STARTED,I.UpdateInvoiceStatus(e.showData).then(function(e){console.log(e)},function(e){}))}else p.showAlert("failed","Failed","There is no item in this invoice")},e.allCloseInvoice=[],e.currentSplitOrder=!1,e.splittedInvoice=null,e.currentSplitItem={Item:null,Direction:null},e.MoveItem=function(t,o){e.currentSplitOrder?(e.currentSplitItem={Item:t,Direction:o},$("#modalMoveItem").modal("show")):p.showAlert("success","Success","Create new bill before splitting the item")},e.SplitItem=function(){var t=angular.copy(e.currentSplitItem),n=t.Item;if($("#modalMoveItem").modal("hide"),o.SplitItemDirection.FORWARD==t.Direction){for(var i=!0,a=0;a<e.showData.orders.length;a++)e.showData.orders[a].clientId==n.clientId&&(c=e.showData.orders[a].quantity)>0&&(i=!0,0==--c?(e.showData.orders.splice(a,1),I.removeOrderFromInvoice({clientId:n.clientId,invoiceId:e.showData.clientId}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})):(e.showData.orders[a].quantity=c,(s=e.showData.orders[a]).invoiceId=e.showData.clientId,I.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})));if(i){var l=!1;if(e.splittedInvoice.orders&&e.splittedInvoice.orders.length>0){for(a=0;a<e.splittedInvoice.orders.length;a++)if(e.splittedInvoice.orders[a].clientId==n.clientId){l=!0;c=e.splittedInvoice.orders[a].quantity;c++,e.splittedInvoice.orders[a].quantity=c,(s=e.splittedInvoice.orders[a]).invoiceId=e.showData.clientId,I.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}l||((d=angular.copy(n)).quantity=1,d.invoiceId=e.splittedInvoice.clientId,e.splittedInvoice.orders.push(n),delete d._id,I.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){}))}else e.splittedInvoice.orders=[],(d=angular.copy(n)).quantity=1,d.invoiceId=e.splittedInvoice.clientId,e.splittedInvoice.orders.push(d),delete d._id,I.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}}else if(o.SplitItemDirection.BACKWORD==t.Direction){for(var i=!0,a=0;a<e.splittedInvoice.orders.length;a++)e.splittedInvoice.orders[a].clientId==n.clientId&&(c=e.splittedInvoice.orders[a].quantity)>0&&(i=!0,0==--c?(e.splittedInvoice.orders.splice(a,1),I.removeOrderFromInvoice({clientId:n.clientId,invoiceId:e.splittedInvoice.clientId}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})):(e.splittedInvoice.orders[a].quantity=c,(s=e.splittedInvoice.orders[a]).invoiceId=e.splittedInvoice.clientId,I.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})));if(i){var r=!1;if(e.showData.orders&&e.showData.orders.length>0){for(a=0;a<e.showData.orders.length;a++)if(e.showData.orders[a].clientId==n.clientId){r=!0;var c=e.showData.orders[a].quantity;c++,e.showData.orders[a].quantity=c;var s=e.showData.orders[a];s.invoiceId=e.showData.clientId,I.setQuantityForInvoice({obj:s}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}r||((d=angular.copy(n)).quantity=1,d.invoiceId=e.showData.clientId,n.quantity=1,e.showData.orders.push(n),delete d._id,I.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){}))}else{e.showData.orders=[],e.showData.orders.push(n);var d=angular.copy(n);d.quantity=1,d.invoiceId=e.showData.clientId,delete d._id,I.addOrderToSplittedInvoice({item:d}).then(function(e){console.log(e),$("#modalCancelOrder").modal("hide")},function(e){})}}}p.showAlert("failed","Failed","Successfully Order Move..");for(var v=0;v<e.allInvoice.length;v++)e.allInvoice[v].clientId==e.splittedInvoice.clientId&&(e.allInvoice[v].orders=e.splittedInvoice.orders,e.allInvoice[v].prices=I.priceCalculation(e.splittedInvoice.orders));e.showData.prices=I.priceCalculation(e.showData.orders),e.splittedInvoice.prices=I.priceCalculation(e.splittedInvoice.orders);var h={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",h);var m={Invoice:e.splittedInvoice,ResId:u.restaurant};o.raiseSocketEvent("changeInvoiceOrders",m)},e.createNewSplitInvoice=function(t){e.splittedInvoice=angular.copy(t),e.splittedInvoice.clientId=I.generateGUID(),e.splittedInvoice.updated_at=new Date,e.splittedInvoice.created_at=new Date;var o=_.filter(e.allInvoice,function(t){return t.clientName.split("(")[0]==e.splittedInvoice.clientName.split("(")[0]});e.splittedInvoice.SplitinvoiceName=e.splittedInvoice.clientName.split("(")[0]+"("+o.length+")",e.splittedSelectedTable=t.tables,e.splittedInvoice.orders=[],e.splittedInvoice.prices=I.priceCalculation(e.splittedInvoice.orders),e.splittedInvoice.people=1,e.splittedInvoice.editable=!1},e.ChangeSplitInvoice=function(t){e.splittedInvoice=angular.copy(t),e.splittedInvoice.editable=!1,e.invoiceFocus=!0,e.currentSplitOrder=!0},e.cancelSlitted=function(){if(e.splittedInvoice.orders.length>0){for(var t=0;t<e.splittedInvoice.orders.length;t++)for(var o=0;o<e.showData.orders.length;o++)e.showData.orders[o]._id==e.splittedInvoice.orders[t]._id&&(e.showData.orders[o].quantity=parseInt(e.showData.orders[o].quantity)+parseInt(e.splittedInvoice.orders[t].quantity));e.showData.prices=I.priceCalculation(e.showData.orders)}$("#modalCancelSplit").modal("hide"),e.splittedInvoice.orders=[],e.compareBill1()},e.addSlittedInvoice=function(){delete e.splittedInvoice._id,delete e.splittedInvoice.invoiceNumber,e.splittedInvoice.orders=[],e.splittedInvoice.updated_at=new Date,e.splittedInvoice.created_at=new Date,e.splittedInvoice.invoiceNumber=e.getInvoiceNumber(),I.addSingleInvoiceToLocalDB(e.splittedInvoice).then(function(t){e.allInvoice.push(t),e.splittedInvoice.prices=I.priceCalculation(e.splittedInvoice.orders),e.$emit("syncInvoice",t),p.showAlert("error","success","Successfully Invoice Split.. ")})},e.cancelSlittedInvoice=function(){if(e.splittedInvoice.orders.length>0){for(var t=0;t<e.splittedInvoice.orders.length;t++)for(var o=0;o<e.showData.orders.length;o++)e.showData.orders[o]._id==e.splittedInvoice.orders[t]._id&&(e.showData.orders[o].quantity=parseInt(e.showData.orders[o].quantity)+parseInt(e.splittedInvoice.orders[t].quantity));e.showData.prices=I.priceCalculation(e.showData.orders)}$("#modalCancelSplitOrder").modal("hide"),e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBillActive?(e.compareBillActive=!1,e.currentSplitOrder=!1):e.compareBillActive=!0},e.Splitpayment=function(){for(var t=0;t<e.splittedInvoice.orders.length;t++)I.addInvoinAndOrderInShift(e.splittedInvoice.orders[t]._id,"ORDER");e.splittedInvoice.invoiceStatus="PAID",I.SplitInvoiceStatus(e.splittedInvoice).then(function(t){e.processPayment(),e.compareBill1(),p.showAlert("error","Failed","Payment successfully done")},function(e){console.log(e)})},e.getCategories=function(){h.GetCategory().then(function(t){for(o=0;o<t.length;o++)t[o].ParentCategory?(t[o].NameSpace=t[o].Name.replace(/\s/g,""),e.allSubCategory.push(t[o])):e.allCategory.push(t[o]);for(var o=0;o<e.allCategory.length;o++)for(var n=0;n<e.Allproducts.length;n++)e.Allproducts[n].ParentCategory._id==e.allCategory[o]._id&&(e.allCategory[o].image=e.Allproducts[n].image);e.allCategory.length>0&&(e.getProductdetail(e.allCategory[0],0),$("#pdbox").addClass("active"))},y)},e.getProduct=function(){h.GetProducts().then(function(t){e.getCategories(),e.Allproducts=t;for(var o=0;o<e.allCategory.length;o++)for(var n=0;n<e.Allproducts.length;n++)e.Allproducts[n].ParentCategory._id==e.allCategory[o]._id&&(e.allCategory[o].image=e.Allproducts[n].image)},y)},e.getProductdetail=function(t,o){e.categoryName1=t,e.showProduct=[],e.copy_categoryName1=angular.copy(e.categoryName1),e.showSubCategory=[];e.showSubCategory=_.filter(e.allSubCategory,function(e){return e.ParentCategory._id==t._id}),e.showSubCategory.length>0&&(e.showProduct=_.filter(e.Allproducts,function(t){return t.Category._id==e.showSubCategory[0]._id}),$("#"+e.showSubCategory[0].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[0].NameSpace).css("color","white")),$("#pdbox").addClass("active")},e.getProductdetailBySubcateId=function(t){for(var o=0;o<e.showSubCategory.length;o++)e.showSubCategory[o]._id==t._id?($("#"+e.showSubCategory[o].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[o].NameSpace).css("color","white")):($("#"+e.showSubCategory[o].NameSpace).css("background-color",""),$("#"+e.showSubCategory[o].NameSpace).css("color",""));e.showProduct=_.filter(e.Allproducts,function(e){return e.Category._id==t._id})},e.getProduct(),$("#addOrderItem").on("shown.bs.modal",function(){$.material.checkbox(),$.material.radio(),$.material.input();try{$("#txtnotearea").parent().css("margin-top","0px")}catch(e){}}),e.selectedIngredient=[],e.selectedVari,e.selectedExtIn=[],e.selectExtIn=function(t){var o=!0;if(e.selectedExtIn.length>0){for(var n=0;n<e.selectedExtIn.length;n++)e.selectedExtIn[n]==t?e.selectedExtIn.splice(n,1):o=!1;o||e.selectedExtIn.push(t)}else e.selectedExtIn.push(t)},e.selectIngredient=function(t){var o=!0;if(e.selectedIngredient.length>0){for(var n=0;n<e.selectedIngredient.length;n++)e.selectedIngredient[n]==t.name.Name?e.selectedIngredient.splice(n,1):o=!1;o||e.selectedIngredient.push(t.name.Name)}else e.selectedIngredient.push(t.name.Name)},e.selectVari=function(t){e.selectedVari=t.Name},e.onAddExtraIngredients=function(t){e.extraIngredients.indexOf(t)>0||e.extraIngredients.push(t),console.log(e.extraIngredients),setTimeout(function(){$.material.checkbox(),$.material.radio()},200)},e.onSelectExtraIngredient=function(t){var o=e.extraIngredients.indexOf(t);e.extraIngredients.splice(o,0)},e.payAmount=0,e.enableDoneButton=!0,e.invoiceAmount=null,e.getCurrentInvoiceTotal=function(t){return"SplitInvoice"!=t?angular.copy(e.showData.prices.grandtotal):angular.copy(e.splittedInvoice.prices.grandtotal)},e.enterNumber=function(t,o){var n=e.getCurrentInvoiceTotal(o);0==e.payAmount?e.payAmount=parseInt(t):e.payAmount=parseInt(String(e.payAmount)+String(t)),e.payAmount1=parseInt(e.payAmount)-n,e.invoiceAmount=n},e.addNumber=function(t,o){var n=e.getCurrentInvoiceTotal(o);e.payAmount&&""!=e.payAmount?(e.payAmount=parseInt(e.payAmount)+parseInt(t),e.payAmount1=parseInt(e.payAmount)-n):e.payAmount=parseInt(t)},e.backspace=function(t){var o=e.getCurrentInvoiceTotal(t);e.payAmount<10?(e.payAmount=0,e.payAmount1=parseInt(e.payAmount)-o):(e.payAmount=parseInt(String(e.payAmount).slice(0,-1)),e.payAmount1=parseInt(e.payAmount)-o)},e.Exact=function(t){e.payAmount=e.getCurrentInvoiceTotal(t),e.payAmount1=0},e.processPayment=function(t){e.invoiceFocus=!1,e.procesorActive=!e.procesorActive,e.payAmount=0;var o=e.getCurrentInvoiceTotal(t);o>0?(e.payAmount1=-o,e.invoiceAmount=angular.copy(o)):p.showAlert("error","Failed","There is no order.. ")},e.processPaymentInvoice=function(t){e.payAmount=0,"Invoice"==t?e.showData.orders.length>0?(e.payAmount1=-e.showData.prices.grandtotal,e.invoiceAmount=angular.copy(e.showData.prices.grandtotal),e.invoiceFocus=!1,e.procesorActive=!e.procesorActive):p.showAlert("error","Failed","There is no order.. "):"SplitInvoice"==t&&(e.splittedInvoice.orders.length>0?(e.payAmount1=-e.splittedInvoice.prices.grandtotal,e.invoiceAmount=angular.copy(e.splittedInvoice.prices.grandtotal),e.invoiceFocus=!1,e.procesorActive=!e.procesorActive):p.showAlert("error","Failed","There is no order.. "))},e.paymentDone=function(t){if(e.processPayment(""),"Invoice"!=t){e.splittedInvoice.invoiceStatus="CLOSED",I.closeInvoice(e.splittedInvoice.clientId).then(function(t){if(console.log(t),t.Error){for(o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.splittedInvoice.clientId&&(e.allInvoice[o].invoiceStatus="STARTED",e.splittedInvoice.editable=!0,e.allCloseInvoiceShow=!1);p.showAlert("error","Failed","Something Goes Wrong try again ")}else{for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.splittedInvoice.clientId&&(e.allInvoice[o].invoiceStatus="CLOSED",e.allCloseInvoice.push(e.allInvoice[o]),e.allInvoice.splice(o,1));p.showAlert("error","Failed","Payment done successfully.."),e.invoiceFocus=!1,e.tricolInventoryActive=!1,e.compareBill1(),e.createNewSplitInvoice(e.showData)}},y);n={Invoice:e.splittedInvoice,ResId:u.restaurant};o.raiseSocketEvent("invoiceClose",n)}else{e.showData.invoiceStatus="CLOSED",e.showData.editable=!1,I.closeInvoice(e.showData.clientId).then(function(t){if(console.log(t),t.Error){for(o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.showData.clientId&&(e.allInvoice[o].invoiceStatus="STARTED",e.showData.editable=!0,e.allCloseInvoiceShow=!1);p.showAlert("error","Failed","Something Goes Wrong try again ")}else{for(var o=0;o<e.allInvoice.length;o++)e.allInvoice[o].clientId==e.showData.clientId&&(e.allInvoice[o].invoiceStatus="CLOSED",e.allCloseInvoice.push(e.allInvoice[o]),e.allInvoice.splice(o,1));p.showAlert("error","Failed","Payment done successfully..")}},y);var n={Invoice:e.showData,ResId:u.restaurant};o.raiseSocketEvent("invoiceClose",n)}},e.$watch("payAmount",function(){var t=0;""!=e.payAmount&&(t=e.payAmount),parseFloat(t)>=parseFloat(e.invoiceAmount)?e.enableDoneButton=!0:e.enableDoneButton=!1}),e.finish=function(){I.finishSplit(e.showData).then(function(t){e.compareBill(),p.showAlert("error","Failed","Split successfully finish")},function(e){console.log(e)})},e.editClose=function(e){$("#cat"+e).parent(".product-category").toggleClass("active")},e.isCurrentRoomInvoice=function(t){return!!e.roombj&&t.tables.roomid._id==e.roombj._id},e.isCurrentTableInvoice=function(t){return!!e.isCurrentRoomInvoice(t)&&(!!e.currentOpenTable&&e.currentOpenTable._id==t.tables._id)},e.$on("onOrderStarted",function(t,n){var i=n.orderId,a=w(e.showData,i.clientId,i.invoiceId);a>=0&&(e.showData.orders[a].status=o.orderStatusmanager.STARTED);var l=n.INV;if(e.allInvoice)for(var r=0;r<e.allInvoice.length;r++)if(e.allInvoice[r]&&e.allInvoice[r].clientId==l.clientId)for(var c=0;c<e.allInvoice[r].orders.length;c++)e.allInvoice[r].orders[c].clientId==i.clientId&&(e.allInvoice[r].orders[c].status=o.orderStatusmanager.STARTED);e.$apply()}),e.$on("onChangeInvoiceMetaData",function(t,o){var n=o.Invoice;if(e.isCurrentRoomInvoice(n)){if(e.allInvoice)for(i=0;i<e.allInvoice.length;i++)e.allInvoice[i]&&e.allInvoice[i].clientId==n.clientId&&(e.allInvoice[i].clientName=n.clientName,e.allInvoice[i].servedby=n.servedby,e.allInvoice[i].people=n.people,e.allInvoice[i].tables=n.tables);if(e.isCurrentTableInvoice(n)){if(e.invoiceRepo)for(var i=0;i<e.invoiceRepo.length;i++)e.invoiceRepo[i]&&e.invoiceRepo[i].clientId==n.clientId&&(e.invoiceRepo[i].clientName=n.clientName,e.invoiceRepo[i].servedby=n.servedby,e.invoiceRepo[i].people=n.people,e.invoiceRepo[i].tables=n.tables);e.showData&&e.showData.clientId==n.clientId&&(e.showData.clientName=n.clientName,e.showData.servedby=n.servedby,e.showData.people=n.people,e.showData.tables=n.tables)}e.$apply()}}),e.$on("onNewInvoice",function(t,o){var n=o.Invoice;if(e.isCurrentRoomInvoice(n)){if(e.invoiceRepo&&e.invoiceRepo.length>0){for(var i=!1,a=0;a<e.invoiceRepo.length;a++)e.invoiceRepo[a]&&e.invoiceRepo[a].clientId==n.clientId&&(i=!0);i||e.invoiceRepo.push(n)}else e.invoiceRepo=[n];if(e.isCurrentTableInvoice(n))if(e.allInvoice&&e.allInvoice.length>0){for(var i=!1,a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&(i=!0);i||e.allInvoice.push(n)}else e.allInvoice=[n];e.$apply()}}),e.$on("onChangeInvoiceOrders",function(t,o){var n=angular.copy(o);console.log("recieved client id -"+n.Invoice.clientId);var i=n.Invoice;if(e.isCurrentRoomInvoice(i)){if(e.invoiceRepo)for(a=0;a<e.invoiceRepo.length;a++)e.invoiceRepo[a]&&e.invoiceRepo[a].clientId==i.clientId&&(console.log("allinvoice match"),console.log("match index is - "+a),e.invoiceRepo[a].orders=angular.copy(i.orders));if(e.isCurrentTableInvoice(i)&&(e.showData&&e.showData.clientId==i.clientId&&(console.log("showdata match"),e.showData.orders=angular.copy(i.orders)),e.allInvoice))for(var a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==i.clientId&&(console.log("allinvoice match"),console.log("match index is - "+a),e.allInvoice[a].orders=angular.copy(i.orders))}e.$apply()}),e.$on("onInvoiceTableChange",function(t,o){console.log(o);var n=o.Invoice;if(e.roombj)if(o.TBLS.NEW.roomid._id==e.roombj._id){if(e.invoiceRepo&&e.invoiceRepo.length>0){for(var i=!1,a=0;a<e.invoiceRepo.length;a++)e.invoiceRepo[a]&&e.invoiceRepo[a].clientId==n.clientId&&(i=!0,e.invoiceRepo[a]=n);i||e.invoiceRepo.push(n)}else e.invoiceRepo=[n];if(e.currentOpenTable){if(o.TBLS.NEW._id==e.currentOpenTable._id)if(e.allInvoice&&e.allInvoice.length>0){i=!1;for(a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&(i=!0,e.allInvoice[a]=n);i||e.allInvoice.push(n)}else e.allInvoice=[n];if(o.TBLS.OLD._id==e.currentOpenTable._id&&e.allInvoice&&e.allInvoice.length>0)for(a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&e.allInvoice.splice(a,1)}}else if(o.TBLS.OLD.roomid._id==e.roombj._id){if(e.invoiceRepo&&e.invoiceRepo.length>0)for(a=0;a<e.invoiceRepo.length;a++)e.invoiceRepo[a]&&e.invoiceRepo[a].clientId==n.clientId&&e.invoiceRepo.splice(a,1);if(e.currentOpenTable&&o.TBLS.OLD._id==e.currentOpenTable._id&&e.allInvoice&&e.allInvoice.length>0)for(a=0;a<e.allInvoice.length;a++)e.allInvoice[a]&&e.allInvoice[a].clientId==n.clientId&&e.allInvoice.splice(a,1)}e.$apply()}),e.$on("onInvoiceClose",function(t,o){var n=o.Invoice;if(e.isCurrentRoomInvoice(n)){if(e.invoiceRepo)for(i=0;i<e.invoiceRepo.length;i++)e.invoiceRepo[i]&&e.invoiceRepo[i].clientId==n.clientId&&(e.invoiceRepo[i].invoiceStatus="CLOSED",e.invoiceRepo[i].editable=!1,e.invoiceRepo.splice(i,1));if(e.isCurrentTableInvoice(n)){if(e.showData&&e.showData.clientId==n.clientId&&(e.showData.invoiceStatus="CLOSED",e.showData.editable=!1),e.allInvoice)for(var i=0;i<e.allInvoice.length;i++)e.allInvoice[i]&&e.allInvoice[i].clientId==n.clientId&&(e.allInvoice[i].invoiceStatus="CLOSED",e.allInvoice[i].editable=!1,e.allCloseInvoice.push(e.allInvoice[i]),e.allInvoice.splice(i,1));e.$apply()}}}),e.$on("onShiftClosed",function(t,o){console.log(o),$("#shiftCloseModal").modal("show"),e.invoiceRepo=[],e.allInvoice=[],e.showData={},e.splittedInvoice={},e.allCloseInvoice=[],setTimeout(function(){window.location="/employee"},5e3)})}angular.module("cashierHall").controller("cashierHallController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","employeeprofileService","PATHS","PermissionService","getEmployee","alertservice","cashierBillsServiceFn","serviceFun","pouchDB","$stateParams","utilservice"]}();
(function() {
    'use strict';

    angular
        .module('cashierHall')
        .controller('cashierHallController', Controller);

     Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'cashierBillsServiceFn','serviceFun','pouchDB','$stateParams','utilservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, cashierBillsServiceFn, serviceFun, pouchDB, $stateParams, utilservice) {

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
          values[1] = parseInt(values[1])*0.55;
          values[0] = parseInt(values[0])+195;
          if( $scope.tableActive) {
            values[0] = values[0]/2;
          }
          return 'position:absolute;left:'+ values[0] + 'px; top: '+values[1] + 'px;';
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

            $http.get('/api/get/employee', getEmployee.restaurant).then(function (res) {
                $scope.Allemployee = [{ _id: -1, firstname: 'No Waiter' }];
                for (var i = 0; i < res.data.data.length; i++) {
                    $scope.Allemployee.push(res.data.data[i]);
                }
            }, failPayload);

            utilservice.loadShift().then(function (isopen) {
                if (!isopen) window.location = '/employee';
            });


        }

        $scope.tableIds = [];
        $scope.initRoom = function () {
            $http.post('/api/room/getrooms', { id: getEmployee.restaurant }).then(function (res) {
                if (res.data) {
                    console.log(res.data);
                    for (var r = 0; r < res.data.length; r++) {
                        if (res.data[r]._id == $scope.roomid) {
                            $scope.roombj = res.data[r];
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
                }
            }, function (res) { console.log(); });
        }
        $scope.initRoom();

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
            $scope.tricolInventoryActive = false;
            if ($scope.compareBillActive) {
                $scope.compareBillActive = false;
                $scope.currentSplitOrder = false;
            } else {
                $scope.compareBillActive = true;
            }
            $scope.createNewSplitInvoice($scope.showData);
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
            delete invoice._id;
            $http.post('/api/v1/invoice', invoice).then(function (res) {
                cashierBillsServiceFn.addInvoinAndOrderInShift(res.data._id, 'INVOICE').then(function (response) { }, function (err) { });
            }, failPayload);
        });

        $scope.$on("syncInvoiceMetaData", function (evt, invoice) {
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
            })
            console.log(invoice);
            cashierBillsServiceFn.syncInvoiceMetaData(invoice).then(function () {
                //alert("Invoice sync successfully");
            });
            var sokectObj = { Invoice: invoice, ResId: getEmployee.restaurant };
            $rootScope.socket.emit('changeInvoiceMetaData', sokectObj);
        });

        $scope.reinitlizeAddInvoiceModal = function () {
            $scope.name = '';
            $scope.people = 1;
            $scope.table = 'Select Table';
            $('#modalNewBill').modal('hide');
        }
        $scope.getInvoiceNumber = function () {
            if ($scope.allInvoice && $scope.allInvoice.length > 0) {
                return $scope.allInvoice.length + 1;
            } else
                return 1;
        }

        $scope.addInvoice = function () {
            debugger;
            if ($scope.name != undefined && $scope.name != '') {
                var tbtoadd = _.find($scope.tables, { _id: $scope.currentOpenTable._id });
                var emtoadd = _.find($scope.Allemployee, { _id: $scope.Allemployee[1]._id });
                var obj = cashierBillsServiceFn.defaultInvoiceObject($scope.name, tbtoadd, emtoadd, getEmployee.restaurant, $scope.people)
                obj.invoiceNumber = $scope.getInvoiceNumber();
                cashierBillsServiceFn.addSingleInvoiceToLocalDB(obj).then(function (response) {
                    console.log("add invoice rsponse");
                    console.log(response);
                    if ($scope.allInvoice && $scope.allInvoice.length > 0)
                        $scope.allInvoice.push(response);
                    else
                        $scope.allInvoice = [response];

                    if ($scope.invoiceRepo && $scope.invoiceRepo.length > 0)
                        $scope.invoiceRepo.push(response);
                    else
                        $scope.invoiceRepo = [response];

                    $scope.reinitlizeAddInvoiceModal();
                    $scope.Tabledetail(response, true);
                    $scope.$emit("syncInvoice", response);
                });
            }
            else { alert("Fields cannot be null..") }
        }

        $scope.EditInvoice = function (currentinvoice, modalid) {
            if (currentinvoice.clientName != undefined && currentinvoice.clientName != '') {
                $scope.hideModal(modalid);
                $scope.$emit("syncInvoiceMetaData", currentinvoice);
            }
            else { alert("Name cannot be null..") }
        }
        //INvoice  create update code

        //Invoice metadata logic
        $scope.people = 1;
        $scope.isTableEditing = false;
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
            for (var i = 0; i < $scope.tables.length; i++) {
                if ($scope.tables[i]._id == $scope.showData.tables._id) {
                    $scope.selectedTable = $scope.tables[i];
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
                $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
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
                if ($scope.Allproducts[pcon]._id == productId)
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
                    for (var icont = 0; icont < inds.length; icont++) {
                        var iid = -1;
                        if (inds[icont].name._id)
                            iid = inds[icont].name._id;
                        else
                            iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic]._id == iid) {
                                $scope.ingredientsInventory[ic].Quantity = $scope.ingredientsInventory[ic].Quantity - inds[icont].quantity;
                            }
                        }
                    }
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
                    for (var icont = 0; icont < inds.length; icont++) {
                        var iid = -1;
                        if (inds[icont].name._id)
                            iid = inds[icont].name._id;
                        else
                            iid = inds[icont].name;
                        for (var ic = 0; ic < $scope.ingredientsInventory.length; ic++) {
                            if ($scope.ingredientsInventory[ic]._id == iid) {
                                $scope.ingredientsInventory[ic].Quantity = parseFloat($scope.ingredientsInventory[ic].Quantity) + parseFloat(inds[icont].quantity) * parseFloat(quantity);
                            }
                        }
                    }
                }
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
            if (cashierBillsServiceFn.validateProduct($scope.productList._id, $scope.ingredientsInventory, $scope.Allproducts)) {
                if (!$scope.showData.orders)
                    $scope.showData.orders = [];
                var isExisting = false;
                for (var ocount = 0; ocount < $scope.showData.orders.length; ocount++) {
                    if ($scope.showData.orders[ocount].product._id == $scope.productList._id) {
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
                        clientId: cashierBillsServiceFn.generateGUID(),
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
                $scope.$emit("onAddOrder", $scope.productList._id);
                var sokectObj = { Invoice: $scope.showData, ResId: getEmployee.restaurant };
                $rootScope.raiseSocketEvent('changeInvoiceOrders', sokectObj);
            } else {
                $("#modalProductSoldOut").modal('show');
            }
        }

        $scope.addquantity = null;

        $scope.increaseQuantityModal = function (or) {
            $scope.addquantity = or;
            $scope.openModal('modalMoreItem');
        }

        $scope.addQuantityInItem = function () {
            $('#modalMoreItem').modal('hide');
            for (var odCounter = 0; odCounter < $scope.showData.orders.length; odCounter++) {
                if ($scope.showData.orders[odCounter].product._id == $scope.addquantity.product._id) {
                    if (cashierBillsServiceFn.validateProduct($scope.showData.orders[odCounter].product._id, $scope.ingredientsInventory, $scope.Allproducts)) {
                        $scope.showData.orders[odCounter].quantity++;
                        if ($scope.showData.orders[odCounter].temporalQuantity)
                            $scope.showData.orders[odCounter].temporalQuantity++;
                        else
                            $scope.showData.orders[odCounter].temporalQuantity = 1;
                        $scope.showData.prices = cashierBillsServiceFn.priceCalculation($scope.showData.orders);
                        $scope.$emit("onAddOrder", $scope.showData.orders[odCounter].product._id);
                        $scope.updateToAllInvoice($scope.showData);
                    } else {
                        $("#modalProductSoldOut").modal('show');
                    }
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
                        $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[ocounter].product._id, QNTY: $scope.showData.orders[ocounter].temporalQuantity });
                        $scope.showData.orders[ocounter].temporalQuantity = null;
                    }
                    else
                        $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[ocounter].product._id, QNTY: 1 });
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
                            $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[i].product._id, QNTY: 1 });
                            //$scope.showData.orders[i].temporalQuantity = null;
                            if (parseInt($scope.showData.orders[i].quantity) == 0)
                                $scope.showData.orders.splice(i, 1);
                        }
                        else {
                            $scope.$emit("onCancelOrder", { Id: $scope.showData.orders[i].product._id, QNTY: 1 });
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

        $scope.startPlaceOrder = function () {
            console.log($scope.showData);
            if ($scope.showData && $scope.showData.orders && $scope.showData.orders.length > 0) {
                $scope.activateInventory();
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
                            status: orderObj.status
                        };
                        cashierBillsServiceFn.placeOrder(obj).then(function (res) {
                            cashierBillsServiceFn.addInvoinAndOrderInShift(res.result._id, 'ORDER');
                            $rootScope.socket.emit('orderPlaced', { Order: res.result, ResId: getEmployee.restaurant });
                        }, failPayload)
                    }
                }
                if (isAnyNewOrderPlacced) {
                    $scope.showData.invoiceStatus = $rootScope.invoiceStatusmanager.STARTED;
                    cashierBillsServiceFn.UpdateInvoiceStatus($scope.showData).then(function (response) {
                        console.log(response);
                    }, function (err) { });
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
            debugger;
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
            $scope.splittedInvoice.clientId = cashierBillsServiceFn.generateGUID();
            $scope.splittedInvoice.updated_at = new Date();
            $scope.splittedInvoice.created_at = new Date();
            var obj = _.filter($scope.allInvoice, function (num) { return num.clientName.split("(")[0] == $scope.splittedInvoice.clientName.split("(")[0]; });
            $scope.splittedInvoice.SplitinvoiceName = $scope.splittedInvoice.clientName.split("(")[0] + "(" + obj.length + ")";
            $scope.splittedSelectedTable = invoice.tables;
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
            $scope.splittedInvoice.invoiceNumber = $scope.getInvoiceNumber()
            cashierBillsServiceFn.addSingleInvoiceToLocalDB($scope.splittedInvoice).then(function (response) {
                $scope.allInvoice.push(response);
                //$scope.splittedInvoice.invoiceNumber = res.invoiceNumber;
                $scope.splittedInvoice.prices = cashierBillsServiceFn.priceCalculation($scope.splittedInvoice.orders);
                $scope.$emit("syncInvoice", response);
                alertservice.showAlert('error', "success", "Successfully Invoice Split.. ");
            });
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
                        if ($scope.Allproducts[j].ParentCategory._id == $scope.allCategory[i]._id) {
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
                        if ($scope.Allproducts[j].ParentCategory._id == $scope.allCategory[i]._id) {
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
            $scope.showSubCategory = _.filter($scope.allSubCategory, function (num) { return num.ParentCategory._id == data._id; });
            if ($scope.showSubCategory.length > 0) {
                $scope.showProduct = _.filter($scope.Allproducts, function (num) { return num.Category._id == $scope.showSubCategory[0]._id; });
                $("#" + $scope.showSubCategory[0].NameSpace).css('background-color', '#ff5722');
                $("#" + $scope.showSubCategory[0].NameSpace).css('color', 'white');
            }
            $("#pdbox").addClass("active");
        }

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

!function(){"use strict";function e(e,t,n,r){function o(e){"usersess"==e._id&&(e.usermoment.employee?emit(e.usermoment.employee):emit(e.name))}function a(e){"employee"==e._id&&(e.emplyoeedata?emit(e.emplyoeedata):emit(e.name))}function i(e){return e.data}function u(e){return e.data}function c(e){return e.data}function l(e){return e.data.data[0]}function s(e){return function(){return{success:!1,message:e}}}var p=t("lanapp",{adapter:"idb"});console.log("test");var d={};return d.GetEmp=function(t){return e.get("/api/get/employee",t).then(function(e){return e.data},s("Error getting all users"))},d.CurrentEmployee=function(){return navigator.onLine?e.get("/api/v1/employeedetails").then(l,s("Error getting all users")):p.query(o).then(function(e){return e.rows[0].key}).catch(function(e){console.log(e)})},d.updateUser=function(t){return navigator.onLine?e.post("/api/v1/currentemployeeUpdate",t).then(c,s("Error getting all users")):(t.flag=1,p.query(a,{include_docs:!0}).then(function(e){var r=[];r=t._id,e.rows[0].key.filter(function(e){return r.indexOf(e._id)>-1});for(var o,a=0,i=e.rows[0].key.length;a<i;a++)e.rows[0].key[a]._id==t._id&&(o=a,p.get("employee").then(function(e){delete e.emplyoeedata[o],e.emplyoeedata[o]=t;var r={edit:t._id,data:t,syncstatus:0};if(n.get("_meanLanAppSync")){var a=n.get("_meanLanAppSync");"1"in a?(delete a[1],a[1]={employeeprofile:r}):a[1]={employeeprofile:r},console.log("New struct"),console.log(a),n.set("_meanLanAppSync",a)}return p.put({_id:"employee",_rev:e._rev,emplyoeedata:e.emplyoeedata})}))}).catch(function(e){console.log(e)}))},d.AddInvoice=function(t){return e.post("/api/v1/invoice",t).then(i,s("Error getting all users"))},d.GetInvoice=function(){return e.get("/api/get/invoice","").then(u,s("Error getting all users"))},d.GetTables=function(){return e.get("/api/get/tables","").then(function(e){return e.data},s("Error getting all users"))},d.EditInvoice=function(t){return e.post("/api/v1/updateinvoice",t).then(function(e){return e.data},s("Error getting all users"))},d.EditingTable=function(t){return e.post("/api/v1/updatetable",t).then(function(e){return e.data},s("Error getting"))},d}angular.module("cashierHall").factory("cashierHallService.js",e).service("cashierServiceFn",e),e.$inject=["$http","pouchDB","localStorageService","$rootScope"]}();
(function () {
    'use strict';

    angular
        .module('cashierHall')
        .factory('cashierHallService.js', cashierServiceFn)
        .service('cashierServiceFn', cashierServiceFn);

    cashierServiceFn.$inject = ['$http', 'pouchDB', 'localStorageService', '$rootScope'];
    /* @ngInject */
    function cashierServiceFn($http, pouchDB, localStorageService, $rootScope) {
        var db = pouchDB('lanapp', { adapter: 'idb' });
        console.log("test");
        var service = {};
        service.GetEmp = GetEmp;
        service.CurrentEmployee = CurrentEmployee;
        service.updateUser = CurrentEmployeeUpdate;
        service.AddInvoice = AddInvoice;
        service.GetInvoice = GetInvoice;
        service.GetTables = GetTables;
        service.EditInvoice = EditInvoice;
        service.EditingTable = EditingTable;
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

        function AddInvoice(data) {
            return $http.post('/api/v1/invoice', data).then(InvoiceSuccess, handleError('Error getting all users'));

        }

        function GetEmp(data) {
            return $http.get('/api/get/employee', data).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

        function GetInvoice() {
            return $http.get('/api/get/invoice', '').then(getInvoiceSuccess, handleError('Error getting all users'));

        }

     

        function GetTables() {
            return $http.get('/api/get/tables', '').then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

      
        function EditInvoice(data) {
            return $http.post('/api/v1/updateinvoice', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }

        function EditWaiter(data) {
            return $http.post('/api/v1/waiter', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

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
    }

})();
!function(){"use strict";var r=null,o=null;angular.module("dashboard",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(e,a,t,n,i,d){function l(r,o){if(navigator.onLine)return r.loginResolver().then(function(r){return r});r.isLoggedIn()}r=a,(o=e).state("dashboard",{url:"/dashboard",templateUrl:d.TEMPLATE+"dashboard/dashboard.html",controller:"dashboardController",controllerAs:"vm",data:{pageTitle:"Dashboard",bodyClass:"dashboard"},resolve:{session:l}}),l.$inject=["SessionService","socket"]}])}();
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






!function(){"use strict";function e(e,s,o,n,r,a,t,l,i,c,u,d,p,m,g,h,f){function v(e){console.log(e),e.success?(o.connection(e.data._id),f.showAlert("success","Done",e.message),S.get("usersess",function(s,o){if(s)console.log("err end session "),console.log(s);else{var n=o;n.usermoment.employee=e.data,S.put({_id:"usersess",_rev:o._rev,usermoment:n.usermoment});var r={session:!0,data:e.data,syncstatus:1};if(l.get("_meanLanAppSync"))(a=[]).push({session:r}),l.set("_meanLanAppSync",a),window.location="/employee";else{var a=[];a.push({session:r}),l.set("_meanLanAppSync",a),window.location="/employee"}}})):(A.disabled=!1,A.loader=!1,f.showAlert("error","Failed",e.message)),A.user.auth=null}function y(e){f.showAlert("error","Error",e),console.log(e),A.user.auth=null,A.disabled=!1,A.loader=!1}t.getSession();var A=this,S=h("lanapp",{adapter:"idb"});A.user={},A.disabled=!1,A.loader=!1,this.auth=function(e){if(e&&4==e.length){var s=e;A.disabled=!0,A.loader=!0,p(function(){navigator.onLine?S.get("usersess").then(function(s){console.log(s);var o={pin:e,restaurantid:s.usermoment.userid};d.loginpad(o).then(v,y)}):S.get("employee").then(function(e){var o=[];o=s;var n=e.emplyoeedata.filter(function(e){return o.indexOf(e.pin)>-1});(n={filteredArray:n}).length<=0?f.showAlert("error","Failed","Login Failed"):void 0!==n&&n.filteredArray.length>0?(f.showAlert("success","Done","Login Successfully"),S.get("usersess",function(e,s){if(e)console.log("err end session "),console.log(e);else{console.log("Done handleSuccessLocal");s._rev;var o=s;o.usermoment.employee={},o.usermoment.employee=n.filteredArray[0],S.put({_id:"usersess",_rev:s._rev,usermoment:o.usermoment});var r={session:!0,data:n.filteredArray[0],syncstatus:0};if(l.get("_meanLanAppSync")){var a=[];(a=l.get("_meanLanAppSync")).splice(0,0,{session:r}),a.join(),l.set("_meanLanAppSync",a)}else(a=[]).push({session:r}),l.set("_meanLanAppSync",a);window.location="/employee"}})):f.showAlert("error","Failed","Login Failed"),A.user.auth=null,A.disabled=!1,A.loader=!1}).catch(function(e){console.log(e),f.showAlert("error","Failed","Login Failed"),A.user.auth=null,A.disabled=!1,A.loader=!1})},2e3)}}}angular.module("dashboard").controller("dashboardController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","PATHS","PermissionService","dashboardService","$timeout","$translate","dataservice","pouchDB","alertservice"]}();
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

!function(){"use strict";function n(n,t){function r(n){return n.data}function e(n){return function(){return{success:!1,message:n}}}t("lanapp",{adapter:"idb"});var a={};return a.loginpad=function(t){if(navigator.onLine)return n.post("/api/v1/employeeLogin",{minifpin:t}).then(r,e("Error getting all users"))},a}angular.module("dashboard").factory("dashboardService",n),n.$inject=["$http","pouchDB"]}();

(function () {
    'use strict';

    angular
        .module('dashboard')
        .factory('dashboardService', serviceFn);

    serviceFn.$inject = ['$http','pouchDB'];
    /* @ngInject */
    function serviceFn($http,pouchDB) {
        var db =  pouchDB('lanapp', {adapter : 'idb'});
        var service = {};
        service.loginpad       = employeeLogin;
        return service;
        
        /////////
       

        function employeeLogin(data) {
            if(navigator.onLine){
                // pdb.get(noteid, {attachments: true}, function(error, response) {
                //  Employee.findOne({ pin: PIN, active : 1 }, function (err, user) {
                

               /* db.query('employee', {
                            pin: 1111
                          }).then(function (result) {
                                        console.log(result);
                          }).catch(function (err) {
                                 console.log(err);
                            });*/

                /*db.query(function (doc, emit) {
                  emit(doc.name);
                }, {key: 'foo'}).then(function (result) {
                  // found docs with name === 'foo'
                }).catch(function (err) {
                  // handle any errors
                });*/

               /* db.allDocs({
                  include_docs: true,
                  startkey: 'pin'
                }).then(function (result) {
                    console.log(result)
                  // handle result
                }).catch(function (err) {
                  console.log(err);
                });*/
               /* db.get('employee').then(function (result) {
                    console.log(result)
                    var empIds = [1112]
                    var filteredArray = result.emplyoeedata.filter(function(itm){
                      return empIds.indexOf(itm.pin) > -1;
                    });

                    filteredArray = {  filteredArray };
                    console.log(filteredArray)
                  // handle result
                }).catch(function (err) {
                  console.log(err);
                })*/
                return $http.post('/api/v1/employeeLogin',{minifpin: data}).then(handleSuccessLocal, handleError('Error getting all users'));
            }
            else{

            }
        }
       


        function handleSuccess(res) {
            return res.data;
        }
        function handleSuccessLocal(res) {
            var return_data = res.data;
            /*db.get('usersess', function(err, doc) {
                    if (err) { 
                        console.log("err end session")
                        console.log(err)
                    }
                    else{
                        console.log("Done handleSuccessLocal")
                        console.log(doc)
                        
                        var id= doc._rev;
                        var datas = doc

                        datas.usermoment.employee = return_data

                               db.put({
                                _id: 'usersess',
                                _rev: doc._rev,
                                usermoment: datas
                              });

                    }

                })*/
             return return_data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
!function(){"use strict";var e=null,o=null;angular.module("welcomeEmployee",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(n,r,t,l,i,a){function c(e){return!navigator.onLine||e.loginResolver().then(function(e){return e})}function u(e){if(navigator.onLine)return e.authEmployee().then(function(e){return e});e.authEmployee()}function m(e){return navigator.onLine,e.CurrentEmployee().then(function(e){return e})}e=r,(o=n).state("employeedashboard",{url:"/employee",templateUrl:a.TEMPLATE+"employee/welcome.html",controller:"employeeWelcomeController",controllerAs:"vm",data:{pageTitle:"Welcome Employee",bodyClass:"menuavaled employeescreen"},resolve:{session:c,employee:u,getEmployee:m}}),c.$inject=["SessionService"],u.$inject=["empService"],m.$inject=["employeeprofileService"]}])}();
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
!function(){"use strict";function e(e,o,s,t,n,r,a,c){function l(e){return function(){return{success:!1,message:e}}}var u=r("lanapp",{adapter:"idb"}),i={};return i.terminateEmployeeSession=function(){navigator.onLine?e.post("/api/v1/terminateempsession").success(function(e){if(console.log(e),e.data.employee)alert("Failed");else{var s=a.get("_meanLanAppSync");console.log(s[0]),s.splice(0,1),console.log(s),a.set("_meanLanAppSync",s),u.get("usersess",function(e,o){if(e)console.log("err end session"),console.log(e);else{delete o.usermoment.employee;var s=o.usermoment;u.put({_id:"usersess",_rev:o._rev,usermoment:s})}}),o.path("/dashboard"),c.showAlert("success","Success","You have terminated session")}}).error(function(e){console.log("Error: "+e)}):u.get("usersess",function(e,s){if(e)console.log("err end session"),console.log(e);else{var t=a.get("_meanLanAppSync");console.log(t[0]),t.splice(0,1),console.log(t),a.set("_meanLanAppSync",t),delete s.usermoment.employee;var n=s.usermoment;u.put({_id:"usersess",_rev:s._rev,usermoment:n}),o.path("/dashboard"),c.showAlert("success","Success","You have terminated session")}})},i.authEmployee=function(){if(navigator.onLine){var s=t.defer();return e.get("/api/v1/authenticateemployee",{cache:!1}).success(function(e){console.log(e),0==e.data||null==e.data?(o.path("/dashboard"),s.resolve({success:!1,data:null})):s.resolve({success:!0,data:e})}).error(function(e,t){o.path("/dashboard"),s.reject(e)}),s.promise}u.get("usersess",function(e,s){if(e)console.log("err authenticate empoyee"),console.log(e);else{if(console.log("check authenticate empoyee"),console.log(s.usermoment.employee),s.usermoment.employee)return!0;o.path("/dashboard")}})},i.startShift=function(o){return e.post("/api/v1/createshift",o).then(function(e){return e.data},l("Error getting all users"))},i.endtShift=function(o){return e.post("/api/v1/endshift",o).then(function(e){return e.data},l("Error getting all users"))},i}angular.module("welcomeEmployee").factory("empService",e),e.$inject=["$http","$location","toaster","$q","$state","pouchDB","localStorageService","alertservice"]}();

(function () {
    'use strict';

    angular
        .module('welcomeEmployee')
        .factory('empService', serviceFn);

    serviceFn.$inject = ['$http', '$location', 'toaster', '$q', '$state', 'pouchDB', 'localStorageService', 'alertservice'];
    /* @ngInject */
    function serviceFn($http, $location, toaster, $q, $state, pouchDB, localStorageService, alertservice) {
        var db =  pouchDB('lanapp', {adapter : 'idb'});
        var service = {};
        service.terminateEmployeeSession       = endsession;
        service.authEmployee                   = authenticate;
        service.startShift = startShift
        service.endtShift = endtShift
        //service.authEmployeeLocal              = authenticateLocal;
        return service;

        /////////



        function endsession() {
           //return $http.post('/api/v1/authenticateemployee'}).then(handleSuccess, handleError('Error getting all users'));
            if(navigator.onLine){
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
                           localStorageService.set('_meanLanAppSync',sessonwohe)
                          db.get('usersess', function(err, doc) {
                              if (err) {
                                  console.log("err end session")
                                  console.log(err)
                              }
                              else{
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
                        else{
                            alert("Failed")
                        }
                    })
                        .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
            else{
                db.get('usersess', function(err, doc) {
                    if (err) {
                        console.log("err end session")
                        console.log(err)
                    }
                    else{

                       var sessonwohe = localStorageService.get('_meanLanAppSync')
                       console.log(sessonwohe[0])
                       //delete sessonwohe[0];
                       sessonwohe.splice(0, 1);
                       //delete sessonwohe[0]["session"];
                       console.log(sessonwohe)
                       //arr.push(sessonwohe)
                       // add flag that the user has logged out

                       localStorageService.set('_meanLanAppSync',sessonwohe)



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
        function authenticate(){
            if(navigator.onLine){
                //alert("online entered on offline")
                var deferred = $q.defer();
                   $http.get('/api/v1/authenticateemployee',{cache: false})
                     .success(function(data) {
                      console.log(data)
                       if(data.data == 0 || data.data == null){
                             $location.path('/dashboard');
                             deferred.resolve({success: false, data: null});
                          }
                          else{
                             deferred.resolve({success: true, data: data});
                          }
                     }).error(function(msg, code) {
                       $location.path('/dashboard');
                        deferred.reject(msg);
                     });
                   return deferred.promise;
            }
            else{

                db.get('usersess', function(err, doc) {
                    if (err) {
                        console.log("err authenticate empoyee")
                        console.log(err)
                    }
                    else{
                        console.log("check authenticate empoyee")
                        console.log(doc.usermoment.employee)

                         if(!doc.usermoment.employee){
                           $location.path('/dashboard');
                         }
                         else{
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
            db.get('usersess', function(err, doc) {
                    if (err) {
                        console.log("err end session")
                        console.log(err)
                    }
                    else{
                         console.log("Done handleSuccessLocal")
                        console.log(doc)
                        var id= doc._rev;
                        var datas = doc
                        datas.employee = return_data
                        db.get('usersess').then(function(doc) {
                               db.put({
                                _id: 'usersess',
                                _rev: doc._rev,
                                usermoment: datas
                              });
                               return res.data;
                            }).then(function(response) {
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

        function startShift(data) {
            return $http.post('/api/v1/createshift', data).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }
        function  endtShift(data) {
            return $http.post('/api/v1/endshift', data).then(function (res) {
                return res.data;
            }, handleError('Error getting all users'));
        }

    }

})();

!function(){"use strict";function e(e,t,o,i,n,r,s,l,c,a,f,S,h){e.shiftOff=function(){o.shift=JSON.parse(localStorage.getItem("ShiftUser"));var e={SHID:localStorage.getItem("currentShiftid"),endtime:new Date},t={ShiftId:localStorage.getItem("currentShiftid"),ResId:h.restaurant};console.log(e),o.shift.endtime=new Date,S.endtShift(e).then(function(e){console.log(e),o.shiftOpen=!1,localStorage.setItem("ShiftUser",null),o.socket.emit("shiftClosed",t)},function(e){}),console.log(h)},e.shiftOn=function(){var e={idsshiftopenedby:h._id,restaurant:h.restaurant,created_by:h.firstname,updated_by:h.firstname};S.startShift(e).then(function(e){console.log(e),o.shift=e,o.shiftOpen=!0,localStorage.setItem("ShiftUser",JSON.stringify(e)),localStorage.setItem("currentShiftid",e._id)},function(e){}),console.log(h)}}angular.module("welcomeEmployee").controller("employeeWelcomeController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","PATHS","PermissionService","empService","getEmployee"]}();
(function() {
    'use strict';

    angular
        .module('welcomeEmployee')
        .controller('employeeWelcomeController', Controller);
  
    Controller.$inject = ['$scope','$state','$rootScope','$location','toaster','$http','SessionService','localStorageService','$uibModal','PATHS','PermissionService','empService','getEmployee'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope,$location,toaster,$http,SessionService,localStorageService,$uibModal,PATHS,PermissionService, empService,getEmployee) {
    
        //SessionService.getSession(); // get session details
        var vm = this;
       
        activateUserController()
        function activateUserController (){
        

        }//activateUserController
        
       // $scope.shiftOpen = false;
       
        $scope.shiftOff = function () {
            $rootScope.shift = JSON.parse(localStorage.getItem('ShiftUser'));
            var objTOSend = {
                SHID: localStorage.getItem("currentShiftid"),
                endtime : new Date()
            }
            var sokectObj = {
                ShiftId: localStorage.getItem("currentShiftid"),
                ResId: getEmployee.restaurant
            };
            console.log(objTOSend);
            $rootScope.shift.endtime = new Date();
            empService.endtShift(objTOSend).then(function (response) {
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
                restaurant:getEmployee.restaurant,
                created_by: getEmployee.firstname,
                updated_by: getEmployee.firstname
            }
            empService.startShift(obj).then(function (response) {
                console.log(response);
                $rootScope.shift = response;
                $rootScope.shiftOpen = true;
                localStorage.setItem('ShiftUser', JSON.stringify(response));
                localStorage.setItem("currentShiftid", response._id);
                //alert(localStorage.getItem("currentShiftid"))
            }, function (err) { });
            console.log(getEmployee)
        }
  		
    }
})();
!function(){"use strict";var e=null,o=null;angular.module("employeeprofile",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(r,l,t,n,i,p){function a(e){if(navigator.onLine)return e.authEmployee().then(function(e){return e});e.authEmployee()}function u(e){return navigator.onLine,e.CurrentEmployee().then(function(e){return e})}e=l,(o=r).state("empprofile",{url:"/employeeprofile",templateUrl:p.TEMPLATE+"employeeProfile/employeeProfile.html",controller:"employeeprofileController",controllerAs:"vm",data:{pageTitle:"Employee Profile",bodyClass:"menuavaled empprof"},resolve:{employee:a,getEmployee:u}}),a.$inject=["empService"],u.$inject=["employeeprofileService"]}])}();
(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('employeeprofile', [
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
            

                $stateProviderRef.state('empprofile', {
                    url: '/employeeprofile',                    
                    templateUrl: path.TEMPLATE+'employeeProfile/employeeProfile.html',
                    controller  : 'employeeprofileController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Employee Profile',bodyClass:"menuavaled empprof"},
                    resolve: {
                        employee: auth,
                        getEmployee : ResolveEmployee
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();



!function(){"use strict";function e(e,o,s,t,c,l,i,r,n,a,p,u,m,S){function d(e){navigator.onLine?e.success?(s.$broadcast("updatemployeelocaly"),S.showAlert("success","Success",e.message)):S.showAlert("failed","Failed",e.message):S.showAlert("success","Success","Updated")}function f(e){console.log(e)}this.employee=m,this.change=function(){a.updateUser(this.employee).then(d,f)}}angular.module("employeeprofile").controller("employeeprofileController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","employeeprofileService","PATHS","PermissionService","getEmployee","alertservice"]}();
(function() {
    'use strict';

    angular
        .module('employeeprofile')
        .controller('employeeprofileController', Controller);
  
    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope,$location,toaster,$http,SessionService,localStorageService,$uibModal,employeeprofileService,PATHS,PermissionService,getEmployee,alertservice) {
     
        //SessionService.getSession(); // get session details
        var vm = this;
        this.employee  =  getEmployee

        this.change = function(){
           employeeprofileService.updateUser(this.employee).then(successcallback,failPayload)
        }

        function successcallback(res){
            if(navigator.onLine){
                if(res.success)
                {
                    $rootScope.$broadcast('updatemployeelocaly');
                    alertservice.showAlert('success', "Success", res.message)
                } 
                else {
                    alertservice.showAlert('failed', "Failed", res.message)
                }
            }
            else{
                alertservice.showAlert('success', "Success", "Updated")
            }
           
        }
        function failPayload(err){
            console.log(err)
        }

        activateUserController()
        function activateUserController (){
        

        }//activateUserController
  		
    }
})();
!function(){"use strict";function e(e,t,n,o){function r(e){"usersess"==e._id&&(e.usermoment.employee?emit(e.usermoment.employee):emit(e.name))}function a(e){"employee"==e._id&&(e.emplyoeedata?emit(e.emplyoeedata):emit(e.name))}function i(e){return e.data}function l(e){return e.data.data[0]}function u(e){return function(){return{success:!1,message:e}}}var c=t("lanapp",{adapter:"idb"}),p={};return p.CurrentEmployee=function(){return navigator.onLine?e.get("/api/v1/employeedetails").then(l,u("Error getting all users")):c.query(r).then(function(e){return e.rows[0].key}).catch(function(e){console.log(e)})},p.updateUser=function(t){return navigator.onLine?e.post("/api/v1/currentemployeeUpdate",t).then(i,u("Error getting all users")):(t.flag=1,c.query(a,{include_docs:!0}).then(function(e){var o=[];o=t._id,e.rows[0].key.filter(function(e){return o.indexOf(e._id)>-1});for(var r,a=0,i=e.rows[0].key.length;a<i;a++)e.rows[0].key[a]._id==t._id&&(r=a,c.get("employee").then(function(e){delete e.emplyoeedata[r],e.emplyoeedata[r]=t;var o={edit:t._id,data:t,syncstatus:0};if(n.get("_meanLanAppSync")){var a=n.get("_meanLanAppSync");"1"in a?(delete a[1],a[1]={employeeprofile:o}):a[1]={employeeprofile:o},console.log("New struct"),console.log(a),n.set("_meanLanAppSync",a)}return c.put({_id:"employee",_rev:e._rev,emplyoeedata:e.emplyoeedata})}))}).catch(function(e){console.log(e)}))},p}angular.module("employeeprofile").factory("employeeprofileService",e),e.$inject=["$http","pouchDB","localStorageService","$rootScope"]}();
(function () {
    'use strict';

    angular
        .module('employeeprofile')
        .factory('employeeprofileService', serviceFn);

    serviceFn.$inject = ['$http','pouchDB','localStorageService','$rootScope'];
    /* @ngInject */
    function serviceFn($http,pouchDB,localStorageService,$rootScope) {
        var db =  pouchDB('lanapp', {adapter : 'idb'});
        var service = {};
        service.CurrentEmployee   = CurrentEmployee;
        service.updateUser        = CurrentEmployeeUpdate;
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

        function CurrentEmployee() {
           
            if(navigator.onLine){
                return $http.get('/api/v1/employeedetails').then(handleSuccessLocally, handleError('Error getting all users'));
            }
            else{
            
                return  db.query(myMapFunction).then(function (result) {
                      return result.rows[0].key
                }).catch(function (err) {
                     console.log(err)
                });
            }

        }

        function CurrentEmployeeUpdate(data) {
           
            if(navigator.onLine){
                return $http.post('/api/v1/currentemployeeUpdate',data).then(handleSuccess, handleError('Error getting all users'));
            }
            else{
              
              data.flag = 1;
              return db.query(getMapByID,{include_docs : true}).then(function (result) {
                        //console.log(result.rows[0].key)
                        var empIds = []
                        empIds = data._id
                        var indexed ; 
                        
                        var filteredArray = result.rows[0].key.filter(function(itm){
                          return empIds.indexOf(itm._id) > -1;
                        });

                        //console.log(filteredArray)
                       
                       
                       for(var i = 0, len = result.rows[0].key.length; i < len; i++) {
                           
                             if(result.rows[0].key[i]._id == data._id){
                                indexed =  i;

                                db.get('employee').then(function(doc) {
                                  var newdata = doc
                                  
                                   delete doc.emplyoeedata[indexed];
                                   doc.emplyoeedata[indexed] =  data

                                   var syncData = {
                                    edit :  data._id,
                                    data : data,
                                    syncstatus: 0
                                   }
                                   

                                    if(localStorageService.get('_meanLanAppSync')){
                                      // put employee data on 1st array node
                                        //localStorageService.set('_meanLanAppSync',{employeeprofile : syncData});//
                                       var arr = localStorageService.get('_meanLanAppSync');
                                      // arr.push(localStorageService.get('_meanLanAppSync'));
                                      if("1" in arr){
                                        delete arr[1];
                                        arr[1] = {employeeprofile : syncData}
                                      }
                                       else{
                                         arr[1] = {employeeprofile : syncData}
                                       }
                                       console.log("New struct")
                                       console.log(arr)
                                       localStorageService.set('_meanLanAppSync',arr)
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
    }

})();
!function(){"use strict";var e=null,n=null;angular.module("inventoryManager",["application.thirdparty","autocomplete"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(r,t,o,a,i,l){function u(e){if(navigator.onLine)return e.authEmployee().then(function(e){return e});e.authEmployee()}function v(e){return navigator.onLine,e.CurrentEmployee().then(function(e){return e})}e=t,(n=r).state("inventoryManager",{url:"/inventory",templateUrl:l.TEMPLATE+"inventoryManager/inventoryManager.html",controller:"inventoryManagerController",controllerAs:"vm",data:{pageTitle:"inventory Manager",bodyClass:"menuavaled inventorymanager"},resolve:{employee:u,getEmployee:v}}),u.$inject=["empService"],v.$inject=["employeeprofileService"]}])}();
(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('inventoryManager', [
            'application.thirdparty',
            'autocomplete'
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
            

                $stateProviderRef.state('inventoryManager', {
                    url: '/inventory',                    
                    templateUrl: path.TEMPLATE+'inventoryManager/inventoryManager.html',
                    controller  : 'inventoryManagerController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'inventory Manager',bodyClass:"menuavaled inventorymanager"},
                    resolve: {
                        employee: auth,
                        getEmployee : ResolveEmployee
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();



!function(){"use strict";function e(e,t,a,d,i,n,o,r,l,c,u,s,g,y,I,f){function m(e){console.log(e)}e.employee=g,console.log("Employee DetaisK:-"+e.employee),e.ingredientListActive=!1,e.sidesListActive=!1,e.addModify=!0;var p;e.editIngr=function(t){$("#ingEdit").modal("show"),e.editIngredient=t,e.copyIngredient=angular.copy(e.editIngredient),p=e.editIngredient.Quantity},e.addIngr=function(){$("#ingAdd").modal("show")},e.modifyRetailProduct=!0,e.editProduct=function(t){e.Product=angular.copy(t),e.addSlideIngredient=t.Ingradients,e.addProductSlide=t.Sides,e.addProductVariation=t.variations,e.Copyproductedit=angular.copy(e.Product),e.editProductActive=!0,e.flowStatus="1";t.ParentCategory;e.selectCategory=_.find(e.allCategory,function(e){return e.clientId==t.ParentCategory.clientId}),e.selectSubCategory=_.find(e.showSubCategory,function(e){return e.clientId==t.Category.clientId})},e.editProductCancle=function(){e.Product=angular.copy(e.Copyproductedit),e.editProductActive=!1,e.flowStatus="1",e.$apply()},e.ingredientListActivate=function(){e.ingredientListActive=!0,e.sidesListActive=!1},e.ingredientListDisable=function(){e.ingredientListActive=!1},e.sidesListActivate=function(){e.ingredientListActive=!1,e.sidesListActive=!0},e.sidesListDisable=function(){e.sidesListActive=!1},$(".product-category > .panel-heading, .product-category > img").click(function(){$(this).parent(".product-category").toggleClass("active")}),e.cats=[{name:"cat1"}];var S=function(){$.widget("custom.combobox",{_create:function(){this.wrapper=$("<span>").addClass("custom-combobox").insertAfter(this.element),this.element.hide(),this._createAutocomplete(),this._createShowAllButton()},_createAutocomplete:function(){var e=this.element.children(":selected"),t=e.val()?e.text():"";this.input=$("<input>").appendTo(this.wrapper).val(t).attr("title","").addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left").autocomplete({delay:0,minLength:0,source:$.proxy(this,"_source")}).tooltip({classes:{"ui-tooltip":"ui-state-highlight"}}),this._on(this.input,{autocompleteselect:function(e,t){t.item.option.selected=!0,this._trigger("select",e,{item:t.item.option})},autocompletechange:"_removeIfInvalid"})},_createShowAllButton:function(){var e=this.input,t=!1;$("<a>").attr("tabIndex",-1).attr("title","Show All Items").attr("height","").tooltip().appendTo(this.wrapper).button({icons:{primary:"ui-icon-triangle-1-s"},text:"false"}).removeClass("ui-corner-all").addClass("custom-combobox-toggle ui-corner-right").on("mousedown",function(){t=e.autocomplete("widget").is(":visible")}).on("click",function(){e.trigger("focus"),t||e.autocomplete("search","")})},_source:function(e,t){var a=new RegExp($.ui.autocomplete.escapeRegex(e.term),"i");t(this.element.children("option").map(function(){var t=$(this).text();if(this.value&&(!e.term||a.test(t)))return{label:t,value:t,option:this}}))},_removeIfInvalid:function(e,t){if(!t.item){var a=this.input.val(),d=a.toLowerCase(),i=!1;this.element.children("option").each(function(){if($(this).text().toLowerCase()===d)return this.selected=i=!0,!1}),i||(this.input.val("").attr("title",a+" didn't match any item").tooltip("open"),this.element.val(""),this._delay(function(){this.input.tooltip("close").attr("title","")},2500),this.input.autocomplete("instance").term="")}},_destroy:function(){this.wrapper.remove(),this.element.show()}}),$("#combobox").combobox(),$("#toggle").on("click",function(){$("#combobox").toggle()})};$(".radioBtn a").on("click",function(){var e=$(this).data("title"),t=$(this).data("toggle");$("#"+t).prop("value",e),$('a[data-toggle="'+t+'"]').not('[data-title="'+e+'"]').removeClass("active").addClass("notActive"),$('a[data-toggle="'+t+'"][data-title="'+e+'"]').removeClass("notActive").addClass("active")}),e.editSide=function(t){S(),$("#sidesEdit").modal("show"),e.SideUpdate=t},e.getIngName=function(t){return t.name.Name?t.name.Name:_.find(e.allIngedients,{clientId:t.name}).Name},e.getSideName=function(t){return t.Name?t.Name:_.find(e.allSides,{clientId:t}).Name},e.refrush=function(){e.slideName="",e.addIngredientTitle={Name:"Select Ingedient",UnitType:""},e.addIngredientQuantity=0,e.addSlideIngredient=[]},e.addSide=function(){S(),e.refrush(),$("#sidesAdd").modal("show")},e.createCategory=function(){if(void 0!=e.categoryName&&""!=e.categoryName){$("#categAdd").modal("hide"),console.log(e.categoryName);var t={Name:e.categoryName,created_by:g.firstname,updated_by:g.firstname,clientId:f.generateGUID(),restaurant:g};I.AddCategory(t).then(function(t){e.categoryName="",y.showAlert("error","Failed","Successfully Add Category"),console.log(t),e.allCategory.push(t)},m)}else y.showAlert("error","Failed","Name can not be null...")},e.allSlide=[],e.createSlide=function(){if(""!=e.slideName&&void 0!=e.slideName&&e.addSlideIngredient.length>0){$("#sidesAdd").modal("hide");for(var t=[],a=0;a<e.addSlideIngredient.length;a++)t.push({name:e.addSlideIngredient[a].name.clientId,quantity:e.addSlideIngredient[a].quantity});var d={Name:e.slideName,Ingradients:t,created_by:g.firstname,updated_by:g.firstname,clientId:f.generateGUID(),restaurant:g};I.AddSide(d).then(function(t){console.log(t),e.allSides.push(t),e.slideName="",e.addIngredientTitle={Name:"Select Ingedient",UnitType:""},addIngredientQuantity=0,e.addSlideIngredient=[],y.showAlert("error","Failed","Successfully disable Side")},m)}else y.showAlert("error","Failed","Field can not be null...")},e.createProduct=function(){e.Product.clientId=f.generateGUID(),e.Product.restaurant=g,e.Product.Category=_.find(e.allSubCategory,function(t){return t.clientId==e.Product.Category}),e.Product.ParentCategory=_.find(e.allCategory,function(t){return t.clientId==e.Product.ParentCategory}),I.AddProduct(e.Product).then(function(t){console.log(t),t.error?y.showAlert("error","Failed","Product is not add due to some unknow error.."):(e.allProduct.push(angular.copy(e.Product)),e.getProductdetail(e.allCategory[0],0),e.flushdata(),y.showAlert("error","Failed","Successfully Add Product"))},m)},e.updateProductToDB=function(){if(""!=e.selectCategory.Name&&null!=e.selectCategory&&""!=e.Product.Price&&null!=e.seflectSubCategory&&"Not Available"!=e.selectSubCategory.Name){if(e.Product.ParentCategory=e.selectCategory.clientId,e.Product.Category=e.selectSubCategory.clientId,e.Product.Ingradients=e.addSlideIngredient,e.Product.Sides=e.addProductSlide,e.Product.variations=e.addProductVariation,"Retail"==e.Product.type){var t={Cost:e.Product.Price,Quantity:e.Product.Quantity,updated_at:new Date,created_at:new Date};if(e.modifyRetailProduct)e.Product.Quantity=parseInt(e.Product.Quantity)+parseInt(e.editedRetailProductQuantity),t.opertation="Addition",e.editedRetailProductQuantity=0;else{if(!(parseInt(e.Product.Quantity)>parseInt(e.editedRetailProductQuantity)))return void y.showAlert("error","Failed","You can not subtract, more than available quantity - "+e.Product.Quantity);e.Product.Quantity=parseInt(e.Product.Quantity)-parseInt(e.editedRetailProductQuantity),t.opertation="subtraction",e.editedRetailProductQuantity=0}e.Product.Edits&&e.Product.Edits.length>0?e.Product.Edits.push(t):e.Product.Edits=[t]}I.UpdateProduct(e.Product).then(function(t){console.log(t),t.error?y.showAlert("error","Failed","Product is not add due to some unknow error.."):(e.editProductActive=!1,e.allProduct=_.reject(e.allProduct,function(t){return t.clientId==e.Product.clientId}),e.allProduct.push(angular.copy(e.Product)),e.getProductdetail(e.allCategory[0],0),e.flushdata(),y.showAlert("error","Failed","Successfully Update Product"))},m)}else y.showAlert("error","Failed","Field can not be null..")},e.UpdateProduct=function(){var t=document.getElementById("inputFile");t.files&&t.files.length>0?e.AWSS3.upload({Key:e.generateUUID(),Body:t.files[0],ACL:"public-read"},function(t,a){t&&y.showAlert("error","Failed","There was an error uploading your photo"),console.log(a),e.Product.image=a.Location,e.updateProductToDB()}):e.updateProductToDB()},e.createIngedients=function(){if(void 0!=e.ingredientName&&void 0!=e.costPrunit&&void 0!=e.unitType&&void 0!=e.amount&&void 0!=e.merma){$("#ingAdd").modal("hide");var t={Name:e.ingredientName,Cost:e.costPrunit,UnitType:e.unitType,Quantity:e.amount,Merma:e.merma,Edits:[],created_by:"User",updated_by:"User",clientId:f.generateGUID(),restaurant:g};I.AddIngedient(t).then(function(t){console.log(t),e.allIngedients.push(t),e.ingredientName="",e.costPrunit="",e.unitType="",e.amount="",e.merma="",y.showAlert("error","Failed","Successfully Add Ingedient")},function(e){},m)}else y.showAlert("error","Failed","Field can not be null...")},e.addIngredientTitle={Name:"Select Ingedient",UnitType:"",isactive:0},e.allIngedients=[],e.addProductSlide=[],e.allProduct=[],e.allIngedientsName=[],e.getIngedients=function(){I.GetIngedients().then(function(t){if(console.log(t),e.allIngedients=t,e.allIngedients)for(var a=0;a<e.allIngedients.length;a++)e.allIngedientsName.indexOf(e.allIngedients[a].Name)>0||e.allIngedientsName.push(e.allIngedients[a].Name)},m)},e.onAddExtraIngredients=function(t){for(var a=0;a<e.allIngedients.length;a++)e.allIngedients[a].Name==t&&(e.addIngredientTitle=e.allIngedients[a]);console.log(e.addSlideIngredient)},e.getCategories=function(){e.allSubCategory=[],e.allCategory=[],I.GetCategory().then(function(t){console.log(t);for(a=0;a<t.length;a++)t[a].ParentCategory?(t[a].NameSpace=t[a].Name.replace(/\s/g,""),e.allSubCategory.push(t[a])):e.allCategory.push(t[a]);for(var a=0;a<e.allCategory.length;a++){e.allCategory[a].status=!0;for(var d=0;d<e.allProduct.length;d++)e.allProduct[d].Category.ParentCategory==e.allCategory[a].clientId&&(e.allCategory[a].image=e.allProduct[d].image)}e.allCategory.length>0&&e.getProductdetail(e.allCategory[0],0)},m)},e.getProduct=function(){I.GetProducts().then(function(t){e.getCategories(),console.log(t),e.allProduct=t;for(var a=0;a<e.allCategory.length;a++)for(var d=0;d<e.allProduct.length;d++)e.allProduct[d].ParentCategory.clientId==e.allCategory[a].clientId&&(e.allCategory[a].image=e.allProduct[d].image)},m)},e.allSidesName=[],e.getSides=function(){I.GetSides().then(function(t){if(console.log(t),e.allSides=t,e.allSides)for(var a=0;a<e.allSides.length;a++)e.allSidesName.indexOf(e.allSides[a].Name)>0||e.allSidesName.push(e.allSides[a].Name)},m)},e.onSearchSides=function(t){for(var a=0;a<e.allSides.length;a++)e.allSides[a].Name==t&&(e.addSideTitle=e.allSides[a]);console.log(e.addSideTitle)},e.getSides(),e.getProduct(),e.addSlideIngredient=[],e.addProductVariation=[],e.addSlide=function(t){if("Select Ingedient"!=e.addIngredientTitle.Name&&void 0!=e.addIngredientQuantity&&0!=e.addIngredientQuantity){var a={name:e.deleteObjectproperties(e.addIngredientTitle),quantity:e.addIngredientQuantity};"New"==t?(e.addSlideIngredient.push(a),e.addIngredientQuantity="",e.selecctIngredients="",e.addIngredientTitle=""):"Update"==t&&e.SideUpdate.Ingradients.push(a)}else y.showAlert("error","Failed","Please Select Ingredient and Quntity..")},e.addIngredientTOproduct=function(){if("Select Ingedient"!=e.addIngredientTitle.Name&&void 0!=e.addIngredientQuantity&&0!=e.addIngredientQuantity){for(var t={name:e.addIngredientTitle,quantity:e.addIngredientQuantity},a=!1,d=0;d<e.addSlideIngredient.length;d++)a=e.addSlideIngredient[d].name.Name==e.addIngredientTitle.Name;a?y.showAlert("error","Failed","Ingredient Already Selected.."):(e.addSlideIngredient.push(t),e.addIngredientTitle="",e.addIngredientQuantity="",e.selecctIngredients="")}else y.showAlert("error","Failed","Please Select Ingredient and Quntity..")},e.addSideTOproduct=function(){if("Select Ingedient"!=e.addSideTitle.Name&&void 0!=e.addSideTitle.Name){for(var t=!1,a=0;a<e.addProductSlide.length;a++)t=e.addProductSlide[a].Name==e.addSideTitle.Name;t?y.showAlert("error","Failed","Sides Already Selected.."):(e.addProductSlide.push(e.addSideTitle),e.selecctIngredients1="")}else y.showAlert("error","Failed","Please Select Side ")},e.addVariationTOproduct=function(){if(""!=e.addVariationTitle&&void 0!=e.addVariationTitle){var t={Name:e.addVariationTitle,_id:void 0==e.addProductVariation[e.addProductVariation.length-1]?1:e.addProductVariation[e.addProductVariation.length-1].clientId+1};e.addProductVariation.push(t),e.addVariationTitle=""}else y.showAlert("error","Failed","Please Enter Variation")},e.removeIngedient=function(t,a){if("New"==a)for(d=0;d<e.addSlideIngredient.length;d++)e.getINGId(e.addSlideIngredient[d])==e.getINGId(t)&&e.addSlideIngredient.splice(d,1);else if("Update"==a)for(var d=0;d<e.SideUpdate.Ingradients.length;d++)e.getINGId(e.SideUpdate.Ingradients[d])==e.getINGId(t)&&e.SideUpdate.Ingradients.splice(d,1)},e.getINGId=function(e){return e.name.clientId?name.clientId:e.clientId},e.removeIngredientFrmproduct=function(t){for(var a=0;a<e.addSlideIngredient.length;a++)e.getINGId(e.addSlideIngredient[a])==e.getINGId(t)&&e.addSlideIngredient.splice(a,1)},e.getSIDEId=function(e){return e.clientId?clientId:e},e.removeSideFrmproduct=function(t){for(var a=0;a<e.addProductSlide.length;a++)e.getSIDEId(e.addProductSlide[a])==e.getSIDEId(t)&&e.addProductSlide.splice(a,1);e.$apply()},e.removevariationFrmproduct=function(t){for(var a=0;a<e.addProductVariation.length;a++)e.addProductVariation[a].clientId==t.clientId&&e.addProductVariation.splice(a,1);e.$apply()},e.disableIngedients=function(){e.editIngredient.isactive=0,$("#ingEdit").modal("hide"),I.DisableIngedient(e.editIngredient).then(function(t){console.log(t);for(var a=0;a<e.allIngedients.length;a++)e.allIngedients[a].clientId==e.editIngredient.clientId&&(e.allIngedients[a].isactive=0);y.showAlert("error","Failed","Successfully disable Ingedient")},function(e){},m)},e.disableSide=function(){e.SideUpdate.isactive=0,$("#sidesEdit").modal("hide"),I.DisableSides(e.SideUpdate).then(function(t){console.log(t);for(var a=0;a<e.allSides.length;a++)e.allSides[a].clientId==e.SideUpdate.clientId&&(e.allSides[a].isactive=0);y.showAlert("error","Failed","Successfully disable Side")},function(e){},m)},e.getIngedients(),e.ischangePrice=!1,e.chagePrice=function(){e.ischangePrice=!0},e.editQuantity=function(){new Date;var t={Cost:e.copyIngredient.Cost,Quantity:e.copyIngredient.Quantity,Merma:e.copyIngredient.Merma,updated_at:e.copyIngredient.updated_at,created_at:e.copyIngredient.created_at};e.addModify?(e.editIngredient.Quantity=e.editIngredient.Quantity+e.editedQuantity,t.opertation="Addition",e.editIngredient.message="added "+e.editedQuantity+" "+e.shortForm(e.editIngredient.UnitType)):e.editIngredient.Quantity>e.editedQuantity?(e.editIngredient.Quantity=e.editIngredient.Quantity-e.editedQuantity,t.opertation="subtraction",e.editIngredient.message="subtracted "+e.editedQuantity+" "+e.shortForm(e.editIngredient.UnitType)):y.showAlert("error","Failed","value can not greater than"+e.editedQuantity),""!=e.merma&&(e.editIngredient.message=e.editIngredient.message+" ,Merma "+e.merma),(e.editIngredient.Cost>e.copyIngredient.Cost||e.editIngredient.Cost<e.copyIngredient.Cost)&&(e.editIngredient.message=e.editIngredient.message+" ,Cost: "+e.editIngredient.Cost),e.editIngredient.message=e.editIngredient.message+" "+(new Date).toDateString(),e.editIngredient.Edits.push(t)},e.updateCategory=function(){I.UpdateCategory(e.categoryName1).then(function(t){console.log(t),e.copy_categoryName1=angular.copy(e.categoryName1);for(var a=0;a<e.allCategory.length;a++)e.allCategory[a].clientId==e.categoryName1.clientId&&(e.allCategory[a].editedMod=!0,e.allCategory[a].editedMod1=!1,e.allCategory[a].status=!0);y.showAlert("error","Failed","Successfully Update Category")},function(e){},m)},e.updateIngredient=function(){$("#ingEdit").modal("hide"),e.editQuantity(),e.editIngredient.Merma=parseInt(e.editIngredient.Merma)+parseInt(""==e.merma?0:e.merma),e.editIngredient.updated_at=new Date,I.UpdateIngedient(e.editIngredient).then(function(t){console.log(t),e.merma="",y.showAlert("error","Failed","Successfully Update Ingredient"),e.editedQuantity=0},function(e){},m)},e.updateSides=function(){$("#sidesEdit").modal("hide"),I.UpdateSide(e.SideUpdate).then(function(t){console.log(t),y.showAlert("error","Failed","Successfully Update Side"),e.addIngredientTitle={Name:"Select Ingedient",UnitType:""},e.addIngredientQuantity=0},function(e){},m)},e.GetCategory=function(){I.GetCategory("123").then(function(e){console.log(e)},m)},e.checkQuantity=function(){e.addIngredientTitle.Quantity<e.addIngredientQuantity&&(y.showAlert("error","Failed","Quantity can not be greater than it's availability"),e.addIngredientQuantity=0)},e.addProductActive=!1,e.addProductType=!0,e.addProductInit=function(){e.addProductActive=!0,e.flowStatus="1",e.flushdata()},e.selectCategory={_id:0,Name:"Select Category",isactive:1},e.selectSubCategory={_id:0,Name:"Select SubCategory",isactive:1},e.checkUpdation=!1,e.selectedCate=function(){e.checkUpdation=!0,e.showSubCategory=[];var t=!1;console.log(e.selectCategory);for(var a=0;a<e.allSubCategory.length;a++)e.allSubCategory[a].ParentCategory.clientId!=e.selectCategory.clientId&&e.allSubCategory[a].ParentCategory!=e.selectCategory.clientId||(e.showSubCategory.push(e.allSubCategory[a]),t=!0);t||(e.showSubCategory=[{_id:0,Name:"Not Available",isactive:1}]),e.$apply()},e.Product={Name:"",type:"Product",Quantity:0,Category:e.selectSubCategory.clientId,ParentCategory:e.selectCategory.clientId,Price:"",Ingradients:[],Sides:[],variations:[],image:"http://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/c135.0.810.810/13743131_302358726783757_317008255_n.jpg?ig_cache_key=MTMwNjUxODQ3ODEzMjE0NzA2OQ%3D%3D.2.c",created_by:"User",updated_by:"User"},e.flushdata=function(){e.selectCategory={_id:0,Name:"Select Category",isactive:1},e.selectSubCategory={_id:0,Name:"Select SubCategory",isactive:1},e.Product={Name:"",type:"",Quantity:0,Category:e.selectSubCategory.clientId,ParentCategory:e.selectCategory.clientId,Price:"",Ingradients:[],Sides:[],variations:[],image:"",created_by:"User",updated_by:"User"},e.addSlideIngredient=[],e.addProductVariation=[],e.addIngredientTitle={Name:"Select Ingedient",UnitType:""},e.addSideTitle="",e.addProductSlide=[],$("#inputFile4").val("")},e.addProductEnd=function(){if("Select Category"!=e.selectCategory.Name&&void 0!=e.selectCategory.Name&&""!=e.Product.Price&&"Select SubCategory"!=e.selectSubCategory.Name&&"Not Available"!=e.selectSubCategory.Name)if(e.Product.Category=e.selectSubCategory.clientId,e.Product.ParentCategory=e.selectCategory.clientId,"Retail"==e.Product.type){var t=document.getElementById("inputFile5");t.files.length>0?e.AWSS3.upload({Key:e.generateUUID(),Body:t.files[0],ACL:"public-read"},function(t,a){t&&y.showAlert("error","Failed","There was an error uploading your photo"),console.log(a),e.Product.image=a.Location,e.createProduct(),e.addProductActive=!1,e.flowStatus="0",e.addProductType=!0}):y.showAlert("error","Failed","Image cannot be null.")}else e.Product.variations=e.addProductVariation,e.createProduct(),e.addProductActive=!1,e.flowStatus="0",e.addProductType=!0;else y.showAlert("error","Failed","Field cannot be null...")},e.addProductcancel=function(){e.addProductActive=!1,e.flowStatus="0",e.addProductType=!0},e.nextNewProd=function(){if("1"===e.flowStatus)e.flowStatus="2";else if("2"===e.flowStatus)"Select Category"!=e.selectCategory.Name&&void 0!=e.selectCategory.Name&&""!=e.Product.Price&&"Select SubCategory"!=e.selectSubCategory.Name?"Not Available"!=e.selectSubCategory.Name?document.getElementById("inputFile4").files.length>0?(e.flowStatus="3",e.Product.Category=e.selectSubCategory.clientId,e.Product.ParentCategory=e.selectCategory.clientId,e.uploadImage(),console.log(e.Product),S()):y.showAlert("error","Failed","Image Can not be null.."):y.showAlert("error","Failed","Subcategory Not Available."):y.showAlert("error","Failed","Fields cannot be null..");else if("3"===e.flowStatus)if(e.addSlideIngredient.length>0&&e.addSlideIngredient.length>0){for(var t=[],a=0;a<e.addSlideIngredient.length;a++)t.push({quantity:e.addSlideIngredient[a].quantity,name:e.addSlideIngredient[a].name.clientId});for(var d=[],a=0;a<e.addProductSlide.length;a++)d.push(e.addProductSlide[a].clientId);e.Product.Ingradients=t,e.Product.Sides=d,console.log(e.Product),e.flowStatus="4"}else y.showAlert("error","Failed","Ingredient and Side cannot be null..")},e.deleteObjectproperties=function(e){return e},e.backNewProd=function(){"4"===e.flowStatus?e.flowStatus="3":"3"===e.flowStatus?e.flowStatus="2":"2"===e.flowStatus&&(e.flowStatus="1")},e.prodTypeT=function(){e.Product.type="Product",e.addProductType=!0},e.editedMod=!0,e.prodTypeF=function(){e.Product.type="Retail",e.addProductType=!1},e.shortForm=function(e){return"Kilograms"==e?".Kg":"Litres"==e?".Lt":"Ounces"==e?".Oz":"Grams"==e?".Gm":void 0},e.editedCategotyData=null,e.getProductdetail=function(t,a){if(!0!==t.editedMod){for(d=0;d<e.allCategory.length;d++)e.allCategory[d].editedMod=!1,e.allCategory[d].editedMod1=!1,d==a&&(e.editedCategotyData=e.allCategory[d]);t.editedMod=!0,e.categoryName1=t,e.showProduct=[],e.copy_categoryName1=angular.copy(e.categoryName1),e.showSubCategory=[];e.showSubCategory=_.filter(e.allSubCategory,function(e){return e.ParentCategory&&(e.ParentCategory.clientId==t.clientId||e.ParentCategory==t.clientId)}),e.showProduct=_.filter(e.allProduct,function(t){return t.Category.clientId==e.showSubCategory[0].clientId});for(var d=0;d<e.showSubCategory.length;d++)e.showSubCategory[d].bgcolor=" btn-success new-cat1";e.showSubCategory&&e.showSubCategory.length>0&&(e.showSubCategory[0].bgcolor="new-cat2")}},e.replaceBlankSpace=function(e){return e.replace(/\s/g,"")},e.getProductdetailBySubcateId=function(t,a){for(var d=0;d<e.showSubCategory.length;d++)e.showSubCategory[d].clientId==t.clientId?($("#"+e.showSubCategory[d].NameSpace).css("background-color","#ff5722"),$("#"+e.showSubCategory[d].NameSpace).css("color","white")):($("#"+e.showSubCategory[d].NameSpace).css("background-color",""),$("#"+e.showSubCategory[d].NameSpace).css("color",""));e.showProduct=_.filter(e.allProduct,function(e){return e.Category.clientId==t.clientId})},e.editCat=function(t){if(1==t)for(a=0;a<e.allCategory.length;a++)e.allCategory[a].clientId==e.copy_categoryName1.clientId&&(e.allCategory[a].editedMod=!1,e.allCategory[a].editedMod1=!0,e.allCategory[a].status=!1);else for(var a=0;a<e.allCategory.length;a++)e.allCategory[a].clientId==e.copy_categoryName1.clientId&&(e.allCategory[a]=e.copy_categoryName1,e.allCategory[a].editedMod=!0,e.allCategory[a].editedMod1=!1,e.allCategory[a].status=!0)},e.deleteCateory=function(t){0==_.filter(e.allProduct,function(e){return!!e.ParentCategory&&e.ParentCategory.clientId==t.clientId}).length&&I.DeleteCategory(t).then(function(a){for(d=0;d<e.allCategory.length;d++)e.allCategory[d].clientId==t.clientId&&e.allCategory.splice(d,1);for(var d=0;d<e.allSubCategory.length;d++)e.allSubCategory[d].ParentCategory.clientId==t.clientId&&e.allSubCategory.splice(d,1);y.showAlert("error","Failed","Successfully Delete Category"),e.getProductdetail(e.allCategory[0],1)},function(e){},m)},e.editClose=function(e){$("#cat"+e).parent(".product-category").toggleClass("active"),alert(e)},e.initAWS=function(){AWS.config.update({region:"us-west-2",credentials:new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-west-2:2edbb998-fe7d-4078-89b0-96b302d6a578"})}),e.AWSS3=new AWS.S3({apiVersion:"2006-03-01",params:{Bucket:"ithoursclientdata"}})},e.initAWS(),e.uploadImage=function(){var t=document.getElementById("inputFile4");e.AWSS3.upload({Key:e.generateUUID(),Body:t.files[0],ACL:"public-read"},function(t,a){t&&y.showAlert("error","Failed","There was an error uploading your photo"),console.log(a),e.Product.image=a.Location})},document.getElementById("inputFile").onchange=function(){var e=document.getElementById("inputFile");if(e.files&&e.files[0]){var t=new FileReader;t.onload=function(e){$("#proimg").attr("src",e.target.result)},t.readAsDataURL(e.files[0])}},e.generateUUID=function(){var e=(new Date).getTime();return"xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var a=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?a:3&a|8).toString(16)})},e.opensubCategory=function(t){$("#subcategAdd").modal("show"),e.parentCate=t},e.createSubCategory=function(){if(void 0!=e.subcategoryName&&""!=e.subcategoryName){$("#subcategAdd").modal("hide"),console.log(e.subcategoryName);var t=e.parentCate;t&&(t=e.editedCategotyData);var a={Name:e.subcategoryName,created_by:g.firstname,updated_by:g.firstname,ParentCategory:t._id,clientId:f.generateGUID(),restaurant:g};I.AddCategory(a).then(function(t){e.subcategoryName="",y.showAlert("error","Failed","Successfully Add SubCategory"),console.log(t),e.allSubCategory.push(t),t.bgcolor=" btn-success new-cat1",e.showSubCategory.push(t)},m)}else y.showAlert("error","Failed","Name can not be null...")}}angular.module("inventoryManager").controller("inventoryManagerController",e),e.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","employeeprofileService","PATHS","PermissionService","getEmployee","alertservice","serviceFun","utilservice"]}();
(function() {
    'use strict';

    angular
        .module('inventoryManager')
        .controller('inventoryManagerController', Controller);

    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'serviceFun','utilservice'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, serviceFun,utilservice) {


        $scope.employee = getEmployee;
        console.log("Employee DetaisK:-" + $scope.employee);
        $scope.ingredientListActive = false;
        $scope.sidesListActive = false;
        $scope.addModify = true;
        var temp;

        $scope.editIngr = function (i) {

            $('#ingEdit').modal('show');
            $scope.editIngredient = i;
            $scope.copyIngredient = angular.copy($scope.editIngredient);
            temp = $scope.editIngredient.Quantity;
        };

        $scope.addIngr = function () {
            $('#ingAdd').modal('show');
        }

        $scope.modifyRetailProduct = true;
        $scope.editProduct = function (product) {
            $scope.Product = angular.copy(product);
            $scope.addSlideIngredient = product.Ingradients;
            $scope.addProductSlide = product.Sides
            $scope.addProductVariation = product.variations
            $scope.Copyproductedit = angular.copy($scope.Product);
            $scope.editProductActive = true;
            $scope.flowStatus = "1";
            var pcat = product.ParentCategory;
            $scope.selectCategory = _.find($scope.allCategory, function (num) { return num.clientId == product.ParentCategory.clientId; }); //angular.copy(product.ParentCategory);
            $scope.selectSubCategory = _.find($scope.showSubCategory, function (num) { return num.clientId == product.Category.clientId; });//angular.copy(product.Category);


            //$scope.$apply();
        }
        $scope.editProductCancle = function () {
            $scope.Product = angular.copy($scope.Copyproductedit);
            $scope.editProductActive = false;
            $scope.flowStatus = "1";
            $scope.$apply();
        }

        $scope.ingredientListActivate = function () {
            $scope.ingredientListActive = true;
            $scope.sidesListActive = false;
        }

        $scope.ingredientListDisable = function () {
            $scope.ingredientListActive = false;
        }

        $scope.sidesListActivate = function () {
            $scope.ingredientListActive = false;
            $scope.sidesListActive = true;
        }

        $scope.sidesListDisable = function () {
            $scope.sidesListActive = false;
        }


        $('.product-category > .panel-heading, .product-category > img').click(function () {
            $(this).parent('.product-category').toggleClass("active");
        });

        $scope.cats = [
            { name: "cat1", }
        ]

        var autocompleteInint = function () {
            $.widget("custom.combobox", {
                _create: function () {
                    this.wrapper = $("<span>")
                      .addClass("custom-combobox")
                      .insertAfter(this.element);

                    this.element.hide();
                    this._createAutocomplete();
                    this._createShowAllButton();
                },

                _createAutocomplete: function () {
                    var selected = this.element.children(":selected"),
                      value = selected.val() ? selected.text() : "";

                    this.input = $("<input>")
                      .appendTo(this.wrapper)
                      .val(value)
                      .attr("title", "")
                      .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                      .autocomplete({
                          delay: 0,
                          minLength: 0,
                          source: $.proxy(this, "_source")
                      })
                      .tooltip({
                          classes: {
                              "ui-tooltip": "ui-state-highlight"
                          }
                      });

                    this._on(this.input, {
                        autocompleteselect: function (event, ui) {
                            ui.item.option.selected = true;
                            this._trigger("select", event, {
                                item: ui.item.option
                            });
                        },

                        autocompletechange: "_removeIfInvalid"
                    });
                },

                _createShowAllButton: function () {
                    var input = this.input,
                      wasOpen = false

                    $("<a>")
                      .attr("tabIndex", -1)
                      .attr("title", "Show All Items")
                      .attr("height", "")
                      .tooltip()
                      .appendTo(this.wrapper)
                      .button({
                          icons: {
                              primary: "ui-icon-triangle-1-s"
                          },
                          text: "false"
                      })
                      .removeClass("ui-corner-all")
                      .addClass("custom-combobox-toggle ui-corner-right")
                      .on("mousedown", function () {
                          wasOpen = input.autocomplete("widget").is(":visible");
                      })
                      .on("click", function () {
                          input.trigger("focus");

                          // Close if already visible
                          if (wasOpen) {
                              return;
                          }

                          // Pass empty string as value to search for, displaying all results
                          input.autocomplete("search", "");
                      });
                },

                _source: function (request, response) {
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                    response(this.element.children("option").map(function () {
                        var text = $(this).text();
                        if (this.value && (!request.term || matcher.test(text)))
                            return {
                                label: text,
                                value: text,
                                option: this
                            };
                    }));
                },

                _removeIfInvalid: function (event, ui) {

                    // Selected an item, nothing to do
                    if (ui.item) {
                        return;
                    }

                    // Search for a match (case-insensitive)
                    var value = this.input.val(),
                      valueLowerCase = value.toLowerCase(),
                      valid = false;
                    this.element.children("option").each(function () {
                        if ($(this).text().toLowerCase() === valueLowerCase) {
                            this.selected = valid = true;
                            return false;
                        }
                    });

                    // Found a match, nothing to do
                    if (valid) {
                        return;
                    }

                    // Remove invalid value
                    this.input
                      .val("")
                      .attr("title", value + " didn't match any item")
                      .tooltip("open");
                    this.element.val("");
                    this._delay(function () {
                        this.input.tooltip("close").attr("title", "");
                    }, 2500);
                    this.input.autocomplete("instance").term = "";
                },

                _destroy: function () {
                    this.wrapper.remove();
                    this.element.show();
                }
            });

            $("#combobox").combobox();
            $("#toggle").on("click", function () {
                $("#combobox").toggle();
            });
        }

        $('.radioBtn a').on('click', function () {
            var sel = $(this).data('title');
            var tog = $(this).data('toggle');
            $('#' + tog).prop('value', sel);

            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        })

        $scope.editSide = function (data) {
            autocompleteInint();
            $('#sidesEdit').modal('show');
            $scope.SideUpdate = data;


        };

        $scope.getIngName = function (i) {
            if (i.name.Name)
                return i.name.Name;
            else {
                var ing = _.find($scope.allIngedients, { clientId: i.name });
                return ing.Name;
            }
        }

        $scope.getSideName = function (i) {
            if (i.Name)
                return i.Name;
            else {
                var ing = _.find($scope.allSides, { clientId: i });
                return ing.Name;
            }
        }


        $scope.refrush = function () {

            $scope.slideName = '';
            $scope.addIngredientTitle = {
                Name: "Select Ingedient",
                UnitType: ''
            };
            $scope.addIngredientQuantity = 0;
            $scope.addSlideIngredient = [];

        };



        $scope.addSide = function () {
            autocompleteInint();
            $scope.refrush();
            $('#sidesAdd').modal('show');
        }

        $scope.createCategory = function () {

            if ($scope.categoryName != undefined && $scope.categoryName != '') {
                $('#categAdd').modal('hide');
                console.log($scope.categoryName);
                var obj = {
                    Name: $scope.categoryName,
                    created_by: getEmployee.firstname,
                    updated_by: getEmployee.firstname,
                    clientId: utilservice.generateGUID(),
                    restaurant: getEmployee
                }

                serviceFun.AddCategory(obj).then(function (res) {
                    $scope.categoryName = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add Category");
                    console.log(res);
                    $scope.allCategory.push(res);

                }, failPayload)


                //return $http.post('/api/v1/Category', obj).then(function (res) {

                //    console.log(res);
                //    $scope.categoryName = '';
                //    alertservice.showAlert('error', "Failed", "Successfully Add Category");
                //}, function (error) {

                //    console.log(error);

                //});
            }
            else {
                alertservice.showAlert('error', "Failed", 'Name can not be null...')

            }

            //serviceFn.AddCategory(obj).then(function (res) {

            //    console.log(res);

            //}, failPayload)
        }

        $scope.allSlide = [];

        $scope.createSlide = function () {

            if ($scope.slideName != '' && $scope.slideName != undefined && $scope.addSlideIngredient.length > 0) {
                $('#sidesAdd').modal('hide');


                var indToStore = [];
                for (var sCounter = 0; sCounter < $scope.addSlideIngredient.length; sCounter++) {
                    indToStore.push({
                        name: $scope.addSlideIngredient[sCounter].name.clientId,
                        quantity: $scope.addSlideIngredient[sCounter].quantity
                    })
                }

                var obj = {
                    Name: $scope.slideName,
                    Ingradients: indToStore, // $scope.addSlideIngredient,
                    created_by: getEmployee.firstname,
                    updated_by: getEmployee.firstname,
                    clientId: utilservice.generateGUID(),
                    restaurant: getEmployee
                }



                serviceFun.AddSide(obj).then(function (res) {

                    console.log(res);
                    $scope.allSides.push(res);
                    $scope.slideName = '';

                    $scope.addIngredientTitle = {
                        Name: "Select Ingedient",
                        UnitType: ''
                    };
                    addIngredientQuantity = 0;
                    $scope.addSlideIngredient = [];
                    alertservice.showAlert('error', "Failed", "Successfully disable Side");

                }, failPayload)

            }
            else {

                alertservice.showAlert('error', "Failed", 'Field can not be null...');
            }


        }
        $scope.createProduct = function () {

            $scope.Product.clientId= utilservice.generateGUID();
            $scope.Product.restaurant = getEmployee;
            $scope.Product.Category = _.find($scope.allSubCategory, function (num) { return num.clientId == $scope.Product.Category });// _.find($scope.allCategory, { clientId: $scope.Product.Category });
            $scope.Product.ParentCategory = _.find($scope.allCategory, function (num) { return num.clientId == $scope.Product.ParentCategory });


            serviceFun.AddProduct( $scope.Product).then(function (res) {

                console.log(res);
                if (!res.error) {

                     //$scope.getProduct();
                    $scope.allProduct.push(angular.copy($scope.Product));
                    $scope.getProductdetail($scope.allCategory[0], 0)
                    $scope.flushdata();
                    alertservice.showAlert('error', "Failed", "Successfully Add Product");

                } else {
                    alertservice.showAlert('error', "Failed", "Product is not add due to some unknow error..");
                }

            }, failPayload)






        }

        $scope.updateProductToDB = function () {
            if ($scope.selectCategory.Name != "" && $scope.selectCategory != null && $scope.Product.Price != '' &&
                $scope.seflectSubCategory != null && $scope.selectSubCategory.Name != "Not Available") {
                $scope.Product.ParentCategory = $scope.selectCategory.clientId;
                $scope.Product.Category = $scope.selectSubCategory.clientId;
                $scope.Product.Ingradients = $scope.addSlideIngredient;
                $scope.Product.Sides = $scope.addProductSlide;
                $scope.Product.variations = $scope.addProductVariation;

                if ($scope.Product.type == "Retail") {
                    var obj = {
                        Cost: $scope.Product.Price,
                        Quantity: $scope.Product.Quantity,
                        updated_at: new Date(),
                        created_at: new Date()
                    }
                    if ($scope.modifyRetailProduct) {
                        $scope.Product.Quantity = parseInt($scope.Product.Quantity) + parseInt($scope.editedRetailProductQuantity);
                        obj.opertation = "Addition";
                        $scope.editedRetailProductQuantity = 0;
                    }
                    else {
                        if (parseInt($scope.Product.Quantity) > parseInt($scope.editedRetailProductQuantity)) {
                            $scope.Product.Quantity = parseInt($scope.Product.Quantity) - parseInt($scope.editedRetailProductQuantity);
                            obj.opertation = "subtraction";
                            $scope.editedRetailProductQuantity = 0;
                        }
                        else {
                            alertservice.showAlert('error', "Failed", "You can not subtract, more than available quantity - " + $scope.Product.Quantity);
                            return;
                        }
                    }

                    if ($scope.Product.Edits && $scope.Product.Edits.length > 0)
                        $scope.Product.Edits.push(obj);
                    else {
                        $scope.Product.Edits = [obj];
                    }
                }

                //$scope.Product.Category = _.find($scope.allSubCategory, function (num) { return num.clientId == $scope.Product.Category });// _.find($scope.allCategory, { clientId: $scope.Product.Category });
                //$scope.Product.ParentCategory = _.find($scope.allCategory, function (num) { return num.clientId == $scope.Product.ParentCategory });


                serviceFun.UpdateProduct($scope.Product).then(function (res) {

                    console.log(res);
                    if (!res.error) {
                        $scope.editProductActive = false;
                        //$scope.getProduct();
                         //$scope.getProduct();
                        $scope.allProduct = _.reject($scope.allProduct, function (item) { return item.clientId == $scope.Product.clientId });
                        //$scope.allProduct.push(angular.copy($scope.Product));
                        $scope.allProduct.push(angular.copy($scope.Product));
                        $scope.getProductdetail($scope.allCategory[0], 0)
                        $scope.flushdata();
                        alertservice.showAlert('error', "Failed", "Successfully Update Product");

                    } else {
                        alertservice.showAlert('error', "Failed", "Product is not add due to some unknow error..");
                    }

                }, failPayload)
            }
            else {
                alertservice.showAlert('error', "Failed", "Field can not be null..");
            }
        }

        $scope.UpdateProduct = function () {
            var fileVal = document.getElementById("inputFile");
            if (fileVal.files && fileVal.files.length > 0) {
                $scope.AWSS3.upload({
                    Key: $scope.generateUUID(),
                    Body: fileVal.files[0],
                    ACL: 'public-read'
                }, function (err, data) {
                    if (err) {
                        alertservice.showAlert('error', "Failed", "There was an error uploading your photo");
                    }
                    console.log(data);
                    $scope.Product.image = data.Location;
                    $scope.updateProductToDB();
                });
            } else {
                $scope.updateProductToDB();
            }
        }

        $scope.createIngedients = function () {
            if ($scope.ingredientName != undefined && $scope.costPrunit != undefined && $scope.unitType != undefined && $scope.amount != undefined && $scope.merma != undefined) {
                $('#ingAdd').modal('hide');
                var obj = {
                    Name: $scope.ingredientName,
                    Cost: $scope.costPrunit,
                    UnitType: $scope.unitType,
                    Quantity: $scope.amount,
                    Merma: $scope.merma,
                    Edits:[],
                    created_by: 'User',
                    updated_by: 'User',
                    clientId: utilservice.generateGUID(),
                    restaurant:getEmployee
                };
                serviceFun.AddIngedient(obj).then(function (res) {
                    console.log(res);
                    $scope.allIngedients.push(res);
                    $scope.ingredientName = '';
                    $scope.costPrunit = '';
                    $scope.unitType = '';
                    $scope.amount = '';
                    $scope.merma = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add Ingedient");
                }, function (error) {
                }, failPayload)
            }
            else {
                alertservice.showAlert('error', "Failed", 'Field can not be null...');

            }

        }
        $scope.addIngredientTitle = {
            Name: "Select Ingedient", UnitType: '', isactive: 0
        };
        $scope.allIngedients = [];
        $scope.addProductSlide = [];
        $scope.allProduct = [];
        $scope.allIngedientsName = [];
        $scope.getIngedients = function () {
            serviceFun.GetIngedients().then(function (res) {

                console.log(res);
                //res.push({ Name: "Select Ingedient", UnitType: '', isactive: 0 });
                $scope.allIngedients = res;

                if ($scope.allIngedients) {
                    for (var i = 0; i < $scope.allIngedients.length; i++) {
                        if ($scope.allIngedientsName.indexOf($scope.allIngedients[i].Name) > 0) {

                        } else {
                            $scope.allIngedientsName.push($scope.allIngedients[i].Name);
                        }
                    }
                }
            }, failPayload)
        }
        $scope.onAddExtraIngredients = function (suggestion) {
            for (var icount = 0; icount < $scope.allIngedients.length; icount++) {
                if ($scope.allIngedients[icount].Name == suggestion)
                    $scope.addIngredientTitle = $scope.allIngedients[icount];
            }

            //if ($scope.addSlideIngredient.indexOf(scope.addIngredientTitle) > 0) { } else {
            //    $scope.addSlideIngredient.push(suggestion)
            //}
            console.log($scope.addSlideIngredient);


        }
        $scope.getCategories = function () {
            $scope.allSubCategory = [];
            $scope.allCategory = [];
            serviceFun.GetCategory().then(function (res) {

                console.log(res);
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
                    $scope.allCategory[i].status = true;
                    for (var j = 0; j < $scope.allProduct.length; j++) {
                        if ($scope.allProduct[j].Category.ParentCategory == $scope.allCategory[i].clientId) {
                            $scope.allCategory[i].image = $scope.allProduct[j].image;

                        }
                    }
                }
                if ($scope.allCategory.length>0)
                    $scope.getProductdetail($scope.allCategory[0], 0)
            }, failPayload)


        }
        $scope.getProduct = function () {

            serviceFun.GetProducts().then(function (res) {
                $scope.getCategories();
                console.log(res);
                $scope.allProduct = res;
                for (var i = 0; i < $scope.allCategory.length; i++) {
                    for (var j = 0; j < $scope.allProduct.length; j++) {
                        if ($scope.allProduct[j].ParentCategory.clientId == $scope.allCategory[i].clientId) {
                            $scope.allCategory[i].image = $scope.allProduct[j].image;

                        }
                    }
                }
            }, failPayload)
        }
        $scope.allSidesName = [];
        $scope.getSides = function () {

            serviceFun.GetSides().then(function (res) {
                console.log(res);
                $scope.allSides = res;
                if ($scope.allSides) {
                    for (var i = 0; i < $scope.allSides.length; i++) {
                        if ($scope.allSidesName.indexOf($scope.allSides[i].Name) > 0) {

                        } else {
                            $scope.allSidesName.push($scope.allSides[i].Name);
                        }
                    }
                }
            }, failPayload)
        }
        $scope.onSearchSides = function (suggestion) {
            for (var icount = 0; icount < $scope.allSides.length; icount++) {
                if ($scope.allSides[icount].Name == suggestion)
                    $scope.addSideTitle = $scope.allSides[icount];
            }

            //if ($scope.addSlideIngredient.indexOf(scope.addIngredientTitle) > 0) { } else {
            //    $scope.addSlideIngredient.push(suggestion)
            //}
            console.log($scope.addSideTitle);


        }
        $scope.getSides();
        $scope.getProduct();
        //$scope.getCategories();
        $scope.addSlideIngredient = [];
        $scope.addProductVariation = [];
        $scope.addSlide = function (check) {
            if ($scope.addIngredientTitle.Name != "Select Ingedient" && $scope.addIngredientQuantity != undefined && $scope.addIngredientQuantity != 0) {
                var obj = {
                    name: $scope.deleteObjectproperties($scope.addIngredientTitle),
                    quantity: $scope.addIngredientQuantity
                }
                if (check == 'New') {
                    $scope.addSlideIngredient.push(obj);
                    $scope.addIngredientQuantity = '';
                    $scope.selecctIngredients = '';
                    $scope.addIngredientTitle = '';
                }
                else if (check == 'Update') {

                    $scope.SideUpdate.Ingradients.push(obj);

                }
            }
            else {
                alertservice.showAlert('error', "Failed", 'Please Select Ingredient and Quntity..');
            }
        }
        $scope.addIngredientTOproduct = function () {
            if ($scope.addIngredientTitle.Name != "Select Ingedient" && $scope.addIngredientQuantity != undefined && $scope.addIngredientQuantity != 0) {
                var obj = {
                    name: $scope.addIngredientTitle,
                    quantity: $scope.addIngredientQuantity
                }
                var check = false;
                for (var count = 0; count < $scope.addSlideIngredient.length; count++) {
                    if ($scope.addSlideIngredient[count].name.Name == $scope.addIngredientTitle.Name) {

                        check = true;
                    }
                    else {
                        //$scope.addSlideIngredient.push(obj)
                        check = false;
                    }

                }


                if (check) {
                    alertservice.showAlert('error', "Failed", 'Ingredient Already Selected..');
                }
                else  {

                    $scope.addSlideIngredient.push(obj);
                    $scope.addIngredientTitle = '';
                    $scope.addIngredientQuantity = '';
                    $scope.selecctIngredients = '';
                }

            }
            else {
                alertservice.showAlert('error', "Failed", 'Please Select Ingredient and Quntity..');
            }
        }
        $scope.addSideTOproduct = function () {
            if ($scope.addSideTitle.Name != "Select Ingedient" && $scope.addSideTitle.Name != undefined) {

                var check = false;
                for (var count = 0; count < $scope.addProductSlide.length; count++) {
                    if ($scope.addProductSlide[count].Name == $scope.addSideTitle.Name) {
                        check = true;
                    }
                    else {
                        check = false;
                    }

                }


                if (check) {
                    alertservice.showAlert('error', "Failed", 'Sides Already Selected..');
                }
                else {

                    $scope.addProductSlide.push($scope.addSideTitle);
                    $scope.selecctIngredients1 = '';

                }
                //if (check == 'New') {
                //    $scope.addSlideIngredient.push(obj);
                //}
                //else if (check == 'Update') {

                //    $scope.SideUpdate.Ingradients.push(obj);

                //}
            }
            else {
                alertservice.showAlert('error', "Failed", 'Please Select Side ');
            }
        }
        $scope.addVariationTOproduct = function () {
            if ($scope.addVariationTitle != "" && $scope.addVariationTitle != undefined) {

                var obj = {
                    Name: $scope.addVariationTitle,
                    _id: $scope.addProductVariation[$scope.addProductVariation.length - 1] == undefined ? 1 : $scope.addProductVariation[$scope.addProductVariation.length - 1].clientId + 1,
                }

                $scope.addProductVariation.push(obj);
                $scope.addVariationTitle = '';
                //if (check == 'New') {
                //    $scope.addSlideIngredient.push(obj);
                //}
                //else if (check == 'Update') {

                //    $scope.SideUpdate.Ingradients.push(obj);

                //}
            }
            else {
                alertservice.showAlert('error', "Failed", 'Please Enter Variation');
            }
        }


        $scope.removeIngedient = function (data, check) {
            if (check == 'New') {
                for (var i = 0; i < $scope.addSlideIngredient.length; i++) {
                    //if ($scope.addSlideIngredient[i].name.clientId == data.name.clientId) {
                    if ($scope.getINGId($scope.addSlideIngredient[i]) == $scope.getINGId(data)) {
                        $scope.addSlideIngredient.splice(i, 1);
                    }

                }
            }
            else if (check == 'Update') {
                for (var i = 0; i < $scope.SideUpdate.Ingradients.length; i++) {
                    if ($scope.getINGId($scope.SideUpdate.Ingradients[i]) == $scope.getINGId(data)) {
                        $scope.SideUpdate.Ingradients.splice(i, 1);
                    }
                }
            }
        }

        $scope.getINGId = function (obj) {
            if (obj.name.clientId)
                return name.clientId;
            else
                return obj.clientId;
        }

        $scope.removeIngredientFrmproduct = function (data) {
            for (var i = 0; i < $scope.addSlideIngredient.length; i++) {
                if ($scope.getINGId($scope.addSlideIngredient[i]) == $scope.getINGId(data)) {
                    $scope.addSlideIngredient.splice(i, 1);
                }
            }
        }

        $scope.getSIDEId = function (obj) {
            if (obj.clientId)
                return clientId;
            else
                return obj;
        }
        $scope.removeSideFrmproduct = function (data) {
            for (var i = 0; i < $scope.addProductSlide.length; i++) {
                if ($scope.getSIDEId($scope.addProductSlide[i]) == $scope.getSIDEId(data)) {
                    $scope.addProductSlide.splice(i, 1);
                }
            }
            $scope.$apply();
        }

        $scope.removevariationFrmproduct = function (data) {

            for (var i = 0; i < $scope.addProductVariation.length; i++) {
                if ($scope.addProductVariation[i].clientId == data.clientId) {

                    $scope.addProductVariation.splice(i, 1);
                }

            }
            $scope.$apply();
        }

        $scope.disableIngedients = function () {
            $scope.editIngredient.isactive = 0;
            $('#ingEdit').modal('hide');

            serviceFun.DisableIngedient($scope.editIngredient).then(function (res) {
                console.log(res);
                for (var i = 0; i < $scope.allIngedients.length; i++) {
                    if ($scope.allIngedients[i].clientId == $scope.editIngredient.clientId) {
                        $scope.allIngedients[i].isactive = 0;

                    }

                }
                alertservice.showAlert('error', "Failed", "Successfully disable Ingedient");
            }, function (error) {
            }, failPayload)
        }
        $scope.disableSide = function () {
            $scope.SideUpdate.isactive = 0;
            $('#sidesEdit').modal('hide');

            serviceFun.DisableSides($scope.SideUpdate).then(function (res) {
                console.log(res);
                for (var i = 0; i < $scope.allSides.length; i++) {
                    if ($scope.allSides[i].clientId == $scope.SideUpdate.clientId) {
                        $scope.allSides[i].isactive = 0;

                    }

                }
                alertservice.showAlert('error', "Failed", "Successfully disable Side");
            }, function (error) {
            }, failPayload)
        }
        $scope.getIngedients();
        $scope.ischangePrice = false;
        $scope.chagePrice = function () {
            $scope.ischangePrice = true;

        }
        $scope.editQuantity = function () {
            var date = new Date();
            var obj = {
                Cost: $scope.copyIngredient.Cost,
                Quantity: $scope.copyIngredient.Quantity,
                Merma: $scope.copyIngredient.Merma,
                updated_at: $scope.copyIngredient.updated_at,
                created_at: $scope.copyIngredient.created_at
            }


            if ($scope.addModify) {
                $scope.editIngredient.Quantity = $scope.editIngredient.Quantity + $scope.editedQuantity;
                obj.opertation = "Addition";

                $scope.editIngredient.message = "added " + $scope.editedQuantity + " " + $scope.shortForm($scope.editIngredient.UnitType); //+ " " + new Date().toDateString();
            }
            else {
                if ($scope.editIngredient.Quantity > $scope.editedQuantity) {
                    $scope.editIngredient.Quantity = $scope.editIngredient.Quantity - $scope.editedQuantity;
                    obj.opertation = "subtraction";
                    $scope.editIngredient.message = "subtracted " + $scope.editedQuantity + " " + $scope.shortForm($scope.editIngredient.UnitType); //+ " " + new Date().toDateString();
                }
                else {
                    alertservice.showAlert('error', "Failed", "value can not greater than" + $scope.editedQuantity);
                }
            }
            if ($scope.merma != '')
                $scope.editIngredient.message = $scope.editIngredient.message + " ,Merma " + $scope.merma;
            if ($scope.editIngredient.Cost > $scope.copyIngredient.Cost
                || $scope.editIngredient.Cost < $scope.copyIngredient.Cost)
                $scope.editIngredient.message = $scope.editIngredient.message + " ,Cost: " + $scope.editIngredient.Cost;

            $scope.editIngredient.message = $scope.editIngredient.message + " " + new Date().toDateString();
            $scope.editIngredient.Edits.push(obj);
        }
        $scope.updateCategory = function () {


            serviceFun.UpdateCategory($scope.categoryName1).then(function (res) {
                console.log(res);

                $scope.copy_categoryName1 = angular.copy($scope.categoryName1);
                for (var i = 0; i < $scope.allCategory.length; i++) {
                    if ($scope.allCategory[i].clientId == $scope.categoryName1.clientId) {
                        $scope.allCategory[i].editedMod = true;
                        $scope.allCategory[i].editedMod1 = false;
                        $scope.allCategory[i].status = true;

                    }
                }
                alertservice.showAlert('error', "Failed", "Successfully Update Category");

            }, function (error) {
            }, failPayload)

        }
        $scope.updateIngredient = function () {
            $('#ingEdit').modal('hide');
            $scope.editQuantity();
            //if ($scope.ischangePrice) {
            //    var date = new Date();
            //    var qnt = ($scope.editedQuantity == undefined) ? '0' : $scope.editedQuantity;
            //    $scope.editIngredient.message = "added " + qnt + " " + $scope.shortForm($scope.editIngredient.UnitType) + " " + moment(date).format("MMMM Do YYYY, h:mm:ss a") + " and " + $scope.editIngredient.Cost;

            //}
            $scope.editIngredient.Merma = parseInt($scope.editIngredient.Merma) + parseInt(($scope.merma == '') ? 0 : $scope.merma);
            $scope.editIngredient.updated_at = new Date();
            serviceFun.UpdateIngedient($scope.editIngredient).then(function (res) {
                console.log(res);
                $scope.merma = '';
                alertservice.showAlert('error', "Failed", "Successfully Update Ingredient");

                $scope.editedQuantity = 0;
            }, function (error) {
            }, failPayload)
        }
        $scope.updateSides = function () {
            $('#sidesEdit').modal('hide');
            serviceFun.UpdateSide($scope.SideUpdate).then(function (res) {
                console.log(res);
                alertservice.showAlert('error', "Failed", "Successfully Update Side");
                $scope.addIngredientTitle = {
                    Name: "Select Ingedient",
                    UnitType: ''
                };
                $scope.addIngredientQuantity = 0;
            }, function (error) {
            }, failPayload)
        }
        $scope.GetCategory = function () {
            serviceFun.GetCategory("123").then(function (res) {

                console.log(res);

            }, failPayload)

        }
        $scope.checkQuantity = function () {

            if ($scope.addIngredientTitle.Quantity < $scope.addIngredientQuantity) {
                alertservice.showAlert('error', "Failed", "Quantity can not be greater than it's availability");
                $scope.addIngredientQuantity = 0;
            }

        }

        function failPayload(err) {
            console.log(err)
        }

        // new product flow

        $scope.addProductActive = false;
        $scope.addProductType = true;

        $scope.addProductInit = function () {
            $scope.addProductActive = true;
            $scope.flowStatus = "1";
            $scope.flushdata();
        }

        $scope.selectCategory = {
            "_id": 0,
            "Name": "Select Category",
            "isactive": 1,
        }
        $scope.selectSubCategory = {
            "_id": 0,
            "Name": "Select SubCategory",
            "isactive": 1,
        }
        $scope.checkUpdation = false;
        $scope.selectedCate = function () {
            $scope.checkUpdation = true;
            $scope.showSubCategory = [];
            var checkAvailability = false;
            console.log($scope.selectCategory);
            for (var count = 0; count < $scope.allSubCategory.length; count++) {

                if ($scope.allSubCategory[count].ParentCategory.clientId == $scope.selectCategory.clientId || $scope.allSubCategory[count].ParentCategory == $scope.selectCategory.clientId)
                {

                    $scope.showSubCategory.push($scope.allSubCategory[count]);
                    checkAvailability = true;
                }
            }
            if (!checkAvailability) {
                $scope.showSubCategory = [{
                    "_id": 0,
                    "Name": "Not Available",
                    "isactive": 1,
                }];
            }
            $scope.$apply();
        }

        $scope.Product = {
            Name: '',
            type: 'Product',
            Quantity: 0,
            Category: $scope.selectSubCategory.clientId,
            ParentCategory: $scope.selectCategory.clientId,
            Price: '',
            Ingradients: [],
            Sides: [],
            variations: [],
            image: "http://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/c135.0.810.810/13743131_302358726783757_317008255_n.jpg?ig_cache_key=MTMwNjUxODQ3ODEzMjE0NzA2OQ%3D%3D.2.c",
            created_by: 'User',
            updated_by: 'User',
        }
        $scope.flushdata = function () {
            $scope.selectCategory = {
                "_id": 0,
                "Name": "Select Category",
                "isactive": 1,
            };
            $scope.selectSubCategory = {
                "_id": 0,
                "Name": "Select SubCategory",
                "isactive": 1,
            };
            $scope.Product = {
                Name: '',
                type: '',
                Quantity: 0,
                Category: $scope.selectSubCategory.clientId,
                ParentCategory: $scope.selectCategory.clientId,
                Price: '',
                Ingradients: [],
                Sides: [],
                variations: [],
                image:'',
                created_by: 'User',
                updated_by: 'User',
            };
            $scope.addSlideIngredient = [];
            $scope.addProductVariation = [];
            $scope.addIngredientTitle = {
                Name: "Select Ingedient",
                UnitType: ''
            };
            $scope.addSideTitle = '';
            $scope.addProductSlide = [];
            $('#inputFile4').val('');
        }

        $scope.addProductEnd = function () {
            if ($scope.selectCategory.Name != "Select Category" && $scope.selectCategory.Name != undefined && $scope.Product.Price != '' && $scope.selectSubCategory.Name != "Select SubCategory" && $scope.selectSubCategory.Name != "Not Available") {

                //if (!$scope.addProductType) {
                $scope.Product.Category = $scope.selectSubCategory.clientId;
                $scope.Product.ParentCategory = $scope.selectCategory.clientId;
                if ($scope.Product.type == "Retail") {

                    var fileVal = document.getElementById("inputFile5");
                    if (fileVal.files.length > 0) {
                        $scope.AWSS3.upload({
                            Key: $scope.generateUUID(),
                            Body: fileVal.files[0],
                            ACL: 'public-read'
                        }, function (err, data) {
                            if (err) {
                                // return alert(': ', err.message);
                                alertservice.showAlert('error', "Failed", "There was an error uploading your photo");
                            }
                            console.log(data);
                            $scope.Product.image = data.Location;
                            $scope.createProduct();
                            $scope.addProductActive = false;
                            $scope.flowStatus = "0";
                            $scope.addProductType = true;
                            // $scope.AddSectionTODB(data.Location);
                        });
                    }
                    else {
                        alertservice.showAlert('error', "Failed", "Image cannot be null.");
                    }
                }
                else {
                    $scope.Product.variations = $scope.addProductVariation;
                    $scope.createProduct();
                    $scope.addProductActive = false;
                    $scope.flowStatus = "0";
                    $scope.addProductType = true;
                }
                //}
                //else {
                //    $scope.Product.variations = $scope.addProductVariation;
                //}

            }
            else {
                alertservice.showAlert('error', "Failed", "Field cannot be null...");

            }
        }


        $scope.addProductcancel = function () {

            $scope.addProductActive = false;
            $scope.flowStatus = "0";
            $scope.addProductType = true;
        }

        $scope.nextNewProd = function () {

            if ($scope.flowStatus === "1") {
                $scope.flowStatus = "2";



            } else if ($scope.flowStatus === "2") {
                if ($scope.selectCategory.Name != "Select Category" && $scope.selectCategory.Name != undefined && $scope.Product.Price != '' && $scope.selectSubCategory.Name!="Select SubCategory") {
                    if ($scope.selectSubCategory.Name != "Not Available") {
                        var fileVal = document.getElementById("inputFile4")
                        if (fileVal.files.length > 0) {
                            $scope.flowStatus = "3";
                            $scope.Product.Category = $scope.selectSubCategory.clientId;
                            $scope.Product.ParentCategory = $scope.selectCategory.clientId,
                            $scope.uploadImage();
                            console.log($scope.Product);
                            autocompleteInint();
                        }
                        else {
                            alertservice.showAlert('error', "Failed", "Image Can not be null..");
                        }
                    }
                    else { alertservice.showAlert('error', "Failed", "Subcategory Not Available."); }
                }
                else {
                    alertservice.showAlert('error', "Failed", "Fields cannot be null..");
                }

            } else if ($scope.flowStatus === "3") {
                if ($scope.addSlideIngredient.length > 0 && $scope.addSlideIngredient.length > 0) {
                    var indToStore = [];
                    for (var sCounter = 0; sCounter < $scope.addSlideIngredient.length; sCounter++) {
                        indToStore.push({
                            quantity: $scope.addSlideIngredient[sCounter].quantity,
                            name: $scope.addSlideIngredient[sCounter].name.clientId
                        })
                    }
                    var sideToStore = []
                    for (var sCounter = 0; sCounter < $scope.addProductSlide.length; sCounter++) {
                        sideToStore.push($scope.addProductSlide[sCounter].clientId)
                    }
                    $scope.Product.Ingradients = indToStore;
                    $scope.Product.Sides = sideToStore;
                    console.log($scope.Product);
                    $scope.flowStatus = "4";
                }
                else {
                    alertservice.showAlert('error', "Failed", "Ingredient and Side cannot be null..");
                }
            }


        }
        $scope.deleteObjectproperties = function (myObject) {


            return myObject;
        }

        $scope.backNewProd = function () {

            if ($scope.flowStatus === "4") {
                $scope.flowStatus = "3";

            } else if ($scope.flowStatus === "3") {
                $scope.flowStatus = "2";

            } else if ($scope.flowStatus === "2") {
                $scope.flowStatus = "1";
            }


        }

        $scope.prodTypeT = function () {

            $scope.Product.type = "Product";
            $scope.addProductType = true;
        }
        $scope.editedMod = true;
        $scope.prodTypeF = function () {

            $scope.Product.type = "Retail";
            $scope.addProductType = false;
        }
        $scope.shortForm = function (Form) {
            if (Form == "Kilograms") {
                return '.Kg';
            }
            else if (Form == "Litres") {
                return '.Lt';
            }
            else if (Form == "Ounces") {
                return '.Oz';
            }
            else if (Form == "Grams") {
                return '.Gm';
            }
        }

        $scope.editedCategotyData = null;
        $scope.getProductdetail = function (data, ref) {
            if(data.editedMod === true) return;
            for (var count = 0; count < $scope.allCategory.length; count++) {
                $scope.allCategory[count].editedMod = false;
                $scope.allCategory[count].editedMod1 = false;
                if (count == ref) {
                    $scope.editedCategotyData = $scope.allCategory[count];
                }
            }

            data.editedMod = true;
            $scope.categoryName1 = data;
            $scope.showProduct = [];
            $scope.copy_categoryName1=angular.copy($scope.categoryName1);
            //$("#cat" + ref).parent('.product-category').toggleClass("active");



            $scope.showSubCategory = [];

            var checkAvailability = false;
            $scope.showSubCategory = _.filter($scope.allSubCategory, function (num) {
              return (num.ParentCategory && (num.ParentCategory.clientId == data.clientId || num.ParentCategory == data.clientId)); });
            $scope.showProduct = _.filter($scope.allProduct, function (num) { return num.Category.clientId == $scope.showSubCategory[0].clientId; });

            for (var count = 0; count < $scope.showSubCategory.length; count++) {

                $scope.showSubCategory[count].bgcolor = ' btn-success new-cat1';
            }
            if ($scope.showSubCategory && $scope.showSubCategory.length > 0)
                $scope.showSubCategory[0].bgcolor = 'new-cat2';
        //for (var count = 0; count < $scope.allSubCategory.length; count++) {

        //    if ($scope.allSubCategory[count].ParentCategory.clientId == data.clientId || $scope.allSubCategory[count].ParentCategory == data.clientId) {
        //        $scope.showSubCategory.push($scope.allSubCategory[count]);
        //        checkAvailability = true;
        //        for (var i = 0; i < $scope.allProduct.length; i++) {
        //            if ($scope.allProduct[i].Category.clientId == data.clientId) {
        //                $scope.showProduct.push($scope.allProduct[i]);

        //            }

        //        }
        //    }
        //}
        //if (!checkAvailability) {
        //    $scope.showSubCategory = [{
        //        "_id": 0,
        //        "Name": "Not Available",
        //        "isactive": 1,
        //    }];
        //}
        }

        $scope.replaceBlankSpace = function (name) {

            return name.replace(/\s/g, '');
        }

        $scope.getProductdetailBySubcateId = function (data, ref) {

            for (var count = 0; count < $scope.showSubCategory.length; count++) {
                if ($scope.showSubCategory[count].clientId == data.clientId) {
                    //$scope.showSubCategory[count].bgcolor = angular.copy('new-cat2');
                    $("#" + $scope.showSubCategory[count].NameSpace).css('background-color', '#ff5722');
                    $("#" + $scope.showSubCategory[count].NameSpace).css('color', 'white');
                }
                else {
                    $("#" + $scope.showSubCategory[count].NameSpace).css('background-color', '');
                    $("#" + $scope.showSubCategory[count].NameSpace).css('color', '');
                }
            }


            $scope.showProduct = _.filter($scope.allProduct, function (num) { return num.Category.clientId == data.clientId; });

        }

        $scope.editCat = function (val) {
            if (val == 1) {

                for (var i = 0; i < $scope.allCategory.length; i++) {
                    if ($scope.allCategory[i].clientId == $scope.copy_categoryName1.clientId) {
                        $scope.allCategory[i].editedMod = false;
                        $scope.allCategory[i].editedMod1 = true;
                        $scope.allCategory[i].status = false;
                    }

                }
            } else {

                for (var i = 0; i < $scope.allCategory.length; i++) {
                    if ($scope.allCategory[i].clientId == $scope.copy_categoryName1.clientId) {
                        $scope.allCategory[i] = $scope.copy_categoryName1;
                        $scope.allCategory[i].editedMod = true;
                        $scope.allCategory[i].editedMod1 = false;
                        $scope.allCategory[i].status = true;
                       }

                }
            }
        }

        $scope.deleteCateory = function (cate) {
            var data = _.filter($scope.allProduct, function (num) {
              if(!num.ParentCategory) return false;
              return num.ParentCategory.clientId == cate.clientId; });
            if (data.length == 0) {
                serviceFun.DeleteCategory(cate).then(function (res) {
                    for (var i = 0; i < $scope.allCategory.length; i++) {
                        if ($scope.allCategory[i].clientId == cate.clientId) {
                            $scope.allCategory.splice(i,1);

                        }
                    }
                    for (var i = 0; i < $scope.allSubCategory.length; i++) {
                        if ($scope.allSubCategory[i].ParentCategory.clientId == cate.clientId) {
                            $scope.allSubCategory.splice(i, 1);

                        }
                    }
                    alertservice.showAlert('error', "Failed", "Successfully Delete Category");
                    $scope.getProductdetail($scope.allCategory[0],1);
                }, function (error) {

                }, failPayload)
            }
        }

        $scope.editClose = function (index) {
            $("#cat" + index).parent('.product-category').toggleClass("active");
            alert(index);
        }

        $scope.initAWS = function () {

            var albumBucketName = 'ithoursclientdata';
            var bucketRegion = 'Oregon';
            var IdentityPoolId = 'us-west-2:2edbb998-fe7d-4078-89b0-96b302d6a578'


            // var albumBucketName = 'piggybook';
            // var bucketRegion = 'Oregon';
            // var IdentityPoolId = 'us-west-2:2edbb998-fe7d-4078-89b0-96b302d6a578';

            AWS.config.update({
                region: 'us-west-2',
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: IdentityPoolId
                })
            });

            //$rootScope.albumBucketName = albumBucketName;

            $scope.AWSS3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: { Bucket: albumBucketName }
            });


        }

        $scope.initAWS();
        $scope.uploadImage = function () {

            var fileVal = document.getElementById("inputFile4");
            $scope.AWSS3.upload({
                Key:$scope.generateUUID(),
                Body: fileVal.files[0],
                ACL: 'public-read'
            }, function (err, data) {
                if (err) {
                   // return alert(': ', err.message);
                    alertservice.showAlert('error', "Failed", "There was an error uploading your photo");
                }
                console.log(data);
                $scope.Product.image = data.Location;
               // $scope.AddSectionTODB(data.Location);
            });


        }



        document.getElementById("inputFile").onchange = function () {
            var input = document.getElementById("inputFile")
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#proimg').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }


        }
        $scope.generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        $scope.opensubCategory = function (parentCate) {
            $('#subcategAdd').modal('show');
            $scope.parentCate = parentCate;
        }
        $scope.createSubCategory = function () {
            if ($scope.subcategoryName != undefined && $scope.subcategoryName != '') {
                $('#subcategAdd').modal('hide');
                console.log($scope.subcategoryName);
                var cat = $scope.parentCate;
                if(cat)
                    cat =$scope.editedCategotyData;
                var obj = {
                    Name: $scope.subcategoryName,
                    created_by: getEmployee.firstname,
                    updated_by: getEmployee.firstname,
                    ParentCategory: cat._id,
                    clientId: utilservice.generateGUID(),
                    restaurant: getEmployee
                }

                serviceFun.AddCategory(obj).then(function (res) {

                    $scope.subcategoryName = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add SubCategory");
                    console.log(res);
                    $scope.allSubCategory.push(res);
                    res.bgcolor = ' btn-success new-cat1';
                    $scope.showSubCategory.push(res);

                }, failPayload)
            }
            else {
                alertservice.showAlert('error', "Failed", 'Name can not be null...')

            }

        }
    }

})();

!function(){"use strict";function t(t,e,n,a,o,d){function c(t){"usersess"==t._id&&(t.usermoment.employee?emit(t.usermoment.employee):emit(t.name))}function r(t){"employee"==t._id&&(t.emplyoeedata?emit(t.emplyoeedata):emit(t.name))}function i(t,e,n,a){var o=new Date;return t?(a&&a.docdata?a.docdata.push(n):a.docdata=[n],a.lastupdatetime=o):a={_id:e,docdata:[n],lastupdatetime:o,lastsynctime:o},a}function u(t,e,n,a){var o=new Date;if(!t)throw new Error("Error in updating the data of -"+e);if(a.lastupdatetime=o,"Category"==e)for(d=0;d<a.docdata.length;d++)a.docdata[d].clientId==n.clientId&&(a.docdata[d].Name=n.Name);else if("Ingredients"==e)for(d=0;d<a.docdata.length;d++)a.docdata[d].clientId==n.clientId&&(a.docdata[d].Cost=n.Cost,a.docdata[d].Edits=n.Edits,a.docdata[d].Merma=n.Merma,a.docdata[d].Name=n.Name,a.docdata[d].Quantity=n.Quantity,a.docdata[d].UnitType=n.UnitType,a.docdata[d].message=n.message);else if("Sides"==e)for(d=0;d<a.docdata.length;d++)a.docdata[d].clientId==n.clientId&&(a.docdata[d].Name=n.Name,a.docdata[d].Ingradients=n.Ingradients);else{if("Product"!=e)throw new Error("Error in updating the data of -"+e+" and type is not defined");if("Retail"==n.type)for(d=0;d<a.docdata.length;d++)a.docdata[d].clientId==n.clientId&&(a.docdata[d].Category=n.Category,a.docdata[d].Edits=n.Edits,a.docdata[d].Ingradients=n.Ingradients,a.docdata[d].Name=n.Name,a.docdata[d].ParentCategory=n.ParentCategory,a.docdata[d].Price=n.Price,a.docdata[d].Quantity=n.Quantity,a.docdata[d].Sides=n.Sides,a.docdata[d].image=n.image,a.docdata[d].variations=n.variations);else for(var d=0;d<a.docdata.length;d++)a.docdata[d].clientId==n.clientId&&(a.docdata[d].Category=n.Category,a.docdata[d].Edits=n.Edits,a.docdata[d].Ingradients=n.Ingradients,a.docdata[d].Name=n.Name,a.docdata[d].ParentCategory=n.ParentCategory,a.docdata[d].Price=n.Price,a.docdata[d].Quantity=n.Quantity,a.docdata[d].Sides=n.Sides,a.docdata[d].image=n.image,a.docdata[d].variations=n.variations)}return a}function s(t,e,n,a){var o=new Date;return t?(a.docdata=n,a.lastupdatetime=o,a.lastsynctime=o):a={_id:e,docdata:n,lastupdatetime:o,lastsynctime:o},a}function l(t){return t.data}function g(t){return t.data.data[0]}function f(t){return function(){return{success:!1,message:t}}}var y=e("lanapp",{adapter:"idb"}),p={};return p.CurrentEmployee=function(){return navigator.onLine?t.get("/api/v1/employeedetails").then(g,f("Error getting all users")):y.query(c).then(function(t){return t.rows[0].key}).catch(function(t){console.log(t)})},p.updateUser=function(e){return navigator.onLine?t.post("/api/v1/currentemployeeUpdate",e).then(l,f("Error getting all users")):(e.flag=1,y.query(r,{include_docs:!0}).then(function(t){var a=[];a=e._id,t.rows[0].key.filter(function(t){return a.indexOf(t._id)>-1});for(var o,d=0,c=t.rows[0].key.length;d<c;d++)t.rows[0].key[d]._id==e._id&&(o=d,y.get("employee").then(function(t){delete t.emplyoeedata[o],t.emplyoeedata[o]=e;var a={edit:e._id,data:e,syncstatus:0};if(n.get("_meanLanAppSync")){var d=n.get("_meanLanAppSync");"1"in d?(delete d[1],d[1]={employeeprofile:a}):d[1]={employeeprofile:a},console.log("New struct"),console.log(d),n.set("_meanLanAppSync",d)}return y.put({_id:"employee",_rev:t._rev,emplyoeedata:t.emplyoeedata})}))}).catch(function(t){console.log(t)}))},p.AddCategory=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Category",t,i).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.GetSides=function(){return d((e,n)=>{a.online?o.getResId().then(function(n){t.post("/api/get/Sides",{id:n}).then(function(t){o.addOrUpdateDocInPouchDB("Sides",t.data,s).then(function(t){console.log("Sides addded successfully")}).catch(function(t){console.log("error in adding Sides")}),e(t.data)},f("Error getting all users"))}):y.get("Sides",function(t,n){e(n.docdata)})})},p.GetCategory=function(){return d((e,n)=>{a.online?o.getResId().then(function(n){t.post("/api/get/Category",{id:n}).then(function(t){o.addOrUpdateDocInPouchDB("Category",t.data,s).then(function(t){console.log("category added successfuly")}).catch(function(t){console.log("error in addinf category")}),e(t.data)},f("Error getting all users"))}):y.get("Category",function(t,n){e(n.docdata)})})},p.GetIngedients=function(){return d((e,n)=>{a.online?o.getResId().then(function(n){t.post("/api/get/Ingredients",{id:n}).then(function(t){o.addOrUpdateDocInPouchDB("Ingredients",t.data,s).then(function(t){console.log("Ingredients addded successfully")}).catch(function(t){console.log("error in adding Ingredients")}),e(t.data)},f("Error getting all users"))}):y.get("Ingredients",function(t,n){e(n.docdata)})})},p.AddIngedient=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Ingredients",t,i).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.AddProduct=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Product",t,i).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.AddSide=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Sides",t,i).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.UpdateIngedient=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Ingredients",t,u).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.UpdateSide=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Sides",t,u).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.DisableIngedient=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Ingredients",t,u).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.GetProducts=function(){return d(function(e,n){a.online?o.getResId().then(function(n){t.post("/api/get/Product",{id:n}).then(function(t){o.addOrUpdateDocInPouchDB("Product",t.data,s).then(function(t){console.log("Product addded successfully")}).catch(function(t){console.log("error in adding Product")}),e(t.data)},f("Error getting all users"))}):y.get("Product",function(t,n){e(n.docdata)})})},p.UpdateCategory=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Category",t,u).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.UploadImage=function(e){return t.post("/api/v1/uploadImage",e).then(function(t){return t},function(t){return t})},p.UpdateProduct=function(t){return d((e,n)=>{o.addOrUpdateDocInPouchDB("Product",t,u).then(function(t){e(t),o.syncInventory()}).catch(function(t){n(t)})})},p.DeleteCategory=function(t){var n=e("lanapp",{adapter:"idb"});return d(function(e,a){n.get("Category").then(function(d){console.log(d),d.lastupdatetime=new Date;for(var c=0;c<d.docdata.length;c++)d.docdata[c].clientId==t.clientId&&d.docdata.splice(c,1);n.put({_id:"Category",_rev:d._rev,docdata:d.docdata}).then(function(){console.log("Doc updated in poch Db\n for  exisinng doc"),e(t),o.syncInventory()}).catch(function(t){console.log("Error while updating Data to poch Db\n"),console.log(t),a(t)})})})},p}angular.module("inventoryManager").factory("inventoryManagerService.js",t).service("serviceFun",t),t.$inject=["$http","pouchDB","localStorageService","$rootScope","utilservice","$q"]}();
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
        service.CurrentEmployee = CurrentEmployee;
        service.updateUser = CurrentEmployeeUpdate;
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
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddSide(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, addMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddProduct(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Product', data, addMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function AddIngedient(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Ingredients', data, addMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
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
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateIngedient(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Ingredients', data, updateMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateSide(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, updateMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function UpdateCategory(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Category', data, updateMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
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

        function DeleteCategory(doctomanage) {
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

                    db.put({_id: 'Category',
                      _rev: existDocument._rev,
                      docdata: existDocument.docdata}).then(function () {
                        console.log("Doc updated in poch Db\n for  exisinng doc");
                        resolve(doctomanage);
                        utilservice.syncInventory();
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
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function DisableSides(data) {
            return $q((resolve, reject) => {
                utilservice.addOrUpdateDocInPouchDB('Sides', data, disbaleMofiyfn).then(function (res) {
                    resolve(res);
                    utilservice.syncInventory();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

    }
})();

!function(){"use strict";var l=null,o=null;angular.module("login",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(e,n,i,t,r,a){function s(l,o){o.isLoggedIn()}l=n,(o=e).state("/",{url:"/",templateUrl:a.TEMPLATE+"login/login.html",controller:"login",controllerAs:"vm",data:{pageTitle:"Login",bodyClass:"login"},resolve:{hellodash:s}}),o.state("/login",{url:"/login",templateUrl:a.TEMPLATE+"login/login.html",controller:"login",controllerAs:"vm",data:{pageTitle:"Login",bodyClass:"login"},resolve:{hellodash:s}}),function(l){l.loginResolver().then(function(l){return l})}.$inject=["SessionService"],s.$inject=["$state","SessionService"]}])}();
(function () {
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('login', [
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
            
            // loads url from the index
            $stateProviderRef.state('/', {
                    url: '/',  
                    templateUrl: path.TEMPLATE+'login/login.html',
                    controller  : 'login',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Login',bodyClass:"login"},
                    resolve: {hellodash: rootpage},
                    
                });
                $stateProviderRef.state('/login', {
                    url: '/login',                    
                    templateUrl: path.TEMPLATE+'login/login.html',
                    controller  : 'login',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Login',bodyClass:"login"},
                    resolve: {hellodash: rootpage},
                });

                resolverLogin.$inject = ['SessionService'];
                function resolverLogin(SessionService) {
                     SessionService.loginResolver().then(function(data) { return data});
                }
                rootpage.$inject = ['$state','SessionService'];
                function rootpage($state,SessionService) {
                     if(!SessionService.isLoggedIn()){}
                }
        }])
})();



!function(){"use strict";function t(t,e,n,a,o,s,i,c,r){var u=this;this.buttontext="Sign In",this.authenticate=function(){this.buttontext="Signing...",u.buttontext="Wait..",t.authenticate.$valid?c.login(u.credential).then(function(t){t.data.success?(n.token=t.data.data.token,s.defaults.headers.common["x-access-token"]=t.data.data.token,i.set("_meanLanApp",t.data.data.token),i.set("_meanLanAppLogIn",1),u.buttontext="Logined",window.location="/dashboard",r.showAlert("success","Success",t.data.message)):r.showAlert("error","Failed",t.data.message),u.buttontext="Sign In"},function(t){t.success||r.showAlert("error","Failed",t.message)}):(u.buttontext="Sign In",u.submitted=!0)}}angular.module("login").controller("login",t),t.$inject=["$scope","$state","$rootScope","$location","toaster","$http","localStorageService","loginService","alertservice"]}();
(function() {
    'use strict';

    angular
        .module('login')
        .controller('login', LoginController);

    LoginController.$inject = ['$scope','$state','$rootScope','$location','toaster','$http','localStorageService','loginService','alertservice'];
    
    function LoginController($scope, $state, $rootScope, $location, toaster, $http, localStorageService, loginService, alertservice) {
        var vm = this
    	this.buttontext = "Sign In"
        this.authenticate = function (){
        	this.buttontext = "Signing..."
        	   vm.buttontext = "Wait..";

		           if ($scope.authenticate.$valid) {
		                 var promise = loginService.login(vm.credential);
		                    promise.then(
		                      function(payload) { 
		                 
		                          if (payload.data.success) {
		                              $rootScope.token = payload.data.data.token;
		                              $http.defaults.headers.common['x-access-token'] = payload.data.data.token;
		                              localStorageService.set('_meanLanApp', payload.data.data.token);
		                              localStorageService.set('_meanLanAppLogIn', 1);
		                              vm.buttontext = "Logined";
		                              window.location = '/dashboard'
		                              //$location.path('/dashboard');  fix for refresh
		                              alertservice.showAlert('success', "Success", payload.data.message)
		                          }
		                          else {
		                              alertservice.showAlert('error', "Failed", payload.data.message)
		                          }
		                      		 vm.buttontext = "Sign In";
		                        },
		                      function(errorPayload) {
		                          if(!errorPayload.success){
		                              alertservice.showAlert('error', "Failed", errorPayload.message)
		                           }
		                      }); 
		           }
		           else{
		            vm.buttontext = "Sign In";
		            vm.submitted = true;
		           }
        }
    }
    	
})();
!function(){"use strict";function e(e,t,s,o){var n=o("lanapp",{adapter:"idb"});return{login:function(s){var o={};o.email=s.email,o.password=s.pwd,o.token=s.token;var r=t.defer();return e.post("api/login",o).success(function(t){null!=t?(n.get("usersess").then(function(e){n.remove(e),n.put({_id:"usersess",usermoment:t.data})}),e.get("/api/get/employee").success(function(e){0!=e.data?n.put({_id:"employee",emplyoeedata:e.data},function(){r.resolve({success:!0,data:t})}):r.resolve({success:!0,data:t})})):r.resolve({success:!1,data:null})}).error(function(e,t){r.reject(e)}),r.promise},getEmployess:function(){var s=t.defer();return e.get("/api/get/employee").success(function(e){console.log(e.data),e.data,s.resolve({success:!0,data:e})}).error(function(e,t){s.reject(e)}),s.promise}}}angular.module("login").service("loginService",e),e.$inject=["$http","$q","$rootScope","pouchDB"]}();

(function () {
    'use strict';
    
    angular
        .module('login')
        .service('loginService', LoginService);

        LoginService.$inject = ['$http','$q','$rootScope','pouchDB'];
		/* @ngInject */
		function LoginService($http,$q,$rootScope,pouchDB) {
		 var db =  pouchDB('lanapp', {adapter : 'idb'});
	      return {
	              login: function(user) {
	        
	              	var credetialsLogin = {}
	                credetialsLogin.email = user.email;
	                credetialsLogin.password = user.pwd;
	                credetialsLogin.token = user.token;

		             var deferred = $q.defer();
		             $http.post('api/login', credetialsLogin)
		               .success(function(data) { 
		                 if(data != null){
		                 	
	                 			db.get('usersess').then(function (doc) {
								  db.remove(doc);
								  db.put({
	                                _id: 'usersess',
	                                usermoment: data.data
	                              });
								});

		                 		$http.get('/api/get/employee')
		                 		.success(function(employess) { 
		                 			
		                 			

		                 			// get employee details for current retuarant;
		                 			if(employess.data != 0){
			                 			 db.put({
			                                _id: 'employee',
			                                emplyoeedata: employess.data
			                              },function(){
			                              	deferred.resolve({success: true, data: data});
			                              });
			                 			} else{
			                 					deferred.resolve({success: true, data: data});
			                 			}
		                 			
		                 		})
		                        
		                    }
		                    else{
		                        deferred.resolve({success: false, data: null});
		                    }
		               }).error(function(msg, code) {
		                  deferred.reject(msg);
		               });
		             return deferred.promise;
	            },
	            getEmployess : function(){
	            	// get employee details for current retuarant;
	            	 			var deferred = $q.defer();
	            				$http.get('/api/get/employee')
			                 		.success(function(employess) { 
			                 			console.log(employess.data)
			                 			if(employess.data != 0){

			                 			}
			                 			// Save Employee details current retuarant;
			                 			 /*db.put({
			                                _id: 'employee',
			                                emplyoeedata: employess.data
			                              });*/
			                 			deferred.resolve({success: true, data: employess});
		                 		}).error(function(msg, code) {
				                  deferred.reject(msg);
				               });
		                 		return deferred.promise;
	            }
	        }
	     }//login
    
    
})();
!function(){"use strict";var r=null,e=null;angular.module("ordersMonitor",["application.thirdparty"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$compileProvider","PATHS",function(o,t,n,i,l,a){function u(r){if(navigator.onLine)return r.authEmployee().then(function(r){return r});r.authEmployee()}function d(r){return navigator.onLine,r.CurrentEmployee().then(function(r){return r})}r=t,(e=o).state("ordersMonitor",{url:"/orders",templateUrl:a.TEMPLATE+"ordersMonitor/ordersMonitor.html",controller:"ordersMonitorController",controllerAs:"vm",data:{pageTitle:"Orders Monitor",bodyClass:"menuavaled ordersmonitor"},resolve:{employee:u,getEmployee:d}}),u.$inject=["empService"],d.$inject=["employeeprofileService"]}])}();
(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('ordersMonitor', [
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
            

                $stateProviderRef.state('ordersMonitor', {
                    url: '/orders',                    
                    templateUrl: path.TEMPLATE+'ordersMonitor/ordersMonitor.html',
                    controller  : 'ordersMonitorController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Orders Monitor',bodyClass:"menuavaled ordersmonitor"},
                    resolve: {
                        employee: auth,
                        getEmployee : ResolveEmployee
                    }
                });
                auth.$inject = ['empService'];
                function auth(empService) {
                    if(navigator.onLine){
                        return empService.authEmployee().then(function(data){ return data });
                    }
                    else{

                        empService.authEmployee()
                    }
                    
                }
                ResolveEmployee.$inject = ['employeeprofileService'];
                function ResolveEmployee(employeeprofileService) {
                    if(navigator.onLine){
                         //return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                         return employeeprofileService.CurrentEmployee().then(function(data){ return data }); //temp
                    }
                    else{
                       return employeeprofileService.CurrentEmployee().then(function(data){ return data });
                    }
                    
                }

        }])
})();



!function(){"use strict";function r(r,e,t,o,a,l,n,s,d,i,u,c,g,f,O,S){function h(r){}r.$on("onShiftClosed",function(e,o){console.log(o),$("#shiftCloseModal").modal("show");for(var a=0;a<r.allOrders.length;a++)r.allOrders[a].status=t.orderStatusmanager.ARCHIVED;setTimeout(function(){window.location="/employee"},5e3)}),r.$on("onOrderPlaced",function(e,t){console.log("getting event"),console.log(t),t.orderStatus=!0,r.allOrders?r.allOrders.push(t):(r.allOrders=[],r.allOrders.push(t)),r.$apply()}),r.$on("onOrderStarted",function(e,o){var a=o.orderId;if(r.allOrders){for(var l=a.orderId,n=0;n<r.allOrders.length;n++)r.allOrders[n]._id==l&&(r.allOrders[n].status=t.orderStatusmanager.STARTED);r.$apply()}}),r.$on("onOrderCompleted",function(e,o){if(r.allOrders){for(var a=0;a<r.allOrders.length;a++)r.allOrders[a]._id==o&&(r.allOrders[a].status=t.orderStatusmanager.COMPLETED);r.$apply()}}),r.shift=JSON.parse(localStorage.getItem("ShiftUser")),r.getOrders=function(){return l.get("/api/get/orders","").then(function(e){for(var t=0;t<e.data.length;t++)e.data[t].orderStatus=!0;r.allOrders=e.data},h())},r.getOrders(),r.startOrder=function(e){console.log(e),console.log("order data"),e.orderStatus=!1;var o={clientId:e.clientId,invoiceId:e.invoiceId._id,orderId:e._id},a=angular.copy(e);a.status=t.orderStatusmanager.STARTED,O.startOrder(a).then(function(a){if(console.log(a),a.data.error)for(var l=0;l<r.allOrders.length;l++)r.allOrders[l]._id==e._id&&(r.allOrders[l].status=t.orderStatusmanager.PLACED,f.showAlert("error","Failed","Inventory Doesn't have ingredient to make product..."));else e.status=t.orderStatusmanager.STARTED,f.showAlert("error","Failed","Product has been start..."),t.socket.emit("orderStarted",o)},function(o){for(var a=0;a<r.allOrders.length;a++)r.allOrders[a]._id==e._id&&(r.allOrders[a].status=t.orderStatusmanager.PLACED,f.showAlert("error","Failed","Product unavailable..."))})},r.completeOrder=function(r,e){r.status=t.orderStatusmanager.COMPLETED;var o=r;O.updateOrderStatus(o).then(function(e){f.showAlert("error","Failed","Order successfully done..."),console.log(e),t.socket.emit("orderCompleted",r._id)},function(r){f.showAlert("error","Failed","Product unavailable...")})},r.ConvertTo2DArray=function(r,e){for(var t=[],o=0,a=0;a<r.length;a+=e){for(var l=[],n=0;n<e&&!(o>=r.length);n++)l.push(r[o]),o++;t.push(l)}return t}}angular.module("ordersMonitor").controller("ordersMonitorController",r),r.$inject=["$scope","$state","$rootScope","$location","toaster","$http","SessionService","localStorageService","$uibModal","employeeprofileService","PATHS","PermissionService","getEmployee","alertservice","ordersMonitorServiceFun","$timeout"]}();
(function() {
    'use strict';

    angular
        .module('ordersMonitor')
        .controller('ordersMonitorController', Controller);

    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'ordersMonitorServiceFun', '$timeout'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, ordersMonitorServiceFun, $timeout) {

        function handleError(err) {

        }

        $scope.$on('onShiftClosed', function (eve, sokectObj) {
            console.log(sokectObj);
            $("#shiftCloseModal").modal('show');
            //alert("Shift has been closed by manager, All orders will be archived automcatically");
            for (var i = 0; i < $scope.allOrders.length; i++) {
                $scope.allOrders[i].status = $rootScope.orderStatusmanager.ARCHIVED;
            }
            //$scope.$apply();
            setTimeout(function () {
                window.location = '/employee';
            }, 5000);
        });

        $scope.$on('onOrderPlaced', function (eve, orderDetail) {
            // access opt.a, opt.b
            //alert("capturing  event now");
            console.log("getting event");
            console.log(orderDetail);
            orderDetail.orderStatus = true
            if ($scope.allOrders)
                $scope.allOrders.push(orderDetail);
            else {
                $scope.allOrders = [];
                $scope.allOrders.push(orderDetail);
            }
            $scope.$apply();
        });

        $scope.$on('onOrderStarted', function (eve, orderDetails) {
            var order = orderDetails.orderId;
            if ($scope.allOrders) {
                var orderId = order.orderId;
                for (var i = 0; i < $scope.allOrders.length; i++) {
                    if ($scope.allOrders[i]._id == orderId) {
                        $scope.allOrders[i].status = $rootScope.orderStatusmanager.STARTED;
                        //alertservice.showAlert('error', "Failed", "Inventory Doesn't have ingredient to make product...");
                    }
                }
                $scope.$apply();
            }
        });

        $scope.$on('onOrderCompleted', function (eve, orderId) {
            if ($scope.allOrders) {
                for (var i = 0; i < $scope.allOrders.length; i++) {
                    if ($scope.allOrders[i]._id == orderId) {
                        $scope.allOrders[i].status = $rootScope.orderStatusmanager.COMPLETED;
                        //alertservice.showAlert('error', "Failed", "Inventory Doesn't have ingredient to make product...");
                    }
                }
                $scope.$apply();
            }
        });

        $scope.shift = JSON.parse(localStorage.getItem('ShiftUser'));
        $scope.getOrders = function () {
            //ordersMonitorServiceFn.GetOrders().then(function (res) {
            //    console.log(res);
            //    debugger;
            //    $scope.allOrders = res;

            //}, failPayload)

            return $http.get('/api/get/orders', '').then(function (res) {


                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].orderStatus = true;
                }

                $scope.allOrders = res.data;
                //$scope.allOrders = $scope.ConvertTo2DArray(res.data,4);
            }, handleError('Error getting all users'));

        }
        $scope.getOrders();

        $scope.startOrder = function (data) {
            console.log(data);
            console.log("order data");
            data.orderStatus = false;
            var socketObj = {
                clientId: data.clientId,
                invoiceId: data.invoiceId._id,
                orderId: data._id
            }
            //data.status = $rootScope.orderStatusmanager.STARTED;
            var obj = angular.copy(data)
            obj.status = $rootScope.orderStatusmanager.STARTED;
            ordersMonitorServiceFun.startOrder(obj).then(function (response) {
                console.log(response);
                if (response.data.error) {
                    for (var i = 0; i < $scope.allOrders.length; i++) {
                        if ($scope.allOrders[i]._id == data._id) {
                            $scope.allOrders[i].status = $rootScope.orderStatusmanager.PLACED;
                            alertservice.showAlert('error', "Failed", "Inventory Doesn't have ingredient to make product...");
                        }

                    }
                } else {
                    data.status = $rootScope.orderStatusmanager.STARTED;
                    alertservice.showAlert('error', "Failed", "Product has been start...");
                    $rootScope.socket.emit('orderStarted', socketObj);
                }

            }, function (err) {
                for (var i = 0; i < $scope.allOrders.length; i++) {
                    if ($scope.allOrders[i]._id == data._id) {
                        $scope.allOrders[i].status = $rootScope.orderStatusmanager.PLACED;
                        alertservice.showAlert('error', "Failed", "Product unavailable...");
                    }

                }

            });
        }

        $scope.completeOrder = function (data, index) {


            data.status = $rootScope.orderStatusmanager.COMPLETED;
            var obj = data
           // $scope.shift.orders.push(data._id)
            ordersMonitorServiceFun.updateOrderStatus(obj).then(function (response) {

                alertservice.showAlert('error', "Failed", "Order successfully done...");
                console.log(response);
                //ordersMonitorServiceFun.addInvoinAndOrderInShift($scope.shift).then(function (response) {
                //    console.log(response);
                //    localStorage.setItem('ShiftUser', JSON.stringify($scope.shift));

                //}, function (err) {
                //    onsole.log(err);
                //});
                $rootScope.socket.emit('orderCompleted', data._id);

            }, function (err) {
                alertservice.showAlert('error', "Failed", "Product unavailable...");
            });
            //var el = document.getElementById("div"+index);
            //$timeout(function () {
            //    data.orderStatus = false;
            //    el.style.opacity = +el.style.opacity + 0.1;
            //}, 2000);

        }

        $scope.ConvertTo2DArray=function(data, colcount)
        {
            var productList = [];
            var counter = 0;
            for (var i = 0; i < data.length; i = i + colcount)
            {
                var row = []; for (var j = 0; j < colcount; j++)
                {
                    if (counter >= data.length)
                    break; row.push(data[counter]); counter++;
                }
                productList.push(row);
            } return productList;
        }
}
})();

!function(){"use strict";function e(e,o,s,d){function p(e){"usersess"==e._id&&(e.usermoment.employee?emit(e.usermoment.employee):emit(e.name))}function l(e){"employee"==e._id&&(e.emplyoeedata?emit(e.emplyoeedata):emit(e.name))}var f=o("lanapp",{adapter:"idb"}),g={};return g.CurrentEmployee=function(){return navigator.onLine?e.get("/api/v1/employeedetails").then(u,a("Error getting all users")):f.query(p).then(function(e){return e.rows[0].key}).catch(function(e){console.log(e)})},g.updateUser=function(t){return navigator.onLine?e.post("/api/v1/currentemployeeUpdate",t).then(i,a("Error getting all users")):(t.flag=1,f.query(l,{include_docs:!0}).then(function(e){var n=[];n=t._id,e.rows[0].key.filter(function(e){return n.indexOf(e._id)>-1});for(var r,o=0,i=e.rows[0].key.length;o<i;o++)e.rows[0].key[o]._id==t._id&&(r=o,f.get("employee").then(function(e){delete e.emplyoeedata[r],e.emplyoeedata[r]=t;var n={edit:t._id,data:t,syncstatus:0};if(s.get("_meanLanAppSync")){var o=s.get("_meanLanAppSync");"1"in o?(delete o[1],o[1]={employeeprofile:n}):o[1]={employeeprofile:n},console.log("New struct"),console.log(o),s.set("_meanLanAppSync",o)}return f.put({_id:"employee",_rev:e._rev,emplyoeedata:e.emplyoeedata})}))}).catch(function(e){console.log(e)}))},g.AddCategory=function(e){e&&f.put(e).then(function(e){return e}).catch(function(e){return e})},g.GetInvoice=t,g.GetOrders=n,g.EditInvoice=r,g.startOrder=function(t){return e.post("/api/v1/updateOrder",t).then(function(e){return e},function(e){return e})},g.updateOrderStatus=function(t){return e.post("/api/v1/updateOrderStatus",t).then(function(e){return e},function(e){return e})},g.addInvoinAndOrderInShift=c,g}function t(){return $http.get("/api/get/invoice","").then(o,a("Error getting all users"))}function n(){return $http.get("/api/get/orders","").then(function(e){return e.data},a("Error getting all users"))}function r(e){return $http.post("/api/v1/updateinvoice",e).then(function(e){return e.data},a("Error getting all users"))}function o(e){return e.data}function i(e){return e.data}function u(e){return e.data.data[0]}function a(e){return function(){return{success:!1,message:e}}}function c(e){return $http.post("/api/v1/insertInvoiceAndOrderInShift",e).then(function(e){return e.data},a("Error getting all users"))}angular.module("ordersMonitor").factory("ordersMonitorService.js",e).service("ordersMonitorServiceFun",e),e.$inject=["$http","pouchDB","localStorageService","$rootScope"]}();
(function () {
    'use strict';

    angular
        .module('ordersMonitor')
        .factory('ordersMonitorService.js', ordersMonitorServiceFn)
        .service('ordersMonitorServiceFun', ordersMonitorServiceFn);

    ordersMonitorServiceFn.$inject = ['$http', 'pouchDB', 'localStorageService', '$rootScope'];
    /* @ngInject */
    function ordersMonitorServiceFn($http, pouchDB, localStorageService, $rootScope) {
        var db =  pouchDB('lanapp', {adapter : 'idb'});
        var service = {};
        service.CurrentEmployee   = CurrentEmployee;
        service.updateUser = CurrentEmployeeUpdate;
        service.AddCategory = AddCategory;
        service.GetInvoice = GetInvoice;
        service.GetOrders = GetOrders;
        service.EditInvoice = EditInvoice;
        service.startOrder = startOrder;
        service.updateOrderStatus = updateOrderStatus;
        service.addInvoinAndOrderInShift = addInvoinAndOrderInShift;
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

        function CurrentEmployee() {
           
            if(navigator.onLine){
                return $http.get('/api/v1/employeedetails').then(handleSuccessLocally, handleError('Error getting all users'));
            }
            else{
            
                return  db.query(myMapFunction).then(function (result) {
                      return result.rows[0].key
                }).catch(function (err) {
                     console.log(err)
                });
            }

        }

        function CurrentEmployeeUpdate(data) {
           
            if(navigator.onLine){
                return $http.post('/api/v1/currentemployeeUpdate',data).then(handleSuccess, handleError('Error getting all users'));
            }
            else{
              
              data.flag = 1;
              return db.query(getMapByID,{include_docs : true}).then(function (result) {
                        //console.log(result.rows[0].key)
                        var empIds = []
                        empIds = data._id
                        var indexed ; 
                        
                        var filteredArray = result.rows[0].key.filter(function(itm){
                          return empIds.indexOf(itm._id) > -1;
                        });

                        //console.log(filteredArray)
                       
                       
                       for(var i = 0, len = result.rows[0].key.length; i < len; i++) {
                           
                             if(result.rows[0].key[i]._id == data._id){
                                indexed =  i;

                                db.get('employee').then(function(doc) {
                                  var newdata = doc
                                  
                                   delete doc.emplyoeedata[indexed];
                                   doc.emplyoeedata[indexed] =  data

                                   var syncData = {
                                    edit :  data._id,
                                    data : data,
                                    syncstatus: 0
                                   }
                                   

                                    if(localStorageService.get('_meanLanAppSync')){
                                      // put employee data on 1st array node
                                        //localStorageService.set('_meanLanAppSync',{employeeprofile : syncData});//
                                       var arr = localStorageService.get('_meanLanAppSync');
                                      // arr.push(localStorageService.get('_meanLanAppSync'));
                                      if("1" in arr){
                                        delete arr[1];
                                        arr[1] = {employeeprofile : syncData}
                                      }
                                       else{
                                         arr[1] = {employeeprofile : syncData}
                                       }
                                       console.log("New struct")
                                       console.log(arr)
                                       localStorageService.set('_meanLanAppSync',arr)
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
       
        function AddCategory(data) {
            if (false) {
                return $http.post('/api/v1/Category', data).then(InvoiceSuccess, handleError('Error getting all users'));
            }
            else {
                if (data) {
                    db.put(data).then(function (response) {
                        return response
                    }).catch(function (error) {
                        return error
                    });
                }
            }
        }


        function startOrder(data) {
            if (true) {
                return $http.post('/api/v1/updateOrder', data).then(function (res) {
                
                    return res;
                
                }, function(error){
                
                    return error;
                });
            }
            else {
                if (data) {
                    db.put(data).then(function (response) {
                        return response
                    }).catch(function (error) {
                        return error
                    });
                }
            }
        }
        function updateOrderStatus(data) {
            if (true) {
                return $http.post('/api/v1/updateOrderStatus', data).then(function (res) {

                    return res;

                }, function (error) {

                    return error;
                });
            }
            else {
                if (data) {
                    db.put(data).then(function (response) {
                        return response
                    }).catch(function (error) {
                        return error
                    });
                }
            }
        }
        function GetCategory(id) {
            if (false) {
                return $http.get('/api/get/Category', id).then(InvoiceSuccess, handleError('Error getting all users'));
            }
            else {
                return db.get(id);
                   
                }
            }
        }

        function GetInvoice() {
            return $http.get('/api/get/invoice', '').then(getInvoiceSuccess, handleError('Error getting all users'));

        }

        
        function GetOrders() {
            return $http.get('/api/get/orders', '').then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

        }


        function GetTables() {
            return $http.get('/api/get/tables', '').then(function (res) {
              
                return res.data;

            }, handleError('Error getting all users'));

        }

        function EditInvoice(data) {
            return $http.post('/api/v1/updateinvoice', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));

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
        function addInvoinAndOrderInShift(data) {
            return $http.post('/api/v1/insertInvoiceAndOrderInShift', data).then(function (res) {

                return res.data;

            }, handleError('Error getting all users'));
        }

})();