(function() {
    'use strict';

    angular
        .module('inventoryManager')
        .controller('inventoryManagerController', Controller);

    Controller.$inject = ['$scope', '$state', '$rootScope', '$location', 'toaster', '$http', 'SessionService', 'localStorageService', '$uibModal', 'employeeprofileService', 'PATHS', 'PermissionService', 'getEmployee', 'alertservice', 'serviceFun','utilservice','$q'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope, $location, toaster, $http, SessionService, localStorageService, $uibModal, employeeprofileService, PATHS, PermissionService, getEmployee, alertservice, serviceFun, utilservice, $q) {


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
                    restaurant: getEmployee.restaurant,
                    status: true, //Added to pass restaurant id
                    isactive: 1,
                    
                    editedMod: false,
                    editedMod1: false
                }

                serviceFun.AddCategory(obj).then(function (res) {
                    $scope.categoryName = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add Category");
                    console.log(res);
                    $scope.allCategory = $scope.allCategory || [];
                    $scope.allCategory.push(res);                    
                    // $scope.getCategories();
                    $scope.getProductdetail($scope.allCategory.length - 1, 0);

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
                        quantity: $scope.addSlideIngredient[sCounter].quantity,
                        ingradientClientId: $scope.addSlideIngredient[sCounter].ingradientClientId,
                    })
                }

                var obj = {
                    Name: $scope.slideName,
                    Ingradients: indToStore, // $scope.addSlideIngredient,
                    created_by: getEmployee.firstname,
                    updated_by: getEmployee.firstname,
                    isactive:1,
                    clientId: utilservice.generateGUID(),
                    restaurant: getEmployee.restaurant //Added to pass restaurant id
                }



                serviceFun.AddSide(obj).then(function (res) {

                    console.log(res);
                    if ($scope.allSidesName.indexOf(res.Name) > 0) {

                    } else {
                        $scope.allSidesName.push(res.Name);
                    }
                    $scope.allSides.push(res);
                    $scope.slideName = '';

                    $scope.addIngredientTitle = {
                        Name: "Select Ingedient",
                        UnitType: ''
                    };
                    $scope.addIngredientQuantity = 0; // Added scope due to an error in console
                    $scope.addSlideIngredient = [];
                    alertservice.showAlert('error', "Failed", "Successfully disable Side");
                   // $scope.getSides();
                }, failPayload)

            }
            else {

                alertservice.showAlert('error', "Failed", 'Field can not be null...');
            }


        }
        $scope.createProduct = function () {

            $scope.Product.clientId= utilservice.generateGUID();
            $scope.Product.restaurant = getEmployee.restaurant; //Added to pass restaurant id
            $scope.Product.Category = _.find($scope.allSubCategory, function (num) { return num.clientId == $scope.Product.Category });// _.find($scope.allCategory, { clientId: $scope.Product.Category });
            $scope.Product.ParentCategory = _.find($scope.allCategory, function (num) { return num.clientId == $scope.Product.ParentCategory });
            $scope.Product.ParentCategoryClientId = $scope.Product.ParentCategory.clientId;// _.find($scope.allCategory, function (num) { return num.clientId == $scope.Product.ParentCategory });
            serviceFun.AddProduct($scope.Product).then(function (res) {

                console.log(res);
                if (!res.error) {
                    $scope.allProduct = $scope.allProduct || [];
                     //$scope.getProduct();
                    $scope.allProduct.push(angular.copy($scope.Product));
                    for (var i = 0; i < $scope.allCategory.length; i++) {
                        if($scope.allCategory[i].clientId==res.ParentCategoryClientId)
                            $scope.getProductdetail(i, i)
                    }
                   
                    $scope.flushdata();
                    alertservice.showAlert('error', "Failed", "Successfully Add Product");

                } else {
                    alertservice.showAlert('error', "Failed", "Product is not add due to some unknow error..");
                }

            }, failPayload)






        }

        $scope.updateProductToDB = function () {
            if ($scope.selectCategory.Name != "" && $scope.selectCategory != null && $scope.Product.Price != '' &&
                $scope.selectSubCategory != null && $scope.selectSubCategory.Name != "Not Available") {
                $scope.Product.ParentCategory = $scope.selectCategory.clientId;
                $scope.Product.Category = $scope.selectSubCategory.clientId;
                $scope.Product.Ingradients = $scope.addSlideIngredient;
                $scope.Product.Sides = $scope.addProductSlide;
                $scope.Product.variations = $scope.addProductVariation;
                var counter = -1;
                var pdtInd = _.find($scope.allCategory, function (num) { counter++; if (num.clientId == $scope.selectCategory.clientId) return counter });

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
                        $scope.getProduct();
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
                    Edits: [],
                    isactive:1,
                    created_by: 'User',
                    updated_by: 'User',
                    clientId: utilservice.generateGUID(),
                    restaurant:getEmployee.restaurant //Added to pass restaurant id
                };
                serviceFun.AddIngedient(obj).then(function (res) {
                    console.log(res);
                    //for (var i = 0; i < $scope.allIngedients.length; i++) {
                        if ($scope.allIngedientsName.indexOf(res.Name) > 0) {

                        } else {
                            $scope.allIngedientsName.push(res.Name);
                        }
                    //}
                    $scope.allIngedients.push(res);
                    $scope.ingredientName = '';
                    $scope.costPrunit = '';
                    $scope.unitType = '';
                    $scope.amount = '';
                    $scope.merma = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add Ingedient");
                    //$scope.getIngedients();
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

        $scope.CategotyManager = function () {

        }
        $scope.getCategories = function () {
            return $q((resolve, reject) => {
                serviceFun.GetCategory().then(function (res) {

                    $scope.allSubCategory = [];
                    $scope.allCategory = [];

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

                    var temp;
                    for (var i = 0; i < $scope.allCategory.length; i++) {
                        temp = 0;
                        $scope.allCategory[i].status = true;
                        for (var j = 0; j < $scope.allProduct.length; j++) {
                            if ($scope.allProduct[j].Category && $scope.allProduct[j].Category.ParentCategory == $scope.allCategory[i].clientId) {
                                $scope.allCategory[i].image = $scope.allProduct[j].image;
                                if(temp==0)
                                    $scope.allCategory[i].headerimg = $scope.allProduct[j].image
                                   temp++
                            }
                        }
                    }

                   

                    resolve({ issuccess: true });

                }, failPayload)
            });

        }

        $scope.setImage = function () {
            var temp;
            for (var i = 0; i < $scope.allCategory.length; i++) {
                temp = 0;
                for (var j = 0; j < $scope.allProduct.length; j++) {
                    if ($scope.allProduct[j].ParentCategory && $scope.allProduct[j].ParentCategory.clientId == $scope.allCategory[i].clientId) {
                        $scope.allCategory[i].image = $scope.allProduct[j].image;
                        if (temp == 0)
                            $scope.allCategory[i].headerimg = $scope.allProduct[j].image
                            temp++
                    }
                }
            }
        }
        $scope.getProduct = function () {
            $scope.getCategories().then(function (rsps) {
                serviceFun.GetProducts().then(function (res) {
                    console.log(res);
                    $scope.allProduct = res;
                    //$scope.setImage();
                    //$scope.getCategories();
                    if ($scope.allCategory.length > 0)
                        $scope.getProductdetail(0, 0);
                }, failPayload)
            });
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
                    quantity: $scope.addIngredientQuantity,
                    ingradientClientId: $scope.addIngredientTitle.clientId
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
                    quantity: $scope.addIngredientQuantity,
                    ingradientClientId: $scope.addIngredientTitle.clientId
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
            $scope.validationIngredient = true;


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
                    $scope.validationIngredient = false;
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
                        $scope.allCategory[i].Name = $scope.categoryName1.Name; //Added for updating category name

                    }
                }
                alertservice.showAlert('error', "Failed", "Successfully Update Category");
                // $scope.getCategories();
            }, function (error) {
            }, failPayload)

        }
        $scope.updateIngredient = function () {
            if (angular.isNumber($scope.editedQuantity)) {
                $('#ingEdit').modal('hide');
                $scope.editQuantity();
                //if ($scope.ischangePrice) {
                //    var date = new Date();
                //    var qnt = ($scope.editedQuantity == undefined) ? '0' : $scope.editedQuantity;
                //    $scope.editIngredient.message = "added " + qnt + " " + $scope.shortForm($scope.editIngredient.UnitType) + " " + moment(date).format("MMMM Do YYYY, h:mm:ss a") + " and " + $scope.editIngredient.Cost;
    
                //}
                if ($scope.validationIngredient) {
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
            } else {
                alertservice.showAlert('error', "Failed", "Quantity is required");
            }
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

                if ($scope.allSubCategory[count].ParentCategory && ($scope.allSubCategory[count].ParentCategory.clientId == $scope.selectCategory.clientId || $scope.allSubCategory[count].ParentCategory == $scope.selectCategory.clientId))
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
            // $scope.$apply();
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

            if ($scope.Product.type == '') {
                $scope.Product.type = "Product";
                $scope.addProductType = true;
            }
                 
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
                            name: $scope.addSlideIngredient[sCounter].name.clientId,
                            ingradientClientId: $scope.addSlideIngredient[sCounter].ingradientClientId
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
        // if ($scope.allCategory.length > 0)
        //     $scope.getProductdetail($scope.allCategory[0], 0);
        $scope.getProductdetail = function (pindex, ref) {

            var data = $scope.allCategory[pindex];
            //if(data.editedMod === true) return;

            for (var count = 0; count < $scope.allCategory.length; count++) {
                $scope.allCategory[count].editedMod = false;
                $scope.allCategory[count].editedMod1 = false;
                if (count == pindex) {
                    $scope.editedCategotyData = $scope.allCategory[count];
                    $scope.allCategory[count].editedMod = true;
                }
            }

            //data.editedMod = true;
            $scope.categoryName1 = data;
            $scope.showProduct = [];
            $scope.copy_categoryName1 = angular.copy($scope.categoryName1);
            //$("#cat" + ref).parent('.product-category').toggleClass("active");

            console.log('category data', data);

            $scope.showSubCategory = [];

            var checkAvailability = false;
            var i = -1;
            $scope.showSubCategory = _.filter($scope.allSubCategory, function (num) {
                return (num.ParentCategory && (num.ParentCategory.clientId == data.clientId || num.ParentCategory == data.clientId));
            });

            $scope.showProduct = _.filter($scope.allProduct, function (num) {
                if (num.ParentCategory) {
                    return num.ParentCategory.clientId == data.clientId;
                }
            });

            for (var count = 0; count < $scope.showSubCategory.length; count++) {

                $scope.showSubCategory[count].bgcolor = ' btn-success new-cat1';
            }
            if ($scope.showSubCategory && $scope.showSubCategory.length > 0)
                $scope.showSubCategory[0].bgcolor = 'new-cat2';

            $scope.setImage();
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

            for (var count = 0; count < $scope.allCategory.length; count++) {
                if ($scope.allCategory[count].clientId == data.ParentCategory.clientId) {
                    $scope.allCategory[count].editedMod = false;
                }
            }


            $scope.showProduct = _.filter($scope.allProduct, function (num) { if (num.Category) { return num.Category.clientId == data.clientId; } });

        }

        $scope.editCat = function (val) {
            if (val == 1) {

                for (var i = 0; i < $scope.allCategory.length; i++) {
                    if ($scope.allCategory[i].clientId == $scope.copy_categoryName1.clientId) {
                        $scope.allCategory[i] = $scope.copy_categoryName1;
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

        $scope.deleteCateory = function (cate, catType) {
            var data = _.filter($scope.allProduct, function (num) {
              if(!num.ParentCategory) return false;
              if (catType == 's')
                return num.ParentCategory.clientId == cate.clientId || num.Category.clientId == cate.clientId;
              else
                return num.ParentCategory.clientId == cate.clientId;
            });
            var subides = [];
            if (data.length == 0) {
                for (var i = 0; i < $scope.allSubCategory.length; i++) {
                    if ($scope.allSubCategory[i].ParentCategory.clientId == cate.clientId) {
                        //subides[i] = [$scope.allSubCategory[i].clientId]
                        subides.push($scope.allSubCategory[i].clientId)
                    }
                }
                serviceFun.DeleteCategory(cate, subides).then(function (res) {
                    for (var i = 0; i < $scope.allCategory.length; i++) {
                        if ($scope.allCategory[i].clientId == cate.clientId) {
                            $scope.allCategory.splice(i,1);

                        }
                    }
                    for (var i = 0; i < $scope.allSubCategory.length; i++) {
                        if ($scope.allSubCategory[i].clientId == cate.clientId) {
                            $scope.allSubCategory.splice(i, 1);

                        }
                    }
                    alertservice.showAlert('error', "Failed", "Successfully Delete Category");
                    $scope.getProductdetail(0, 1);
                }, function (error) {

                }, failPayload)
            } else {
                alertservice.showAlert('error', "Failed", "Cannot delete due to product assigned");
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
            debugger;
            if ($scope.subcategoryName != undefined && $scope.subcategoryName != '') {
                $('#subcategAdd').modal('hide');
                console.log($scope.subcategoryName);
                var cat = $scope.parentCate;
                if (cat && $scope.editedCategotyData)
                    cat =$scope.editedCategotyData;
                var obj = {
                    Name: $scope.subcategoryName,
                    created_by: getEmployee.firstname,
                    updated_by: getEmployee.firstname,
                    ParentCategory: cat.clientId,
                    clientId: utilservice.generateGUID(),
                    ParentClientId:cat.clientId,
                    restaurant: getEmployee.restaurant, //Added to pass restaurant id
                    status: true, //Added to pass restaurant id
                    isactive: 1,
                    editedMod: false,
                    editedMod1: false
                }

                serviceFun.AddCategory(obj).then(function (res) {
                    $scope.subcategoryName = '';
                    alertservice.showAlert('error', "Failed", "Successfully Add SubCategory");
                    console.log(res);
                    // for (var i = 0; i < $scope.allCategory.length;i++)
                    
                    res.ParentCategory = $scope.editedCategotyData || $scope.parentCate
                    $scope.allSubCategory.push(res);
                    res.bgcolor = ' btn-success new-cat1';

                    //$scope.showSubCategory = $scope.showSubCategory || [];
                    //$scope.showSubCategory.push(res);
                    // $scope.getCategories();

                    //get the catefoty index - Vishal
                    for (var i = 0; i < $scope.allCategory.length; i++) {
                        if($scope.allCategory[i].clientId == res.ParentClientId)
                            $scope.getProductdetail(i, i);
                    }
                   

                }, failPayload)
            }
            else {
                alertservice.showAlert('error', "Failed", 'Name can not be null...')

            }

        }
    }

})();
