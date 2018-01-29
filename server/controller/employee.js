/**
  * @author Akhil Gopan - akhil.gopan@techversantinfotech.com
  * @desc Employee Operation for the application
**/

var common = require('../helpers/common.js');
var keys = common.constants.keys()
var response = { status  : null, success : null, data : null }; // status provide conditions of api request, success states the resultant status of api(boolean), data return data from api
var sess = {}; // common session constant
const helpers = common.helpers;
const messages = common.constants.messages();

module.exports = function (app) {

    //Models Required
    var Employee = common.mongoose.model('Employee');
    var Logged = common.mongoose.model('LoggedInUser');

    app.post('/api/v1/employeeLogin', function (req, res, next) {
        var PIN = req.body.minifpin.pin
        var ID = req.body.minifpin.restaurantid

        Employee.findOne({ pin: PIN, active: 1, restaurant: ID }, function (err, user) {
            if (err)
                return res.json(helpers.response(401, false, null, err))
            if (user) {
                req.session.employee = user
                return res.json(helpers.response(200, true, user, messages.loginsuccessful))
            }
            else {
                return res.json(helpers.response(400, false, null, messages.nouser))
            }
        })
    })

    app.post('/clientapp/api/v1/employeeLogin', function (req, res, next) {
        var PIN = req.body.minifpin.pin
        var ID = req.body.minifpin.restaurantid

        Employee.findOne({ pin: PIN, active: 1, restaurant: ID }, function (err, user) {
            if (err)
                return res.json(helpers.response(401, false, null, err))
            if (user) {


                Logged.findOne({ userid: ID }, function (err, sess) {
                    if (sess) {
                        sess.employee = user;
                        sess.save();
                        return res.json(helpers.response(200, true, user, messages.loginsuccessful))
                    }
                    else
                        return res.json(helpers.response(400, false, null, messages.nouser))
                });



                //return res.json(helpers.response(200, true, user, messages.loginsuccessful))


            }
            else {
                return res.json(helpers.response(400, false, null, messages.nouser))
            }
        })
    })

    /*
    app.get('/api/forum',helpers.authenticateEmployee(), function (req, res, next) {
    
    })*/


    app.get('/api/v1/authenticateemployee', function (req, res, next) {
        var sess = req.session
        console.log("sess authenticateemployee")
        console.log(sess)
        if (typeof sess.employee != "undefined") {
            var emp = sess.employee;
            res.json(helpers.response(200, true, emp, 0))
        }
        else {
            res.json(helpers.response(400, false, null, 0))
        }

    })

    app.get('/clientapp/api/v1/authenticateemployee', function (req, res, next) {
        //var sess = req.session
        //console.log("sess authenticateemployee")
        //console.log(sess)
        //if (typeof sess.employee != "undefined") {
        //    var emp = sess.employee;
        //    res.json(helpers.response(200, true, emp, 0))
        //}
        //else {
        //    res.json(helpers.response(400, false, null, 0))
        //}
        res.json(helpers.response(200, true, {}, 0))
    })

    app.post('/api/v1/terminateempsession', function (req, res) {
        req.session.employee = {}
        var sess;
        sess = req.session;
        delete req.session.employee;
        console.log(req.session)
        return res.json(helpers.response(200, true, sess, messages.loggedout))
    });

    app.post('/clientapp/api/v1/terminateempsession/:instanceid', function (req, res) {
        Logged.findById(req.params.instanceid, function (err, sessions) {
            var toReturn = {
                logOutSuccess: true
            };
            try {
                //delete sessions["employee"];
                delete sessions.employee;
                sessions.save();
                return res.json(helpers.response(200, true, toReturn, messages.loggedout))
            } catch (err) {
                return res.json(helpers.response(200, true, toReturn, messages.loggedout))
            }
        });
        //return res.json(helpers.response(200, true, sess, messages.loggedout))
    });

    app.get('/api/get/employee', function (req, res) {
        var sess = req.session;

        if (sess.role) {
            Employee.find({ active: 1, restaurant: req.session.userid }, { firstname: 1, lastname: 1, email: 1, role: 1, phone: 1, pin: 1, position: 1, dateofbirth: 1 }, function (err, users) {
                if (err) { console.log(err); res.json(0); }
                return res.json(helpers.response(200, true, users, 0))
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })

    app.get('/clientapp/api/get/employee/:userid', function (req, res) {
        //var sess = req.session;

        // if (sess.role) {
        Employee.find({ active: 1, restaurant: req.params.userid }, { firstname: 1, lastname: 1, email: 1, role: 1, phone: 1, pin: 1, position: 1, dateofbirth: 1 }, function (err, users) {
            if (err) {
                 console.log(err); 
                 
               return  res.json(0); 
                }
            return res.json(helpers.response(200, true, users, 0))
        });
        //}
        //else {
        //  return res.json(helpers.response(401, false, 0, messages.unauthorized))
        //}
    });


    app.get('/api/v1/employeedetails', helpers.authenticateEmployee(), function (req, res) {
        var sess = req.session;

        if (sess.role) {
            Employee.find({ _id: req.session.employee._id }, function (err, users) {
                if (err) { console.log(err); res.json(0); }
                return res.json(helpers.response(200, true, users, 0))
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })

    app.get('/clientapp/api/v1/employeedetails/:eid', function (req, res) {
        Employee.find({ _id: req.params.eid }, function (err, users) {
            if (err) { console.log(err); res.json(0); }
            return res.json(helpers.response(200, true, users, 0))
        });
    })

    app.post('/api/v1/currentemployeeUpdate', helpers.authenticateEmployee(), function (req, res) {
        var sess = req.session;
        var dumpdata = req.body
        if (sess.role) {
            Employee.find({ _id: req.session.employee._id }, function (err, users) {
                if (err) {
                    socket.emit('emplyeeprofilereponse:online', helpers.response(403, false, 0, err));
                }
                else {
                    var updated_user = users[0];

                    updated_user.firstname = dumpdata.firstname
                    updated_user.lastname = dumpdata.lastname
                    updated_user.dateofbirth = dumpdata.dateofbirth
                    updated_user.phone = dumpdata.phone
                    updated_user.pin = dumpdata.pin
                    updated_user.email = dumpdata.email
                    updated_user.position = dumpdata.position
                    updated_user.save(function (err, employee) {
                        if (err) {
                            console.log(err);

                            return res.json(helpers.response(403, false, 0, messages.updatefailed))
                        }

                        return res.json(helpers.response(200, true, 1, messages.updateSuccess))
                    })


                }
            });
        }
        else {
            return res.json(helpers.response(401, false, 0, messages.unauthorized))
        }
    })


    app.post('/clientapp/api/v1/currentemployeeUpdate', function (req, res) {
        var dumpdata = req.body
        console.log("employee update");
        console.log(dumpdata);
        Employee.find({ _id: dumpdata._id }, function (err, users) {
            if (err) {
                socket.emit('emplyeeprofilereponse:online', helpers.response(403, false, 0, err));
            }
            else {
                var updated_user = users[0];

                updated_user.firstname = dumpdata.firstname
                updated_user.lastname = dumpdata.lastname
                updated_user.dateofbirth = dumpdata.dateofbirth
                updated_user.phone = dumpdata.phone
                updated_user.pin = dumpdata.pin
                updated_user.email = dumpdata.email
                updated_user.position = dumpdata.position
                updated_user.save(function (err, employee) {
                    if (err) {
                        console.log(err);

                        return res.json(helpers.response(403, false, 0, messages.updatefailed))
                    }

                    return res.json(helpers.response(200, true, 1, messages.updateSuccess))
                })


            }
        });

    })

} // employee module ENDS
