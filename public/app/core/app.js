(function () {
    'use strict';

    angular
           .module('mainServerapp',
               ['application.core',
               'application.config',
               'application.routes',
               'welcomeEmployee', 'login', 'dashboard', 'employeeprofile', 'cashierBills', 'inventoryManager', 'ordersMonitor', 'cashierHall', 'localSettings'
               ]
           )
           .run(['$q', '$http', '$stateParams', '$state', '$rootScope', '$location', '$urlRouter', '$route', '$window', '$compile', 'localStorageService', 'pathservice', 'REGEX', 'pouchDB', 'utilservice',
    function ($q, $http, $stateParams, $state, $rootScope, $location, $urlRouter, $route, $window, $compile, localStorageService, pathservice, REGEX, pouchDB, utilservice) {

        var db = pouchDB('lanapp', { adapter: 'idb' });
        
		
        
        pathservice.consts(function (data) {
            $rootScope.paths = data;
        });
        $rootScope.regex = REGEX;
        $http.defaults.headers.common['x-access-token'] = $rootScope.token;

        $rootScope.$state = $state;
        $rootScope.$on("$stateChangeStart", function (event, toState, test) {
            $rootScope.bodyClass = toState.data.bodyClass;
            $rootScope.isHome = toState.data.isHome;
            $rootScope.title = toState.data.pageTitle;
            $rootScope.teal = toState.data.teal;
            $rootScope.lbg = typeof (toState.data.lbg) === "undefined" ? toState.data.lbg : "nil";
            $rootScope.nopanel = toState.data.nopanel ? false : true;
        })

        $rootScope.loadApp = function () {
            utilservice.loadShift();
            utilservice.loadRooms();
            utilservice.loadTables();
            utilservice.loadCategory(),
            utilservice.loadIngedients(),
            utilservice.loadSides();
            utilservice.loadProduct();
            utilservice.loadEmployee();
        }

        $rootScope.connection = function (obj) {
            $rootScope.loadApp();
            $rootScope.socket.emit('connectUser', obj);
        }

        $rootScope.connectSocket = function () {
            if (navigator.onLine) {
                angular.element(document).ready(function () {
                    var iosocket = io.connect();
                    iosocket.on('connect', function () {

                        console.log('Socket Connected');

                        $rootScope.socket = iosocket;

                        db.get('usersess', function (err, doc) {
                            if (err) {
                                console.log("err end session ")
                                console.log(err)
                            }
                            else {
                                var datas = doc;
                                var id = doc.usermoment.employee._id;
                                $rootScope.socket.emit('connectUser', id);
                            }
                        });

                        iosocket.on('onShiftClosed', function (sokectObj) {
                            $rootScope.$broadcast('onShiftClosed', sokectObj);
                        });

                        iosocket.on('onNewInvoice', function (sokectObj) {
                            $rootScope.$broadcast('onNewInvoice', sokectObj);
                        });

                        iosocket.on('onInvoiceClose', function (sokectObj) {
                            if ($rootScope.socket.id != sokectObj.senderid)
                                $rootScope.$broadcast('onInvoiceClose', sokectObj);
                        });

                        iosocket.on('onChangeInvoiceOrders', function (sokectObj) {
                            if ($rootScope.socket.id != sokectObj.senderid)
                                $rootScope.$broadcast('onChangeInvoiceOrders', sokectObj);
                        });

                        iosocket.on('onInvoiceTableChange', function (sokectObj) {
                            if ($rootScope.socket.id != sokectObj.senderid)
                                $rootScope.$broadcast('onInvoiceTableChange', sokectObj);
                        });

                        iosocket.on('onChangeInvoiceMetaData', function (sokectObj) {
                            $rootScope.$broadcast('onChangeInvoiceMetaData', sokectObj);
                        });

                        iosocket.on('onOrderPlaced', function (order) {
                            $rootScope.$broadcast('onOrderPlaced', order);
                        });

                        iosocket.on('onOrderStarted', function (orderId) {
                            $rootScope.$broadcast('onOrderStarted', orderId);
                        });

                        iosocket.on('onOrderCompleted', function (orderId) {
                            $rootScope.$broadcast('onOrderCompleted', orderId);
                        });

                        iosocket.on('message', function (message) {
                            $('#incomingChatMessages').append($('<li></li>').text(message));
                        });

                        iosocket.on('disconnect', function () {
                            $('#incomingChatMessages').append('<li>Disconnected</li>');
                        });

                        iosocket.on('onTyping', function (message) {
                            $('#incomingChatMessages').append($('<li></li>').text("Typing"));
                        });
                        iosocket.on('onStopTyping', function (message) {
                            $('#incomingChatMessages').append($('<li></li>').text("stopTyping"));
                        });
                        iosocket.on('onConnectUser', function (message) {
                            console.log(message);
                            $('#incomingChatMessages').append($('<li></li>').text(message));
                        });
                        iosocket.on('onTextMessage', function (message) {
                            console.log(message);
                            $('#incomingChatMessages').append($('<li></li>').text("onTextMessage event"));
                        });
                        iosocket.on('selfTextMessage', function (message) {
                            console.log(message);
                            $('#incomingChatMessages').append($('<li></li>').text("selfTextMessage event"));
                        });
                    });
                });
            }
        }

        $rootScope.connectSocket();

        $rootScope.raiseSocketEvent = function (eventName, eventObj) {
            eventObj.senderid = $rootScope.socket.id;
            $rootScope.socket.emit(eventName, eventObj);
        }

        $rootScope.orderStatusmanager = {
            TEMPORAL: 'TEMPORAL',
            PLACED: 'PLACED',
            STARTED: 'STARTED',
            COMPLETED: 'COMPLETED',
            CLOSED: 'CLOSED',
            ARCHIVED: 'ARCHIVED'
        };

        $rootScope.invoiceStatusmanager = {
            NEW: 'NEW',
            STARTED: 'STARTED',
            COMPLETED: 'COMPLETED',
            CLOSED: 'CLOSED'
        };

        $rootScope.SplitItemDirection = {
            FORWARD: 'FORWARD',
            BACKWORD: 'BACKWORD'
        };

        $rootScope.$on("$viewContentLoaded", function (event, toState, test) {
            $.material.init();
        })

        $rootScope.lang = 'en';

        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            var language = data.language;
            $rootScope.lang = language;
        });

        /*$rootScope.syncdetails = {}
        localStorageService.set('_meanLanAppSync',$rootScope.syncdetails);*/
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
                //$rootScope.online = false;
            });
        }, false);

        //$rootScope.online = false;

        $rootScope.toaster = { 'time-out': 3000, 'limit': 3, 'close-button': true, 'animation-class': 'toast-right-center' }
        console.log('Done loading dependencies and configuring module!');

        $rootScope.loadApp();
    }])
})();