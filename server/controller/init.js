/**
  * @author Akhil Gopan - akhil.gopan@techversantinfotech.com
  * @desc Authenticated Users Operation for the application
  * @model - User.js
**/

var common = require('../helpers/common.js');
var keys = common.constants.keys()
var response = { status  : null, success : null, data : null }; // status provide conditions of api request, success states the resultant status of api(boolean), data return data from api
var sess = {}; // common session constant
sess.user = null // set session constant user(int *usually id*) is set to null
const helpers = common.helpers;
const messages = common.constants.messages();

module.exports = function (app) {

    //Models Required
    var User = common.mongoose.model('User');
    var Logged = common.mongoose.model('LoggedInUser');
    var Room = common.mongoose.model('Room');


    app.post('/api/login', function (req, res, next) {

        if(!req.body.email || !req.body.password || !req.body.token ){
            return res.status(400).json(helpers.response(400,false,0,messages.noSufficientData))
        }
        else{

            var username = req.body.email
            var password = req.body.password
            var token = req.body.token

            User.findOne({ email: username,active : 1 }, 
            function (err, user) {
                if (err) {
                    console.log("Login Error");
                    console.log(err);
                    return res.status(400).json(helpers.response(400,false,0,err))
                };
                if(!user){
                    return res.json(helpers.response(401,false,null,messages.nouser))
                }
                else{
                    if(user.salt && user.password){
                        var salt = user.salt
                        var hash = common.crypto.pbkdf2Sync(password, salt, 1000, 64,'sha512').toString('hex');
                        var requesteduser = user.token;

                        Logged.findOne({ usertoken: requesteduser }, function (err, loggeduser) {

                            if(loggeduser){
                                return res.json(helpers.response(403,false,0,messages.anotherinstancerunning))
                            }
                            else{
                                if(hash === user.password){
                                    if(token === user.token){
                                        var LoggedUserNew = new Logged()
                                        sess = req.session;
                                        sess.userid = user._id;
                                        sess.name = user.firstname;
                                        sess.username = user.username;
                                        sess.usertoken = user.token;
                                        sess.email = user.email;
                                        var tokenval = common.jwt.sign({email:user.email,_id:user._id}, keys.sessionkey);
                                        sess.token = tokenval;
                                        sess.role = user.role;
                                        sess.image=user.image

                                        LoggedUserNew.userid = user._id;
                                        LoggedUserNew.usertoken = user.token;
                                        LoggedUserNew.generatedtoken = tokenval;

                                        LoggedUserNew.username = user.username;
                                        LoggedUserNew.usertoken = user.token;
                                        LoggedUserNew.token = user.token;
                                        LoggedUserNew.role = user.role;
                                        LoggedUserNew.name = user.firstname;
                                        LoggedUserNew.email = user.email;
                                          LoggedUserNew.image = user.image;

                                        LoggedUserNew.save(function(err,sessionsave){
                                            sess.instanceid = sessionsave._id
                                            return res.json(helpers.response(200,true,sess,messages.loginsuccessful))
                                        })
                                    }
                                    else{
                                        return res.json(helpers.response(401,false,null,messages.invalidtoken))
                                    }
                                }
                                else{
                                    return res.json(helpers.response(401,false,null,messages.invalidcredentials))
                                }
                            }

                        })


                    }
                    else{
                        return res.json(helpers.response(401,false,null,messages.invalidcredentials))

                    }
                }

            });
        }


    });

    app.get('/auth/get_session', function (req, res) {

        var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

        sess = req.session;
        if (sess.userid != null) {

            res.json(sess);
        }
        else{

            res.json(0);
        }

    });


    app.get('/api/v1/getuserbyid/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                return res.json(helpers.response(400, false, 0, messages.actionnotcompleted))
            } else {
                return res.json(helpers.response(200, true, user, messages.done));
            }
        });
    });



    app.get('/clientapp/auth/get_session/:instanceid', function (req, res) {
    
        var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
        //   sess = req.session;
        //   if (sess.userid != null) {
    
        //       res.json(sess);
        //   }
        //   else{
    
        //        res.json(0);
        //   }
        Logged.findById(req.params.instanceid, function (err, sess) {
            if(sess)
                res.json(sess);
            else
                res.json(0);
        });


    
    });


    app.get('/auth/getUserData', function (req, res) {
        console.log("Session data retrived")
        sess = req.session;
        if (sess.userid != null) {
            res.json(helpers.response(200,true,sess,0))
        }
        else{
            res.json(helpers.response(400,false,null,0))
        }

    });

    app.get('/api/get/restaurantdata', function (req, res) {

        var username = req.session.email

        User.findOne({ email: username, active: 1 }, function (err, user) {


            sess = req.session;
            //added a check for checking ther user when session resolve 
            if (user) {
                sess.restaData = user.restauranteObj;
                if (sess.userid != null) {
                    res.json(helpers.response(200, true, sess, 0))
                }
                else {
                    res.json(helpers.response(400, false, null, 0))
                }
            } else {
                res.json(helpers.response(400, false, null, 0))
            }
        });
    });

    app.get('/clientapp/api/get/restaurantdata/:instanceid', function (req, res) {

        Logged.findById(req.params.instanceid, function (err, sess) {
            if (sess) {
                User.findOne({ email: sess.email, active: 1 }, function (err, user) {
                    //added a check for checking ther user when session resolve 
                    if (user) {
                        sess.restdata = user.restauranteObj;
                        sess.save();
                        sess.restaData = user.restauranteObj;
                        res.json(helpers.response(200, true, sess, 0))
                    }
                    else {
                        res.json(helpers.response(400, false, null, 0))
                    }
                });
                //res.json(sess);
            }
            else
                res.json(0);
        });


    });


app.post('/api/logout', function (req, res) {


      var sess;
      sess = req.session;
      var instance      = sess.instanceid
      req.session.destroy(function () {
          sess              = req.session;
          Logged.remove({_id:instance}, function(err, sessions){
             var response = { status  : 202, success : true, data :  sess};
             return res.json(helpers.response(401,false,sess,messages.loggedout))
          });


      });
});


app.post('/clientapp/api/logout/:instanceid', function (req, res) {


 
    Logged.findById(req.params.instanceid, function (err, sessions) {
        sessions.remove();
        var response = { status: 202, success: true, data: sess };
        return res.json(helpers.response(401, false, sess, messages.loggedout))
    });


});

app.post('/clear/allsession/:token', function (req, res) {

      var instance      = req.params.token
      Logged.remove({'usertoken':{'$in':instance}}, function(err, sessions){
         var response = { status  : 202, success : true, data :  sess};
         return res.json(helpers.response(401,false,sess,messages.clearloggedsessions))
      });
});

app.post('/api/room/getrooms', function (req, res) {
    if (req.body.id) {
        Room.find({ restaurant: req.body.id })
       .populate('tableNum')
       .exec(function (err, result) {
           if (err) {
               console.log(err);
               res.json(0);
           }
           else {
               console.log(result);
               res.json(result);
           }
       });
    } else {
        res.json([]);
    }
})


} // user module ENDS
