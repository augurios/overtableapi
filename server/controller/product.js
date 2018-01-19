/**
  * @author Akhil Gopan - akhil.gopan@techversantinfotech.com
  * @desc Employee Operation for the application
**/

var common = require('../helpers/common.js');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var mongoose = require('mongoose');

var keys = common.constants.keys()
var response = { status: null, success: null, data: null }; // status provide conditions of api request, success states the resultant status of api(boolean), data return data from api
var sess = {}; // common session constant
const helpers = common.helpers;
const messages = common.constants.messages();
var Ingredients = common.mongoose.model('Ingredients');
var Sides = common.mongoose.model('Sides');
var Category = common.mongoose.model('Category');
var Product = common.mongoose.model('Product');
var Production = common.mongoose.model('Production');
var Invoice = common.mongoose.model('Invoice');
var Order = common.mongoose.model('Order');
var Shift = common.mongoose.model('Shift');
    

function additem(postdata) {
    return new Promise(function (resolve, reject) {
        var cond = {};
        if (postdata.length && postdata[0].restaurant) {
            cond = { restaurant: postdata[0].restaurant }
        }
        Category.find(cond).populate('ParentCategory')
          .exec()
          .then(function (results, err) {
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  var founded = false;
                  var category = new Category(postdata[postcat]);
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          category = results[catc];
                          category.Name = postdata[postcat].Name;
                          founded = true
                      }
                  }

                  category.save(function (err, result) {
                      if (err) { reject(err) }
                      else { console.log(result); }
                  });
              }
              resolve();
          });
    })
}

function removeItem() {
    return new Promise(function (resolve, reject) {
        var cond = {};
        if (postdata.length && postdata[0].restaurant) {
            cond = { restaurant: req.body[0].restaurant }
        }
        Category.find(cond).populate('ParentCategory')
          .exec()
          .then(function (results, err) {
              for (var catc = 0; catc < results.length; catc++) {
                  var founded = false;
                  var category = new Category(results[catc]);
                  for (var postcat = 0; postcat < postdata.length; postcat++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          category = results[catc];
                          category.Name = postdata[postcat].Name;
                          founded = true
                      }
                      if (!postdata[postcat]._id) {
                          var newCat = new Category(postdata[postcat]);
                          newCat.save();
                      }
                  }
                  if (!founded) {
                      category.remove(category, function (err, result) {
                          if (err) { reject(err) }
                          else { console.log(result); }
                      });
                  } else {
                      category.save(category, function (err, result) {
                          if (err) { reject(err) }
                          else { console.log(result); }
                      });
                  }
              }
              resolve();
          });
    })
}

module.exports = function (app) {

    var _ = require('underscore');

    //Models Required
    app.post('/api/v1/invoice', function (req, res) {
        var invoice = new Invoice(req.body);

        if (invoice) {
            invoice.save(invoice, function (err, result) {
                console.log(result);
                return res.json(result)
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })
    app.post('/api/v1/Category', function (req, res) {
        var category = new Category(req.body);

        if (category) {
            category.save(category, function (err, result) {
                if (err) {
                    return res.json(err)
                }
                else {
                    console.log(result);
                    return res.json(result)
                }
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })
    app.post('/api/v1/Sides', function (req, res) {
        var sides = new Sides(req.body);

        if (sides) {
            sides.save(sides, function (err, result) {
                if (err) {
                    return res.json(err)
                }
                else {
                    console.log(result);
                    return res.json(result)
                }
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })
    app.post('/api/v1/addProduct', function (req, res) {
        var product = new Product(req.body);

        if (product) {
            product.save(product, function (err, result) {
                if (err) {
                    return res.json(err)
                }
                else {
                    console.log(result);
                    return res.json(result)
                }
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })
    app.post('/api/v1/Ingredients', function (req, res) {
        var ingredients = new Ingredients(req.body);
        if (ingredients) {
            ingredients.save(ingredients, function (err, result) {
                if (err) {
                    return res.json(err)
                }
                else {
                    console.log(result);
                    return res.json(result)
                }
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })
    app.post('/api/get/Ingredients', function (req, res) {
        Ingredients.find({ restaurant: req.body.id }, function (err, result) {
            if (err) {
                console.log(err);
                res.json(0);
            }
            return res.json(result);
        });
    })
    app.post('/api/get/Category', function (req, res) {
        Category.find({ restaurant: req.body.id }).populate('ParentCategory')
       .exec(function (err, result) {
           if (err) {
               console.log(err);
               res.json(0);
           }
           return res.json(result);
       })

    })
    app.post('/api/get/Sides', function (req, res) {

        Sides.find({ restaurant: req.body.id })
.populate('Ingradients.name')
.exec(function (err, result) {
    if (err) {
        console.log(err);
        res.json(0);
    }
    return res.json(result);
})

    })
    app.post('/api/get/Production', function (req, res) {

        Production.find({ restaurant: req.body.id })
.populate('Ingradients.name')
.exec(function (err, result) {
    if (err) {
        console.log(err);
        res.json(0);
    }
    return res.json(result);
})

    })
    app.post('/api/get/Product', function (req, res) {

        Product.find({ restaurant: req.body.id })
      .populate('Ingradients.name')
      .populate('Sides')
      .populate('Category')
      .populate('ParentCategory')
      .exec(function (err, result) {
          if (err) {
              console.log(err);
              res.json(0);
          }
          return res.json(result);
      })

    })
    app.post('/api/v1/deleteCatecory', function (req, res) {

        Category.findByIdAndRemove(req.body._id, function (err, result) {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            Category.deleteMany({ ParentCategory: req.body._id }, function (err, result) {

                res.send({ message: "Catecory successfully deleted" });
            })

        });

    })
    app.post('/api/v1/updateProduct', function (req, res) {

        Product.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
            if (err) {
                console.log('error')
                return res.json({ message: 'error' })
            }
            else {
                console.log('success')
                return res.json({ message: 'Update Successfully' })
            }
        });
    });
    app.post('/api/v1/updateCategory', function (req, res) {

        Category.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
            if (err) {
                console.log('error')
                return res.json({ message: 'error' })
            }
            else {
                console.log('success')
                return res.json({ message: 'Update Successfully' })
            }
        });
    });
    app.post('/api/v1/updaIngredients', function (req, res) {

        Ingredients.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
            if (err) {
                console.log('error')
                return res.json({ message: 'error' })
            }
            else {
                console.log('success')
                return res.json({ message: 'Update Successfully' })
            }
        });
    });
    app.post('/api/v1/updateSides', function (req, res) {

        Sides.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
            if (err) {
                console.log('error')
                return res.json({ message: 'error' })
            }
            else {
                console.log('success')
                return res.json({ message: 'Update Successfully' })
            }
        });
    })
    app.post('/api/v1/disableIngredients', function (req, res) {

        Ingredients.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
            if (err) {
                console.log('error')
                return res.json({ message: 'error' })
            }
            else {
                console.log('success')
                return res.json({ message: 'Disable Successfully' })
            }
        });

    })
    app.post('/api/v1/updateinvoice', function (req, res) {

        Invoice.findById(req.body._id, function (err, result) {
            if (!result)
                return next(new Error('Could not load Document'));
            else {
                // do your updates here
                result.clientName = req.body.clientName;
                result.save(function (err) {
                    if (err) {
                        console.log('error')
                        return res.json({ message: 'error' })
                    }
                    else {
                        console.log('success')
                        return res.json({ message: 'Update Successfully' })
                    }
                });
            }
        });


    })
    app.post('/api/v1/updatetable', function (req, res) {

        Invoice.findById(req.body._id, function (err, result) {
            if (!result)
                return next(new Error('Could not load Document'));
            else {
                // do your updates here
                result.tables = req.body.tables;
                result.save(function (err) {
                    if (err) {
                        console.log('error')
                        return res.json({ message: 'error' })
                    }
                    else {
                        console.log('success')
                        return res.json({ message: 'Update Successfully' })
                    }
                });
            }
        });


    })
    app.post('/api/v1/waiter', function (req, res) {

        Invoice.findById(req.body._id, function (err, result) {
            if (!result)
                return next(new Error('Could not load Document'));
            else {
                // do your updates here
                result.servedby = req.body.servedby;
                result.save(function (err) {
                    if (err) {
                        console.log('error')
                        return res.json({ message: 'error' })
                    }
                    else {
                        console.log('success')
                        return res.json({ message: 'Update Successfully' })
                    }
                });
            }
        });
        //    Invoice.update({ _id: req.body._id }, { servedby: req.body.servedby },
        //    { multi: true },
        //   function (err, numberAffected) {

        //       if (err) {
        //                           console.log('error')
        //                           return res.json({ message: 'error' })
        //                       }
        //                       else {
        //                           console.log('success')
        //                           return res.json({ message: 'Update Successfully' })
        //                       }
        //   });

    })
    app.get('/api/get/invoice', function (req, res) {

        Invoice.find({})
       .populate('tables')
       .populate('servedby')
       .exec(function (err, result) {
           if (err) {
               console.log(err);
               res.json(0);
           }
           return res.json(result);
       })

        //Invoice.find({}, function (err, result) {
        //    if (err) {
        //        console.log(err);
        //        res.json(0);
        //    }
        //         return res.json(result);
        //    });

    })
    app.get('/api/get/employee', function (req, res) {
        Employee.find({ active: 1, restaurant: req.body.restaurant }, function (err, result) {
            if (err) {
                console.log(err);
                res.json(0);
            }
            return res.json(result);
        });
    })

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + "-" + file.originalname);
        }
    });
    var upload = multer({ storage: storage });//.single('file');

    app.post('/api/v1/uploadImage', upload.single('avatar'), function (req, res) {
        console.log(req);
        upload(req, res, function (err) {
            console.log(err);
            if (err) {
                return res.end("upload error");
            }
            res.end("File is succesful");
        });
    });

    //sync servies

    app.post('/api/sync/category', function (req, res) {
        var postdata = req.body;
        //restaurant: req.body.id
        //additem(postdata).then(function () {
        //    var cond = {};
        //    var counter = 0;
        //    if (postdata.length && postdata[0].restaurant) {
        //        cond = { restaurant: req.body[0].restaurant }
        //    }
        Category.find({}).populate('ParentCategory')
          .exec(function (err, results) {

              function getParentCatByClientId(id, results) {
                  var p = null;
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == id) {
                          p = results[catc];
                      }
                  }
                  if (p && p._id)
                      return p._id;
              }
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  var founded = false;
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          var category = new Category(results[catc]);
                          category = results[catc];
                          if (postdata[postcat].ParentCategory) {
                              var id = postdata[postcat].ParentCategory._id || postdata[postcat].ParentCategory;
                              var pid = getParentCatByClientId(id, results);
                              if (pid)
                                  category.ParentCategory = mongoose.Types.ObjectId(pid);
                          }
                          category.Name = postdata[postcat].Name;
                          founded = true
                          category.save(category, function (err, result) {
                              if (err) { console.log(err) }
                              else {
                                  console.log(result);
                              }
                          });
                      }
                  }
                  console.log("id " + postdata[postcat].clientId + "and state is " + founded.toString() + " and counter" + postcat);
                  if (!founded) {
                      var category = new Category(postdata[postcat]);
                      if (postdata[postcat].ParentCategory) {
                          var id = postdata[postcat].ParentCategory._id || postdata[postcat].ParentCategory;
                          var pid = getParentCatByClientId(id, results);
                          if (pid)
                              category.ParentCategory = mongoose.Types.ObjectId(pid);
                      }
                      category.save(category, function (err, result) {
                          if (err) { console.log(err) }
                          else {
                              console.log(result);
                          }
                      });
                  }
              }
              res.json({ MSG: "Sync success" });
          });
    });

    app.post('/api/sync/deletcategory', function (req, res) {
        var catid = req.body.id;
        console.log("cat id to remove " + catid);
        Category.remove({ clientId: catid }, function (err, result) {
            console.log("err details");
            console.log(err);
            res.json(result);
        });
    });

    app.post('/api/sync/deletcategoryold', function (req, res) {
        var ids = req.body.id;
        Category.find({ clientId: ids})
          .exec(function (err, results) {
              //  for (var cnt = 0; cnt < ids.length; cnt++) {
              for (var j = 0 ; j < ids.length; j++) {
                  for (var catc = 0; catc < results.length; catc++) {

                      if (results[catc].clientId == ids[j]) {
                          var category = new Category(results[catc]);
                          category.remove(category, function (err, result) {
                              if (err) {
                                  console.log(err)
                              }
                              else {
                                  console.log(result);
                              }
                          });
                      }
                  }
              }
              //   }
              res.json({ MSG: "DELETED SUCESS" });
          });
    });

    app.post('/api/sync/ingredients', function (req, res) {
        var counter = 0;
        Ingredients.find({})
       .exec(function (err, results) {
           var postdata = req.body;
           for (var postcat = 0; postcat < postdata.length; postcat++) {
               var founded = null;
               var category = new Ingredients(postdata[postcat]);
               category.Edits = [];
               for (var catc = 0; catc < results.length; catc++) {
                   if (results[catc].clientId == postdata[postcat].clientId) {
                       category = results[catc];
                       category.Cost = postdata[postcat].Cost;
                       category.Edits = postdata[postcat].Edits;
                       category.Merma = postdata[postcat].Merma;
                       category.Name = postdata[postcat].Name;
                       category.Quantity = postdata[postcat].Quantity;
                       category.UnitType = postdata[postcat].UnitType;
                       category.message = postdata[postcat].message;
                       category.isactive = postdata[postcat].isactive;
                   }
               }
               category.save(category, function (err, result) {
                   counter += 1;
                   if (err) { res.json(err) }
                   else {
                       console.log(result);
                       if (counter == postdata.length) {
                           res.json(result);
                       }
                   }
               });
           }
       });
    });

    

    app.post('/api/sync/production', function (req, res) {
        var counter = 0;
        Ingredients.find({})
       .exec(function (err, ingref) {
           Production.find({}).populate('Ingradients.name')
          .exec(function (err, results) {

              //function replaceIngName(Ingradients, ref) {
              //    for (var i = 0; i < Ingradients.length; i++) {
              //        for (var j = 0; j < ref.length; j++) {
              //            if (Ingradients[i].name == ref[j].clientId)
              //                Ingradients[i].name = ref[j]._id;

              //        }
              //    }
              //    return Ingradients;
              //}

              var postdata = req.body;
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  var founded = null;
                  if (postdata[postcat].Ingradients && postdata[postcat].Ingradients.length > 0) {
                      postdata[postcat].Ingradients = postdata[postcat].Ingradients.map(function (oneposting) {
                          var ingobj = _.find(ingref, function (oneing) {
                              var compared = oneing.clientId == oneposting.ingradientClientId;
                              //console.log(oneing.clientId);
                              //console.log(oneposting.ingradientClientId);
                              //console.log("compared value is " + compared);
                              return compared;
                          });
                          //console.log(ingobj);
                          return {
                              quantity: oneposting.quantity,
                              name: ingobj._id,
                              ingradientClientId: oneposting.ingradientClientId,
                          };
                      });
                  }
                  var category = new Production(postdata[postcat]);
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          category = results[catc];
                          category.Name = postdata[postcat].Name;
                          category.Ingradients = postdata[postcat].Ingradients;
                          category.isactive = postdata[postcat].isactive;
                          category.Productionamount = postdata[postcat].Productionamount;
                          category.ProductionUnit = postdata[postcat].ProductionUnit;
                          category.AvailableQuantity = postdata[postcat].AvailableQuantity;
                          category.message = postdata[postcat].message || "";
                      }
                  }
                  category.save(category, function (err, result) {
                      counter += 1;
                      if (err) {
                          if (counter == postdata.length)
                              return res.json(err);
                      }
                      else {
                          console.log(result);
                          if (counter == postdata.length) {
                              return res.json(result);
                          }
                      }
                  });
              }

              //console.log(postdata);
              //console.log("postdata with production");
              //return res.send("Done");
          });
       });
    });


    app.post('/api/sync/sides', function (req, res) {
        var counter = 0;
        Ingredients.find({})
       .exec(function (err, ingref) {
           Sides.find({}).populate('Ingradients.name')
          .exec(function (err, results) {

              function replaceIngName(Ingradients, ref) {
                  for (var i = 0; i < Ingradients.length; i++) {
                      for (var j = 0; j < ref.length; j++) {
                          if (Ingradients[i].name == ref[j].clientId)
                              Ingradients[i].name = ref[j]._id;
                              
                      }
                  }
                  return Ingradients;
              }

              var postdata = req.body;
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  var founded = null;
                  var category = new Sides(postdata[postcat]);
                  category.Ingradients = replaceIngName(postdata[postcat].Ingradients, ingref);
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          category = results[catc];
                          category.Name = postdata[postcat].Name;
                          category.Ingradients = replaceIngName(postdata[postcat].Ingradients, ingref);
                          category.isactive = postdata[postcat].isactive;
                      }
                  }
                  category.save(category, function (err, result) {
                      counter += 1;
                      if (err) { res.json(err) }
                      else {
                          console.log(result);
                          if (counter == postdata.length) {
                              return res.json(result);
                          }
                      }
                  });
              }
          });
       });
    });

    app.post('/api/sync/product', function (req, res) {
        var counter = 0;
        Category.find({})
        .exec(function (err, catref) {
            Ingredients.find({})
           .exec(function (err, ingref) {
               Sides.find({}).populate('Ingradients.name')
              .exec(function (err, sideref) {
                  Production.find({})
             .exec(function (err, productionref) {

                 Product.find({})
          .populate('Ingradients.name')
          .populate('Sides')
          .populate('Category')
          .populate('ParentCategory')
          .exec(function (err, results) {

              function getCat(id, ref) {
                  var cat = null;
                  for (var j = 0; j < ref.length; j++) {
                      if (typeof id === 'object') {
                          if (id != null) {
                              id = id.clientId;
                          }
                      }
                      if (id == ref[j].clientId)
                          cat = ref[j];
                  }
                  return cat;
              }
              function replaceIngName(Ingradients, ref) {
                  for (var i = 0; i < Ingradients.length; i++) {
                      for (var j = 0; j < ref.length; j++) {
                          if (Ingradients[i].name == ref[j].clientId)
                              Ingradients[i].name = ref[j]._id;
                      }
                  }
                  return Ingradients;
              }
              function replaceSidesName(Sides, ref) {
                  for (var i = 0; i < Sides.length; i++) {
                      for (var j = 0; j < ref.length; j++) {
                          if (Sides[i] == ref[j].clientId)
                              Sides[i] = ref[j]._id;
                      }
                  }
                  return Sides;
              }

              function replaceProductionName(Productions, ref) {
                  if(Productions){
                  for (var i = 0; i < Productions.length; i++) {
                      for (var j = 0; j < ref.length; j++) {
                          if (Productions[i].ProductionClientId == ref[j].clientId)
                              Productions[i].name = ref[j]._id;
                      }
                  }
                  }
                  return Productions;
              }

              var postdata = req.body;
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  var founded = null;
                  var category = new Product(postdata[postcat]);
                  category.Ingradients = replaceIngName(postdata[postcat].Ingradients, ingref);
                  category.Sides = replaceSidesName(postdata[postcat].Sides, sideref);
                  category.Category = getCat(postdata[postcat].Category, catref);
                  category.ParentCategory = getCat(postdata[postcat].ParentCategory, catref);
                  category.Production = replaceProductionName(postdata[postcat].Production, productionref);
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          category = results[catc];
                          category.Category = getCat(postdata[postcat].Category, catref);
                          category.ParentCategory = getCat(postdata[postcat].ParentCategory, catref);
                          //category.Category = postdata[postcat].Category;
                          category.Edits = postdata[postcat].Edits;
                          category.Ingradients = replaceIngName(postdata[postcat].Ingradients, ingref);
                          category.Name = postdata[postcat].Name;
                          category.Production = replaceProductionName(postdata[postcat].Production, productionref);
                          //category.ParentCategory = postdata[postcat].ParentCategory;
                          category.Price = postdata[postcat].Price;
                          category.Quantity = postdata[postcat].Quantity;
                          //category.Sides = postdata[postcat].Sides;
                          category.Sides = replaceSidesName(postdata[postcat].Sides, sideref);
                          category.image = postdata[postcat].image;
                          category.variations = postdata[postcat].variations;
                          category.OrderGroup = postdata[postcat].OrderGroup;
                      }
                  }
                  category.save(category, function (err, result) {
                      counter += 1;
                      if (err) { 
                          if (counter == postdata.length) {
                             return res.json(err);
                          }else{
                              console.log(err);
                          }
                         }
                      else {
                          console.log(result);
                          if (counter == postdata.length) {
                              return res.json(result);
                          }
                      }
                  });
              }

          });
             });
              });
           });
        });

    });

    app.post('/api/sync/productInventory', function (req, res) {
        Product.find({})
          .exec(function (err, results) {
              var postdata = req.body;
              for (var postcat = 0; postcat < postdata.length; postcat++) {
                  for (var catc = 0; catc < results.length; catc++) {
                      if (results[catc].clientId == postdata[postcat].clientId) {
                          var category = results[catc];
                          category.Quantity = postdata[postcat].Quantity;
                          category.save(category, function (err, result) {
                              if (err) { res.json(err) }
                              else { console.log(result); }
                          });
                      }
                  }
              }
          });
    });

    app.post('/api/sync/ingredientsInventory', function (req, res) {
        Ingredients.find({})
              .exec(function (err, results) {
                  var postdata = req.body;
                  for (var postcat = 0; postcat < postdata.length; postcat++) {
                      for (var catc = 0; catc < results.length; catc++) {
                          if (results[catc].clientId == postdata[postcat].clientId) {
                              var category = results[catc];
                              category.Quantity = postdata[postcat].Quantity;
                              category.save(category, function (err, result) {
                                  if (err) { res.json(err) }
                                  else { console.log(result); }
                              });
                          }
                      }

                  }
              });
    });

    function updateSingleInvoice(invoice, islast, cb) {
        if (invoice.orders)
            delete invoice.orders;

        if (invoice.tables._id == '-1') {
            delete invoice.tables;
        }
        var localinvoice = new Invoice(invoice);
        Invoice.find({ clientId: localinvoice.clientId }, function (err, invoices) {
            var invoiceupdate = localinvoice;
            if (invoices && invoices.length > 0) {
                result = invoices[0];
                result.clientName = invoice.clientName;
                result.servedby = invoice.servedby;
                result.people = invoice.people;
                result.tables = invoice.tables ;
                result.invoiceStatus = invoice.invoiceStatus;
                result.iscash = invoice.iscash;
             result.discount = invoice.discount;

                invoiceupdate = result;
            }

            invoiceupdate.save(invoiceupdate, function (err) {
                if (err) {
                    console.log('error')
                    console.log({ message: 'error' })
                }
                else {
                    console.log('success')
                    console.log({ message: 'Update Successfully' })
                }

                cb(islast);

            });


        });
    }

    function addInvoices(TBMData) {
        return new Promise(function (resolve, reject) {
            if (TBMData.INVOICES.length > 0) {
                for (var cnt = 0; cnt < TBMData.INVOICES.length; cnt++) {
                    var islast = TBMData.INVOICES.length - 1 == cnt;
                    updateSingleInvoice(TBMData.INVOICES[cnt], islast, function (islastrecord) {
                        if (islastrecord)
                            resolve("Uploaded");
                    });
                }
            } else
                resolve("Uploaded");
        });
    }

    function mapSingleInvoice(localinvoice, islast, cb) {
        Invoice.find({ clientId: localinvoice.clientId }, function (err, invoices) {
            if (invoices && invoices.length > 0) {
                var invoiceupdate = invoices[0];
                Order.find({ invoiceId: invoiceupdate.id }, function (err, orders) {
                    if (orders && orders.length > 0) {
                        invoiceupdate.orders = [];
                        for (var cnt = 0; cnt < orders.length; cnt++) {
                            var orderExist = _.find(invoiceupdate.orders, function (oned) {
                                return oned.toString() == orders[cnt].id.toString();
                            });
                            if (!orderExist)
                                invoiceupdate.orders.push(orders[cnt]);
                        }
                        invoiceupdate.save(invoiceupdate, function (err) {
                            if (err) {
                                console.log('error')
                                console.log({ message: 'error' })
                            }
                            else {
                                console.log('success')
                                console.log({ message: 'Update Successfully' })
                            }
                            cb(islast);
                        });
                    } else {
                        cb(islast);
                    }
                });
            }
            else {
                cb(islast);
            }
        });
    }

    function mapInvoices(TBMData) {
        return new Promise(function (resolve, reject) {
            if (TBMData.INVOICES.length > 0) {
                for (var cnt = 0; cnt < TBMData.INVOICES.length; cnt++) {
                    var islast = TBMData.INVOICES.length - 1 == cnt;
                    mapSingleInvoice(TBMData.INVOICES[cnt], islast, function (islastrecord) {
                        if (islastrecord)
                            resolve("Uploaded");
                    });
                }
            } else
                resolve("Uploaded");
        });
    }

    function getProductById(clientID) {
        return new Promise(function (resolve, reject) {
            Product.find({ clientId: clientID }, function (err, result) {
                if (err) {
                    resolve({ isExist: false });
                } else {
                    if (result && result.length > 0) {
                        resolve({ isExist: true, product: result[0] });
                    } else {
                        resolve({ isExist: false });
                    }
                }
            });
        });
    }

    function updateSingleOrder(order, islast, cb) {

        var con = {}
        if (isNONMONGIID(order.invoiceId))
            con = { clientId: order.invoiceId };
        else
            con = { _id: mongoose.Types.ObjectId(order.invoiceId) };

        Invoice.find(con, function (err, invcs) {
            if (!invcs) {
                console.log({ message: 'error' });
                cb(islast);
            }
            else {
                var invc = invcs[0];
                var localorder = new Order(order);
                if (invc && invc.id)
                    localorder.invoiceId = invc.id.toString();


                getProductById(localorder.productClientId).then(function (productFromDB) {
                    if (productFromDB.isExist) {
                        localorder.product = productFromDB.product._id;
                    } else {
                        localorder.product = null;
                    }
                    Order.find({ clientId: localorder.clientId }, function (err, orders) {
                        var orderupdate = localorder;
                        if (orders && orders.length > 0) {
                            result = orders[0];
                            result.quantity = localorder.quantity;
                            result.status = localorder.status;
                            orderupdate = result;
                        }
                        try {
                            orderupdate.invoiceId = invc.id.toString();
                            orderupdate.save(orderupdate, function (err, resultorder) {
                                if (err) {
                                    console.log('error')
                                    console.log({ message: 'error' });
                                    cb(islast);
                                }
                                else {
                                    console.log('success')
                                    console.log({ message: 'Update Successfully' })
                                    invc.invoiceStatus = "STARTED";
                                    var orderExist = _.find(invc.orders, function (oned) {
                                        return oned.toString() == resultorder.id.toString();
                                    });
                                    if (!orderExist)
                                        invc.orders.push(resultorder.id);
                                    invc.save(function (err) {
                                        if (err) {
                                            console.log('error')
                                            console.log({ message: 'error' })
                                        }
                                        else {
                                            console.log('success')
                                            console.log({ resultorder })
                                        }
                                        cb(islast);
                                    });
                                }

                            });
                        } catch (err) {
                            console.log("invoice not found ofr this order");
                            cb(islast);
                        }
                    });
                });

            }
        });
    }

    function addOrders(TBMData) {
        return new Promise(function (resolve, reject) {
            if (TBMData.ORDERS.length > 0) {
                for (var cnt = 0; cnt < TBMData.ORDERS.length; cnt++) {
                    var islast = TBMData.ORDERS.length - 1 == cnt;
                    updateSingleOrder(TBMData.ORDERS[cnt], islast, function (islastrecord) {
                        if (islastrecord)
                            resolve("Uploaded");
                    });
                }
            } else
                resolve("Uploaded");
        });
    }

    function addAllShift(TBMData) {
        return new Promise(function (resolve, reject) {
            if (TBMData.ALLSHIFT.length > 0) {
                for (var cnt = 0; cnt < TBMData.ALLSHIFT.length; cnt++) {
                    var islast = TBMData.ALLSHIFT.length - 1 == cnt;
                    addShift(TBMData.ALLSHIFT[cnt], islast, function (islastrecord) {
                        if (islastrecord)
                            resolve("Uploaded");
                    });
                }
            } else
                resolve("Uploaded");
        });
    }

    function isNONMONGIID(id) {
        try {
            if (id.indexOf("CUSTOM-GENERETED-ID-") >= 0)
                return true;
            else
                return false;
        } catch (err) {
            return true;
        }
    }

    function getInvoiceIds(ids) {
        var idToReturns = [];
        return new Promise(function (resolve, reject) {
            Invoice.find({ clientId: { $in: ids } }, function (err, invoices) {
                invoices = invoices || [];
                for (var cnt = 0; cnt < ids.length; cnt++) {
                    if (isNONMONGIID(ids[cnt])) {
                        var inv = _.find(invoices, function (oneinv) {
                            return oneinv.clientId == ids[cnt]
                        });
                        if (inv)
                            idToReturns.push(inv._id);
                    } else
                        idToReturns.push(mongoose.Types.ObjectId(ids[cnt]));
                }
                resolve(idToReturns);
            });
        });
    }

    function getOrderIds(ids) {
        var idToReturns = [];
        return new Promise(function (resolve, reject) {
            Order.find({ clientId: { $in: ids } }, function (err, invoices) {
                invoices = invoices || [];
                for (var cnt = 0; cnt < ids.length; cnt++) {
                    if (isNONMONGIID(ids[cnt])) {
                        var inv = _.find(invoices, function (oneinv) {
                            return oneinv.clientId == ids[cnt]
                        });
                        if (inv)
                            idToReturns.push(inv._id);
                    } else
                        idToReturns.push(mongoose.Types.ObjectId(ids[cnt]));
                }
                resolve(idToReturns);
            });
        });
    }

    function endSHift(RID) {
        console.log("ending shift for " + RID);

        Invoice.update({ "restaurant": mongoose.Types.ObjectId(RID) },
            { $set: { invoiceStatus: "ARCHIVED" } }, { multi: true }).exec()
          .then(function (result, err) {
              if (err)
                  console.log({ message: 'error' });
              else {
                  console.log('invoice updated');
                  Order.update({ "restaurantId": mongoose.Types.ObjectId(RID) },
                      { $set: { status: "ARCHIVED" } }, { multi: true }).exec()
                    .then(function (result, err) {
                        if (err)
                            console.log('Could not load Document');
                        else {
                            console.log('orders updated');
                            console.log({ message: 'Update Successfully' });
                        }
                    });
              }
          });
    }

    function addShift(SHIFT, islast, cb) {
        return new Promise(function (resolve, reject) {
            if (SHIFT) {
                var localshift = new Shift(SHIFT);
                var ivids = SHIFT.invoices || [];
                var odids = SHIFT.orders || [];
                getInvoiceIds(ivids).then(function (invlists) {
                    getOrderIds(odids).then(function (ordlists) {
                        Shift.find({ clientId: localshift.clientId }, function (err, shifts) {
                            var isendshift = false;
                            var shiftupdate = localshift;
                            if (shifts && shifts.length > 0) {
                                var shift = shifts[0];
                                //shift.invoices = localshift.invoices;
                                //shift.orders = localshift.orders;
                                if (localshift.endtime) {
                                    shift.endtime = localshift.endtime;
                                    isendshift = true;
                                    endSHift(localshift.restaurant.toString())
                                }
                                shift.openingBalance = shiftupdate.openingBalance
                                shift.closingBalance = shiftupdate.closingBalance
                                shift.edits = shiftupdate.edits || [];
                                shiftupdate = shift;
                            }
                            shiftupdate.invoices = invlists;
                            shiftupdate.orders = ordlists;
                            shiftupdate.save(shiftupdate, function (err, result) {
                                console.log(result);
                                console.log("ending shift");
                                //endSHift(localshift.id.toString());
                            });

                            if (cb)
                                cb(islast);
                            else
                                resolve("Uploaded");

                        });
                    });
                });
            } else
                resolve("Uploaded");
        });
    }

    function removeSingleOrder(order, islast, cb) {
        console.log(order);
        Order.findOne({ clientId: order.clientId }).exec(function (err, orderModel) {
            var orderdId = orderModel.id;
            Invoice.findById(orderModel.invoiceId.toString(), function (err, invc) {
                if (!invc) {
                    console.log({ message: 'error' })
                    cb(islast);
                }
                else {
                    for (var odCounter = 0; odCounter < invc.orders.length; odCounter++) {
                        if (invc.orders[odCounter] == orderdId) {
                            invc.orders.splice(odCounter, 1);
                        }
                    }
                    invc.save(function (err) {
                        if (err) {
                            console.log('error')
                            console.log({ message: 'error' })
                            cb(islast);
                        }
                        else {
                            Order.findByIdAndRemove(orderdId, function (err, result) {
                                console.log({ message: 'Update Successfully' })
                                cb(islast);
                            });
                        }
                    });
                }
            });
        });
    }

    function removeOrders(TBMData) {
        return new Promise(function (resolve, reject) {
            if (TBMData.ORDERTODELETE.length > 0) {
                for (var cnt = 0; cnt < TBMData.ORDERTODELETE.length; cnt++) {
                    var islast = TBMData.ORDERTODELETE.length -1 == cnt;
                    removeSingleOrder(TBMData.ORDERTODELETE[cnt], islast, function (islastrecord) {
                        if (islastrecord)
                            resolve("Uploaded");
                    });
                }
            } else
                resolve("Uploaded");
        });
    }

    app.post('/api/sync/billsModule', function (req, res) {
        console.log(updateSingleInvoice)
        console.log(req.body);
        var TBMData = req.body;
        removeOrders(TBMData).then(function () {
            addInvoices(TBMData).then(function () {
                addOrders(TBMData).then(function () {
                    mapInvoices(TBMData).then(function () {
                        addShift(TBMData.SHIFT).then(function () {
                            addAllShift(TBMData).then(function () {
                                return res.json({ MSG: "Sync successfully" });
                            }).catch(function (err) {
                                return res.json({ MSG: "Sync successfully" });
                            });
                        }).catch(function (err) {
                            return res.json({ MSG: "Sync successfully" });
                        });
                    }).catch(function (err) {
                        return res.json({ MSG: "Sync successfully" });
                    });
                }).catch(function (err) {
                    return res.json({ MSG: "Sync successfully" });
                });
            }).catch(function (err) {
                return res.json({ MSG: "Sync successfully" });
            }).catch(function (err) {
                return res.json({ MSG: "Sync successfully" });
            });
        })
    });

}// employee module ENDS



