define('text!modules/home.html',[],function(){return "<template>\r\n    <h1>${message}</h1>   <!-- sting interpolator pulls text from the object into the html -->\r\n</template>\r\n";});
define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        // route name; square bracket is multiple ways to the route
        moduleId: './modules/landing',
        // this is a view called home in the modules folder
        name: 'Landing',
        // displayed in the menu
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users',
        auth: true
      }, {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'Help Tickets',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  // configures base URL and logout page
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "./auth-config", "regenerator-runtime"], function (_exports, _environment, _authConfig, _regeneratorRuntime) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _authConfig = _interopRequireDefault(_authConfig);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // main.js contains global configurations
  window.regeneratorRuntime = _regeneratorRuntime.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editHelpTicket.html',[],function(){return "<template>\r\n\r\n    <!-- set to 8 columns of 12 to not use the whole page -->\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <!-- toolbar at the top of the form -->\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"helpTicket._id\" click.trigger=\"deleteHelpTicketAndContent()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n                <!-- edit user form -->\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"title\">Title</label>\r\n                    <input type=\"text\" readonly.bind=\"helpTicket._id\" class=\"form-control\" value.bind=\"helpTicket.title\"\r\n                        id=\"title\" placeholder=\"Title\">\r\n                </div>\r\n                <!-- <div class=\"form-group\">\r\n                    <label for=\"status\">Status</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"helpTicket.status\" id=\"status\" placeholder=\"Status\">\r\n                </div> -->\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"status\">Status</label>\r\n                    <select value.bind=\"helpTicket.status\" class=\"form-control\" id=\"status\">\r\n                        <option value=\"new\">New</option>\r\n                        <option value=\"inProcess\">In Process</option>\r\n                        <option value=\"closed\">Closed</option>\r\n                    </select>\r\n                </div>\r\n                \r\n                <div class=\"form-group\">\r\n                    <label for=\"personId\">Person</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"helpTicket.personId._id\" id=\"personId\" placeholder=\"Person\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"ownerId\">Owner</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"helpTicket.ownerId._id\" id=\"ownerId\" placeholder=\"Owner\">\r\n                </div>\r\n            \r\n                <div class=\"form-group\">\r\n                    <label for=\"content\">Description</label>\r\n                    <textarea value.bind=\"helpTicketContent.content\" class=\"form-control\" rows=\"8\"></textarea>\r\n                </div>\r\n\r\n                <!--button to add new content to the helpticket-->\r\n                <div class=\"row\">\r\n                    <div class=\"col-2\">\r\n                        <label class=\"btn btn-primary\">\r\n                            Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                files.bind=\"files\">\r\n                        </label>\r\n                    </div>\r\n                    <div class=\"col-10\">\r\n                        <ul>\r\n                            <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                    click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n\r\n                <!--helpticket content-->\r\n                <div class=\"card\" repeat.for=\"content of helpTickets.helpTicketsContentsArray\">\r\n                    <div class=\"card=body\">\r\n                        <div class=\"row\" style=\"padding:3px;\">\r\n                            <div class=\"col-3\">\r\n                                <span innerhtml.bind=\"content.dateCreated\"></span><br />\r\n                                ${content.personId.firstname} ${content.personId.lastname}\r\n                            </div>\r\n                            <div class=\"col-9\" style=\"border-left-style: solid;border-left-width:1px;\">\r\n                                ${content.content}\r\n                            </div>\r\n                            <div>\r\n                                <a href=\"http://localhost:5000/uploadedFiles/helpTickets/${content.file.fileName}\" \u000b\r\n                                    target=\"_blank\">${content.file.originalFileName}</a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\r\n\r\n    <!-- set to 8 columns of 12 to not use the whole page -->\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <!-- toolbar at the top of the form -->\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n                <!-- edit user form -->\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"firstname\">First name</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"user.firstname\" id=\"firstname\" placeholder=\"First name\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"lastname\">Last name</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"user.lastname\" id=\"lastname\" placeholder=\"Last name\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"email\">Email address</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"name@example.com\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"password\">Password</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"Password\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"role\" value.bind=\"user.role\">Role</label>\r\n                    <label for=\"role\">Role</label>\r\n                    <select value.bind=\"user.role\" class=\"form-control\" id=\"role\">\r\n                        <option value=\"user\">User</option>\r\n                        <option value=\"staff\">Staff</option>\r\n                        <option value=\"admin\">Administrator</option>\r\n                    </select>\r\n                </div>\r\n\r\n                <div class=\"form-check\">\r\n                    <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                    <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                        Active\r\n                    </label>\r\n                </div>\r\n\r\n                <!-- code for a button - no longer required-->\r\n                <!-- div class=\"form-group\" style=\"margin-top:20px;\"></div> -->\r\n                <!-- button class=\"btn btn-primary\" click.trigger=\"save()\">Save</button> -->\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableHelpTickets.html',[],function(){return "<template>\r\n    <!-- set to 8 columns of 12 to not use the whole page -->\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <!-- toolbar at the top of the table -->\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newHelpTicket()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getHelpTickets()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <!-- table headings -->\r\n                        <tr>\r\n                            <th scope=\"col\">Title</th>\r\n                            <th scope=\"col\">Status</th>\r\n                            <th scope=\"col\">User</th>\r\n                            <th scope=\"col\">Owner</th>\r\n                        </tr>\r\n                    </thead>\r\n\r\n                    <!-- table content -->\r\n                    <tbody>\r\n                        <tr repeat.for=\"helpTicket of helpTickets.helpTicketsArray\" click.trigger=\"editHelpTicket(helpTicket)\" >\r\n                            <td>${helpTicket.title}</td>\r\n                            <td>${helpTicket.status}</td>\r\n                            <td>${helpTicket.personId.firstname} ${helpTicket.personId.lastname} </td>\r\n                            <td>${helpTicket.ownerId.firstname} ${helpTicket.ownerId.lastname} </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n    <!-- set to 8 columns of 12 to not use the whole page -->\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <!-- toolbar at the top of the table -->\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <!-- table headings -->\r\n                        <tr>\r\n                            <th scope=\"col\">First</th>\r\n                            <th scope=\"col\">Last</th>\r\n                            <th scope=\"col\">Role</th>\r\n                            <th scope=\"col\">Active</th>\r\n                        </tr>\r\n                    </thead>\r\n\r\n                    <!-- table content -->\r\n                    <tbody>\r\n                        <tr repeat.for=\"user of users.usersArray\">\r\n                            <td click.trigger=\"editUser(user)\">${user.firstname}</td> \r\n                            <td click.trigger=\"editUser(user)\">${user.lastname}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                            <td>\r\n                                <div class=\"form-check\">\r\n                                    <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                    type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('modules/helpTickets',["exports", "aurelia-framework", "aurelia-router", "../resources/data/help-ticket-object"], function (_exports, _aureliaFramework, _aureliaRouter, _helpTicketObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.HelpTickets = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var HelpTickets = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _helpTicketObject.HelpTicket), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTickets(router, helpTickets) {
      this.router = router;
      this.helpTickets = helpTickets;
      this.message = 'HelpTickets';
      this.showEditForm = false;
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    } // activate runs when you first load the page


    var _proto = HelpTickets.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.helpTickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace(); // will draw feather icons
    };

    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.helpTickets.getHelpTickets();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getHelpTickets() {
        return _getHelpTickets.apply(this, arguments);
      };
    }();

    _proto.getHelpTicketContent =
    /*#__PURE__*/
    function () {
      var _getHelpTicketContent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.helpTickets.getHelpTicketContent();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getHelpTicketContent() {
        return _getHelpTicketContent.apply(this, arguments);
      };
    }();

    _proto.deleteHelpTicketAndContent =
    /*#__PURE__*/
    function () {
      var _deleteHelpTicketAndContent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.helpTickets.deleteHelpTicketAndContent(this.helpTicket._id);

              case 2:
                _context4.next = 4;
                return this.getHelpTickets();

              case 4:
                this.back();

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function deleteHelpTicketAndContent() {
        return _deleteHelpTicketAndContent.apply(this, arguments);
      };
    }();

    _proto.newHelpTicket = function newHelpTicket() {
      var userId = this.userObj._id;
      this.helpTicket = {
        title: "",
        ownerId: {
          _id: "a1a1a1a1a1a1a1a1a1a1a1a1"
        },
        personId: {
          _id: userId
        },
        status: 'new'
      };
      this.helpTicketContent = {
        personId: userId,
        content: ""
      };
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showEditForm = true;
      setTimeout(function () {
        $("#title").focus();
      }, 500);
      console.log(this.helpTicket); // modified from the class value of firstName
    };

    _proto.editHelpTicket =
    /*#__PURE__*/
    function () {
      var _editHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(helpTicket) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.helpTicket = helpTicket;
                this.helpTicketContent = {
                  personId: this.userObj._id,
                  content: ""
                };
                _context5.next = 4;
                return this.helpTickets.getHelpTicketContent(helpTicket._id);

              case 4:
                this.openEditForm();

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function editHelpTicket(_x) {
        return _editHelpTicket.apply(this, arguments);
      };
    }();

    _proto.changeActive = function changeActive(helpTicket) {
      this.helpTicket = helpTicket;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var helpTicket, serverResponse;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content)) {
                  _context6.next = 10;
                  break;
                }

                if (this.userObj.role !== 'user') {
                  this.helpTicket.ownerId = this.userObj._id;
                }

                helpTicket = {
                  helpTicket: this.helpTicket,
                  content: this.helpTicketContent
                };
                _context6.next = 5;
                return this.helpTickets.saveHelpTicket(helpTicket);

              case 5:
                serverResponse = _context6.sent;
                if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
                _context6.next = 9;
                return this.getHelpTickets();

              case 9:
                this.back();

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showEditForm = false;
      this.filesToUpload = new Array();
      this.files = new Array();
      this.helpTickets.helpTicketsContentsArray = [];
    }; // add files to the files upload array when the user selects a file


    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    }; // to delete a helpticket, 
    // you will also need to delete the related content


    return HelpTickets;
  }()) || _class);
  _exports.HelpTickets = HelpTickets;
});
define('text!modules/helpTickets.html',[],function(){return "<template>\r\n            <h1>${message}</h1>\r\n             <compose show.bind=\"!showEditForm\" view=\"./components/tableHelpTickets.html\"></compose>\r\n             <compose show.bind=\"showEditForm\" view=\"./components/editHelpTicket.html\"></compose>\r\n    </template>";});
define('modules/home',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var _dec, _class;

  var // links the variable to the import
  Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router) {
      this.router = router;
      this.message = 'Home';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users'); // will invoke the users route
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});
define('text!app.html',[],function(){return "<template>\r\n  <!-- this will appear on every page; it appears once and we swap thing in and out below it -->\r\n  <nav-bar></nav-bar>\r\n  <!-- html is loaded inside the router-view tag -->\r\n  <router-view></router-view>\r\n</template>\r\n";});
define('modules/landing',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Landing = void 0;

  var Landing = function Landing() {};

  _exports.Landing = Landing;
});
define('text!modules/landing.html',[],function(){return "<template>\r\n \r\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Users';
      this.showUserEditForm = false;
    } // activate runs when you first load the page


    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace(); // will draw feather icons
    };

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.newUser = function newUser() {
      this.user = {
        firstname: "",
        lastname: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstname").focus();
      }, 500); // modified from the class value of firstName
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    };

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user && this.user.firstname && this.user.lastname && this.user.email && this.user.password)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.users.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\r\n        <h1>${message}</h1>\r\n         <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"></compose>\r\n         <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\"></compose>\r\n</template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/"; // establishes base url with /api
      // configure the fetch client

      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }) // interceptors run when a request is sent or received
        .withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            console.log('Requesting ${request.method} ${request.url}');
            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});
define('resources/data/help-ticket-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.HelpTicket = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var HelpTicket = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTicket(data) {
      this.data = data;
      this.HELP_TICKET_SERVICE = 'helpTickets';
      this.HELP_TICKET_CONTENT_SERVICE = 'helpTicketContents';
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    } // upload file to a helpticket


    var _proto = HelpTicket.prototype;

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(files, id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function uploadFile(_x, _x2) {
        return _uploadFile.apply(this, arguments);
      };
    }();

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.helpTickets.getHelpTickets(this.userObj);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }(); // getHelpTickets - slide 2 - deck 9


    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpTicket) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log(this.userObj.role);
                url = this.HELP_TICKET_SERVICE;

                if (this.userObj.role == 'user') {
                  url += '/user/' + this.userObj._id;
                }

                _context3.next = 5;
                return this.data.get(url);

              case 5:
                response = _context3.sent;

                if (!response.error) {
                  this.helpTicketsArray = response;
                } else {
                  this.helpTicketsArray = [];
                }

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getHelpTickets(_x3) {
        return _getHelpTickets.apply(this, arguments);
      };
    }(); // get HelpTicketContent - new and working


    _proto.getHelpTicketContent =
    /*#__PURE__*/
    function () {
      var _getHelpTicketContent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(helpTicket) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(this.userObj.role);
                url = this.HELP_TICKET_CONTENT_SERVICE + '/helpTicket/' + helpTicket;
                _context4.next = 4;
                return this.data.get(url);

              case 4:
                response = _context4.sent;

                if (!response.error) {
                  this.helpTicketsContentsArray = response;
                } else {
                  this.helpTicketsContentsArray = [];
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getHelpTicketContent(_x4) {
        return _getHelpTicketContent.apply(this, arguments);
      };
    }(); // saveHelpTicket - put and post - slide 3 - deck 9


    _proto.saveHelpTicket =
    /*#__PURE__*/
    function () {
      var _saveHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(helpTicket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!helpTicket) {
                  _context5.next = 11;
                  break;
                }

                if (!helpTicket.helpTicket._id) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return this.data.put(helpTicket, this.HELP_TICKET_SERVICE);

              case 4:
                serverResponse = _context5.sent;
                _context5.next = 10;
                break;

              case 7:
                _context5.next = 9;
                return this.data.post(helpTicket, this.HELP_TICKET_SERVICE);

              case 9:
                serverResponse = _context5.sent;

              case 10:
                return _context5.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function saveHelpTicket(_x5) {
        return _saveHelpTicket.apply(this, arguments);
      };
    }(); // existing helpTicket delete


    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(helpTicket) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(helpTicket && helpTicket._id)) {
                  _context6.next = 3;
                  break;
                }

                _context6.next = 3;
                return this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function _delete(_x6) {
        return _delete2.apply(this, arguments);
      };
    }(); // helpTicket & helpTicketContent delete -- new and not working


    _proto.deleteHelpTicketAndContent =
    /*#__PURE__*/
    function () {
      var _deleteHelpTicketAndContent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(helpTicketId) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log('deleting help ticket helpTicket %s', helpTicketId);

                if (!helpTicketId) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 4;
                return this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicketId);

              case 4:
                _context7.next = 6;
                return this.data.delete(this.HELP_TICKET_CONTENT_SERVICE + '/helpTicket/' + helpTicketId);

              case 6:
                return _context7.abrupt("return", serverResponse);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function deleteHelpTicketAndContent(_x7) {
        return _deleteHelpTicketAndContent.apply(this, arguments);
      };
    }();

    return HelpTicket;
  }()) || _class);
  _exports.HelpTicket = HelpTicket;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users'; // endpoint for the url /api/users
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      };
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context2.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(user && user._id)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _delete(_x2) {
        return _delete2.apply(this, arguments);
      };
    }();

    return User;
  }()) || _class);
  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.router = router;
      this.auth = auth;
      this.loginError = "";
      this.isAuthenticated = false;
      this.email = "";
      this.password = "";
    } // checks for authentication each time the tabs change (after refresh)


    var _proto = NavBar.prototype;

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    }; // runs after the browser builds the html
    // uses jQuery from bootstrap.  Makes menu items respond to clicks


    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials";
      });
    };

    _proto.logout = function logout() {
      if (this.userObj) this.auth.logout(this.userObj.email);
      sessionStorage.removeItem('user');
      this.isAuthenticated = this.auth.isAuthenticated();
      this.auth.logout();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n        <a class=\"navbar-brand\" href=\"#\">HelpMe!</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <!--Navigation Bar-->\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n\r\n            <!--login form in the nav bar -->\r\n            <div show.bind=\"!isAuthenticated\">\r\n                <form class=\"form-inline\">\r\n                    <div class=\"form-group mb-2\">\r\n                        <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                        <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"email@example.com\">\r\n                    </div>\r\n                    <div class=\"form-group mx-sm-3 mb-2\">\r\n                        <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                        <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\"\r\n                            placeholder=\"Password\">\r\n                    </div>\r\n                    <button click.trigger=\"login()\" type=\"submit\" class=\"btn btn-primary mb-2\">Login</button>\r\n                    <span show.bind=\"loginError\" style=\"color:white; margin-left:10px;\">${loginError}</span>\r\n                </form>\r\n            </div>\r\n\r\n            <!--menu items in the nav bar-->\r\n            <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n                <ul show.bind=\"isAuthenticated\" class=\"navbar-nav\">\r\n                    <li class=\"nav-item active\">\r\n                        <a class=\"nav-link\" href=\"#home\">Home <span class=\"sr-only\">(current)</span></a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <!-- show users menu only if userObj.role is admin -->\r\n                        <a class=\"nav-link\" show.bind=\"userObj.role=== 'admin'\" href=\"#users\">Users</a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" href=\"#helpTickets\">Help Tickets</a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" href=\"#\" click.trigger=\"logout()\">Logout</a>\r\n                    </li>\r\n\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  // config.globalResources - anything in here can be used anywhere in the application
  // this creates an html element called nav-bar
  function configure(config) {
    config.globalResources(['./elements/nav-bar']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map