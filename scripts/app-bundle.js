define('app',['exports', 'aurelia-framework', 'aurelia-router', 'router-config', 'semantic-ui'], function (exports, _aureliaFramework, _aureliaRouter, _routerConfig) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    var _routerConfig2 = _interopRequireDefault(_routerConfig);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _routerConfig2.default), _dec(_class = function () {
        function App(router, appRouterConfig) {
            _classCallCheck(this, App);

            this.router = router;
            this.appRouterConfig = appRouterConfig;
        }

        App.prototype.activate = function activate() {
            this.appRouterConfig.configure();
        };

        return App;
    }()) || _class);
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authconfig = {
        endpoint: 'api',
        configureEndpoints: ['api'],
        authTokenType: 'JWT',
        signupUrl: 'auth/register/',
        loginUrl: 'users/token/',
        loginRedirect: '#dashboard',
        logoutRedirect: '#',
        profileUrl: 'users/me/',
        profileMethod: 'patch'
    };

    exports.default = authconfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'aurelia-configuration'], function (exports, _environment, _authConfig, _aureliaConfiguration) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    var _authConfig2 = _interopRequireDefault(_authConfig);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function configure(aurelia) {
        aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-dialog', function (config) {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = true;
        }).plugin('aurelia-animator-css').plugin('aurelia-validation').plugin('aurelia-configuration').plugin('aurelia-api', function (config) {
            config.registerEndpoint('api', function (configure) {
                var ac = aurelia.container.get(_aureliaConfiguration.AureliaConfiguration);
                configure.withBaseUrl(ac.get('api_endpoint', 'http://localhost:8000/'));
                configure.withInterceptor({
                    response: function response(_response) {
                        return _response;
                    }
                });
            });
        }).plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(_authConfig2.default);
        }).plugin('aurelia-sortablejs').feature('components/semantic-ui').feature('components/shared');

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('not-found',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NotFound = exports.NotFound = function NotFound() {
    _classCallCheck(this, NotFound);
  };
});
define('router-config',['exports', 'aurelia-authentication', 'aurelia-framework', 'aurelia-router', 'aurelia-route-mapper', 'projects/index', 'inventory/index', 'workflows/index', 'equipment/index', 'settings/index'], function (exports, _aureliaAuthentication, _aureliaFramework, _aureliaRouter, _aureliaRouteMapper, _index, _index2, _index3, _index4, _index5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var _default = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaRouteMapper.RouteMapper), _dec(_class = function () {
        function _default(router, routeMapper) {
            _classCallCheck(this, _default);

            this.router = router;
            this.routeMapper = routeMapper;
        }

        _default.prototype.configure = function configure() {

            var routes = [{ route: ['', '/dashboard'], name: 'dashboard', moduleId: './dashboard/dashboard',
                settings: { icon: 'dashboard' },
                nav: true, title: 'Dashboard', auth: true }, { route: '/login', name: 'login', moduleId: './auth/login', nav: false,
                title: 'Login', authRoute: true }, { route: '/projects', name: 'project', moduleId: './projects/index', nav: true,
                settings: { icon: 'book', childRoutes: _index.routes },
                title: 'Projects', auth: true }, { route: '/inventory', name: 'inventory', moduleId: './inventory/index',
                settings: { icon: 'cubes', childRoutes: _index2.routes },
                nav: true, title: 'Inventory', auth: true }, { route: '/workflow', name: 'workflows', moduleId: './workflows/index',
                settings: { icon: 'fork', childRoutes: _index3.routes },
                nav: true, title: 'Workflows', auth: true }, { route: '/equipment', name: 'equipment', moduleId: './equipment/index',
                settings: { icon: 'plug', childRoutes: _index4.routes },
                nav: true, title: 'Equipment', auth: true }, { route: '/settings', name: 'settings', moduleId: './settings/index',
                settings: { icon: 'settings', admin: true, childRoutes: _index5.routes },
                nav: true, title: 'Settings', auth: true }];

            var appRouterConfig = function appRouterConfig(config) {

                config.title = 'Leaf LIMS';

                config.map(routes);

                config.mapUnknownRoutes({ moduleId: 'not-found', nav: true, auth: true });
            };

            this.router.configure(appRouterConfig);
            this.routeMapper.map(routes);
        };

        return _default;
    }()) || _class);

    exports.default = _default;
});
define('settings',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Settings = exports.Settings = function Settings() {
    _classCallCheck(this, Settings);
  };
});
define('alerts/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AlertApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var AlertApi = exports.AlertApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function AlertApi(config) {
            _classCallCheck(this, AlertApi);

            this.endpoint = config.getEndpoint('api');
        }

        AlertApi.prototype.alerts = function alerts(params) {
            return this.endpoint.find('alerts/', params);
        };

        AlertApi.prototype.updateAlert = function updateAlert(id) {
            var path = 'alerts/' + id + '/dismiss/';
            return this.endpoint.destroy(path);
        };

        AlertApi.prototype.triggerSets = function triggerSets(params) {
            return this.endpoint.find('triggersets/', params);
        };

        AlertApi.prototype.createTriggerSet = function createTriggerSet(data) {
            return this.endpoint.create('triggersets/', data);
        };

        AlertApi.prototype.updateTriggerSet = function updateTriggerSet(id, data) {
            return this.endpoint.patchOne('triggersets/', id, null, data);
        };

        AlertApi.prototype.deleteTriggerSet = function deleteTriggerSet(id) {
            return this.endpoint.destroyOne('triggersets/', id);
        };

        AlertApi.prototype.triggers = function triggers(params) {
            return this.endpoint.find('triggers/', params);
        };

        AlertApi.prototype.createTrigger = function createTrigger(data) {
            return this.endpoint.create('triggers/', data);
        };

        AlertApi.prototype.updateTrigger = function updateTrigger(id, data) {
            return this.endpoint.patchOne('triggers/', id, null, data);
        };

        AlertApi.prototype.deleteTrigger = function deleteTrigger(id) {
            return this.endpoint.destroyOne('triggers/', id);
        };

        AlertApi.prototype.subscriptions = function subscriptions(params) {
            return this.endpoint.find('subscriptions/', params);
        };

        AlertApi.prototype.createSubscription = function createSubscription(data) {
            return this.endpoint.create('subscriptions/', data);
        };

        AlertApi.prototype.updateSubscription = function updateSubscription(id, data) {
            return this.endpoint.patchOne('subscriptions/', id, null, data);
        };

        AlertApi.prototype.deleteSubscription = function deleteSubscription(id) {
            return this.endpoint.destroyOne('subscriptions/', id);
        };

        AlertApi.prototype.modelFields = function modelFields(modelName) {
            var path = modelName + '/';
            return this.endpoint.request('OPTIONS', path);
        };

        return AlertApi;
    }()) || _class);
});
define('auth/account',['exports', 'aurelia-framework', './api', 'aurelia-dialog', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaDialog, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Account = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Account = exports.Account = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _api.UserApi, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec(_class = function () {
        function Account(element, dialogController, userApi, validationController) {
            _classCallCheck(this, Account);

            this.dialog = dialogController;
            this.api = userApi;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.rules = _aureliaValidation.ValidationRules.ensure('institution_name').required().ensure('address_1').required().ensure('city').required().ensure('postcode').required().ensure('country').required().rules;
        }

        Account.prototype.activate = function activate(model) {
            this.user = model;
        };

        Account.prototype.addAddress = function addAddress() {
            var address = {
                user: this.user.username
            };
            this.validator.addObject(address, this.rules);
            this.user.addresses.push(address);
        };

        Account.prototype.removeAddress = function removeAddress(index) {
            var _this = this;

            this.user.addresses.splice(index, 1);
            if (this.user.addresses[index].id) {
                this.api.deleteAddress(this.user.addresses[index].id).catch(function (err) {
                    return _this.error = err;
                });
            }
        };

        Account.prototype.save = function save(data) {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    if (data.id) {
                        _this2.api.updateAddress(data.id, data).then(function (data) {
                            _this2.addressSaved = true;
                        }).catch(function (err) {
                            return _this2.error = err;
                        });
                    } else {
                        _this2.api.saveAddress(data).then(function (data) {
                            _this2.addressSaved = true;
                        }).catch(function (err) {
                            return _this2.error = err;
                        });
                    }
                }
            });
        };

        return Account;
    }()) || _class);
});
define('auth/api',['exports', 'aurelia-framework', 'aurelia-api', 'aurelia-authentication'], function (exports, _aureliaFramework, _aureliaApi, _aureliaAuthentication) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UserApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var UserApi = exports.UserApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config, _aureliaAuthentication.AuthService), _dec(_class = function () {
        function UserApi(config, authService) {
            _classCallCheck(this, UserApi);

            this.endpoint = config.getEndpoint('api');
            this.auth = authService;
        }

        UserApi.prototype.users = function users(params) {
            return this.endpoint.find('users/', params);
        };

        UserApi.prototype.userDetail = function userDetail(id, params) {
            return this.endpoint.findOne('users/', id, params);
        };

        UserApi.prototype.createUser = function createUser(data) {
            return this.endpoint.create('users/', data);
        };

        UserApi.prototype.updateUser = function updateUser(id, data) {
            return this.endpoint.patchOne('users/', id, null, data);
        };

        UserApi.prototype.deleteUser = function deleteUser(id) {
            return this.endpoint.destroyOne('users/', id);
        };

        UserApi.prototype.currentUser = function currentUser() {
            var tokenData = this.auth.getTokenPayload();
            return this.endpoint.findOne('users/', tokenData.user_id);
        };

        UserApi.prototype.changePassword = function changePassword(userId, password) {
            var path = 'users/' + userId + '/change_password/';
            return this.endpoint.patch(path, null, { new_password: password });
        };

        UserApi.prototype.groups = function groups(params) {
            return this.endpoint.find('groups/', params);
        };

        UserApi.prototype.createGroup = function createGroup(data) {
            return this.endpoint.create('groups/', data);
        };

        UserApi.prototype.updateGroup = function updateGroup(id, data) {
            return this.endpoint.patchOne('groups/', id, null, data);
        };

        UserApi.prototype.deleteGroup = function deleteGroup(id) {
            return this.endpoint.destroyOne('groups/', id);
        };

        UserApi.prototype.setPermissions = function setPermissions(object, id, permissions) {
            return this.endpoint.patchOne(object, id, 'set_permissions/', permissions);
        };

        UserApi.prototype.removePermissions = function removePermissions(object, id, groupList) {
            return this.endpoint.destroyOne(object, id, 'remove_permissions/?groups=' + groupList);
        };

        UserApi.prototype.saveAddress = function saveAddress(data) {
            return this.endpoint.create('addresses/', data);
        };

        UserApi.prototype.updateAddress = function updateAddress(id, data) {
            return this.endpoint.patchOne('addresses/', id, null, data);
        };

        UserApi.prototype.deleteAddress = function deleteAddress(id) {
            return this.endpoint.destroyOne('addresses/', id);
        };

        return UserApi;
    }()) || _class);
});
define('auth/login',['exports', 'aurelia-authentication', 'aurelia-framework'], function (exports, _aureliaAuthentication, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaAuthentication.AuthService), _dec(_class = function () {
        function Login(auth) {
            _classCallCheck(this, Login);

            this.heading = 'Login';
            this.username = 'admin';
            this.password = 'admin';
            this.loginError = '';

            this.auth = auth;
        }

        Login.prototype.login = function login() {
            var _this = this;

            var loginDetails = {
                username: this.username,
                password: this.password
            };
            return this.auth.login(loginDetails).catch(function (error) {
                _this.error = error;
            });
        };

        return Login;
    }()) || _class);
});
define('crm/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CrmApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CrmApi = exports.CrmApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function CrmApi(config) {
            _classCallCheck(this, CrmApi);

            this.endpoint = config.getEndpoint('api');
        }

        CrmApi.prototype.crmProjects = function crmProjects(params) {
            return this.endpoint.find('crm/project/', params);
        };

        CrmApi.prototype.associateCRMProject = function associateCRMProject(projectId, crmProjectId) {
            return this.endpoint.post('crm/link/', { id: projectId, identifier: crmProjectId });
        };

        CrmApi.prototype.disassociateCRMProject = function disassociateCRMProject(projectId) {
            return this.endpoint.destroy('crm/link/', { project_id: projectId });
        };

        CrmApi.prototype.addAccount = function addAccount(emailAddress) {
            return this.endpoint.post('crm/user/', { email: emailAddress, add_only: 'True' });
        };

        CrmApi.prototype.removeAccount = function removeAccount(emailAddress) {
            return this.endpoint.destroy('crm/user/', { email: emailAddress });
        };

        return CrmApi;
    }()) || _class);
});
define('crm/crm-prompt',['exports', 'aurelia-framework', './api', 'aurelia-dialog', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaDialog, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CrmPrompt = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CrmPrompt = exports.CrmPrompt = (_dec = (0, _aureliaFramework.inject)(Element, _api.CrmApi, _aureliaDialog.DialogController, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function CrmPrompt(element, crmApi, dialogController, eventAggregator) {
            _classCallCheck(this, CrmPrompt);

            this.dialog = dialogController;
            this.api = crmApi;
            this.ea = eventAggregator;

            this.result = null;
            this.crmItems = { results: [] };

            this.query = {
                limit: 200,
                search: ''
            };
        }

        CrmPrompt.prototype.attached = function attached() {
            var _this = this;

            this.querySubscriber = this.ea.subscribe('searchQueryChanged', function (response) {
                _this.getItems();
            });
        };

        CrmPrompt.prototype.detached = function detached() {
            this.querySubscriber.dispose();
        };

        CrmPrompt.prototype.getItems = function getItems() {
            var _this2 = this;

            console.log(this.query);
            this.api.crmProjects(this.query).then(function (data) {
                _this2.crmItems = data;
            });
        };

        return CrmPrompt;
    }()) || _class);
});
define('crm/ll-crm',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlCrm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlCrm = exports.LlCrm = (_dec = (0, _aureliaFramework.inject)(_api.CrmApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlCrm(crmApi, eventAggregator) {
            _classCallCheck(this, LlCrm);

            _initDefineProp(this, 'source', _descriptor, this);

            this.api = crmApi;
            this.ea = eventAggregator;
            this.query = {
                limit: 50
            };
        }

        LlCrm.prototype.getItems = function getItems() {
            var _this = this;

            this.fetching = true;
            this.api.crmProjects(this.query).then(function (data) {
                _this.items = data;
                _this.fetching = false;
            });
        };

        LlCrm.prototype.cancel = function cancel() {
            this.add = false;
            this.change = false;
        };

        LlCrm.prototype.choose = function choose(item) {
            var _this2 = this;

            this.api.associateCRMProject(this.source.id, item.Id).then(function (data) {
                _this2.ea.publish('projectUpdated', { source: 'crm', id: _this2.source.id });
                _this2.add = false;
                _this2.change = false;
            }).catch(function (err) {
                _this2.error = err;
            });
        };

        LlCrm.prototype.remove = function remove() {
            var _this3 = this;

            this.api.disassociateCRMProject(this.source.id).then(function (data) {
                _this3.ea.publish('projectUpdated', { source: 'crm', id: _this3.source.id });
                _this3.add = false;
                _this3.change = false;
            }).catch(function (err) {
                _this3.error = err;
            });
        };

        return LlCrm;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('dashboard/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StatsApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var StatsApi = exports.StatsApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function StatsApi(config) {
            _classCallCheck(this, StatsApi);

            this.endpoint = config.getEndpoint('api');
        }

        StatsApi.prototype.stats = function stats(endpoint, field, exclude) {
            var data = { field: field };
            if (exclude) {
                data.exclude = exclude;
            }
            var path = endpoint + '/stats/';
            return this.endpoint.find(path, data);
        };

        return StatsApi;
    }()) || _class);
});
define('dashboard/dashboard',['exports', 'aurelia-framework', './api', '../projects/api', '../workflows/api', '../inventory/api', '../equipment/api'], function (exports, _aureliaFramework, _api, _api2, _api3, _api4, _api5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Dashboard = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Dashboard = exports.Dashboard = (_dec = (0, _aureliaFramework.inject)(_api.StatsApi, _api2.ProjectApi, _api3.WorkflowApi, _api4.InventoryApi, _api5.EquipmentApi), _dec(_class = function () {
        function Dashboard(statsApi, projectApi, workflowApi, inventoryApi, equipmentApi) {
            var _this = this;

            _classCallCheck(this, Dashboard);

            this.api = statsApi;
            this.projectApi = projectApi;
            this.workflowApi = workflowApi;
            this.inventoryApi = inventoryApi;
            this.equipmentApi = equipmentApi;

            this.projectApi.projects({ limit: 5, ordering: '-id', archive: 'False' }).then(function (data) {
                _this.project_count = data.meta.count;
                _this.projects = data;
            });

            this.workflowApi.runs({ limit: 5, ordering: '-id', is_active: 'True' }).then(function (data) {
                _this.run_count = data.meta.count;
                _this.runs = data;
            });

            this.inventoryApi.inventory({ limit: 5, ordering: '-id', in_inventory: 'True' }).then(function (data) {
                _this.inventory_count = data.meta.count;
                _this.inventory = data;
            });

            this.api.stats('projects', 'status__name', 'archive').then(function (data) {
                _this.project_statuses = _this.makeDataset('status__name', data);
            });

            this.api.stats('products', 'status__name', 'project__archive').then(function (data) {
                _this.product_statuses = _this.makeDataset('status__name', data);
            });

            this.api.stats('projects', 'deadline_status', 'archive').then(function (data) {
                _this.deadlines = _this.makeDataset('deadline_status', data);
            });

            this.projectApi.projects({ limit: 50, ordering: 'deadline_status',
                'deadline_status': 'Past' }).then(function (data) {
                _this.past_deadlines = data;
            });

            this.projectApi.projects({ limit: 50, ordering: 'deadline_status',
                'deadline_status': 'Warn' }).then(function (data) {
                _this.warn_deadlines = data;
            });

            this.equipmentApi.equipment({ status: 'error' }).then(function (data) {
                _this.equipment_count = data.meta.count;
            });
        }

        Dashboard.prototype.makeDataset = function makeDataset(filter, data) {
            var results = { labels: [], data: [] };
            for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var obj = _ref;

                var toLabel, toValue;
                if (obj[filter]) {
                    toLabel = obj[filter].replace(/_/g, filter);
                } else {
                    toLabel = 'None';
                }
                toValue = obj[filter + '__count'];
                if (toValue > 0) {
                    results.labels.push(toLabel);
                    results.data.push(toValue);
                }
            };
            return results;
        };

        return Dashboard;
    }()) || _class);
});
define('dashboard/deadline-format',['exports', 'moment'], function (exports, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DeadlineFormatValueConverter = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DeadlineFormatValueConverter = exports.DeadlineFormatValueConverter = function () {
        function DeadlineFormatValueConverter() {
            _classCallCheck(this, DeadlineFormatValueConverter);
        }

        DeadlineFormatValueConverter.prototype.toView = function toView(value) {
            if (value) {
                var deadline = (0, _moment2.default)(value);
                var today = (0, _moment2.default)();
                var daysToDeadline = deadline.diff(today, 'days');
                if (daysToDeadline < 0) {
                    daysToDeadline = Math.abs(daysToDeadline);
                    return '(' + daysToDeadline + ' days overdue)';
                } else {
                    return '(' + daysToDeadline + ' days remaning)';
                }
            }
        };

        return DeadlineFormatValueConverter;
    }();
});
define('equipment/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EquipmentApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var EquipmentApi = exports.EquipmentApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function EquipmentApi(config) {
            _classCallCheck(this, EquipmentApi);

            this.endpoint = config.getEndpoint('api');
        }

        EquipmentApi.prototype.equipment = function equipment(params) {
            return this.endpoint.find('equipment/', params);
        };

        EquipmentApi.prototype.createEquipment = function createEquipment(data) {
            return this.endpoint.create('equipment/', data);
        };

        EquipmentApi.prototype.updateEquipment = function updateEquipment(id, data) {
            return this.endpoint.patchOne('equipment/', id, null, data);
        };

        EquipmentApi.prototype.deleteEquipment = function deleteEquipment(id) {
            return this.endpoint.destroyOne('equipment/', id);
        };

        EquipmentApi.prototype.reservations = function reservations(params) {
            return this.endpoint.find('equipmentreservation/', params);
        };

        EquipmentApi.prototype.createReservation = function createReservation(data) {
            return this.endpoint.create('equipmentreservation/', data);
        };

        EquipmentApi.prototype.updateReservation = function updateReservation(id, data) {
            return this.endpoint.patchOne('equipmentreservation/', id, null, data);
        };

        EquipmentApi.prototype.deleteReservation = function deleteReservation(id) {
            return this.endpoint.destroyOne('equipmentreservation/', id);
        };

        EquipmentApi.prototype.copyfiles = function copyfiles(params) {
            return this.endpoint.find('copyfiles/', params);
        };

        EquipmentApi.prototype.createCopyfile = function createCopyfile(data) {
            return this.endpoint.create('copyfiles/', data);
        };

        EquipmentApi.prototype.updateCopyfile = function updateCopyfile(id, data) {
            return this.endpoint.patchOne('copyfiles/', id, null, data);
        };

        EquipmentApi.prototype.deleteCopyfile = function deleteCopyfile(id) {
            return this.endpoint.destroyOne('copyfiles/', id);
        };

        return EquipmentApi;
    }()) || _class);
});
define('equipment/equipment',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-dialog', '../components/semantic-ui/ui-prompt', 'aurelia-authentication', 'moment', 'moment-timezone'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaDialog, _uiPrompt, _aureliaAuthentication, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Equipment = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Equipment = exports.Equipment = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi, _aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService, _aureliaAuthentication.AuthService), _dec(_class = function () {
        function Equipment(equipmentApi, eventAggregator, dialogService, authService) {
            var _this = this;

            _classCallCheck(this, Equipment);

            this.api = equipmentApi;
            this.ea = eventAggregator;
            this.dialog = dialogService;
            this.auth = authService;

            this.auth.getMe().then(function (response) {
                _this.me = response;
                _this.isStaff = _this.me.groups.indexOf('staff') > -1;
            });

            this.events = [];
            this.reservation = {};

            this.newReservation = false;
            this.showReservation = function (event, jsEvent, view) {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                _this.newReservation = true;
                _this.reservation = event;
            };

            this.config = {
                timezone: 'local',
                editable: false,
                header: {
                    left: 'agendaWeek agendaDay month',
                    right: 'today prev,next'
                },
                aspectRatio: 2,
                timeFormat: 'HH:mm',
                defaultView: 'agendaWeek',
                views: {
                    agendaWeek: {
                        columnFormat: 'ddd D/M'
                    },
                    agenda: {
                        allDaySlot: false,
                        minTime: '07:00:00',
                        maxTime: '21:00:00',
                        slotLabelFormat: 'HH:mm',
                        slotEventOverlap: false
                    }
                },
                eventClick: this.showReservation,
                eventRender: function eventRender(event, element) {
                    var now = _moment2.default.tz([], _moment2.default.tz.guess());
                    var past = event.end < now;

                    $(element).addClass('reservation');

                    if (past) {
                        $(element).addClass('past');
                    }

                    if (event.is_confirmed && !past && !event.checked_in) {
                        $(element).addClass('confirmed');
                    }

                    if (event.is_confirmed && !event.checked_in && past) {
                        $(element).addClass('missed');
                    }

                    if (event.checked_in) {
                        $(element).addClass('checked_in');
                    }
                },
                eventMouseover: function eventMouseover(event, jsEvent, view) {
                    var template = '\n<span class="header">' + event.title + '</span>\n<span class="equipment">' + event.equipment_reserved + '</span>';
                    if (event.reservation_details) {
                        template += '<p>' + event.reservation_details + '</p>';
                    }
                    var pos = jsEvent.currentTarget.getBoundingClientRect();
                    var element = document.getElementById('calendarPopover');
                    element.style = 'top: ' + (pos.top + 10) + 'px; left: ' + pos.left + 'px; display: block;';
                    element.innerHTML = template;
                },
                eventMouseout: function eventMouseout(event, jsEvent, view) {
                    var element = document.getElementById('calendarPopover');
                    element.style = "";
                }
            };

            this.colours = ['#f44336', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#e91e63', '#9c27b0', '#ef9a9a', '#b39ddb', '#9fa8da', '#90caf9', '#81d4fa', '#80deea', '#80cbc4', '#a5d6a7', '#c5e1a5', '#e6ee9c', '#fff59d', '#ffe082', '#ffcc80', '#ffab91', '#f48fb1', '#ce93d8'];

            this.isLoading = true;

            this.statuses = new Map([['idle', { display: 'Idle', icon: 'check', colour: 'green' }], ['active', { display: 'Active', icon: 'hourglass half', colour: 'blue' }], ['error', { display: 'Error', icon: 'warning', colour: 'red' }], ['broken', { display: 'Out of order', icon: 'remove', colour: 'grey' }]]);
        }

        Equipment.prototype.getCoords = function getCoords(elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };

        Equipment.prototype.attached = function attached() {
            var _this2 = this;

            this.refetchSubscriber = this.ea.subscribe('refetch-events', function (response) {
                return _this2.getEquipment();
            });
            this.getEquipment();
            this.api.equipment({ can_reserve: 'True' }).then(function (data) {
                var _loop = function _loop(i) {
                    var equipment = data.results[i];
                    var api = _this2.api;
                    var source = {
                        equipmentName: equipment.name,
                        visible: true,
                        events: function events(start, end, timezone, callback) {
                            var _this3 = this;

                            var format = 'YYYY-MM-DD[T]HH:mm:ssZZ';
                            var params = {
                                start__gte: start.subtract(12, 'hours').format(format),
                                end__lte: end.add(12, 'hours').format(format),
                                equipment_reserved: equipment.id
                            };
                            api.reservations(params).then(function (response) {
                                callback(response.results);
                            }).catch(function (err) {
                                return _this3.error = err;
                            });
                        },
                        overlap: false,
                        color: _this2.getColour(i)
                    };
                    _this2.events.push(source);
                };

                for (var i = 0; i < data.results.length; i++) {
                    _loop(i);
                }
                _this2.isLoading = false;
            }).catch(function (err) {
                return _this2.error = err;
            });
        };

        Equipment.prototype.detatch = function detatch() {
            this.refetchSubscriber.dispose();
        };

        Equipment.prototype.getEquipment = function getEquipment() {
            var _this4 = this;

            this.api.equipment().then(function (data) {
                _this4.equipment = data;
                _this4.isLoading = false;
            });
        };

        Equipment.prototype.setStatus = function setStatus(equipmentId, event) {
            var data = {
                status: event.target.value
            };
            this.api.updateEquipment(equipmentId, data).then(function (response) {});
        };

        Equipment.prototype.changeLuminance = function changeLuminance(hex, lum) {
            var rgb = "#",
                c = void 0,
                i = void 0;
            for (var _i = 0; _i < 3; _i++) {
                c = parseInt(hex.substr(_i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        };

        Equipment.prototype.getColour = function getColour(index) {
            if (index < this.colours.length) {
                return this.colours[index];
            } else {
                var colourPick = Math.ceil(this.colours.length / index);
                return this.changeLuminance(colourPick, 0.25);
            }
        };

        return Equipment;
    }()) || _class);
});
define('equipment/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Equipment = exports.Equipment = function () {
        function Equipment() {
            _classCallCheck(this, Equipment);
        }

        Equipment.prototype.configureRouter = function configureRouter(config, router) {
            config.map(routes);
            this.router = router;
        };

        return Equipment;
    }();

    var routes = exports.routes = [{ route: ['', '/:id'], moduleId: './equipment', nav: false }];
});
define('equipment/ll-check-in',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-authentication', 'moment', 'moment-timezone'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaAuthentication, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlCheckIn = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlCheckIn = exports.LlCheckIn = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi, _aureliaEventAggregator.EventAggregator, _aureliaAuthentication.AuthService), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlCheckIn(equipmentApi, eventAggregator, authService) {
            _classCallCheck(this, LlCheckIn);

            _initDefineProp(this, 'toggle', _descriptor, this);

            this.api = equipmentApi;
            this.ea = eventAggregator;
            this.auth = authService;
        }

        LlCheckIn.prototype.toggleChanged = function toggleChanged(n) {
            var _this = this;

            if (n) {
                var format = 'YYYY-MM-DDTHH:mm:ssZZ';
                var payload = this.auth.getTokenPayload();
                var timezone = _moment2.default.tz.guess();
                var start = _moment2.default.tz([], timezone).subtract(1, 'hours');
                var end = _moment2.default.tz([], timezone).add(1, 'hours');
                var params = {
                    checked_in: 'False',
                    reserved_by__username: payload.username,
                    start__gte: start.format(format),
                    start__lte: end.format(format)
                };
                this.api.reservations(params).then(function (data) {
                    _this.checkIns = data;
                });
            }
        };

        LlCheckIn.prototype.save = function save() {
            var _this2 = this;

            var promises = [];
            for (var _iterator = this.checkIns.results, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var checkin = _ref;

                delete checkin.confirmed_by;
                promises.push(this.api.updateReservation(checkin.id, checkin));
            }
            Promise.all(promises).then(function (response) {
                _this2.ea.publish('refetch-events', { source: 'check-in' });
                _this2.cancel();
            });
        };

        LlCheckIn.prototype.cancel = function cancel() {
            this.toggle = false;
        };

        return LlCheckIn;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('equipment/ll-confirm-reservations',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-authentication', 'moment', 'moment-timezone'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaAuthentication, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlConfirmReservations = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlConfirmReservations = exports.LlConfirmReservations = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi, _aureliaEventAggregator.EventAggregator, _aureliaAuthentication.AuthService), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlConfirmReservations(equipmentApi, eventAggregator, authService) {
            _classCallCheck(this, LlConfirmReservations);

            _initDefineProp(this, 'toggle', _descriptor, this);

            this.api = equipmentApi;
            this.ea = eventAggregator;
            this.auth = authService;
        }

        LlConfirmReservations.prototype.toggleChanged = function toggleChanged(n) {
            var _this = this;

            if (n) {
                var format = 'YYYY-MM-DDTHH:mm:ssZZ';
                var now = _moment2.default.tz([], _moment2.default.tz.guess()).format(format);
                var params = {
                    is_confirmed: 'False',
                    start__gte: now
                };
                this.api.reservations(params).then(function (data) {
                    _this.reservations = data;
                });
            }
        };

        LlConfirmReservations.prototype.save = function save() {
            var _this2 = this;

            var promises = [];
            for (var _iterator = this.reservations.results, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var r = _ref;

                delete r.confirmed_by;
                promises.push(this.api.updateReservation(r.id, r));
            }
            Promise.all(promises).then(function (response) {
                _this2.ea.publish('refetch-events', { source: 'check-in' });
                _this2.cancel();
            });
        };

        LlConfirmReservations.prototype.cancel = function cancel() {
            this.toggle = false;
        };

        return LlConfirmReservations;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('equipment/ll-create-reservation',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', 'moment', 'moment-timezone'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlCreateReservation = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlCreateReservation = exports.LlCreateReservation = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlCreateReservation(equipmentApi, eventAggregator, validationController) {
            var _this = this;

            _classCallCheck(this, LlCreateReservation);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            this.api = equipmentApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.config = {
                type: 'date',
                today: true
            };

            this.source = {};

            this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            this.minutes = ['0', '15', '30', '45'];

            this.timezone = _moment2.default.tz.guess();

            var now = _moment2.default.tz([], this.timezone);

            var later = _moment2.default.tz([], this.timezone);
            later.add(30, 'm');

            this.source.from_date = now;
            this.source.from_hour = now.hour();
            this.source.from_minute = "" + this.roundDate(now, 'minutes', 15).minute();

            this.source.to_date = later;
            this.source.to_hour = later.hour();
            this.source.to_minute = "" + this.roundDate(later, 'minutes', 15).minute();

            this.api.equipment({ can_reserve: 'True' }).then(function (data) {
                _this.equipment = data;
            });

            this.dateChangedWatcher = this.ea.subscribe('date-changed', function (response) {
                return _this.dateChanged(response);
            });
        }

        LlCreateReservation.prototype.sourceChanged = function sourceChanged(n) {
            if (this.source.start && this.source.end) {
                this.source.from_date = this.source.start.toDate();
                this.source.from_hour = this.source.start.hour();
                this.source.from_minute = "" + this.source.start.minute();
                this.source.to_date = this.source.end.toDate();
                this.source.to_hour = this.source.end.hour();
                this.source.to_minute = "" + this.source.end.minute();
            } else {
                var now = _moment2.default.tz([], this.timezone);

                var later = _moment2.default.tz([], this.timezone);
                later.add(30, 'm');

                this.source.from_date = now;
                this.source.from_hour = now.hour();
                this.source.from_minute = "" + this.roundDate(now, 'minutes', 15).minute();

                this.source.to_date = later;
                this.source.to_hour = later.hour();
                this.source.to_minute = "" + this.roundDate(later, 'minutes', 15).minute();
            }
            _aureliaValidation.ValidationRules.ensure('equipment_reserved').required().ensure('from_date').required().ensure('from_hour').required().ensure('from_minute').required().ensure('to_date').required().ensure('to_hour').required().ensure('to_minute').required().on(this.source);
        };

        LlCreateReservation.prototype.detached = function detached() {
            this.dateChangedWatcher.dispose();
        };

        LlCreateReservation.prototype.roundDate = function roundDate(date, type, offset) {
            var val = date[type]();
            var roundedVal = Math.ceil((val + 1) / offset) * offset;
            return date[type](roundedVal);
        };

        LlCreateReservation.prototype.dateChanged = function dateChanged(event) {
            var _this2 = this;

            setTimeout(function () {
                if (event.target.attributes.name) {
                    if (event.target.attributes.name.value == 'from_date') {
                        if (_this2.source.from_date > _this2.source.to_date) {
                            _this2.source.to_date = _this2.source.from_date;
                        }
                    }
                    if (event.target.attributes.name.value == 'to_date') {
                        if (_this2.source.to_date < _this2.source.from_date) {
                            _this2.source.from_date = _this2.source.to_date;
                        }
                    }
                } else {
                    var name = event.target.parentElement.parentElement.attributes.name.value;
                    if (name == 'from_hour') {
                        if (_this2.source.from_date.toDateString() == _this2.source.to_date.toDateString() && parseInt(_this2.source.from_hour) > parseInt(_this2.source.to_hour)) {
                            _this2.source.to_hour = parseInt(_this2.source.from_hour);
                        }
                    }
                    if (name == 'to_hour') {
                        if (_this2.source.from_date == _this2.source.to_date && _this2.source.to_hour < _this2.source.from_hour) {
                            _this2.source.from_hour == _this2.source.to_hour;
                        }
                    }
                }
            }, 1);
        };

        LlCreateReservation.prototype.save = function save() {
            var _this3 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    var format = 'YYYY-MM-DDTHH:mm:ssZZ';
                    var start = _moment2.default.tz(_this3.source.from_date, _this3.timezone);
                    start.hour(_this3.source.from_hour);
                    start.minute(_this3.source.from_minute);
                    _this3.source.start = start.format(format);

                    var end = _moment2.default.tz(_this3.source.to_date, _this3.timezone);
                    end.hour(_this3.source.to_hour);
                    end.minute(_this3.source.to_minute);
                    _this3.source.end = end.format(format);
                    if (_this3.source.id) {
                        var updateValues = {
                            start: _this3.source.start,
                            end: _this3.source.end,
                            equipment_reserved: _this3.source.equipment_reserved,
                            reservation_details: _this3.source.reservation_details
                        };
                        _this3.api.updateReservation(_this3.source.id, updateValues).then(function (data) {
                            _this3.ea.publish('refetch-events', { source: 'update-reservation' });
                            _this3.cancel();
                        }).catch(function (err) {
                            return _this3.error = err;
                        });
                    } else {
                        _this3.api.createReservation(_this3.source).then(function (data) {
                            _this3.ea.publish('refetch-events', { source: 'create-reservation' });
                            _this3.cancel();
                        }).catch(function (err) {
                            return _this3.error = err;
                        });
                    }
                }
            });
        };

        LlCreateReservation.prototype.cancel = function cancel() {
            this.toggle = false;
            this.source = {};
            this.error = undefined;
        };

        return LlCreateReservation;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec3], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('filetemplates/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FiletemplateApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var FiletemplateApi = exports.FiletemplateApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function FiletemplateApi(config) {
            _classCallCheck(this, FiletemplateApi);

            this.endpoint = config.getEndpoint('api');
        }

        FiletemplateApi.prototype.filetemplates = function filetemplates(params) {
            return this.endpoint.find('filetemplates/', params);
        };

        FiletemplateApi.prototype.createFiletemplate = function createFiletemplate(data) {
            return this.endpoint.create('filetemplates/', data);
        };

        FiletemplateApi.prototype.updateFiletemplate = function updateFiletemplate(id, data) {
            return this.endpoint.patchOne('filetemplates/', id, null, data);
        };

        FiletemplateApi.prototype.deleteFiletemplate = function deleteFiletemplate(id) {
            return this.endpoint.destroyOne('filetemplates/', id);
        };

        return FiletemplateApi;
    }()) || _class);
});
define('inventory/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.InventoryApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var InventoryApi = exports.InventoryApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function InventoryApi(config) {
            _classCallCheck(this, InventoryApi);

            this.endpoint = config.getEndpoint('api');
        }

        InventoryApi.prototype.inventory = function inventory(params) {
            return this.endpoint.find('inventory/', params);
        };

        InventoryApi.prototype.inventoryDetail = function inventoryDetail(id, params) {
            return this.endpoint.findOne('inventory/', id, params);
        };

        InventoryApi.prototype.transfers = function transfers(params) {
            return this.endpoint.find('transfers/', params);
        };

        InventoryApi.prototype.groupedTransfers = function groupedTransfers(params) {
            return this.endpoint.find('transfers/grouped/', params);
        };

        InventoryApi.prototype.createItem = function createItem(data) {
            return this.endpoint.create('inventory/', data);
        };

        InventoryApi.prototype.updateItem = function updateItem(id, data) {
            return this.endpoint.patchOne('inventory/', id, null, data);
        };

        InventoryApi.prototype.deleteItem = function deleteItem(id) {
            return this.endpoint.destroyOne('inventory/', id);
        };

        InventoryApi.prototype.exportItems = function exportItems(fileTemplate, selected, queryValues) {
            var path = 'inventory/export_items/';
            var ignore = ['page', 'limit', 'ordering'];
            if (queryValues) {
                path += '?';
                for (var q in queryValues) {
                    if (ignore.indexOf(q) == -1 && queryValues[q]) {
                        path += '&' + q + '=' + queryValues[q];
                    }
                }
            }
            var data = {
                filetemplate: fileTemplate
            };
            if (selected) {
                data.selected = selected;
            }
            console.log(path);
            console.log(data);
            return this.endpoint.post(path, data);
        };

        InventoryApi.prototype.createMultipleItems = function createMultipleItems(data) {
            var path = 'inventory/importitems/';
            return this.endpoint.client.fetch(path, {
                method: 'post',
                body: data
            });
        };

        InventoryApi.prototype.createTransfer = function createTransfer(id, data) {
            var path = 'inventory/' + id + '/transfer/';
            return this.endpoint.request('POST', path, data);
        };

        InventoryApi.prototype.completeTransfer = function completeTransfer(itemId, transferId) {
            var path = 'inventory/' + itemId + '/transfer/?id=' + transferId + '&complete=True';
            return this.endpoint.request('POST', path);
        };

        InventoryApi.prototype.itemTypes = function itemTypes(params) {
            return this.endpoint.find('itemtypes/', params);
        };

        return InventoryApi;
    }()) || _class);
});
define('inventory/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Inventory = exports.Inventory = function () {
        function Inventory() {
            _classCallCheck(this, Inventory);
        }

        Inventory.prototype.configureRouter = function configureRouter(config, router) {
            config.map(routes);
            this.router = router;
        };

        return Inventory;
    }();

    var routes = exports.routes = [{ route: '', moduleId: './inventory', nav: false }, { route: '/404', moduleId: './not-found', nav: false, name: 'itemNotFound' }, { route: '/:id', name: 'inventoryDetail', moduleId: './inventory-detail', nav: false }, { route: '/transfers/', name: 'allTransfers', moduleId: './transfers',
        nav: false }, { route: '/transfers/:barcode', name: 'transferDetail', moduleId: './transfer-detail',
        nav: false }];
});
define('inventory/inventory-detail',['exports', 'aurelia-framework', './api', '../shared/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', 'aurelia-router'], function (exports, _aureliaFramework, _api, _api2, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.InventoryDetail = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var InventoryDetail = exports.InventoryDetail = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _api2.SharedApi, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaFramework.BindingEngine, _aureliaRouter.Router), _dec(_class = function () {
        function InventoryDetail(inventoryApi, eventAggregator, sharedApi, validationController, bindingEngine, router) {
            var _this = this;

            _classCallCheck(this, InventoryDetail);

            this.api = inventoryApi;
            this.ea = eventAggregator;
            this.sharedApi = sharedApi;
            this.bindingEngine = bindingEngine;
            this.router = router;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.item = {};

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('item_type').required().ensure('location').required().ensure('amount_available').matches(/[0-9\.]/).required().ensure('amount_measure').required().on(this.item);

            this.observe = ['name', 'item_type', 'location', 'barcode', 'identifier', 'amount_measure', 'concentration', 'concentration_measure'];
            this.subscribers = [];

            this.updateItem = function (n, o) {
                if (n != o) {
                    _this.api.updateItem(_this.item.id, _this.item).then(function (data) {
                        _this.item = data;
                        _this.subscribe();
                    }).catch(function (err) {
                        _this.error = err;
                    });
                }
            };

            this.updateProperty = function (n, o) {
                for (var _iterator = _this.item.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var p = _ref;

                    if (p.name != '' && p.value != '') {
                        _this.updateItem(n, o);
                    }
                }
            };

            this.updateProperties = function (splices) {
                if (splices[0].removed.length > 0) {
                    _this.updateItem();
                } else {
                    _this.observePropertyEntry(_this.item.properties[splices[0].index]);
                }
            };

            this.api.itemTypes().then(function (data) {
                _this.itemTypes = data;
            });

            this.sharedApi.measures().then(function (data) {
                _this.measures = data;
            });

            this.sharedApi.locations().then(function (data) {
                _this.locations = data;
            });
        }

        InventoryDetail.prototype.activate = function activate(params, routeMap) {
            this.params = params;
            this.routeMap = routeMap;

            this.getItem();
        };

        InventoryDetail.prototype.attached = function attached() {
            var _this2 = this;

            this.updateSubscriber = this.ea.subscribe('inventoryItemUpdated', function (response) {
                _this2.getItem();
            });
        };

        InventoryDetail.prototype.detached = function detached() {
            this.updateSubscriber.dispose();
            for (var _iterator2 = this.subscribers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var s = _ref2;

                s.dispose();
            }
        };

        InventoryDetail.prototype.subscribe = function subscribe() {
            for (var _iterator3 = this.subscribers, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var s = _ref3;

                s.dispose();
            }
            for (var _iterator4 = this.observe, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref4 = _i4.value;
                }

                var o = _ref4;

                this.subscribers.push(this.bindingEngine.propertyObserver(this.item, o).subscribe(this.updateItem));
            }

            this.subscribers.push(this.bindingEngine.collectionObserver(this.item.properties).subscribe(this.updateProperties));

            for (var _iterator5 = this.item.properties, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var p = _ref5;

                this.observePropertyEntry(p);
            }
        };

        InventoryDetail.prototype.observePropertyEntry = function observePropertyEntry(property) {
            this.subscribers.push(this.bindingEngine.propertyObserver(property, 'name').subscribe(this.updateProperty));
            this.subscribers.push(this.bindingEngine.propertyObserver(property, 'value').subscribe(this.updateProperty));
        };

        InventoryDetail.prototype.getItem = function getItem() {
            var _this3 = this;

            this.api.inventoryDetail(this.params.id).then(function (data) {
                _this3.item = data;
                _this3.routeMap.navModel.title = _this3.item.name;

                if (_this3.subscribers.length == 0) {
                    _this3.subscribe();
                }
            }).catch(function (err) {
                if (err.status == 404) {
                    _this3.router.navigateToRoute('itemNotFound');
                } else {
                    _this3.error = err;
                }
                console.log(err);
            });
        };

        InventoryDetail.prototype.addProperty = function addProperty() {
            this.item.properties.push({ name: '', value: '' });
        };

        InventoryDetail.prototype.removeProperty = function removeProperty(index) {
            this.item.properties.splice(index, 1);
        };

        return InventoryDetail;
    }()) || _class);
});
define('inventory/inventory',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-router', 'aurelia-dialog', '../components/semantic-ui/ui-prompt', '../shared/query-store'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaRouter, _aureliaDialog, _uiPrompt, _queryStore) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Inventory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Inventory = exports.Inventory = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaRouter.Router, _aureliaDialog.DialogService, _queryStore.QueryStore), _dec(_class = function () {
        function Inventory(inventoryApi, eventAggregator, router, dialogService, queryStore) {
            _classCallCheck(this, Inventory);

            this.groupBy = function (n, key) {
                return n.reduce(function (o, x) {
                    if (!o.has(x[key])) {
                        o.set(x[key], []);
                    }
                    o.get(x[key]).push(x);
                    return o;
                }, new Map());
            };

            this.api = inventoryApi;
            this.ea = eventAggregator;
            this.router = router;
            this.dialog = dialogService;
            this.qs = queryStore;

            this.selected = [];

            this.addItem = false;
            this.addMultipleItems = false;
            this.dispenseMultipleItems = false;

            this.tempMessage = false;

            this.searchOptions = {
                useAdvanced: true,
                fields: [{ name: 'id', display: 'Id', op: ['exact'] }, { name: 'name', display: 'Name', op: ['exact', 'icontains'] }, { name: 'added_by__username', display: 'Added by', op: ['exact'] }, { name: 'identifier', display: 'Identifier', op: ['exact'] }, { name: 'barcode', display: 'Barcode', op: ['exact'] }, { name: 'description', display: 'Description', op: ['icontains'] }, { name: 'item_type__name', display: 'Item type', op: ['exact'] }, { name: 'location__name', display: 'Location', op: ['exact'] }, { name: 'in_inventory', display: 'Available', op: ['exact'] }, { name: 'amount_measure__symbol', display: 'Measure', op: ['exact'] }, { name: 'amount_available', display: 'Amount',
                    op: ['exact', 'lt', 'lte', 'gt', 'gte'] }, { name: 'concentration_measure__symbol', display: 'Concentration measure',
                    op: ['exact'] }, { name: 'concentration', display: 'Concentration',
                    op: ['exact', 'lt', 'lte', 'gt', 'gte'] }, { name: 'added_on', display: 'Added on', op: ['exact', 'lt', 'lte', 'gt', 'gte'] }, { name: 'last_updated_on', display: 'Last updated',
                    op: ['exact', 'lt', 'lte', 'gt', 'gte'] }, { name: 'properties__name', display: 'Property name', op: ['exact', 'icontains'] }, { name: 'properties__value', display: 'Property value',
                    op: ['exact', 'icontains'] }]
            };

            this.query = {
                limit: 10,
                in_inventory: 'True'
            };

            this.transfer_query = {
                limit: 200,
                ordering: 'barcode'
            };

            this.exportItems = false;

            this.isLoading = true;
            this.isLoadingTransfers = true;
        }

        Inventory.prototype.attached = function attached() {
            var _this = this;

            this.query = this.qs.getQuery('inventory', this.query);
            this.transfer_query = this.qs.getQuery('inventory_transfers', this.transfer_query);
            this.getInventory();
            this.getTransfers();
            this.querySubscriber = this.ea.subscribe('queryChanged', function (response) {
                if (response.source == 'pagination') {
                    _this.query.page = response.page;
                    _this.query.limit = response.limit;
                }
                if (response.source == 'search') {
                    _this.query.search = response.value;
                }
                if (response.source == 'importInventory') {
                    _this.tempMessage = true;
                    _this.tempMessageColour = 'positive';
                    _this.tempMessageTitle = 'Import successful';
                    _this.tempMessageText = response.saved.length + ' items where added.';
                }
                _this.qs.storeQuery('inventory', _this.query);
                _this.getInventory();
            });

            this.transferSubscriber = this.ea.subscribe('transfersUpdated', function (response) {
                _this.getTransfers();
            });
        };

        Inventory.prototype.detached = function detached() {
            this.querySubscriber.dispose();
            this.transferSubscriber.dispose();
        };

        Inventory.prototype.getInventory = function getInventory() {
            var _this2 = this;

            this.api.inventory(this.query).then(function (data) {
                _this2.inventory = data;
                _this2.query.page = 1;
                _this2.isLoading = false;
            });
        };

        Inventory.prototype.getTransfers = function getTransfers() {
            var _this3 = this;

            this.api.groupedTransfers(this.transfer_query).then(function (data) {
                _this3.transfers = new Map(Object.entries(data));
                _this3.isLoadingTransfers = false;
            });
        };

        Inventory.prototype.completeTransfer = function completeTransfer(item) {
            var _this4 = this;

            this.api.completeTransfer(item.item, item.id).then(function (response) {
                _this4.getTransfers();
            });
        };

        Inventory.prototype.deleteItems = function deleteItems() {
            var _this5 = this;

            var message = 'Delete ' + this.selected.length + ' item?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var promises = [];
                    for (var _iterator = _this5.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        promises.push(_this5.api.deleteItem(item.id));
                    }
                    Promise.all(promises).then(function (response) {
                        _this5.getInventory();
                        _this5.selected.splice(0, _this5.selected.length);
                    });
                }
            });
        };

        return Inventory;
    }()) || _class);
});
define('inventory/ll-add-item',['exports', 'aurelia-framework', 'aurelia-router', './api', '../shared/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _aureliaRouter, _api, _api2, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlAddItem = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlAddItem = exports.LlAddItem = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _api2.SharedApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaRouter.Router), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlAddItem(inventoryApi, sharedApi, eventAggregator, validationController, router) {
            var _this = this;

            _classCallCheck(this, LlAddItem);

            _initDefineProp(this, 'toggle', _descriptor, this);

            this.api = inventoryApi;
            this.sharedApi = sharedApi;
            this.ea = eventAggregator;
            this.router = router;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.item = {
                properties: []
            };

            this.api.itemTypes().then(function (data) {
                _this.types = data;
            });

            this.sharedApi.measures().then(function (data) {
                _this.measures = data;
            });

            this.sharedApi.locations().then(function (data) {
                _this.locations = data;
            });

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('item_type').required().ensure('location').required().ensure('amount_available').matches(/[0-9\.]/).required().ensure('amount_measure').required().on(this.item);
        }

        LlAddItem.prototype.addProperty = function addProperty() {
            this.item.properties.push({ name: '', value: '' });
        };

        LlAddItem.prototype.removeProperty = function removeProperty(index) {
            this.item.properties.splice(index, 1);
        };

        LlAddItem.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                console.log(results);
                if (results.valid) {
                    _this2.api.createItem(_this2.item).then(function (data) {
                        _this2.router.navigateToRoute('inventoryDetail', { id: data.id });
                    }).catch(function (err) {
                        _this2.error = err;
                    });
                }
            });
        };

        LlAddItem.prototype.cancel = function cancel() {
            this.item = {};
            this.toggle = false;
        };

        return LlAddItem;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/ll-add-multiple-items',['exports', 'aurelia-framework', 'aurelia-router', './api', '../filetemplates/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _aureliaRouter, _api, _api2, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlAddMultipleItems = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlAddMultipleItems = exports.LlAddMultipleItems = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _api2.FiletemplateApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaRouter.Router), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlAddMultipleItems(inventoryApi, filetemplateApi, eventAggregator, validationController, router) {
            _classCallCheck(this, LlAddMultipleItems);

            _initDefineProp(this, 'toggle', _descriptor, this);

            this.api = inventoryApi;
            this.filetemplateApi = filetemplateApi;
            this.ea = eventAggregator;
            this.router = router;

            this.options = {};
            this.fields = '';
            this.rejected = [];
            this.hasRejected = false;
            this.isLoading = false;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());
        }

        LlAddMultipleItems.prototype.setFields = function setFields(event) {
            this.fields = '';
            var fileTemplate = this.fileTemplates.results.find(function (elem) {
                return elem.id == event.target.value;
            });
            for (var _iterator = fileTemplate.fields, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var field = _ref;

                this.fields += field.name + ', ';
            }
            this.fields.trim(', ');
        };

        LlAddMultipleItems.prototype.toggleChanged = function toggleChanged(value) {
            var _this = this;

            if (value) {
                _aureliaValidation.ValidationRules.ensure('file_template').required().ensure('items_file').required().on(this.options);

                this.filetemplateApi.filetemplates({ limit: 200 }).then(function (data) {
                    _this.fileTemplates = data;
                });
            }
        };

        LlAddMultipleItems.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    var params = new FormData();
                    params.append('items_file', _this2.options.items_file[0]);
                    params.append('filetemplate', _this2.options.file_template);
                    params.append('permissions', JSON.stringify(_this2.options.assign_groups));
                    _this2.isLoading = true;
                    _this2.api.createMultipleItems(params).then(function (data) {
                        _this2.isLoading = false;
                        data.json().then(function (response) {
                            data.body = response;
                            if (response.rejected.length > 0) {
                                _this2.hasRejected = true;
                                _this2.rejected = response.rejected;
                            } else {
                                _this2.cancel();
                            }
                            _this2.ea.publish('queryChanged', { source: 'importInventory',
                                saved: response.saved,
                                rejected: response.rejected });
                        }).catch(function (err) {
                            _this2.isLoading = false;
                            _this2.error = data;
                        });
                    }).catch(function (err) {
                        _this2.error = err;
                    });
                }
            });
        };

        LlAddMultipleItems.prototype.cancel = function cancel() {
            this.options = {};
            this.fields = '';
            this.rejected = [];
            this.hasRejected = false;
            this.toggle = false;
        };

        return LlAddMultipleItems;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/ll-dispense-amount',['exports', 'aurelia-framework', '../inventory/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlDispenseAmount = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlDispenseAmount = exports.LlDispenseAmount = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlDispenseAmount(inventoryApi, eventAggregator, validationController) {
            _classCallCheck(this, LlDispenseAmount);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.api = inventoryApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.transfer = {};

            _aureliaValidation.ValidationRules.ensure('amount').required().matches(/[0-9.]/).on(this.transfer);
        }

        LlDispenseAmount.prototype.sourceChanged = function sourceChanged() {
            if (this.source) {
                this.transfer.measure = this.source.amount_measure;
            }
        };

        LlDispenseAmount.prototype.save = function save() {
            var _this = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this.api.createTransfer(_this.source.id, _this.transfer).then(function (data) {
                        _this.ea.publish('inventoryItemUpdated', { source: 'transfer' });
                        _this.cancel();
                    }).catch(function (err) {
                        _this.error = err;
                    });
                }
            });
        };

        LlDispenseAmount.prototype.cancel = function cancel() {
            this.transfer = {};
            this.error = null;
            this.toggle = false;
        };

        return LlDispenseAmount;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/ll-dispense-multiple-items',['exports', 'aurelia-framework', '../inventory/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlDispenseMultipleItems = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlDispenseMultipleItems = exports.LlDispenseMultipleItems = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlDispenseMultipleItems(inventoryApi, eventAggregator, validationController) {
            var _this = this;

            _classCallCheck(this, LlDispenseMultipleItems);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'searchText', _descriptor2, this);

            this.api = inventoryApi;
            this.ea = eventAggregator;
            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.items = {};
            this.dispense = [];

            this.rules = _aureliaValidation.ValidationRules.ensure('dispense_amount').required().matches(/[0-9.]/).ensure('destination_coordinates').satisfies(function (value, obj) {
                if (value) {
                    for (var _iterator = _this.dispense, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var o = _ref;

                        if (o.randomString !== obj.randomString) {
                            if (o.destination_barcode && o.destination_coordinates && obj.destination_barcode && obj.destination_coordinates && o.destination_barcode === obj.destination_barcode && o.destination_coordinates === obj.destination_coordinates) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            }).rules;
        }

        LlDispenseMultipleItems.prototype.searchTextChanged = function searchTextChanged(n) {
            var _this2 = this;

            this.api.inventory({ search: n }).then(function (data) {
                _this2.items = data;
            }).catch(function (err) {
                return _this2.error = err;
            });
        };

        LlDispenseMultipleItems.prototype.addItem = function addItem(item) {
            var newItem = Object.assign({}, item);

            var randomEnough = Math.random().toString(36).slice(2);
            newItem.randomString = randomEnough;
            this.validator.addObject(newItem, this.rules);
            this.dispense.push(newItem);
        };

        LlDispenseMultipleItems.prototype.removeItem = function removeItem(index) {
            this.validator.removeObject(this.dispense[index]);
            this.dispense.splice(index, 1);
        };

        LlDispenseMultipleItems.prototype.save = function save() {
            var _this3 = this;

            this.validator.validate().then(function (results) {
                console.log(results);
                if (results.valid) {
                    var promises = [];
                    for (var _iterator2 = _this3.dispense, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var obj = _ref2;

                        var transfer = {
                            amount: obj.dispense_amount,
                            barcode: obj.destination_barcode,
                            coordinates: obj.destination_coordinates
                        };
                        promises.push(_this3.api.createTransfer(obj.id, transfer));
                    }
                    Promise.all(promises).then(function (response) {
                        _this3.ea.publish('transfersUpdated', { source: 'dispense-multiple' });
                        _this3.cancel();
                    }).catch(function (err) {
                        _this3.error = err;
                    });
                }
            });
        };

        LlDispenseMultipleItems.prototype.cancel = function cancel() {
            this.dispense = [];
            this.error = null;
            this.toggle = false;
        };

        return LlDispenseMultipleItems;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'searchText', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/ll-export-items',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlExportItems = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

    var LlExportItems = exports.LlExportItems = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaFramework.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlExportItems(inventoryApi, eventAggregator, validationController, bindingEngine) {
            var _this = this;

            _classCallCheck(this, LlExportItems);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'queryData', _descriptor2, this);

            _initDefineProp(this, 'selected', _descriptor3, this);

            _initDefineProp(this, 'searchCount', _descriptor4, this);

            this.api = inventoryApi;
            this.ea = eventAggregator;
            this.be = bindingEngine;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.exportData = {};
            this.useSelected = false;
            this.count = 0;
            this.download = false;

            this.selectedUpdated = function (s) {
                if (_this.selected && _this.selected.length > 0) {
                    _this.useSelected = true;
                    _this.count = _this.selected.length;
                } else {
                    _this.useSelected = false;
                    _this.count = _this.searchCount;
                }
            };
        }

        LlExportItems.prototype.toggleChanged = function toggleChanged() {
            _aureliaValidation.ValidationRules.ensure('filetemplate').required().on(this.exportData);
            this.selectedUpdated(false);
        };

        LlExportItems.prototype.selectedChanged = function selectedChanged(n) {
            this.checkSelected = this.be.collectionObserver(this.selected).subscribe(this.selectedUpdated);
        };

        LlExportItems.prototype.detached = function detached() {
            this.checkSelected.dispose();
        };

        LlExportItems.prototype.searchCountChanged = function searchCountChanged(n) {
            if (!this.useSelected) {
                this.count = n;
            }
        };

        LlExportItems.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this2.generatingFile = true;
                    var selected = false;
                    if (_this2.selected.length > 0) {
                        selected = _this2.selected.reduce(function (n, c) {
                            return n + (c.id + ",");
                        }, "");
                    }
                    _this2.api.exportItems(_this2.exportData.filetemplate, selected, _this2.query).then(function (response) {
                        _this2.download = true;
                        _this2.generatingFile = false;
                        var fileBlob = new Blob([response], { type: 'text/csv' });
                        _this2.fileUrl = URL.createObjectURL(fileBlob);
                    });
                }
            });
        };

        LlExportItems.prototype.cancel = function cancel() {
            this.exportData = {};
            this.useSelected = false;
            this.generatingFile = false;
            this.count = 0;
            this.download = false;
            this.toggle = false;
        };

        return LlExportItems;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'queryData', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'searchCount', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/ll-restock-amount',['exports', 'aurelia-framework', '../inventory/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlRestockAmount = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlRestockAmount = exports.LlRestockAmount = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlRestockAmount(inventoryApi, eventAggregator, validationController) {
            _classCallCheck(this, LlRestockAmount);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.api = inventoryApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.transfer = {};

            _aureliaValidation.ValidationRules.ensure('amount').required().on(this.transfer);
        }

        LlRestockAmount.prototype.sourceChanged = function sourceChanged() {
            if (this.source) {
                this.transfer.measure = this.source.amount_measure;
                this.transfer.is_addition = true;
                this.transfer.transfer_complete = true;
            }
        };

        LlRestockAmount.prototype.save = function save() {
            var _this = this;

            this.api.createTransfer(this.source.id, this.transfer).then(function (data) {
                _this.ea.publish('inventoryItemUpdated', { source: 'transfer' });
                _this.cancel();
            }).catch(function (err) {
                _this.error = err;
            });
        };

        LlRestockAmount.prototype.cancel = function cancel() {
            this.transfer = {};
            this.error = null;
            this.toggle = false;
        };

        return LlRestockAmount;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('inventory/not-found',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NotFound = exports.NotFound = function NotFound() {
    _classCallCheck(this, NotFound);
  };
});
define('inventory/transfer-detail',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TransferDetail = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var TransferDetail = exports.TransferDetail = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function TransferDetail(inventoryApi, eventAggregator) {
            _classCallCheck(this, TransferDetail);

            this.api = inventoryApi;
            this.ea = eventAggregator;
        }

        TransferDetail.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.params = params;
            this.routeMap = routeMap;

            this.routeMap.navModel.title = params.barcode;
            this.barcode = params.barcode;

            this.api.transfers({ barcode: params.barcode }).then(function (data) {
                _this.transfers = data;
            });
        };

        return TransferDetail;
    }()) || _class);
});
define('inventory/transfers',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Transfers = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Transfers = exports.Transfers = (_dec = (0, _aureliaFramework.inject)(_api.InventoryApi, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function Transfers(inventoryApi, eventAggregator) {
            _classCallCheck(this, Transfers);

            this.api = inventoryApi;
            this.ea = eventAggregator;

            this.query = {
                limit: 10
            };

            this.getTransfers();
        }

        Transfers.prototype.attached = function attached() {
            var _this = this;

            this.querySubscriber = this.ea.subscribe('queryChanged', function (response) {
                if (response.source == 'pagination') {
                    _this.query.page = response.page;
                    _this.query.limit = response.limit;
                }
                _this.getTransfers();
            });
        };

        Transfers.prototype.detached = function detached() {
            this.querySubscriber.dispose();
        };

        Transfers.prototype.getTransfers = function getTransfers() {
            var _this2 = this;

            this.api.transfers(this.query).then(function (data) {
                _this2.transfers = data;
            });
        };

        return Transfers;
    }()) || _class);
});
define('projects/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProjectApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ProjectApi = exports.ProjectApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function ProjectApi(config) {
            _classCallCheck(this, ProjectApi);

            this.endpoint = config.getEndpoint('api');
        }

        ProjectApi.prototype.projects = function projects(params) {
            return this.endpoint.find('projects/', params);
        };

        ProjectApi.prototype.projectDetail = function projectDetail(id, params) {
            return this.endpoint.findOne('projects/', id);
        };

        ProjectApi.prototype.createProject = function createProject(data) {
            return this.endpoint.create('projects/', data);
        };

        ProjectApi.prototype.updateProject = function updateProject(id, data) {
            return this.endpoint.patchOne('projects/', id, null, data);
        };

        ProjectApi.prototype.deleteProject = function deleteProject(id) {
            return this.endpoint.destroyOne('projects/', id);
        };

        ProjectApi.prototype.updateDeadline = function updateDeadline(id, data) {
            var endpoint = 'projects/' + id + '/update_deadline/';
            return this.endpoint.patch(endpoint, null, data);
        };

        ProjectApi.prototype.productsForProject = function productsForProject(id, params) {
            params.project = id;
            return this.endpoint.find('products/', params);
        };

        ProjectApi.prototype.productDetail = function productDetail(id, params) {
            return this.endpoint.findOne('products/', id);
        };

        ProjectApi.prototype.saveProduct = function saveProduct(projectId, data) {
            data.project = projectId;
            return this.endpoint.create('products/', data);
        };

        ProjectApi.prototype.updateProduct = function updateProduct(id, data) {
            return this.endpoint.patchOne('products/', id, null, data);
        };

        ProjectApi.prototype.deleteProduct = function deleteProduct(id) {
            return this.endpoint.destroyOne('products/', id);
        };

        ProjectApi.prototype.addAttachment = function addAttachment(productId, data) {
            var path = 'products/' + productId + '/add_attachment/';
            return this.endpoint.client.fetch(path, {
                method: 'post',
                body: data
            });
        };

        ProjectApi.prototype.removeAttachment = function removeAttachment(productId, attachmentId) {
            var path = 'products/' + productId + '/delete_attachment/?id=' + attachmentId;
            return this.endpoint.client.fetch(path, {
                method: 'delete'
            });
        };

        ProjectApi.prototype.importProducts = function importProducts(projectId, data) {
            var path = 'projects/' + projectId + '/import_products/';
            return this.endpoint.client.fetch(path, {
                method: 'post',
                body: data
            });
        };

        ProjectApi.prototype.productStatuses = function productStatuses(params) {
            return this.endpoint.find('productstatuses/', params);
        };

        ProjectApi.prototype.createProductStatus = function createProductStatus(data) {
            return this.endpoint.create('productstatuses/', data);
        };

        ProjectApi.prototype.updateProductStatus = function updateProductStatus(id, data) {
            return this.endpoint.patchOne('productstatuses/', id, null, data);
        };

        ProjectApi.prototype.deleteProductStatus = function deleteProductStatus(id) {
            return this.endpoint.destroyOne('productstatuses/', id);
        };

        ProjectApi.prototype.projectStatuses = function projectStatuses(params) {
            return this.endpoint.find('projectstatuses/', params);
        };

        ProjectApi.prototype.createProjectStatus = function createProjectStatus(data) {
            return this.endpoint.create('projectstatuses/', data);
        };

        ProjectApi.prototype.updateProjectStatus = function updateProjectStatus(id, data) {
            return this.endpoint.patchOne('projectstatuses/', id, null, data);
        };

        ProjectApi.prototype.deleteProjectStatus = function deleteProjectStatus(id) {
            return this.endpoint.destroyOne('projectstatuses/', id);
        };

        return ProjectApi;
    }()) || _class);
});
define('projects/history-dialog',['exports', 'aurelia-framework', 'aurelia-dialog'], function (exports, _aureliaFramework, _aureliaDialog) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HistoryDialog = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var HistoryDialog = exports.HistoryDialog = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function HistoryDialog(dialogController) {
            _classCallCheck(this, HistoryDialog);

            this.dialog = dialogController;
        }

        HistoryDialog.prototype.activate = function activate(dataEntry) {
            this.data = dataEntry;
        };

        return HistoryDialog;
    }()) || _class);
});
define('projects/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Project = exports.Project = function () {
        function Project() {
            _classCallCheck(this, Project);
        }

        Project.prototype.configureRouter = function configureRouter(config, router) {
            config.map(routes);
            this.router = router;
        };

        return Project;
    }();

    var routes = exports.routes = [{ route: '', moduleId: './projects', nav: false }, { route: '/:id', name: 'projectDetail', moduleId: './project-detail', nav: false }, { route: '/:id/history', name: 'productHistory', moduleId: './product-history', nav: false }];
});
define('projects/ll-deadline',['exports', 'aurelia-framework', './api', 'moment'], function (exports, _aureliaFramework, _api, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlDeadline = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

    var LlDeadline = exports.LlDeadline = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi), _dec(_class = (_class2 = function () {
        function LlDeadline(projectApi) {
            _classCallCheck(this, LlDeadline);

            _initDefineProp(this, 'projectId', _descriptor, this);

            _initDefineProp(this, 'deadline', _descriptor2, this);

            _initDefineProp(this, 'deadlineStatus', _descriptor3, this);

            _initDefineProp(this, 'deadlineWarn', _descriptor4, this);

            _initDefineProp(this, 'extensions', _descriptor5, this);

            _initDefineProp(this, 'inactive', _descriptor6, this);

            _initDefineProp(this, 'warn', _descriptor7, this);

            _initDefineProp(this, 'past', _descriptor8, this);

            this.api = projectApi;

            this.config = {
                type: 'date',
                today: true
            };
        }

        LlDeadline.prototype.deadlineChanged = function deadlineChanged(n) {
            if (n) {
                var deadline = (0, _moment2.default)(this.deadline);
                var today = (0, _moment2.default)();
                this.daysToDeadline = deadline.diff(today, 'days');
                if (this.daysToDeadline < 0) {
                    this.daysToDeadline = Math.abs(this.daysToDeadline);
                    this.deadlinePassed = true;
                } else {
                    this.deadlinePassed = false;
                }
            }
        };

        LlDeadline.prototype.setDeadline = function setDeadline() {
            var _this = this;

            if (this.deadline && !this.deadlineStatus) {
                var data = {
                    deadline: this.deadline
                };
                if (this.deadlineWarn) {
                    data.deadline_warn = this.deadlineWarn;
                }
                this.api.updateProject(this.projectId, data).then(function (result) {
                    _this.deadlineStatus = result.deadline_status;
                    _this.warn = result.warn_deadline;
                    _this.past = result.past_deadline;
                });
            } else if (this.deadline && this.reason && this.deadlineStatus) {
                var _data = {
                    deadline: this.deadline,
                    reason: this.reason
                };
                if (this.deadlineWarn) {
                    _data.deadline_warn = this.deadlineWarn;
                }
                this.api.updateDeadline(this.projectId, _data).then(function (result) {
                    _this.edit = false;
                    _this.reason = '';
                    _this.warn = result.warn_deadline;
                    _this.past = result.past_deadline;
                    _this.extensions = result.deadline_extensions;
                    _this.deadlineChanged(_this.deadline);
                });
            }
        };

        LlDeadline.prototype.save = function save() {};

        return LlDeadline;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'projectId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'deadline', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'deadlineStatus', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'deadlineWarn', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'extensions', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'inactive', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'warn', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'past', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-import-products',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlImportProducts = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlImportProducts = exports.LlImportProducts = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlImportProducts(projectApi, eventAggregator, validationController) {
            _classCallCheck(this, LlImportProducts);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            this.api = projectApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.isLoading = false;
            this.products = {};
            this.rejected = [];

            _aureliaValidation.ValidationRules.ensure('products').required();
        }

        LlImportProducts.prototype.save = function save() {
            var _this = this;

            this.validator.validate().then(function (results) {
                var formData = new FormData();
                formData.append('products_file', _this.products.products[0]);
                if (_this.products.items) {
                    for (var _iterator = _this.products.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var _ref2 = _ref,
                            key = _ref2[0],
                            fileItem = _ref2[1];

                        formData.append(key, fileItem[0]);
                    }
                }
                _this.isLoading = true;
                _this.api.importProducts(_this.source.id, formData).then(function (data) {
                    _this.isLoading = false;
                    data.json().then(function (response) {
                        data.body = response;
                        if (response.rejected.length > 0) {
                            _this.hasRejected = true;
                            _this.rejected = response.rejected;
                        } else {
                            _this.cancel();
                        }
                        _this.ea.publish('queryChanged', { source: 'importProducts' });
                    }).catch(function (err) {
                        _this.isLoading = false;
                        _this.error = data;
                    });
                }).catch(function (err) {
                    _this.isLoading = false;
                    _this.error = err;
                });
            });
        };

        LlImportProducts.prototype.cancel = function cancel() {
            this.products = {};
            this.rejected = [];
            this.error = false;
            this.hasRejected = false;
            this.toggle = false;
        };

        return LlImportProducts;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-inventory-items',['exports', 'aurelia-framework', './api', 'aurelia-dialog', '../components/semantic-ui/ui-picker-dialog'], function (exports, _aureliaFramework, _api, _aureliaDialog, _uiPickerDialog) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlInventoryItems = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlInventoryItems = exports.LlInventoryItems = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _api.ProjectApi), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlInventoryItems(dialogService, projectApi) {
            _classCallCheck(this, LlInventoryItems);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'sourceId', _descriptor2, this);

            this.dialog = dialogService;
            this.api = projectApi;
        }

        LlInventoryItems.prototype.addItem = function addItem() {
            var _this = this;

            var config = {
                title: 'Select inventory items',
                lookup: 'inventory',
                displayName: 'name',
                displayOther: ['item_type', 'identifier', 'barcode']
            };
            this.dialog.open({ viewModel: _uiPickerDialog.UiPickerDialog, model: config, lock: true }).whenClosed(function (response) {
                console.log(response);
                Array.prototype.push.apply(_this.source, response.output);
            });
        };

        LlInventoryItems.prototype.removeItem = function removeItem(index) {
            this.source.splice(index, 1);
        };

        return LlInventoryItems;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'sourceId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-links',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlLinks = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlLinks = exports.LlLinks = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlLinks(eventAggregator) {
            _classCallCheck(this, LlLinks);

            _initDefineProp(this, 'source', _descriptor, this);

            this.ea = eventAggregator;
            this.link = {};
        }

        LlLinks.prototype.sourceChanged = function sourceChanged() {
            if (this.source && !this.source.links) {
                this.source.links = [];
            }
        };

        LlLinks.prototype.save = function save() {
            if (this.link.url != '' && this.link.display_name != '') {
                this.source.links.push(this.link);
                this.ea.publish('projectUpdated', { source: 'links' });
                this.add = false;
                this.link = {};
            }
        };

        LlLinks.prototype.remove = function remove(index) {
            this.source.links.splice(index, 1);
            this.ea.publish('projectUpdated', { source: 'links' });
        };

        LlLinks.prototype.cancel = function cancel() {
            this.add = false;
            this.link = {};
        };

        return LlLinks;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-new-product',['exports', 'aurelia-framework', './api', '../inventory/api', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _api2, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlNewProduct = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlNewProduct = exports.LlNewProduct = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _api2.InventoryApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlNewProduct(projectApi, inventoryApi, eventAggregator, validationController) {
            var _this = this;

            _classCallCheck(this, LlNewProduct);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            this.api = projectApi;
            this.inventoryApi = inventoryApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.product = {};

            this.validationRules = _aureliaValidation.ValidationRules.ensure('name').required().ensure('status').required().ensure('product_type').required();

            this.validationRules.on(this.product);

            this.api.productStatuses().then(function (data) {
                _this.statuses = data;
            });

            this.inventoryApi.itemTypes().then(function (data) {
                _this.productTypes = data;
            });
        }

        LlNewProduct.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this2.api.saveProduct(_this2.source.id, _this2.product).then(function (data) {
                        _this2.cancel();
                        _this2.ea.publish('productAdded', { source: 'newProduct' });
                    }).catch(function (err) {
                        _this2.error = err;
                    });
                }
            });
        };

        LlNewProduct.prototype.cancel = function cancel() {
            this.toggle = false;
            this.product = {};
            this.validationRules.on(this.product);
            this.error = undefined;
        };

        return LlNewProduct;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-new-project',['exports', 'aurelia-framework', './api', '../auth/api', '../crm/api', 'aurelia-event-aggregator', 'aurelia-router', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', 'aurelia-configuration'], function (exports, _aureliaFramework, _api, _api2, _api3, _aureliaEventAggregator, _aureliaRouter, _aureliaValidation, _uiValidationRenderer, _aureliaConfiguration) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlNewProject = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlNewProject = exports.LlNewProject = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _api2.UserApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaRouter.Router, _aureliaConfiguration.AureliaConfiguration, _api3.CrmApi, _aureliaFramework.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlNewProject(projectApi, userApi, eventAggregator, validationController, router, aureliaConfiguration, crmApi, bindingEngine) {
            var _this = this;

            _classCallCheck(this, LlNewProject);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            this.api = projectApi;
            this.userApi = userApi;
            this.crmApi = crmApi;
            this.ea = eventAggregator;
            this.be = bindingEngine;
            this.router = router;
            this.config = aureliaConfiguration;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.project = {};

            this.dateConfig = {
                type: 'date',
                today: true
            };

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('status').required().ensure('primary_lab_contact').required().on(this.project);

            this.api.projectStatuses().then(function (data) {
                _this.statuses = data;
            });

            this.be.propertyObserver(this, 'crm_project').subscribe(function (n, o) {
                var selected = n;
                _this.crmApi.crmProjects({ id: selected }).then(function (data) {
                    var p = data.results[0];
                    _this.project.name = p.Name;
                    _this.project.description = p.Description;
                    _this.project.crmId = p.Id;
                });
            });
        }

        LlNewProject.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this2.api.createProject(_this2.project).then(function (data) {
                        if (_this2.project.crmId) {
                            _this2.crmApi.associateCRMProject(data.id, _this2.project.crmId);
                        }
                        _this2.router.navigateToRoute('projectDetail', { id: data.id });
                    }).catch(function (err) {
                        _this2.errors = err;
                    });
                }
            });
        };

        LlNewProject.prototype.cancel = function cancel() {
            this.project = {};
            this.toggle = false;
        };

        return LlNewProject;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/ll-product-attachments',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlProductAttachments = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlProductAttachments = exports.LlProductAttachments = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlProductAttachments(projectApi) {
            _classCallCheck(this, LlProductAttachments);

            _initDefineProp(this, 'source', _descriptor, this);

            _initDefineProp(this, 'sourceId', _descriptor2, this);

            this.api = projectApi;
            this.attachmentFile = null;
            this.error = null;
        }

        LlProductAttachments.prototype.addAttachment = function addAttachment() {
            var _this = this;

            if (this.attachmentFile) {
                var data = new FormData();
                data.append('attachment', this.attachmentFile[0]);
                this.api.addAttachment(this.sourceId, data).then(function (data) {
                    data.json().then(function (response) {
                        data.body = response;
                        _this.source.push(response);
                        _this.addNew = false;
                        _this.attachmentFile = null;
                    }).catch(function (err) {
                        _this.error = data;
                    });
                }).catch(function (err) {
                    _this.error = err;
                });
            } else {
                this.message = 'Please select a file to attach.';
            }
        };

        LlProductAttachments.prototype.removeAttachment = function removeAttachment(index, item) {
            var _this2 = this;

            this.api.removeAttachment(this.sourceId, item.id).then(function (data) {
                data.json().then(function (response) {
                    _this2.source.splice(index, 1);
                }).catch(function (err) {
                    _this2.error = data;
                });
            }).catch(function (err) {
                _this2.error = err;
            });
        };

        return LlProductAttachments;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'sourceId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/product-history',['exports', 'aurelia-framework', './api', 'aurelia-dialog', './history-dialog'], function (exports, _aureliaFramework, _api, _aureliaDialog, _historyDialog) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProductHistory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ProductHistory = exports.ProductHistory = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _aureliaDialog.DialogService), _dec(_class = function () {
        function ProductHistory(projectApi, dialogService) {
            _classCallCheck(this, ProductHistory);

            this.api = projectApi;
            this.dialog = dialogService;
        }

        ProductHistory.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.api.projectDetail(params.id).then(function (data) {
                _this.project = data;
                _this.getProducts();
            });
        };

        ProductHistory.prototype.getProducts = function getProducts() {
            var _this2 = this;

            this.api.productsForProject(this.project.id, { with_data: 'True' }).then(function (data) {
                _this2.products = data;
                _this2.isLoading = false;
            });
        };

        ProductHistory.prototype.showData = function showData(data) {
            this.dialog.open({ viewModel: _historyDialog.HistoryDialog, model: data }).whenClosed(function (response) {
                if (!response.wasCancelled) {}
            });
        };

        return ProductHistory;
    }()) || _class);
});
define('projects/product',['exports', 'aurelia-framework', './api', '../inventory/api', 'aurelia-route-mapper', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _api2, _aureliaRouteMapper, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProductCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var ProductCustomElement = exports.ProductCustomElement = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _api2.InventoryApi, _aureliaFramework.BindingEngine, _aureliaRouteMapper.RouteMapper, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function ProductCustomElement(projectApi, inventoryApi, bindingEngine, routeMapper, validationController) {
            var _this = this;

            _classCallCheck(this, ProductCustomElement);

            _initDefineProp(this, 'productId', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            this.api = projectApi;
            this.bindingEngine = bindingEngine;
            this.inventoryApi = inventoryApi;
            this.mapper = routeMapper;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.product = {};
            this.isSaving = false;

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('status').required().ensure('product_type').required().on(this.product);

            this.inventoryApi.itemTypes().then(function (data) {
                _this.itemTypes = data;
            });

            this.api.productStatuses().then(function (data) {
                _this.productStatuses = data;
            });
        }

        ProductCustomElement.prototype.attached = function attached() {
            var _this2 = this;

            this.api.productDetail(this.productId).then(function (data) {
                _this2.product = data;
                console.log('INIT PRODUCT PROPERTIES', _this2.product.properties);
                if (!_this2.product.properties) {
                    _this2.product.properties = {};
                }
                console.log('POST PRODUCT PROPERTIES', _this2.product.properties);
            });
        };

        ProductCustomElement.prototype.save = function save() {
            var _this3 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    console.log('PRODUCT PROPERTIES', _this3.product);
                    _this3.isSaving = true;

                    var productUpdate = {};
                    Object.assign(productUpdate, _this3.product);

                    var linkedInventory = [];
                    for (var _iterator = productUpdate.linked_inventory, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        linkedInventory.push(item.id);
                    }
                    productUpdate.linked_inventory = linkedInventory;

                    var attachments = [];
                    for (var _iterator2 = productUpdate.attachments, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var _item = _ref2;

                        attachments.push(_item.id);
                    }
                    productUpdate.attachments = attachments;

                    productUpdate.properties = _this3.product.properties;

                    _this3.api.updateProduct(_this3.product.id, productUpdate).then(function (data) {
                        _this3.isSaving = false;
                    }).catch(function (err) {
                        _this3.isSaving = false;
                        _this3.error = err;
                    });
                }
            });
        };

        ProductCustomElement.prototype.cancel = function cancel() {
            this.toggle = false;
        };

        return ProductCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'productId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('projects/project-detail',['exports', 'aurelia-framework', './api', '../crm/api', 'aurelia-event-aggregator', 'aurelia-router', 'aurelia-dialog', '../crm/crm-prompt', '../components/semantic-ui/ui-prompt', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _api, _api2, _aureliaEventAggregator, _aureliaRouter, _aureliaDialog, _crmPrompt, _uiPrompt, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProjectDetail = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ProjectDetail = exports.ProjectDetail = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _api2.CrmApi, _aureliaEventAggregator.EventAggregator, _aureliaRouter.Router, _aureliaDialog.DialogService, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec(_class = function () {
        function ProjectDetail(projectApi, crmApi, eventAggregator, router, dialogService, validationController) {
            _classCallCheck(this, ProjectDetail);

            this.ea = eventAggregator;
            this.api = projectApi;
            this.crmApi = crmApi;
            this.router = router;
            this.dialog = dialogService;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.query = {
                limit: 10
            };

            this.selected = [];
            this.isLoading = true;

            this.project = {};

            this.setRules();

            this.getProjectStatuses();
        }

        ProjectDetail.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.api.projectDetail(params.id).then(function (data) {
                _this.project = data;
                _this.setRules();
                routeMap.navModel.title = _this.project.name;
                _this.getProducts();
            });
        };

        ProjectDetail.prototype.attached = function attached() {
            var _this2 = this;

            this.updateSubscriber = this.ea.subscribe('projectUpdated', function (response) {
                _this2.save();
            });
            this.querySubscriber = this.ea.subscribe('queryChanged', function (response) {
                _this2.getProducts();
            });
            this.productSubscriber = this.ea.subscribe('productAdded', function (response) {
                _this2.getProducts();
            });
        };

        ProjectDetail.prototype.detached = function detached() {
            this.updateSubscriber.dispose();
            this.querySubscriber.dispose();
            this.productSubscriber.dispose();
        };

        ProjectDetail.prototype.setRules = function setRules() {
            _aureliaValidation.ValidationRules.ensure('name').required().ensure('status').required().ensure('primary_lab_contact').required().on(this.project);
        };

        ProjectDetail.prototype.getProducts = function getProducts() {
            var _this3 = this;

            this.api.productsForProject(this.project.id, this.query).then(function (data) {
                data.results = data.results.map(function (x) {
                    x.toggled = false;return x;
                });
                _this3.products = data;
                _this3.isLoading = false;
            });
        };

        ProjectDetail.prototype.getProjectStatuses = function getProjectStatuses() {
            var _this4 = this;

            this.api.projectStatuses({ limit: 200 }).then(function (data) {
                _this4.statuses = data;
            });
        };

        ProjectDetail.prototype.save = function save() {
            var _this5 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this5.api.updateProject(_this5.project.id, _this5.project).then(function (data) {
                        _this5.project = data;
                        _this5.setRules();
                    }).catch(function (err) {
                        return _this5.error = err;
                    });
                }
            });
        };

        ProjectDetail.prototype.archive = function archive() {
            this.project.archive = true;
            this.save();
        };

        ProjectDetail.prototype.resume = function resume() {
            this.project.archive = false;
            this.save();
        };

        ProjectDetail.prototype.deleteItems = function deleteItems() {
            var _this6 = this;

            var message = 'Delete ' + this.selected.length + ' products?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var promises = [];
                    for (var _iterator = _this6.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        promises.push(_this6.api.deleteProduct(item.id));
                    }
                    Promise.all(promises).then(function (response) {
                        _this6.getProducts();
                        _this6.selected.splice(0, _this6.selected.length);
                    });
                }
            });
        };

        return ProjectDetail;
    }()) || _class);
});
define('projects/projects',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-dialog', '../components/semantic-ui/ui-prompt', '../shared/query-store'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaDialog, _uiPrompt, _queryStore) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Projects = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Projects = exports.Projects = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi, _aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService, _queryStore.QueryStore), _dec(_class = function () {
        function Projects(projectApi, eventAggregator, dialogService, queryStore) {
            _classCallCheck(this, Projects);

            this.api = projectApi;
            this.ea = eventAggregator;
            this.qs = queryStore;

            this.dialog = dialogService;

            this.selected = [];
            this.newProject = false;

            this.query = {
                limit: 10,
                ordering: '-identifier',
                archive: 'False'
            };
        }

        Projects.prototype.attached = function attached() {
            var _this = this;

            this.query = this.qs.getQuery('projects', this.query);
            this.getProjects();
            this.querySubscriber = this.ea.subscribe('queryChanged', function (response) {
                if (response.source == 'pagination') {
                    _this.query.page = response.page;
                    _this.query.limit = response.limit;
                }
                if (response.source == 'search') {
                    _this.query.search = response.value;
                }
                _this.qs.storeQuery('projects', _this.query);
                _this.getProjects();
            });

            this.isLoading = true;
        };

        Projects.prototype.detached = function detached() {
            this.querySubscriber.dispose();
        };

        Projects.prototype.getProjects = function getProjects() {
            var _this2 = this;

            this.api.projects(this.query).then(function (data) {
                _this2.projects = data;
                _this2.query.page = 1;
                _this2.isLoading = false;
            });
        };

        Projects.prototype.deleteItems = function deleteItems() {
            var _this3 = this;

            var message = 'Delete ' + this.selected.length + ' projects?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var promises = [];
                    for (var _iterator = _this3.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        promises.push(_this3.api.deleteProject(item.id));
                    }
                    Promise.all(promises).then(function (response) {
                        _this3.getProjects();
                        _this3.selected.splice(0, _this3.selected.length);
                    });
                }
            });
        };

        Projects.prototype.archiveItems = function archiveItems() {
            var _this4 = this;

            var message = 'Archive ' + this.selected.length + ' projects?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var promises = [];
                    for (var _iterator2 = _this4.selected, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var item = _ref2;

                        item.archive = true;
                        promises.push(_this4.api.updateProject(item.id, item));
                    }
                    Promise.all(promises).then(function (response) {
                        _this4.getProjects();
                        _this4.selected.splice(0, _this4.selected.length);
                    });
                }
            });
        };

        return Projects;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('settings/display-value',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DisplayValueCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var DisplayValueCustomElement = exports.DisplayValueCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function DisplayValueCustomElement(element) {
            _classCallCheck(this, DisplayValueCustomElement);

            _initDefineProp(this, 'text', _descriptor, this);

            this.element = element;
        }

        DisplayValueCustomElement.prototype.textChanged = function textChanged(n) {
            if (n === true || n === false) {
                this.isBoolean = true;
                this.check = n === true ? 'check circle' : 'remove circle';
            }
        };

        return DisplayValueCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'text', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/index',['exports', './general/index', './workflows/index', './equipment/index', './users/index', './alerts/index'], function (exports, _index, _index2, _index3, _index4, _index5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.routes = exports.Settings = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Settings = exports.Settings = function () {
        function Settings() {
            _classCallCheck(this, Settings);
        }

        Settings.prototype.configureRouter = function configureRouter(config, router) {
            config.map(routes);
            this.router = router;
        };

        return Settings;
    }();

    var routes = exports.routes = [{ route: '', redirect: 'general' }, { route: '/general', name: 'generalSettings', moduleId: './settings',
        nav: false, title: 'General', settings: { childRoutes: _index.routes } }, { route: '/workflows', name: 'workflowsSettings', moduleId: './settings',
        nav: false, title: 'Workflows', settings: { childRoutes: _index2.routes } }, { route: '/equipment', name: 'equipmentSettings', moduleId: './settings',
        nav: false, title: 'Equipment', settings: { childRoutes: _index3.routes } }, { route: '/users', name: 'usersSettings', moduleId: './settings',
        nav: false, title: 'Users', settings: { childRoutes: _index4.routes } }, { route: '/alerts', name: 'alertsSettings', moduleId: './settings',
        nav: false, title: 'Alerts', settings: { childRoutes: _index5.routes } }];
});
define('settings/path-walker',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var PathWalkerValueConverter = exports.PathWalkerValueConverter = function () {
        function PathWalkerValueConverter() {
            _classCallCheck(this, PathWalkerValueConverter);
        }

        PathWalkerValueConverter.prototype.toView = function toView(value, fieldPath) {
            return fieldPath.split('.').reduce(function (o, i) {
                return o[i] ? o[i] : '';
            }, value);
        };

        return PathWalkerValueConverter;
    }();
});
define('settings/settings-table',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-dialog', '../components/semantic-ui/ui-prompt', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', '../shared/query-store'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaDialog, _uiPrompt, _aureliaValidation, _uiValidationRenderer, _queryStore) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SettingsTable = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var SettingsTable = exports.SettingsTable = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaDialog.DialogService, _queryStore.QueryStore), _dec(_class = function () {
        function SettingsTable(eventAggregator, validationController, dialogService, queryStore) {
            _classCallCheck(this, SettingsTable);

            this.ea = eventAggregator;
            this.dialog = dialogService;
            this.qs = queryStore;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.item = {};
            this.selected = [];
            this.query = {
                limit: 10
            };
            this.isLoading = true;
            this.isSaving = false;

            this.createItem = false;
            this.updateItem = false;

            this.setFunctions('');

            this.tableHeaders = [];
            this.tableFields = [];
        }

        SettingsTable.prototype.setFunctions = function setFunctions(objName) {
            this.objName = objName;
            this.getFunc = this.objName + 's';
            this.updateFunc = 'update' + this.upperFirst(this.objName);
            this.saveFunc = 'create' + this.upperFirst(this.objName);
            this.deleteFunc = 'delete' + this.upperFirst(this.objName);
        };

        SettingsTable.prototype.activate = function activate(model) {
            this.query = this.qs.getQuery(this.objName, this.query);
            this.data = model;
            this.getData();
        };

        SettingsTable.prototype.getData = function getData() {
            var _this = this;

            this.api[this.getFunc](this.query).then(function (data) {
                _this.table = data;
                _this.query.page = 1;
                _this.isLoading = false;
            }).catch(function (err) {
                _this.tableError = err;
            });
        };

        SettingsTable.prototype.deleteItem = function deleteItem(id) {
            return this.api[this.deleteFunc](id);
        };

        SettingsTable.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                console.log(results);
                if (results.valid) {
                    _this2.api[_this2.saveFunc](_this2.item).then(function (data) {
                        _this2.getData();
                        _this2.cancel();
                    }).catch(function (err) {
                        _this2.error = err;
                    });
                }
            });
        };

        SettingsTable.prototype.update = function update() {
            var _this3 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this3.api[_this3.updateFunc](_this3.item.id, _this3.item).then(function (data) {
                        _this3.getData();
                        _this3.cancel();
                    }).catch(function (err) {
                        _this3.error = err;
                    });
                }
            });
        };

        SettingsTable.prototype.create = function create() {
            this.createItem = true;
            this.taskList = [];
        };

        SettingsTable.prototype.edit = function edit(item) {
            this.createItem = true;
            this.updateItem = true;
            Object.assign(this.item, item);
        };

        SettingsTable.prototype.attached = function attached() {
            var _this4 = this;

            this.querySubscriber = this.ea.subscribe('queryChanged', function (response) {
                if (response.source == 'pagination') {
                    _this4.query.page = response.page;
                    _this4.query.limit = response.limit;
                }
                if (response.source == 'search') {
                    _this4.query.search = response.value;
                }
                _this4.qs.storeQuery(_this4.objName, _this4.query);
                _this4.getData();
            });
        };

        SettingsTable.prototype.detached = function detached() {
            this.querySubscriber.dispose();
        };

        SettingsTable.prototype.deleteItems = function deleteItems() {
            var _this5 = this;

            var message = 'Delete ' + this.selected.length + ' items?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var promises = [];
                    for (var _iterator = _this5.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        console.log(item);
                        promises.push(_this5.deleteItem(item.id));
                    }
                    Promise.all(promises).then(function (response) {
                        _this5.getData();
                        _this5.selected.splice(0, _this5.selected.length);
                    }).catch(function (err) {
                        _this5.tableError = err;
                    });
                }
            });
        };

        SettingsTable.prototype.upperFirst = function upperFirst(str) {
            return str.charAt(0).toUpperCase() + str.substr(1);
        };

        SettingsTable.prototype.clearObject = function clearObject(obj) {
            Object.keys(obj).forEach(function (key) {
                delete obj[key];
            });
        };

        SettingsTable.prototype.cancel = function cancel() {
            this.clearObject(this.item);
            this.createItem = false;
            this.updateItem = false;
            this.error = undefined;
        };

        return SettingsTable;
    }()) || _class);
});
define('settings/settings',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Settings = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaRouter.Router, _aureliaFramework.BindingEngine), _dec(_class = function () {
        function Settings(eventAggregator, router, bindingEngine) {
            var _this = this;

            _classCallCheck(this, Settings);

            this.ea = eventAggregator;
            this.router = router;
            this.be = bindingEngine;

            this.isLoading = true;

            this.activeSection = undefined;
            this.activeModule = undefined;

            this.sectionChanged = function (x) {
                _this.activateSection(_this.router.currentInstruction.config.settings.childRoutes[0]);
            };
        }

        Settings.prototype.attached = function attached() {
            if (!this.activeSection) {
                this.activateSection(this.router.currentInstruction.config.settings.childRoutes[0]);
            }
            this.routerObserver = this.be.propertyObserver(this.router, 'currentInstruction').subscribe(this.sectionChanged);
        };

        Settings.prototype.detached = function detached() {
            this.routerObserver.dispose();
        };

        Settings.prototype.activateSection = function activateSection(section) {
            this.activeSection = section.name;
            this.activeModule = section.moduleId;
        };

        return Settings;
    }()) || _class);
});
define('settings/subsection',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Subsection = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Subsection = exports.Subsection = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, _aureliaFramework.BindingEngine), _dec(_class = function () {
        function Subsection(router, eventAggregator, bindingEngine) {
            var _this = this;

            _classCallCheck(this, Subsection);

            this.router = router;
            this.ea = eventAggregator;
            this.be = bindingEngine;

            this.subsectionChanged = function (n, o) {
                if (n && _this.subsections.has(_this.data.subsection)) {
                    console.log(_this.subsections, _this.data.subsection);
                    _this.template = _this.subsections.get(_this.data.subsection).template;
                    _this.subsection = './' + _this.data.section + '/' + _this.data.subsection;
                }
            };

            this.routes = [];
        }

        Subsection.prototype.activate = function activate(params, routerConfig, model) {
            this.data = model;
            console.log("DT", params, routerConfig, model);
        };

        return Subsection;
    }()) || _class);
});
define('shared/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SharedApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var SharedApi = exports.SharedApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function SharedApi(config) {
            _classCallCheck(this, SharedApi);

            this.endpoint = config.getEndpoint('api');
        }

        SharedApi.prototype.measures = function measures(params) {
            return this.endpoint.find('measures/', params);
        };

        SharedApi.prototype.createMeasure = function createMeasure(data) {
            return this.endpoint.create('measures/', data);
        };

        SharedApi.prototype.updateMeasure = function updateMeasure(id, data) {
            return this.endpoint.patchOne('measures/', id, null, data);
        };

        SharedApi.prototype.deleteMeasure = function deleteMeasure(id) {
            return this.endpoint.destroyOne('measures/', id);
        };

        SharedApi.prototype.locations = function locations(params) {
            return this.endpoint.find('locations/', params);
        };

        SharedApi.prototype.createLocation = function createLocation(data) {
            return this.endpoint.create('locations/', data);
        };

        SharedApi.prototype.updateLocation = function updateLocation(id, data) {
            return this.endpoint.patchOne('locations/', id, null, data);
        };

        SharedApi.prototype.deleteLocation = function deleteLocation(id) {
            return this.endpoint.destroyOne('locations/', id);
        };

        SharedApi.prototype.itemTypes = function itemTypes(params) {
            return this.endpoint.find('itemtypes/', params);
        };

        SharedApi.prototype.createItemType = function createItemType(data) {
            return this.endpoint.create('itemtypes/', data);
        };

        SharedApi.prototype.updateItemType = function updateItemType(id, data) {
            return this.endpoint.patchOne('itemtypes/', id, null, data);
        };

        SharedApi.prototype.deleteItemType = function deleteItemType(id) {
            return this.endpoint.destroyOne('itemtypes/', id);
        };

        SharedApi.prototype.organisms = function organisms(params) {
            return this.endpoint.find('organisms/', params);
        };

        SharedApi.prototype.createOrganism = function createOrganism(data) {
            return this.endpoint.create('organisms/', data);
        };

        SharedApi.prototype.updateOrganism = function updateOrganism(id, data) {
            return this.endpoint.patchOne('organisms/', id, null, data);
        };

        SharedApi.prototype.deleteOrganism = function deleteOrganism(id) {
            return this.endpoint.destroyOne('organisms/', id);
        };

        return SharedApi;
    }()) || _class);
});
define('shared/key-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var KeysValueConverter = exports.KeysValueConverter = function () {
        function KeysValueConverter() {
            _classCallCheck(this, KeysValueConverter);
        }

        KeysValueConverter.prototype.toView = function toView(obj) {
            return Reflect.ownKeys(obj);
        };

        return KeysValueConverter;
    }();
});
define('shared/navigation',['exports', 'aurelia-framework', 'aurelia-authentication', 'aurelia-event-aggregator', '../auth/api', '../alerts/api', 'aurelia-dialog', '../auth/account', '../settings/users/change-password'], function (exports, _aureliaFramework, _aureliaAuthentication, _aureliaEventAggregator, _api, _api2, _aureliaDialog, _account, _changePassword) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Navigation = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var Navigation = exports.Navigation = (_dec = (0, _aureliaFramework.inject)(_aureliaAuthentication.AuthService, _aureliaEventAggregator.EventAggregator, _api.UserApi, _api2.AlertApi, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
        function Navigation(auth, eventAggregator, userApi, alertApi, dialogService) {
            _classCallCheck(this, Navigation);

            this._isAuthenticated = false;
            this.isAdmin = false;

            _initDefineProp(this, 'router', _descriptor, this);

            _initDefineProp(this, 'accountPane', _descriptor2, this);

            this.auth = auth;
            this.api = userApi;
            this.alertApi = alertApi;
            this.ea = eventAggregator;
            this.dialog = dialogService;
            this.payload = this.auth.getTokenPayload();
        }

        Navigation.prototype.attached = function attached() {
            var _this = this;

            this.accountPaneClickWatcher = window.addEventListener('click', function (event) {
                if (_this.accountPane && !_this.hasParentClass(event.target, 'user-details') && !event.target.classList.contains('user-details') && !event.target.classList.contains('account-pane') && !_this.hasParentClass(event.target, 'account-pane')) {
                    _this.accountPane = false;
                }
            });
            this.ea.subscribe('authentication-change', function (authenticated) {
                if (authenticated) {
                    _this.payload = _this.auth.getTokenPayload();
                    _this.setMe();
                }
            });
            this.setMe();
        };

        Navigation.prototype.detached = function detached() {
            this.accountPaneClickWatcher.dispose();
        };

        Navigation.prototype.hasParentClass = function hasParentClass(el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls)) {}
            return el;
        };

        Navigation.prototype.accountPaneChanged = function accountPaneChanged(n) {
            if (n) {
                this.getAlerts();
            }
        };

        Navigation.prototype.getAlerts = function getAlerts() {
            var _this2 = this;

            var params = { user__username: this.payload.username };
            this.alertApi.alerts(params).then(function (data) {
                _this2.alerts = data;
            });
        };

        Navigation.prototype.showAccountDialog = function showAccountDialog() {
            this.dialog.open({ viewModel: _account.Account, model: this.me }).whenClosed(function (response) {
                console.log('closed yay!');
            });
        };

        Navigation.prototype.showPasswordDialog = function showPasswordDialog() {
            var _this3 = this;

            this.dialog.open({ viewModel: _changePassword.ChangePassword, model: this.me }).whenClosed(function (response) {
                _this3.api.changePassword(_this3.me.id, response.output.newPassword).catch(function (err) {
                    return _this3.error = err;
                });
            });
        };

        Navigation.prototype.dismissAlert = function dismissAlert(alert) {
            var _this4 = this;

            this.alertApi.updateAlert(alert.id).then(function (data) {
                _this4.getAlerts();
            }).catch(function (err) {
                return _this4.errors = err;
            });
        };

        Navigation.prototype.setMe = function setMe() {
            var _this5 = this;

            if (this.payload) {
                this.auth.getMe().then(function (data) {
                    _this5.me = data;
                    _this5.isAdmin = _this5.me.groups.indexOf('admin') > -1;
                });
            }
        };

        Navigation.prototype.toggleAccountPane = function toggleAccountPane() {
            if (this.accountPane) {
                this.accountPane = false;
            } else {
                this.accountPane = true;
            }
        };

        Navigation.prototype.logout = function logout() {
            this.auth.logout();
            this.payload = undefined;
            this.me = undefined;
            this.accountPane = false;
            this.alerts = [];
        };

        _createClass(Navigation, [{
            key: 'isAuthenticated',
            get: function get() {
                return this.auth.isAuthenticated();
            }
        }]);

        return Navigation;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'accountPane', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('shared/query-store',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var QueryStore = exports.QueryStore = function () {
        function QueryStore() {
            _classCallCheck(this, QueryStore);

            this.storage = window.sessionStorage;
        }

        QueryStore.prototype.getQuery = function getQuery(key, initialData) {
            var query = undefined;
            if (!this.loadQuery(key)) {
                query = initialData;
            } else {
                query = this.loadQuery(key);
            }
            return query;
        };

        QueryStore.prototype.storeQuery = function storeQuery(key, data) {
            this.storage.setItem(key, JSON.stringify(data));
        };

        QueryStore.prototype.loadQuery = function loadQuery(key) {
            return JSON.parse(this.storage.getItem(key) || false);
        };

        QueryStore.prototype.clearQuery = function clearQuery(key) {
            this.storage.removeItem(key);
        };

        return QueryStore;
    }();
});
define('shared/reverse',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ReverseValueConverter = exports.ReverseValueConverter = function () {
        function ReverseValueConverter() {
            _classCallCheck(this, ReverseValueConverter);
        }

        ReverseValueConverter.prototype.toView = function toView(array) {
            return array.slice().reverse();
        };

        return ReverseValueConverter;
    }();
});
define('shared/string-truncate',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TruncateValueConverter = exports.TruncateValueConverter = function () {
        function TruncateValueConverter() {
            _classCallCheck(this, TruncateValueConverter);
        }

        TruncateValueConverter.prototype.toView = function toView(value) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

            if (value) {
                return value.length > length ? value.substring(0, length) + '...' : value;
            } else {
                return value;
            }
        };

        return TruncateValueConverter;
    }();
});
define('workflows/api',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.WorkflowApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var WorkflowApi = exports.WorkflowApi = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config), _dec(_class = function () {
        function WorkflowApi(config) {
            _classCallCheck(this, WorkflowApi);

            this.endpoint = config.getEndpoint('api');
        }

        WorkflowApi.prototype.runs = function runs(params) {
            return this.endpoint.find('runs/', params);
        };

        WorkflowApi.prototype.runDetail = function runDetail(id, params) {
            return this.endpoint.findOne('runs/', id, params);
        };

        WorkflowApi.prototype.createRun = function createRun(data) {
            return this.endpoint.create('runs/', data);
        };

        WorkflowApi.prototype.updateRun = function updateRun(id, data) {
            return this.endpoint.patchOne('runs/', id, null, data);
        };

        WorkflowApi.prototype.tasks = function tasks(params) {
            return this.endpoint.find('tasks/', params);
        };

        WorkflowApi.prototype.taskDetail = function taskDetail(id, params) {
            return this.endpoint.findOne('tasks/', id, params);
        };

        WorkflowApi.prototype.recalculate = function recalculate(id, data) {
            var path = 'tasks/' + id + '/recalculate/';
            return this.endpoint.request('POST', path, data);
        };

        WorkflowApi.prototype.createTask = function createTask(data) {
            return this.endpoint.create('tasks/', data);
        };

        WorkflowApi.prototype.updateTask = function updateTask(id, data) {
            return this.endpoint.patchOne('tasks/', id, null, data);
        };

        WorkflowApi.prototype.deleteTask = function deleteTask(id) {
            return this.endpoint.destroyOne('tasks/', id);
        };

        WorkflowApi.prototype.checkTask = function checkTask(runId, data) {
            var path = 'runs/' + runId + '/start_task/?is_check=True';
            return this.endpoint.client.fetch(path, {
                method: 'post',
                body: data
            });
        };

        WorkflowApi.prototype.startTask = function startTask(runId, data) {
            var path = 'runs/' + runId + '/start_task/';
            return this.endpoint.client.fetch(path, {
                method: 'post',
                body: data
            });
        };

        WorkflowApi.prototype.performTask = function performTask(runId, data) {
            return this.endpoint.findOne('runs/', runId, 'monitor_task');
        };

        WorkflowApi.prototype.finishTask = function finishTask(runId, data) {
            var path = 'runs/' + runId + '/finish_task/';
            return this.endpoint.post(path, data);
        };

        WorkflowApi.prototype.createTaskField = function createTaskField(data, fieldType) {
            var path = 'taskfields/?type=' + fieldType;
            return this.endpoint.create(path, data);
        };

        WorkflowApi.prototype.updateTaskField = function updateTaskField(id, data, fieldType) {
            return this.endpoint.patchOne('taskfields/', id, { type: fieldType }, data);
        };

        WorkflowApi.prototype.deleteTaskField = function deleteTaskField(id, fieldType) {
            return this.endpoint.destroyOne('taskfields/', id, { type: fieldType });
        };

        WorkflowApi.prototype.workflows = function workflows(params) {
            return this.endpoint.find('workflows/', params);
        };

        WorkflowApi.prototype.createWorkflow = function createWorkflow(data) {
            return this.endpoint.create('workflows/', data);
        };

        WorkflowApi.prototype.updateWorkflow = function updateWorkflow(id, data) {
            return this.endpoint.patchOne('workflows/', id, null, data);
        };

        WorkflowApi.prototype.deleteWorkflow = function deleteWorkflow(id) {
            return this.endpoint.destroyOne('workflows/', id);
        };

        WorkflowApi.prototype.getWorkflowTasks = function getWorkflowTasks(id) {
            var path = 'workflows/' + id + '/tasks/';
            return this.endpoint.find(path);
        };

        WorkflowApi.prototype.exportWorkflow = function exportWorkflow(id) {
            var path = 'workflows/' + id + '/export/';
            return this.endpoint.find(path);
        };

        WorkflowApi.prototype.importWorkflow = function importWorkflow(data) {
            return this.endpoint.post('workflows/import/', data);
        };

        return WorkflowApi;
    }()) || _class);
});
define('workflows/exclude-type',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ExcludeTypeValueConverter = exports.ExcludeTypeValueConverter = function () {
        function ExcludeTypeValueConverter() {
            _classCallCheck(this, ExcludeTypeValueConverter);
        }

        ExcludeTypeValueConverter.prototype.toView = function toView(valuesArray, acceptArray) {
            if (valuesArray && acceptArray) {
                return valuesArray.filter(function (x) {
                    return acceptArray.indexOf(x.item_type) !== -1;
                });
            }
            return valuesArray ? valuesArray : [];
        };

        return ExcludeTypeValueConverter;
    }();
});
define('workflows/finish-task',['exports', 'aurelia-framework', './api', 'aurelia-router'], function (exports, _aureliaFramework, _api, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FinishTask = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var FinishTask = exports.FinishTask = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaRouter.Router), _dec(_class = function () {
        function FinishTask(workflowApi, router) {
            _classCallCheck(this, FinishTask);

            this.api = workflowApi;
            this.router = router;
            this.isLoading = true;
            this.selected = [];

            this.restartTaskAt = 0;

            this.finishOptions = new Map([['succeeded', 'Succeeded'], ['failed', 'Failed'], ['repeat succeeded', 'Repeat succeeded'], ['repeat failed', 'Repeat Failed']]);
        }

        FinishTask.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.api.runDetail(params.id).then(function (data) {
                _this.run = data;
                routeMap.navModel.title = _this.run.name;

                _this.taskId = _this.run.tasks[_this.run.current_task].id;
                _this.task_name = _this.run.tasks[_this.run.current_task].name;
                _this.taskPosition = _this.run.current_task + 1;

                _this.api.performTask(params.id).then(function (data) {
                    _this.isLoading = false;
                    _this.results = data.data.map(function (x) {
                        x.state = 'succeeded';
                        return x;
                    });

                    _this.restartTaskAt = "" + _this.run.current_task;
                });
            });
        };

        FinishTask.prototype.setState = function setState(event) {
            var value = event.target.value;
            for (var _iterator = this.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var item = _ref;

                item.state = value;
            }
        };

        FinishTask.prototype.save = function save() {
            var _this2 = this;

            var failures = this.results.filter(function (x) {
                return x.state == 'failed' || x.state == 'repeat failed';
            }).map(function (x) {
                return x.product;
            }).join(',');
            var data = {
                notes: this.notes,
                failures: failures,
                restart_task_at: this.restartTaskAt
            };
            this.api.finishTask(this.run.id, data).then(function (response) {
                _this2.router.navigateToRoute('workflows');
            }).catch(function (err) {
                _this2.error = err;
            });
        };

        return FinishTask;
    }()) || _class);
});
define('workflows/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Workflows = exports.Workflows = function () {
        function Workflows() {
            _classCallCheck(this, Workflows);
        }

        Workflows.prototype.configureRouter = function configureRouter(config, router) {
            config.map(routes);
            this.router = router;
        };

        return Workflows;
    }();

    var routes = exports.routes = [{ route: ['', '/:id'], moduleId: './workflows', nav: false }, { route: '/:id/start', name: 'startTask', moduleId: './start-task', nav: false }, { route: '/:id/perform', name: 'performTask', moduleId: './perform-task', nav: false }, { route: '/:id/finish', name: 'finishTask', moduleId: './finish-task', nav: false }];
});
define('workflows/is-excluded',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var IsExcludedValueConverter = exports.IsExcludedValueConverter = function () {
        function IsExcludedValueConverter() {
            _classCallCheck(this, IsExcludedValueConverter);
        }

        IsExcludedValueConverter.prototype.toView = function toView(value, itemId) {
            var excluded = value ? value.split(',') : [];
            var sId = itemId.toString();
            if (excluded.indexOf(sId) !== -1) {
                return 'icon excluded';
            }
            return false;
        };

        return IsExcludedValueConverter;
    }();
});
define('workflows/is-length',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var IsLengthValueConverter = exports.IsLengthValueConverter = function () {
        function IsLengthValueConverter() {
            _classCallCheck(this, IsLengthValueConverter);
        }

        IsLengthValueConverter.prototype.toView = function toView(valuesArray, value) {
            return valuesArray.length == value;
        };

        return IsLengthValueConverter;
    }();
});
define('workflows/ll-add-products',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './api'], function (exports, _aureliaFramework, _aureliaEventAggregator, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlAddProducts = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlAddProducts = exports.LlAddProducts = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlAddProducts(workflowApi, eventAggregator) {
            _classCallCheck(this, LlAddProducts);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.api = workflowApi;
            this.ea = eventAggregator;

            this.selected = [];
            this.config = {};
        }

        LlAddProducts.prototype.sourceChanged = function sourceChanged() {
            this.config = {
                lookup: 'products',
                exclude: this.source.products,
                displayName: 'product_identifier',
                displayOther: ['name']
            };
        };

        LlAddProducts.prototype.save = function save() {
            var _this = this;

            if (this.selected.length > 0) {
                var products = this.source.products;
                products = products.concat(this.selected.map(function (x) {
                    return x.id;
                }));
                this.api.updateRun(this.source.id, { products: products }).then(function (data) {
                    _this.ea.publish('runUpdated', { source: 'addProductsToRun' });
                    _this.cancel();
                }).catch(function (err) {
                    _this.error = err;
                });
            }
        };

        LlAddProducts.prototype.cancel = function cancel() {
            this.selected = [];
            this.toggle = false;
        };

        return LlAddProducts;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-calculation-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlCalculationFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlCalculationFieldCustomElement = exports.LlCalculationFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlCalculationFieldCustomElement(element) {
            _classCallCheck(this, LlCalculationFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlCalculationFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.calculation = this.field.calculation;
                this.outputTo.id = this.field.id;
            }
        };

        return LlCalculationFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-edit-run',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlEditRun = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlEditRun = exports.LlEditRun = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlEditRun(workflowApi, eventAggregator) {
            _classCallCheck(this, LlEditRun);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.api = workflowApi;
            this.ea = eventAggregator;
        }

        LlEditRun.prototype.sourceChanged = function sourceChanged(n) {
            this.run = n;
            this.tasks = this.run.tasks_list.slice(0);
        };

        LlEditRun.prototype.addAfter = function addAfter(index, task) {
            this.tasks.splice(index + 1, 0, { select: true });
        };

        LlEditRun.prototype.removeTask = function removeTask(index, task) {
            this.tasks.splice(index, 1);
        };

        LlEditRun.prototype.save = function save() {
            var _this = this;

            this.run.tasks = this.tasks.map(function (x) {
                return x.id;
            }).join(',');
            this.api.updateRun(this.run.id, this.run).then(function (data) {
                _this.source = data;
                _this.ea.publish('runUpdated', { source: 'editRun' });
                _this.cancel();
            });
        };

        LlEditRun.prototype.cancel = function cancel() {
            this.toggle = false;
        };

        return LlEditRun;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-input-field',['exports', 'aurelia-framework', '../inventory/api'], function (exports, _aureliaFramework, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlInputFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlInputFieldCustomElement = exports.LlInputFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _api.InventoryApi), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlInputFieldCustomElement(element, inventoryApi) {
            var _this = this;

            _classCallCheck(this, LlInputFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
            this.api = inventoryApi;

            this.doQuery = function (settings, callback) {
                var params = {
                    search: settings.urlData.query,
                    item_type__name: _this.field.lookup_type
                };
                _this.api.inventory(params).then(function (data) {
                    callback(data);
                });
            };

            this.fillInSingle = function (dropdown) {
                var params = {
                    item_type__name: _this.field.lookup_type
                };
                _this.api.inventory(params).then(function (data) {
                    if (data.results.length == 1) {
                        dropdown.dropdown('set text', data.results[0].name);
                        _this.outputTo[_this.field.store_value_in] = data.results[0].id;
                    }
                });
            };

            this.updateFromDropdown = function (value, text, choice) {
                _this.outputTo[_this.field.store_value_in] = value;
            };
        }

        LlInputFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.from_calculation = this.field.from_calculation;
                this.outputTo.calculation_used = this.field.calculation_used;
                this.outputTo.from_input_file = this.field.from_input_file;
                this.outputTo.auto_find_in_inventory = this.field.auto_find_in_inventory;
            }
        };

        LlInputFieldCustomElement.prototype.attached = function attached() {
            var dropdown = $('.search.selection.dropdown', this.element).dropdown({
                apiSettings: {
                    responseAsync: this.doQuery
                },
                fields: {
                    remoteValues: 'results',
                    name: 'name',
                    value: 'id'
                },
                onChange: this.updateFromDropdown
            });
            this.fillInSingle(dropdown);
        };

        return LlInputFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-new-run',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', './api'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlNewRun = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var LlNewRun = exports.LlNewRun = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlNewRun(workflowApi, eventAggregator, validationController) {
            _classCallCheck(this, LlNewRun);

            _initDefineProp(this, 'toggle', _descriptor, this);

            this.api = workflowApi;
            this.ea = eventAggregator;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.run = {
                products: []
            };
            this.config = {
                lookup: 'products',
                displayName: 'product_identifier',
                displayOther: ['name']
            };

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('tasks').required().ensure('products').satisfies(function (v, o) {
                return v.length > 0 ? true : false;
            }).on(this.run);
        }

        LlNewRun.prototype.save = function save() {
            var _this = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    var run = JSON.parse(JSON.stringify(_this.run));
                    run.products = _this.run.products.map(function (x) {
                        return x.id;
                    });
                    _this.api.createRun(run).then(function (data) {
                        _this.cancel();
                        _this.ea.publish('runAdded', { source: 'newRun' });
                    }).catch(function (err) {
                        _this.error = err;
                    });
                }
            });
        };

        LlNewRun.prototype.cancel = function cancel() {
            this.run.name = '';
            this.run.products.splice(0, this.run.products.length);
            this.run.workflow = '';
            this.toggle = false;
        };

        return LlNewRun;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-output-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlOutputFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlOutputFieldCustomElement = exports.LlOutputFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlOutputFieldCustomElement(element) {
            _classCallCheck(this, LlOutputFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlOutputFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.from_calculation = this.field.from_calculation;
                this.outputTo.from_input_file = this.field.from_input_file;
                this.outputTo.lookup_type = this.field.lookup_type;
            }
        };

        return LlOutputFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-run-to-workflow',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlRunToWorkflow = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlRunToWorkflow = exports.LlRunToWorkflow = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlRunToWorkflow(workflowApi, eventAggregator) {
            _classCallCheck(this, LlRunToWorkflow);

            _initDefineProp(this, 'toggle', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.api = workflowApi;
            this.ea = eventAggregator;
            this.data = {};
        }

        LlRunToWorkflow.prototype.sourceChanged = function sourceChanged(n) {
            this.run = n;
            this.tasks = this.run.tasks_list.slice(0);
        };

        LlRunToWorkflow.prototype.save = function save() {
            var _this = this;

            this.data.order = this.tasks.map(function (x) {
                return x.id;
            }).join(',');
            this.api.createWorkflow(this.data).then(function (response) {
                _this.cancel();
                _this.ea.publish('runToWorkflow', { source: 'runToWorkflow' });
            });
        };

        LlRunToWorkflow.prototype.cancel = function cancel() {
            this.toggle = false;
        };

        return LlRunToWorkflow;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-step-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlStepFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlStepFieldCustomElement = exports.LlStepFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlStepFieldCustomElement(element) {
            _classCallCheck(this, LlStepFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlStepFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.description = this.field.description;
                this.outputTo.properties = this.field.properties;
                this.outputTo.measure_not_required = this.field.measure_not_required;
            }
        };

        return LlStepFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/ll-variable-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlVariableFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlVariableFieldCustomElement = exports.LlVariableFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlVariableFieldCustomElement(element) {
            _classCallCheck(this, LlVariableFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlVariableFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.measure_not_required = this.field.measure_not_required;
            }
        };

        return LlVariableFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('workflows/perform-task',['exports', 'aurelia-framework', './api', 'aurelia-router'], function (exports, _aureliaFramework, _api, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PerformTask = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PerformTask = exports.PerformTask = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaRouter.Router), _dec(_class = function () {
        function PerformTask(workflowApi, router) {
            _classCallCheck(this, PerformTask);

            this.api = workflowApi;
            this.router = router;
            this.isLoading = true;

            this.setup = true;
            this.requirements = false;
        }

        PerformTask.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.api.runDetail(params.id).then(function (data) {
                _this.run = data;
                routeMap.navModel.title = _this.run.name;

                _this.taskId = _this.run.tasks[_this.run.current_task].id;
                _this.task_name = _this.run.tasks[_this.run.current_task].name;
                _this.taskPosition = _this.run.current_task + 1;

                _this.api.performTask(params.id).then(function (data) {
                    _this.isLoading = false;
                    _this.monitorData = data;
                    _this.currentData = data.data[0].data;
                    _this.selectedData = data.data[0].id;
                });
            });
        };

        PerformTask.prototype.toggleSection = function toggleSection(section) {
            if (this[section]) {
                this[section] = false;
            } else {
                this[section] = true;
            }
        };

        PerformTask.prototype.setSelected = function setSelected(event) {
            this.currentData = this.monitorData.data.find(function (x) {
                return x.id == event.target.value;
            }).data;
        };

        return PerformTask;
    }()) || _class);
});
define('workflows/start-task',['exports', 'aurelia-framework', './api', 'aurelia-validation', '../components/semantic-ui/ui-validation-renderer', 'aurelia-router'], function (exports, _aureliaFramework, _api, _aureliaValidation, _uiValidationRenderer, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StartTask = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var StartTask = exports.StartTask = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaRouter.Router), _dec(_class = function () {
        function StartTask(workflowApi, validationController, router) {
            _classCallCheck(this, StartTask);

            this.api = workflowApi;
            this.router = router;
            this.isLoading = true;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.setup = true;
            this.complete = false;
            this.requirements = false;

            this.taskData = {};

            this.validationRuleset = {
                input_fields: _aureliaValidation.ValidationRules.ensure('amount').required().matches(/^-?[0-9.]+/).ensure('inventory_identifier').required().rules,
                output_fields: _aureliaValidation.ValidationRules.ensure('amount').required().matches(/^-?[0-9.]+/).rules,
                variable_fields: _aureliaValidation.ValidationRules.ensure('amount').required().matches(/^-?[0-9.]+/).rules,
                calculation_fields: _aureliaValidation.ValidationRules.ensure('calculation').required().rules
            };
        }

        StartTask.prototype.activate = function activate(params, routeMap) {
            var _this = this;

            this.api.runDetail(params.id).then(function (data) {
                _this.run = data;
                routeMap.navModel.title = _this.run.name;

                _this.taskId = _this.run.tasks[_this.run.current_task].id;
                _this.taskPosition = _this.run.current_task + 1;
                _this.api.taskDetail(_this.taskId).then(function (data) {
                    _this.isLoading = false;
                    _this.task = data;
                    _this.generateTaskData();
                    _aureliaValidation.ValidationRules.ensure('equipment_choice').required().when(function (obj) {
                        return _this.task.capable_equipment.length > 0;
                    }).ensure('labware_identifier').required().when(function (obj) {
                        return !obj.labware_not_required;
                    }).on(_this.taskData);
                });
            });
        };

        StartTask.prototype.generateTaskData = function generateTaskData() {
            this.taskData.product_input_not_required = this.task.product_input_not_required;
            this.taskData.product_input = this.task.product_input;
            this.taskData.product_input_measure = this.task.product_input_measure;
            this.taskData.product_input_amount = this.task.product_input_amount;
            this.taskData.labware_amount = this.task.labware_amount;
            this.taskData.labware_not_required = this.task.labware_not_required;

            var rules = [];

            var field_types = ['input_fields', 'variable_fields', 'output_fields', 'calculation_fields', 'step_fields'];
            for (var _iterator = field_types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var ft = _ref;

                if (!this.taskData[ft]) {
                    this.taskData[ft] = [];
                }
                for (var _iterator2 = this.task[ft], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                    var _ref2;

                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref2 = _i2.value;
                    }

                    var field = _ref2;

                    var fieldObj = {};
                    this.taskData[ft].push(fieldObj);

                    if (ft !== 'step_fields') {
                        this.validator.addObject(fieldObj, this.validationRuleset[ft]);
                    }
                }
            }
        };

        StartTask.prototype.toggleSection = function toggleSection(section) {
            if (this[section]) {
                this[section] = false;
            } else {
                this[section] = true;
            }
        };

        StartTask.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    var frmData = new FormData();
                    frmData.append('task', JSON.stringify(_this2.taskData));

                    if (_this2.canStart) {
                        _this2.api.startTask(_this2.run.id, frmData).then(function (response) {
                            response.json().then(function (data) {
                                if (_this2.complete) {
                                    _this2.router.navigateToRoute('finishTask', { id: _this2.run.id });
                                } else {
                                    _this2.router.navigateToRoute('performTask', { id: _this2.run.id });
                                }
                            }).catch(function (err) {
                                _this2.error = err;
                            });
                        }).catch(function (err) {
                            _this2.error = err;
                        });
                    } else {
                        _this2.setup = false;
                        _this2.requirements = true;
                        _this2.loadingRequirements = true;

                        var hasInputs = Object.values(_this2.run.validate_inputs).some(function (e, i, a) {
                            return e;
                        });

                        _this2.api.checkTask(_this2.run.id, frmData).then(function (response) {
                            response.json().then(function (data) {
                                if (response.status == 200) {
                                    _this2.taskRequirements = data;
                                    if (!hasInputs) {
                                        var errorText = 'There are no inputs available for the task';
                                        _this2.taskRequirements.errors.push(errorText);
                                    }
                                    _this2.loadingRequirements = false;
                                    if (data.errors.length == 0 && hasInputs && data.equipment_status == 'idle') {
                                        _this2.canStart = true;
                                    }
                                } else {
                                    _this2.loadingRequirements = false;
                                    _this2.error = response;
                                }
                            }).catch(function (err) {
                                _this2.error = err;
                                _this2.loadingRequirements = false;
                            });
                        }).catch(function (err) {
                            console.log('ERROR?', err);
                            _this2.error = err;
                            _this2.loadingRequirements = false;
                        });
                    }
                }
            });
        };

        return StartTask;
    }()) || _class);
});
define('workflows/workflows',['exports', 'aurelia-framework', './api', 'aurelia-event-aggregator', 'aurelia-dialog', '../components/semantic-ui/ui-prompt'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator, _aureliaDialog, _uiPrompt) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Workflow = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Workflow = exports.Workflow = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService), _dec(_class = function () {
        function Workflow(workflowApi, eventAggregator, dialogService) {
            _classCallCheck(this, Workflow);

            this.api = workflowApi;
            this.ea = eventAggregator;
            this.dialog = dialogService;
            this.limitTo = false;

            this.isLoading = true;

            this.query = {
                is_active: 'True'
            };

            this.productMatcher = function (a, b) {
                return a === b;
            };
        }

        Workflow.prototype.activate = function activate(params, routeMap) {
            if (params.id) {
                this.limitTo = params.id;
            } else {
                this.limitTo = false;
            }
            console.log(this.limitTo);
            this.getRuns();
        };

        Workflow.prototype.attached = function attached() {
            var _this = this;

            this.runSubscriber = this.ea.subscribe('runAdded', function (response) {
                _this.getRuns();
            });
            this.runUpdatedSubscriber = this.ea.subscribe('runUpdated', function (response) {
                _this.getRuns();
            });
        };

        Workflow.prototype.detached = function detached() {
            this.runSubscriber.dispose();
            this.runUpdatedSubscriber.dispose();
        };

        Workflow.prototype.getRuns = function getRuns() {
            var _this2 = this;

            if (this.limitTo) {
                this.query.id = this.limitTo;
            } else {
                delete this.query.id;
            }
            this.api.runs(this.query).then(function (data) {
                data.results.map(function (x) {
                    x.selected = [];
                    return x;
                });
                _this2.runs = data;
                _this2.isLoading = false;
            });
        };

        Workflow.prototype.exclude = function exclude(run, itemId) {
            var _this3 = this;

            var excluded = run.exclude ? run.exclude.split(',') : [];
            var sId = itemId.toString();
            if (excluded.indexOf(sId) !== -1) {
                excluded.splice(excluded.indexOf(sId), 1);
            } else {
                excluded.push(sId);
            }
            run.exclude = excluded.join(',');
            this.api.updateRun(run.id, { exclude: run.exclude }).catch(function (err) {
                _this3.error = err;
            });
        };

        Workflow.prototype.stopRun = function stopRun(id) {
            var _this4 = this;

            var message = 'Stop this run?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this4.api.updateRun(id, { is_active: false }).then(function (response) {
                        _this4.getRuns();
                    }).catch(function (err) {
                        _this4.error = err;
                    });
                }
            });
        };

        Workflow.prototype.editRun = function editRun(run) {
            run.edit = true;
        };

        Workflow.prototype.addProducts = function addProducts(run) {
            run.addProducts = true;
        };

        Workflow.prototype.workflowFromRun = function workflowFromRun(run) {
            run.toWorkflow = true;
        };

        Workflow.prototype.removeProducts = function removeProducts(run) {
            var _this5 = this;

            var message = 'Remove ' + run.selected.length + ' products from run?';
            this.dialog.open({ viewModel: _uiPrompt.Prompt, model: message }).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var selectedIds = run.selected.map(function (x) {
                        return x.id;
                    });
                    var diffIds = run.products.filter(function (x) {
                        return selectedIds.indexOf(x) < 0;
                    });
                    _this5.api.updateRun(run.id, { products: diffIds }).then(function (x) {
                        run.products_list = x.products_list;
                    }).catch(function (err) {
                        _this5.error = err;
                    });
                }
            });
        };

        return Workflow;
    }()) || _class);
});
define('components/semantic-ui/index',['exports'], function (exports) {
                        'use strict';

                        Object.defineProperty(exports, "__esModule", {
                                                value: true
                        });
                        exports.configure = configure;
                        function configure(aurelia) {
                                                aurelia.globalResources('./ui-table', './ui-table-sort', './ui-table-row', './ui-table-select', './ui-table-header', './ui-table-pagination', './ui-table-wrapper.html', './ui-dropdown-menu', './ui-dropdown-menu-item', './ui-dropdown', './ui-select', './ui-checkbox', './ui-search', './ui-item', './ui-toggle', './ui-dimmer', './ui-field', './ui-error-message', './ui-boolean', './ui-picker', './ui-autocomplete', './ui-tags', './ui-datetime', './ui-disappearing-message');
                        }
});
define('components/semantic-ui/ui-autocomplete',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiAutocomplete = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

    var UiAutocomplete = exports.UiAutocomplete = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaApi.Config), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiAutocomplete(element, config) {
            var _this = this;

            _classCallCheck(this, UiAutocomplete);

            _initDefineProp(this, 'value', _descriptor, this);

            _initDefineProp(this, 'from', _descriptor2, this);

            _initDefineProp(this, 'placeholder', _descriptor3, this);

            _initDefineProp(this, 'searchParams', _descriptor4, this);

            _initDefineProp(this, 'displayValue', _descriptor5, this);

            _initDefineProp(this, 'storeValue', _descriptor6, this);

            _initDefineProp(this, 'defaultText', _descriptor7, this);

            _initDefineProp(this, 'multiple', _descriptor8, this);

            _initDefineProp(this, 'autofill', _descriptor9, this);

            this.element = element;
            this.endpoint = config.getEndpoint('api');

            this.doQuery = function (settings, callback) {
                var path = _this.from + '/';
                var params = _this.searchParams;
                params.search = settings.urlData.query;
                _this.endpoint.find(path, params).then(function (data) {
                    callback(data);
                });
            };

            this.updateFromDropdown = function (value, text, choice) {
                _this.value = value;
            };

            this.doAutoFill = function () {
                var path = _this.from + '/';
                _this.endpoint.find(path, _this.searchParams).then(function (data) {
                    if (data.results.length == 1) {
                        _this.dropdown.dropdown('set text', data.results[0][_this.displayValue]);
                        _this.value = data.results[0][_this.storeValue];
                    }
                });
            };
        }

        UiAutocomplete.prototype.defaultTextChanged = function defaultTextChanged(value) {
            if (this.dropdown) {
                this.dropdown.dropdown('set text', this.defaultText);
            }
        };

        UiAutocomplete.prototype.searchParamsChanged = function searchParamsChanged(value) {
            if (this.autofill) {
                this.doAutoFill();
            }
        };

        UiAutocomplete.prototype.attached = function attached() {
            var _this2 = this;

            setTimeout(function () {
                _this2.dropdown = $('.search.selection.dropdown', _this2.element).dropdown({
                    apiSettings: {
                        responseAsync: _this2.doQuery
                    },
                    fields: {
                        remoteValues: 'results',
                        name: _this2.displayValue,
                        value: _this2.storeValue
                    },
                    onChange: _this2.updateFromDropdown,
                    localSearch: false
                });
                _this2.dropdown.dropdown('set text', _this2.defaultText);
            }, 1);
        };

        return UiAutocomplete;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'from', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'searchParams', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {};
        }
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'displayValue', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'name';
        }
    }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'storeValue', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'id';
        }
    }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'defaultText', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return '';
        }
    }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'multiple', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'autofill', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-boolean',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiBooleanCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2;

    var UiBooleanCustomElement = exports.UiBooleanCustomElement = (_class = function UiBooleanCustomElement() {
        _classCallCheck(this, UiBooleanCustomElement);

        _initDefineProp(this, 'source', _descriptor, this);

        _initDefineProp(this, 'size', _descriptor2, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'source', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'size', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('components/semantic-ui/ui-checkbox',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiCheckbox = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

    var UiCheckbox = exports.UiCheckbox = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiCheckbox(element) {
            _classCallCheck(this, UiCheckbox);

            _initDefineProp(this, 'checked', _descriptor, this);

            _initDefineProp(this, 'model', _descriptor2, this);

            _initDefineProp(this, 'matcher', _descriptor3, this);

            _initDefineProp(this, 'label', _descriptor4, this);

            this.element = element;
        }

        UiCheckbox.prototype.attached = function attached() {
            $('.ui.checkbox', this.element).checkbox();
        };

        return UiCheckbox;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'checked', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'matcher', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'label', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-datetime',['exports', 'aurelia-framework', 'semantic-ui-calendar', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _semanticUiCalendar, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDatetime = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var UiDatetime = exports.UiDatetime = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiDatetime(element, eventAggregator) {
            var _this = this;

            _classCallCheck(this, UiDatetime);

            _initDefineProp(this, 'value', _descriptor, this);

            _initDefineProp(this, 'config', _descriptor2, this);

            this.element = element;
            this.ea = eventAggregator;

            this.defaults = {
                type: 'datetime',
                onChange: function onChange(date, text, mode) {
                    _this.value = date;
                    _this.ea.publish('date-changed', { source: 'ui-datetime', value: _this.value,
                        target: _this.element });
                    return true;
                }
            };
        }

        UiDatetime.prototype.attached = function attached() {
            var _this2 = this;

            this.datetime = $('.datetime', this.element).calendar(Object.assign(this.defaults, this.config));
            setTimeout(function () {
                if (_this2.value) {
                    _this2.valueChanged(_this2.value);
                }
            }, 1);
        };

        UiDatetime.prototype.valueChanged = function valueChanged(n) {
            if (this.datetime && n) {
                if (this.value._isAMomentObject) {
                    this.value = this.value.toDate();
                }
                this.datetime.calendar('set date', this.value, true, false);
            }
        };

        return UiDatetime;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'config', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {};
        }
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-dimmer',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDimmerCustomAttribute = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var UiDimmerCustomAttribute = exports.UiDimmerCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function UiDimmerCustomAttribute(element) {
            _classCallCheck(this, UiDimmerCustomAttribute);

            _initDefineProp(this, 'active', _descriptor, this);

            this.element = element;
        }

        UiDimmerCustomAttribute.prototype.activeChanged = function activeChanged(n) {
            if (n) {
                jQuery('.dimmer').dimmer('show');
            } else {
                jQuery('[ui-dimmer]').dimmer('show');
            }
        };

        return UiDimmerCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'active', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-disappearing-message',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDisappearingMessageCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

    var UiDisappearingMessageCustomElement = exports.UiDisappearingMessageCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiDisappearingMessageCustomElement(element) {
            _classCallCheck(this, UiDisappearingMessageCustomElement);

            _initDefineProp(this, 'title', _descriptor, this);

            _initDefineProp(this, 'text', _descriptor2, this);

            _initDefineProp(this, 'wait', _descriptor3, this);

            _initDefineProp(this, 'colour', _descriptor4, this);

            _initDefineProp(this, 'visible', _descriptor5, this);

            this.element = element;
        }

        UiDisappearingMessageCustomElement.prototype.visibleChanged = function visibleChanged(n) {
            if (this.visible) {
                $(this.element).delay(this.wait * 1000).fadeOut('slow');
            }
        };

        return UiDisappearingMessageCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'text', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'wait', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 10;
        }
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'colour', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'visible', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-dropdown-menu-item',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDropdownMenuItemCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiDropdownMenuItemCustomElement = exports.UiDropdownMenuItemCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element), _dec(_class = (_class2 = function () {
        function UiDropdownMenuItemCustomElement(eventAggregator, element) {
            var _this = this;

            _classCallCheck(this, UiDropdownMenuItemCustomElement);

            _initDefineProp(this, 'icon', _descriptor, this);

            _initDefineProp(this, 'toggle', _descriptor2, this);

            _initDefineProp(this, 'toggleSource', _descriptor3, this);

            this.isToggled = false;
            this.ea = eventAggregator;
            this.element = element;

            this.setToggle = function (event) {
                if (_this.toggle) {
                    if (_this.toggle in _this.toggleSource) {
                        if (_this.toggleSource[_this.toggle] == 'True') {
                            _this.toggleSource[_this.toggle] = 'False';
                            _this.isToggled = false;
                        } else {
                            _this.toggleSource[_this.toggle] = 'True';
                            _this.isToggled = true;
                        }
                    } else {
                        _this.toggleSource[_this.toggle] = 'True';
                        _this.isToggled = true;
                    }
                    _this.ea.publish('queryChanged', { param: _this.toggle, source: _this.toggleSource });
                }
            };
        }

        UiDropdownMenuItemCustomElement.prototype.attached = function attached() {
            if (this.toggle && this.toggle in this.toggleSource) {
                if (this.toggleSource[this.toggle] == 'False') {
                    this.isToggled = false;
                } else {
                    this.isToggled = true;
                }
            }
            this.element.addEventListener('click', this.setToggle);
        };

        UiDropdownMenuItemCustomElement.prototype.detached = function detached() {
            this.element.removeEventListener('click', this.setToggle);
        };

        return UiDropdownMenuItemCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'icon', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'toggleSource', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-dropdown-menu',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDropdownMenuCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2;

    var UiDropdownMenuCustomElement = exports.UiDropdownMenuCustomElement = (_class = function () {
        function UiDropdownMenuCustomElement() {
            _classCallCheck(this, UiDropdownMenuCustomElement);

            _initDefineProp(this, 'icon', _descriptor, this);

            _initDefineProp(this, 'text', _descriptor2, this);
        }

        UiDropdownMenuCustomElement.prototype.attached = function attached() {
            jQuery('.ui.dropdown').dropdown();
        };

        return UiDropdownMenuCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'icon', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'text', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('components/semantic-ui/ui-dropdown',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiDropdownCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiDropdownCustomElement = exports.UiDropdownCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiDropdownCustomElement(element) {
            var _this = this;

            _classCallCheck(this, UiDropdownCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            _initDefineProp(this, 'placeholder', _descriptor2, this);

            _initDefineProp(this, 'required', _descriptor3, this);

            this.element = element;

            this.observer = new MutationObserver(function (m) {
                if (_this.dropdown) {
                    _this.dropdown.dropdown('refresh');
                    _this.dropdown.dropdown('set selected', _this.value);
                }
            });
        }

        UiDropdownCustomElement.prototype.attached = function attached() {
            var _this2 = this;

            var config = { childList: true, subList: true };
            this.dropdown = jQuery('.ui.selection.dropdown', this.element);
            this.dropdown.dropdown();

            var observable = this.element.getElementsByClassName('menu');
            this.observer.observe(observable[0], config);

            setTimeout(function () {
                _this2.valueChanged(_this2.value);
            }, 1);
        };

        UiDropdownCustomElement.prototype.detached = function detached() {
            this.observer.disconnect();
        };

        UiDropdownCustomElement.prototype.valueChanged = function valueChanged(n) {
            if (this.dropdown) {
                this.value = n;
                if (this.value == "") {
                    this.dropdown.dropdown('clear');
                }

                this.dropdown.dropdown('refresh');

                this.dropdown.dropdown('set selected', this.value);
            }
        };

        return UiDropdownCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'required', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-error-message',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiErrorMessageCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var UiErrorMessageCustomElement = exports.UiErrorMessageCustomElement = (_class = function () {
        function UiErrorMessageCustomElement() {
            _classCallCheck(this, UiErrorMessageCustomElement);

            _initDefineProp(this, 'errorSource', _descriptor, this);
        }

        UiErrorMessageCustomElement.prototype.errorSourceChanged = function errorSourceChanged() {
            var _this = this;

            if (this.errorSource) {
                this.error = {};
                this.error.status = this.errorSource.status;
                this.error.statusText = this.errorSource.statusText;

                if ('bodyUsed' in this.errorSource && this.errorSource.bodyUsed === false) {
                    this.errorSource.json().then(function (response) {
                        if (response.message) {
                            _this.error.message = response.message;
                        }
                    });
                } else {
                    if (this.errorSource.body && this.errorSource.body.message) {
                        this.error.message = this.errorSource.body.message;
                    }
                }
            } else {
                this.error = null;
            }
        };

        return UiErrorMessageCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'errorSource', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('components/semantic-ui/ui-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2;

    var UiFieldCustomElement = exports.UiFieldCustomElement = (_class = function UiFieldCustomElement() {
        _classCallCheck(this, UiFieldCustomElement);

        _initDefineProp(this, 'label', _descriptor, this);

        _initDefineProp(this, 'required', _descriptor2, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'label', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'required', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class);
});
define('components/semantic-ui/ui-item',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiItem = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var UiItem = exports.UiItem = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function UiItem(element) {
            _classCallCheck(this, UiItem);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        UiItem.prototype.attached = function attached() {
            this.element.setAttribute('data-value', this.value);
        };

        return UiItem;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-picker-dialog',['exports', 'aurelia-framework', 'aurelia-dialog', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaDialog, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiPickerDialog = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var UiPickerDialog = exports.UiPickerDialog = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _aureliaApi.Config), _dec(_class = (_class2 = function () {
        function UiPickerDialog(element, dialogController, config) {
            _classCallCheck(this, UiPickerDialog);

            _initDefineProp(this, 'searchTerm', _descriptor, this);

            this.endpoint = config.getEndpoint('api');
            this.dialog = dialogController;
            this.selected = [];
            this.matcher = function (a, b) {
                return a.id === b.id;
            };
        }

        UiPickerDialog.prototype.activate = function activate(pickerConfig) {
            this.config = pickerConfig;
            this.searchTermChanged();
        };

        UiPickerDialog.prototype.searchTermChanged = function searchTermChanged(n, o) {
            var _this = this;

            this.search(this.searchTerm).then(function (results) {
                _this.searchResults = results;
            });
        };

        UiPickerDialog.prototype.search = function search(term) {
            var searchLocation = this.config.lookup + '/';
            var params = { search: term, limit: 10 };
            return this.endpoint.find(searchLocation, params);
        };

        return UiPickerDialog;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'searchTerm', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-picker',['exports', 'aurelia-framework', 'aurelia-api'], function (exports, _aureliaFramework, _aureliaApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiPicker = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

    var UiPicker = exports.UiPicker = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaApi.Config), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiPicker(element, config) {
            _classCallCheck(this, UiPicker);

            _initDefineProp(this, 'config', _descriptor, this);

            _initDefineProp(this, 'selected', _descriptor2, this);

            _initDefineProp(this, 'searchTerm', _descriptor3, this);

            _initDefineProp(this, 'matcher', _descriptor4, this);

            this.endpoint = config.getEndpoint('api');
            if (!this.selected) {
                this.selected = [];
            }
        }

        UiPicker.prototype.configChanged = function configChanged(n, o) {
            this.config = n;
            this.searchTermChanged();
        };

        UiPicker.prototype.searchTermChanged = function searchTermChanged(n, o) {
            var _this = this;

            this.search(this.searchTerm).then(function (results) {
                _this.searchResults = results;
            });
        };

        UiPicker.prototype.search = function search(term) {
            var searchLocation = this.config.lookup + '/';
            var params = { search: term, limit: 10 };
            if (this.config.exclude) {
                var excludeString = this.config.exclude.join(',');
                params.exclude = excludeString;
            }
            return this.endpoint.find(searchLocation, params);
        };

        return UiPicker;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'config', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'searchTerm', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'matcher', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return function (a, b) {
                return a.id === b.id;
            };
        }
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-prompt',['exports', 'aurelia-framework', 'aurelia-dialog'], function (exports, _aureliaFramework, _aureliaDialog) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Prompt = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Prompt = exports.Prompt = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController), _dec(_class = function () {
        function Prompt(element, dialogController) {
            _classCallCheck(this, Prompt);

            this.dialog = dialogController;
        }

        Prompt.prototype.activate = function activate(message) {
            this.message = message;
        };

        return Prompt;
    }()) || _class);
});
define('components/semantic-ui/ui-search',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiSearchCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiSearchCustomElement = exports.UiSearchCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiSearchCustomElement(element, eventAggregator) {
            var _this = this;

            _classCallCheck(this, UiSearchCustomElement);

            _initDefineProp(this, 'search', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            _initDefineProp(this, 'model', _descriptor3, this);

            this.element = element;
            this.ea = eventAggregator;

            this.searchHandler = function (query) {
                _this.search = query;
                _this.ea.publish('searchQueryChanged', { source: 'search' });
                _this.field.search('add results', _this.field.search('generate results', _this.source));
            };
        }

        UiSearchCustomElement.prototype.attached = function attached() {
            this.field = jQuery('.ui.search', this.element);
            this.field.search({
                source: this.source,
                fields: {
                    results: 'results',
                    title: this.model[0]
                },
                searchFields: this.model,
                onSearchQuery: this.searchHandler
            });
        };

        return UiSearchCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'search', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-select',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiSelectCustomAttribute = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var UiSelectCustomAttribute = exports.UiSelectCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiSelectCustomAttribute(element) {
            _classCallCheck(this, UiSelectCustomAttribute);

            _initDefineProp(this, 'required', _descriptor, this);

            _initDefineProp(this, 'value', _descriptor2, this);

            this.element = element;
        }

        UiSelectCustomAttribute.prototype.attached = function attached() {
            var _this = this;

            this.element.classList.add('ui');
            this.element.classList.add('dropdown');
            jQuery(this.element).dropdown({ onChange: function onChange(v) {
                    _this.value = v;
                } });
        };

        return UiSelectCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'required', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table-header',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', './ui-validation-renderer'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTableHeaderCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiTableHeaderCustomElement = exports.UiTableHeaderCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _aureliaFramework.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiTableHeaderCustomElement(eventAggregator, validationController, bindingEngine) {
            _classCallCheck(this, UiTableHeaderCustomElement);

            _initDefineProp(this, 'search', _descriptor, this);

            _initDefineProp(this, 'searchOptions', _descriptor2, this);

            _initDefineProp(this, 'searchQuery', _descriptor3, this);

            this.ea = eventAggregator;
            this.be = bindingEngine;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.showAdvanced = false;

            this.searchTerms = [];

            this.fieldOperatorNames = [['exact', 'is'], ['icontains', 'contains'], ['lt', 'less than (<)'], ['gt', 'greater than (>)'], ['lte', 'less than or equal to (<=)'], ['gte', 'greater than or equal to (>=)']];
        }

        UiTableHeaderCustomElement.prototype.attached = function attached() {
            var _this = this;

            this.searchObs = this.be.propertyObserver(this, 'search').subscribe(function (n, o) {
                _this.ea.publish('queryChanged', { source: 'search', value: n });
            });

            this.originalQuery = JSON.parse(JSON.stringify(this.searchQuery));
            this.addTerm();
        };

        UiTableHeaderCustomElement.prototype.detached = function detached() {
            this.searchObs.dispose();
        };

        UiTableHeaderCustomElement.prototype.toggleAdvanced = function toggleAdvanced() {
            if (this.showAdvanced) {
                this.showAdvanced = false;
                this.cleanQuery();
                this.ea.publish('queryChanged', { source: 'advancedSearch' });
            } else {
                this.showAdvanced = true;
            }
        };

        UiTableHeaderCustomElement.prototype.addTerm = function addTerm() {
            this.searchTerms.push({ value: '' });
            var length = this.searchTerms.length - 1;
            _aureliaValidation.ValidationRules.ensure('field').required().ensure('action').required().ensure('value').required().on(this.searchTerms[length]);
        };

        UiTableHeaderCustomElement.prototype.removeTerm = function removeTerm(index) {
            if (this.searchTerms.length > 1) {
                this.searchTerms.splice(index, 1);
            }
        };

        UiTableHeaderCustomElement.prototype.setFields = function setFields(event, term) {
            var fieldName = event.target.value;
            var field = this.searchOptions.fields.find(function (x) {
                return x.name == fieldName;
            });
            var operators = field.op;
            var availableOps = this.fieldOperatorNames.filter(function (x) {
                return operators.indexOf(x[0]) !== -1;
            });
            term.operators = new Map(availableOps);
        };

        UiTableHeaderCustomElement.prototype.cleanQuery = function cleanQuery() {
            for (var _iterator = Object.entries(this.searchQuery), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var _ref2 = _ref,
                    key = _ref2[0],
                    term = _ref2[1];

                if (!(key in this.originalQuery)) {
                    delete this.searchQuery[key];
                }
            }
        };

        UiTableHeaderCustomElement.prototype.doSearch = function doSearch() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this2.cleanQuery();
                    for (var _iterator2 = _this2.searchTerms, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref3;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref3 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref3 = _i2.value;
                        }

                        var term = _ref3;

                        var searchKey = term.field;
                        if (term.action !== 'exact') {
                            searchKey = term.field + '__' + term.action;
                        }
                        _this2.searchQuery[searchKey] = term.value;
                    }
                    _this2.ea.publish('queryChanged', { source: 'advancedSearch' });
                }
            });
        };

        return UiTableHeaderCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'search', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'searchOptions', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'searchQuery', [_dec3], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table-pagination',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTablePaginationCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

    var UiTablePaginationCustomElement = exports.UiTablePaginationCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiTablePaginationCustomElement(element, eventAggregator) {
            _classCallCheck(this, UiTablePaginationCustomElement);

            _initDefineProp(this, 'page', _descriptor, this);

            _initDefineProp(this, 'total', _descriptor2, this);

            _initDefineProp(this, 'limit', _descriptor3, this);

            _initDefineProp(this, 'limitOptions', _descriptor4, this);

            this.element = element;
            this.ea = eventAggregator;

            this.showNext = true;
            this.showPrevious = true;

            this.setPageCount();
        }

        UiTablePaginationCustomElement.prototype.attached = function attached() {
            this.pageSelect = jQuery('.ui.dropdown.pagination', this.element).dropdown();
        };

        UiTablePaginationCustomElement.prototype.setPageCount = function setPageCount() {
            this.pageCount = Math.ceil(this.total / this.limit);
            if (!this.pageCount || this.pageCount == 0 || this.pageCount == Infinity) {
                this.pageCount = 1;
            }

            this.pages = Array.from(Array(this.pageCount)).map(function (e, i) {
                return i + 1;
            });

            if (this.page <= 1) {
                this.showPrevious = false;
            } else {
                this.showPrevious = true;
            }

            if (this.page >= this.pageCount) {
                this.showNext = false;
            } else {
                this.showNext = true;
            }

            if (this.pageSelect) {
                this.pageSelect.dropdown('set selected', this.page);
            }
        };

        UiTablePaginationCustomElement.prototype.totalChanged = function totalChanged(n) {
            this.total = n;
            this.setPageCount();
        };

        UiTablePaginationCustomElement.prototype.limitChanged = function limitChanged(n) {
            this.limit = n;
            this.setPageCount();
        };

        UiTablePaginationCustomElement.prototype.pageChanged = function pageChanged(n) {
            this.page = parseInt(n);
            this.setPageCount();
        };

        UiTablePaginationCustomElement.prototype.navigateFirst = function navigateFirst() {
            this.page = 1;
            this.ea.publish('queryChanged', { source: 'pagination', page: this.page, limit: this.limit });
        };

        UiTablePaginationCustomElement.prototype.navigateLast = function navigateLast() {
            this.page = this.pageCount;
            this.ea.publish('queryChanged', { source: 'pagination', page: this.page,
                limit: this.limit });
        };

        UiTablePaginationCustomElement.prototype.navigatePrevious = function navigatePrevious() {
            if (this.page - 1 >= 1) {
                this.page = this.page - 1;
                this.ea.publish('queryChanged', { source: 'pagination', page: this.page,
                    limit: this.limit });
            }
        };

        UiTablePaginationCustomElement.prototype.navigateNext = function navigateNext() {
            if (this.page + 1 <= this.pageCount) {
                this.page = this.page + 1;
                this.ea.publish('queryChanged', { source: 'pagination', page: this.page,
                    limit: this.limit });
            }
        };

        UiTablePaginationCustomElement.prototype.gotoPage = function gotoPage() {
            console.log(this.page);
            this.ea.publish('queryChanged', { source: 'pagination', page: this.page, limit: this.limit });
        };

        return UiTablePaginationCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'total', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'limitOptions', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table-row',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTableRowCustomAttribute = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var UiTableRowCustomAttribute = exports.UiTableRowCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
        function UiTableRowCustomAttribute(element, router) {
            var _this = this;

            _classCallCheck(this, UiTableRowCustomAttribute);

            _initDefineProp(this, 'route', _descriptor, this);

            _initDefineProp(this, 'params', _descriptor2, this);

            this.element = element;
            this.router = router;
            this.handler = function (e) {
                if (e.target.nodeName == 'TD' && e.target.firstChild.nodeName !== 'INPUT') {
                    _this.router.navigateToRoute(_this.route, _this.params);
                }
                return true;
            };
        }

        UiTableRowCustomAttribute.prototype.attached = function attached() {
            this.element.addEventListener('click', this.handler);
        };

        UiTableRowCustomAttribute.prototype.detached = function detached() {
            this.element.removeEventListener('click', this.handler);
        };

        UiTableRowCustomAttribute.prototype.routeChanged = function routeChanged(n, o) {
            this.route = n;
        };

        UiTableRowCustomAttribute.prototype.paramsChanged = function paramsChanged(n, o) {
            this.params = n;
        };

        return UiTableRowCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'route', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'params', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table-select',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTableSelectCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiTableSelectCustomElement = exports.UiTableSelectCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiTableSelectCustomElement(element) {
            _classCallCheck(this, UiTableSelectCustomElement);

            _initDefineProp(this, 'selectTo', _descriptor, this);

            _initDefineProp(this, 'selectAs', _descriptor2, this);

            _initDefineProp(this, 'selectMatcher', _descriptor3, this);

            this.element = element;
        }

        UiTableSelectCustomElement.prototype.attached = function attached() {
            var checkbox = jQuery('.ui.tabular.checkbox', this.element).checkbox();
        };

        UiTableSelectCustomElement.prototype.selectMatcherChanged = function selectMatcherChanged(n, o) {
            this.selectMatcher = n;
        };

        return UiTableSelectCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'selectTo', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selectAs', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectMatcher', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return function (a, b) {
                return a.id === b.id;
            };
        }
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table-sort',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTableSortCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var UiTableSortCustomElement = exports.UiTableSortCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function UiTableSortCustomElement(element, eventAggregator) {
            var _this = this;

            _classCallCheck(this, UiTableSortCustomElement);

            _initDefineProp(this, 'query', _descriptor, this);

            _initDefineProp(this, 'sort', _descriptor2, this);

            this.element = element;
            this.ea = eventAggregator;
            this.previousElement = null;
            this.handler = function (event) {
                var col = event.target;
                var sortBy = col.getAttribute('sort-by');
                if (sortBy) {
                    if (_this.previousElement) {
                        _this.previousElement.classList.remove('ascending');
                        _this.previousElement.classList.remove('descending');
                        _this.previousElement.classList.remove('sorted');
                    }
                    if ('ordering' in _this.query && _this.query.ordering.endsWith(sortBy)) {
                        if (_this.query.ordering.startsWith('-')) {
                            _this.query.ordering = sortBy;
                            col.classList.add('ascending');
                            col.classList.add('sorted');
                        } else {
                            _this.query.ordering = '-' + sortBy;
                            col.classList.add('descending');
                            col.classList.add('sorted');
                        }
                    } else {
                        _this.query.ordering = sortBy;
                        col.classList.add('ascending');
                        col.classList.add('sorted');
                    }
                    _this.previousElement = col;
                    _this.ea.publish('queryChanged', { source: 'sort' });
                }
            };
        }

        UiTableSortCustomElement.prototype.attached = function attached() {
            this.element.addEventListener('click', this.handler);
        };

        UiTableSortCustomElement.prototype.detached = function detached() {
            this.element.removeEventListener('click', this.handler);
        };

        return UiTableSortCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'query', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'sort', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-table',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _class, _temp;

    var UiTableCustomAttribute = exports.UiTableCustomAttribute = (_temp = _class = function UiTableCustomAttribute(element) {
        _classCallCheck(this, UiTableCustomAttribute);

        this.element = element;
        var classes = ' ui selectable sortable striped unstackable table attached ';
        this.element.className += classes;
    }, _class.inject = [Element], _temp);
});
define('components/semantic-ui/ui-tabs',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTabsCustomElement = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var UiTabsCustomElement = exports.UiTabsCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
        function UiTabsCustomElement(element) {
            _classCallCheck(this, UiTabsCustomElement);

            this.element = element;
        }

        UiTabsCustomElement.prototype.attached = function attached() {
            $('.menu .item', this.element).tab();
        };

        return UiTabsCustomElement;
    }()) || _class);
});
define('components/semantic-ui/ui-tags',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiTagsCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _desc, _value, _class, _descriptor;

    var UiTagsCustomElement = exports.UiTagsCustomElement = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), (_class = function () {
        function UiTagsCustomElement() {
            _classCallCheck(this, UiTagsCustomElement);

            _initDefineProp(this, 'source', _descriptor, this);
        }

        UiTagsCustomElement.prototype.remove = function remove(index) {
            this.source.splice(index, 1);
        };

        return UiTagsCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'source', [_dec], {
        enumerable: true,
        initializer: null
    })), _class));
});
define('components/semantic-ui/ui-toggle',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiToggle = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var UiToggle = exports.UiToggle = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function UiToggle() {
        _classCallCheck(this, UiToggle);

        _initDefineProp(this, 'value', _descriptor, this);

        _initDefineProp(this, 'checked', _descriptor2, this);

        _initDefineProp(this, 'label', _descriptor3, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'checked', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'label', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/semantic-ui/ui-validation-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UiValidationRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var UiValidationRenderer = exports.UiValidationRenderer = function () {
        function UiValidationRenderer() {
            _classCallCheck(this, UiValidationRenderer);
        }

        UiValidationRenderer.prototype.render = function render(instruction) {
            for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var _ref5 = _ref2;
                var elements = _ref5.elements,
                    result = _ref5.result;

                if (!result.valid) {
                    for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                        var _ref6;

                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref6 = _iterator3[_i3++];
                        } else {
                            _i3 = _iterator3.next();
                            if (_i3.done) break;
                            _ref6 = _i3.value;
                        }

                        var element = _ref6;

                        element.parentElement.classList.remove('error');
                        var theMessage = element.parentElement.getElementsByClassName('message');
                        if (theMessage.length > 0) {
                            element.parentElement.removeChild(theMessage[0]);
                        }
                    }
                }
            }
            for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref4 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref4 = _i2.value;
                }

                var _ref7 = _ref4;
                var elements = _ref7.elements,
                    result = _ref7.result;

                if (!result.valid) {
                    for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                        var _ref8;

                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref8 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) break;
                            _ref8 = _i4.value;
                        }

                        var _element = _ref8;

                        _element.parentElement.classList.add('error');
                        var errorMessage = '<div class="ui visible error message">' + result.message + '</div>';
                        if (!_element.parentElement.classList.contains('dropdown')) {
                            _element.parentElement.insertAdjacentHTML('beforeend', errorMessage);
                        }
                    }
                }
            }
        };

        return UiValidationRenderer;
    }();
});
define('components/shared/calendar',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'moment', 'fullcalendar'], function (exports, _aureliaFramework, _aureliaEventAggregator, _moment, _fullcalendar) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalendarCustomElement = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

    var CalendarCustomElement = exports.CalendarCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaFramework.BindingEngine, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function CalendarCustomElement(element, bindingEngine, eventAggregator) {
            var _this = this;

            _classCallCheck(this, CalendarCustomElement);

            _initDefineProp(this, 'dayClick', _descriptor, this);

            _initDefineProp(this, 'eventClick', _descriptor2, this);

            _initDefineProp(this, 'events', _descriptor3, this);

            _initDefineProp(this, 'options', _descriptor4, this);

            _initDefineProp(this, 'view', _descriptor5, this);

            this.subscription = null;

            this.element = element;
            this.bindingEngine = bindingEngine;
            this.ea = eventAggregator;

            this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe(function (splices) {
                return _this.eventListChanged(splices);
            });

            this.updateSubscriber = this.ea.subscribe('refetch-events', function (response) {
                if (_this.calendar) {
                    _this.calendar.fullCalendar('refetchEvents');
                }
            });
        }

        CalendarCustomElement.prototype.eventListChanged = function eventListChanged(splices) {
            if (this.calendar) {
                for (var _iterator = this.events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var e = _ref;

                    this.calendar.fullCalendar('addEventSource', e);
                }
            }
        };

        CalendarCustomElement.prototype.eventsChanged = function eventsChanged(n, o) {
            var _this2 = this;

            if (this.subscription !== null) {
                this.subscription.dispose();
            }
            this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe(function (splices) {
                return _this2.eventListChanged(splices);
            });
            if (this.calendar) {
                this.calendar.fullCalendar('refetchEvents');
            }
        };

        CalendarCustomElement.prototype.attached = function attached() {
            var _this3 = this;

            this.calendar = $(this.element);

            var eventSource = function eventSource(start, end, timezone, callback) {
                callback(_this3.events);
            };

            var defaultValues = {
                defaultView: this.view || 'month',
                weekends: true,
                firstDay: 1,
                eventSources: this.events,
                viewRender: function viewRender(view, element) {
                    var windowSize = $(window).width();
                    if (windowSize <= 768) {
                        _this3.calendar.fullCalendar('changeView', 'listWeek');
                    }
                },
                windowResize: function windowResize(view) {
                    var windowSize = $(window).width();
                    if (windowSize <= 768) {
                        _this3.calendar.fullCalendar('changeView', 'listWeek');
                    }
                }
            };

            this.calendar.fullCalendar(Object.assign(defaultValues, this.options));
        };

        CalendarCustomElement.prototype.detached = function detached() {
            this.subscription.dispose();
        };

        return CalendarCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dayClick', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'eventClick', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'events', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return [];
        }
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'options', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/shared/chart',['exports', 'aurelia-framework', 'chartjs'], function (exports, _aureliaFramework, _chartjs) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ChartCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var ChartCustomElement = exports.ChartCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function ChartCustomElement(element) {
            _classCallCheck(this, ChartCustomElement);

            _initDefineProp(this, 'data', _descriptor, this);

            _initDefineProp(this, 'type', _descriptor2, this);

            _initDefineProp(this, 'config', _descriptor3, this);

            this.colours = ['31, 119, 180', '174, 199, 232', '255, 127, 14', '255, 187, 120', '44, 160, 44', '152, 223, 138', '214, 39, 40', '255, 152, 150', '148, 103, 189', '197, 176, 213', '140, 86, 75', '196, 156, 148', '227, 119, 194', '247, 182, 210', '127, 127, 127', '199, 199, 199', '188, 189, 34', '219, 219, 141', '23, 190, 207', '158, 218, 229'];

            this.element = element;
        }

        ChartCustomElement.prototype.makeChart = function makeChart(dataset) {
            var ctx = this.element.getElementsByTagName('canvas')[0];
            this.chart = new _chartjs.Chart(ctx, {
                type: this.type,
                data: dataset,
                config: this.config
            });
        };

        ChartCustomElement.prototype.dataToDataset = function dataToDataset() {
            var backgroundColours = [];
            var borderColours = [];
            for (var i = 0; i < this.data.data.length; i++) {
                backgroundColours.push('rgba(' + this.colours[i] + ', 0.7)');
                borderColours.push('rgba(' + this.colours[i] + ', 1)');
            }
            var dataset = {
                labels: this.data.labels,
                datasets: [{
                    data: this.data.data,
                    backgroundColor: backgroundColours,
                    borderColor: borderColours,
                    borderWidth: 1
                }]
            };
            return dataset;
        };

        ChartCustomElement.prototype.dataChanged = function dataChanged(n, o) {
            if (n) {
                var dataset = this.dataToDataset();
                this.makeChart(dataset);

                var windowWidth = document.documentElement.clientWidth;
                var ctx = this.element;
                if (windowWidth < 768) {
                    this.chart.options.maintainAspectRatio = false;
                    ctx.style.height = '300px';
                    this.chart.update();
                    this.chart.resize();
                } else {
                    this.chart.options.maintainAspectRatio = false;
                    this.chart.update();
                    this.chart.resize();
                }
            }
        };

        return ChartCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {};
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'doughnut';
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'config', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return { maintainAspectRatio: false };
        }
    })), _class2)) || _class);
});
define('components/shared/date-format',['exports', 'moment'], function (exports, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DateFormatValueConverter = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
            _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value, format) {
            if (value) {
                if (!format) {
                    format = 'DD/MM/YY h:mm:ss a';
                }
                return (0, _moment2.default)(value).format(format);
            }
        };

        return DateFormatValueConverter;
    }();
});
define('components/shared/index',['exports'], function (exports) {
                        'use strict';

                        Object.defineProperty(exports, "__esModule", {
                                                value: true
                        });
                        exports.configure = configure;
                        function configure(aurelia) {
                                                aurelia.globalResources('./ll-template-hook', './ll-permissions', './limit-length', './map-href', './date-format', './calendar');
                        }
});
define('components/shared/limit-length',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var LimitLengthValueConverter = exports.LimitLengthValueConverter = function () {
        function LimitLengthValueConverter() {
            _classCallCheck(this, LimitLengthValueConverter);
        }

        LimitLengthValueConverter.prototype.toView = function toView(value, length) {
            var output = value;
            if (!length) {
                length = 300;
            }
            if (value && value.length > length) {
                output = value.slice(0, length) + '\u2026';
            }
            return output;
        };

        return LimitLengthValueConverter;
    }();
});
define('components/shared/ll-permissions',['exports', 'aurelia-framework', '../../auth/api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _api, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlPermissions = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var LlPermissions = exports.LlPermissions = (_dec = (0, _aureliaFramework.inject)(_api.UserApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlPermissions(api, eventAggregator) {
            _classCallCheck(this, LlPermissions);

            _initDefineProp(this, 'objectFor', _descriptor, this);

            _initDefineProp(this, 'reset', _descriptor2, this);

            _initDefineProp(this, 'object', _descriptor3, this);

            this.api = api;
            this.ea = eventAggregator;
            this.selected = [];
            this.perms = {};
            this.error = null;

            this.fromServer = false;
        }

        LlPermissions.prototype.buildPerms = function buildPerms() {
            var _this = this;

            var assigned_permissions = {};
            this.selected = [];
            this.perms = {};
            this.api.groups().then(function (data) {
                _this.groups = data;
                if ('permissions' in _this.objectFor) {
                    for (var group in _this.objectFor.permissions) {
                        assigned_permissions[group] = 'r';
                        _this.perms[group] = 'r';
                        for (var perm in _this.objectFor.permissions[group]) {
                            var perm_string = _this.objectFor.permissions[group][perm];
                            if (perm_string.startsWith('change_')) {
                                assigned_permissions[group] = 'rw';
                                _this.perms[group] = 'rw';
                            }
                        }
                        if (_this.selected.indexOf(group) == -1) {
                            _this.selected.push(group);
                        }
                    }
                } else {
                    for (var g in _this.groups.results) {
                        var _group = _this.groups.results[g];
                        if (_group.name !== 'user') {
                            assigned_permissions[_group.name] = 'rw';
                            _this.perms[_group.name] = 'rw';
                            if (_this.selected.indexOf(_group.name) == -1) {
                                _this.selected.push(_group.name);
                            }
                        }
                    }
                }
                _this.objectFor.assign_groups = assigned_permissions;
            });
        };

        LlPermissions.prototype.resetChanged = function resetChanged(n) {
            if (!n) {
                this.perms = {};
                this.buildPerms();
            }
        };

        LlPermissions.prototype.objectForChanged = function objectForChanged(n) {
            if (this.objectFor && 'permissions' in this.objectFor && !this.fromServer) {
                this.buildPerms();
                this.fromServer = true;
            } else if (this.objectFor && Object.keys(this.perms).length == 0) {
                this.buildPerms();
            }
        };

        LlPermissions.prototype.toggled = function toggled(group) {
            var _this2 = this;

            if (group in this.objectFor.assign_groups) {
                delete this.objectFor.assign_groups[group];
                this.perms[group] = false;
                if (this.objectFor.id) {
                    this.api.removePermissions(this.object, this.objectFor.id, group).catch(function (err) {
                        _this2.error = err;
                    });
                }
            } else {
                this.objectFor.assign_groups[group] = 'r';
                this.perms[group] = 'r';
                if (this.objectFor.id) {
                    this.api.setPermissions(this.object, this.objectFor.id, this.objectFor.assign_groups).catch(function (err) {
                        _this2.error = err;
                    });
                }
            }
        };

        LlPermissions.prototype.setPerm = function setPerm(group, value) {
            var _this3 = this;

            this.objectFor.assign_groups[group] = value;
            this.perms[group] = value;
            if (this.objectFor.id) {
                this.api.setPermissions(this.object, this.objectFor.id, this.objectFor.assign_groups).catch(function (err) {
                    _this3.error = err;
                });
            }
        };

        return LlPermissions;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'objectFor', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'reset', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'object', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/shared/ll-template-hook',['exports', 'aurelia-framework', 'aurelia-configuration'], function (exports, _aureliaFramework, _aureliaConfiguration) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlTemplateHookCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlTemplateHookCustomElement = exports.LlTemplateHookCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaConfiguration.AureliaConfiguration), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlTemplateHookCustomElement(aureliaConfiguration) {
            _classCallCheck(this, LlTemplateHookCustomElement);

            _initDefineProp(this, 'name', _descriptor, this);

            _initDefineProp(this, 'source', _descriptor2, this);

            this.config = aureliaConfiguration;

            this.availablePlugins = this.config.get('plugins', {});
        }

        LlTemplateHookCustomElement.prototype.attached = function attached() {
            var plugins = [];
            if (this.name in this.availablePlugins) {
                for (var _iterator = this.availablePlugins[this.name], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var plugin = _ref;

                    plugins.push('/plugins/' + plugin + '.js');
                }
            }
            this.plugins = plugins;
        };

        return LlTemplateHookCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'name', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('components/shared/map-href',['exports', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-router', 'aurelia-pal', 'aurelia-logging', 'aurelia-route-mapper'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaRouter, _aureliaPal, _aureliaLogging, _aureliaRouteMapper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RouteChref = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _class;

  var logger = LogManager.getLogger('map-href');

  var RouteChref = exports.RouteChref = (_dec = (0, _aureliaTemplating.customAttribute)('map-href'), _dec2 = (0, _aureliaTemplating.bindable)({ name: 'route', changeHandler: 'processChange', primaryProperty: true }), _dec3 = (0, _aureliaTemplating.bindable)({ name: 'params', changeHandler: 'processChange' }), _dec4 = (0, _aureliaTemplating.bindable)({ name: 'attribute', defaultValue: 'href' }), _dec5 = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router, _aureliaPal.DOM.Element, _aureliaRouteMapper.RouteMapper), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = function () {
    function RouteChref(router, element, routeMapper) {
      _classCallCheck(this, RouteChref);

      this.router = router;
      this.element = element;
      this.mapper = routeMapper;
    }

    RouteChref.prototype.attached = function attached() {
      this.isActive = true;
      this.processChange();
    };

    RouteChref.prototype.unbind = function unbind() {
      this.isActive = false;
    };

    RouteChref.prototype.attributeChanged = function attributeChanged(value, previous) {
      if (previous) {
        this.element.removeAttribute(previous);
      }

      this.processChange();
    };

    RouteChref.prototype.processChange = function processChange() {
      var _this = this;

      return this.router.ensureConfigured().then(function () {
        if (!_this.isActive) {
          return null;
        }

        var href = '';
        if (!_this.router.options.pushState) {
          href += '#';
        }
        href += _this.mapper.generate(_this.route, _this.params);

        if (_this.element.au.controller) {
          _this.element.au.controller.viewModel[_this.attribute] = href;
        } else {
          _this.element.setAttribute(_this.attribute, href);
        }

        return null;
      }).catch(function (reason) {
        logger.error(reason);
      });
    };

    return RouteChref;
  }()) || _class) || _class) || _class) || _class) || _class);
});
define('components/shared/show-row',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ShowRowCustomAttribute = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ShowRowCustomAttribute = exports.ShowRowCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
        function ShowRowCustomAttribute(element) {
            var _this = this;

            _classCallCheck(this, ShowRowCustomAttribute);

            this.element = element;

            this.toggle = function (event) {
                if (event.target.nodeName == 'TD') {
                    if (_this.value) {
                        _this.value = false;
                    } else {
                        _this.value = true;
                    }
                }
            };
            this.element.classList.add('clickable');
        }

        ShowRowCustomAttribute.prototype.attached = function attached() {
            this.element.addEventListener('click', this.toggle);
        };

        ShowRowCustomAttribute.prototype.detached = function detached() {
            this.element.removeEventListener('click', this.toggle);
        };

        ShowRowCustomAttribute.prototype.valueChanged = function valueChanged(n) {};

        return ShowRowCustomAttribute;
    }()) || _class);
});
define('settings/alerts/alerts',['exports', 'aurelia-framework', '../../alerts/api', '../../auth/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _api2, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Alert = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Alert = exports.Alert = (_dec = (0, _aureliaFramework.inject)(_api.AlertApi, _api2.UserApi), _dec(_class = function (_SettingsTable) {
        _inherits(Alert, _SettingsTable);

        function Alert(alertApi, userApi) {
            _classCallCheck(this, Alert);

            for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                rest[_key - 2] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = alertApi;
            _this.userApi = userApi;

            _this.setFunctions('triggerSet');
            _this.createTemplate = './alerts/create-alert.html';

            _this.removed = [];

            _this.tableHeaders = ['Name', 'Severity', 'For'];
            _this.tableFields = ['name', 'severity', 'model'];

            _this.models = [{ model: 'Item', endpoint: 'inventory' }, { model: 'Project', endpoint: 'projects' }, { model: 'Product', endpoint: 'products' }, { model: 'Run', endpoint: 'runs' }, { model: 'Equipment', endpoint: 'equipment' }, { model: 'Task', endpoint: 'tasks' }, { model: 'Workflow', endpoint: 'workflows' }, { model: 'EquipmentReservation', endpoint: 'equipmentreservation' }];

            _this.operators = [{ value: '<', name: 'less than' }, { value: '<=', name: 'less than or equal to' }, { value: '==', name: 'equal to' }, { value: '>=', name: 'greater than or equal to' }, { value: '>', name: 'greater than' }, { value: '!=', name: 'not equal to' }];

            _this.hasLinkedUser = false;
            _this.modelUserFields = {
                'Project': [{ name: 'Primary lab contact', path: 'primary_lab_contact' }, { name: 'CRM user', path: 'crm_project__account__user' }],
                'Product': [{ name: 'Created by', path: 'created_by' }],
                'Item': [{ name: 'Added by', path: 'added_by' }],
                'Run': [{ name: 'Started by', path: 'started_by' }],
                'EquipmentReservation': [{ name: 'Reserved by', path: 'reserved_by' }],
                'Task': [{ name: 'Created by', path: 'created_by' }],
                'Workflow': [{ name: 'Created by', path: 'created_by' }]
            };
            _this.linkedUserFields = [];

            _this.triggerValidation = _aureliaValidation.ValidationRules.ensure('field').required().when(function (x) {
                return !x.fire_on_create;
            }).ensure('operator').required().when(function (x) {
                return !x.fire_on_create;
            }).ensure('value').required().when(function (x) {
                return !x.fire_on_create;
            }).rules;

            _this.subscriptionValidation = _aureliaValidation.ValidationRules.ensure('user').required().rules;

            _this.applyValidation();

            _this.setAvailableFields = function (event) {
                var model = _this.models.find(function (x) {
                    return x.model === event.target.value;
                });
                _this.api.modelFields(model.endpoint).then(function (data) {
                    var fieldsList = Object.entries(data.actions.POST);
                    _this.fields = new Map(fieldsList);
                }).catch(function (err) {
                    return console.log(error);
                });

                if (_this.modelUserFields[model.model]) {
                    _this.hasLinkedUser = true;
                    _this.linkedUserFields = _this.modelUserFields[model.model];
                } else {
                    _this.hasLinkedUser = false;
                }
            };

            return _this;
        }

        Alert.prototype.applyValidation = function applyValidation() {
            _aureliaValidation.ValidationRules.ensure('name').required().ensure('severity').required().ensure('model').required().on(this.item);
        };

        Alert.prototype.addTrigger = function addTrigger() {
            if (!this.item.triggers) {
                this.item.triggers = [];
            }
            var trigger = {};
            this.validator.addObject(trigger, this.triggerValidation);
            this.item.triggers.push(trigger);
        };

        Alert.prototype.removeTrigger = function removeTrigger(index, item) {
            this.removed.push(item);
            this.item.triggers.splice(index, 1);
        };

        Alert.prototype.addSubscription = function addSubscription() {
            if (!this.item.subscriptions) {
                this.item.subscriptions = [];
            }
            var subscription = {};
            this.validator.addObject(subscription, this.susbscriptionValidation);
            this.item.subscriptions.push(subscription);
        };

        Alert.prototype.removeSubscription = function removeSubscription(index, item) {
            this.removed.push(item);
            this.item.subscriptions.splice(index, 1);
        };

        Alert.prototype.edit = function edit(item) {
            var fakeEvent = { target: { value: item.model } };
            this.setAvailableFields(fakeEvent);
            _SettingsTable.prototype.edit.call(this, item);
        };

        Alert.prototype.createOrUpdate = function createOrUpdate(id) {
            var actions = [];
            for (var _iterator = this.item.triggers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var x = _ref;

                if (x.id) {
                    actions.push(this.api.updateTrigger(x.id, x));
                } else {
                    x.triggerset_id = id;
                    actions.push(this.api.createTrigger(x));
                }
            }
            for (var _iterator2 = this.item.subscriptions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var _x = _ref2;

                if (_x.id) {
                    actions.push(this.api.updateSubscription(_x.id, _x));
                } else {
                    _x.triggerset_id = id;
                    actions.push(this.api.createSubscription(_x));
                }
            }
            return actions;
        };

        Alert.prototype.removeItems = function removeItems(actions) {
            for (var _iterator3 = this.removed, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var r = _ref3;

                if (r.id) {
                    if (r.field) {
                        actions.push(this.api.deleteTrigger(r.id));
                    } else {
                        actions.push(this.api.deleteSubscription(r.id));
                    }
                }
            }
            this.removed = [];
            return actions;
        };

        Alert.prototype.save = function save() {
            var _this2 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this2.api[_this2.saveFunc](_this2.item).then(function (data) {
                        var actions = _this2.createOrUpdate(data.id);
                        Promise.all(actions).then(function (response) {
                            _this2.getData();
                            _this2.cancel();
                        }).catch(function (err) {
                            return _this2.error = err;
                        });
                    }).catch(function (err) {
                        _this2.error = err;
                    });
                }
            });
        };

        Alert.prototype.update = function update() {
            var _this3 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this3.api[_this3.updateFunc](_this3.item.id, _this3.item).then(function (data) {
                        var actions = _this3.createOrUpdate(data.id);
                        _this3.removeItems(actions);
                        Promise.all(actions).then(function (response) {
                            _this3.getData();
                            _this3.cancel();
                        }).catch(function (err) {
                            return _this3.error = err;
                        });
                    }).catch(function (err) {
                        _this3.error = err;
                    });
                }
            });
        };

        Alert.prototype.clearObject = function clearObject(obj) {
            this.item = {};
            this.applyValidation();
            this.hasLinkedUser = false;
        };

        Alert.prototype.cancel = function cancel() {
            this.clearObject();
            _SettingsTable.prototype.cancel.call(this);
        };

        return Alert;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/alerts/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: '/alerts', name: 'alert-settings', moduleId: './alerts/alerts',
    nav: false, title: 'Alerts', layoutView: './table.html' }];
});
define('settings/crm/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: '/alerts', name: 'alert-settings', moduleId: './alerts/alerts',
    nav: false, title: 'Alerts', layoutView: './table.html' }];
});
define('settings/equipment/equipment',['exports', 'aurelia-framework', '../../equipment/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Equipment = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Equipment = exports.Equipment = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi), _dec(_class = function (_SettingsTable) {
        _inherits(Equipment, _SettingsTable);

        function Equipment(workflowApi) {
            _classCallCheck(this, Equipment);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = workflowApi;

            _this.setFunctions('equipment');
            _this.getFunc = 'equipment';
            _this.createTemplate = './equipment/create-equipment.html';

            _this.tableHeaders = ['Name', 'Location', 'Status', 'Reservable'];
            _this.tableFields = ['name', 'location_display', 'status_display', 'can_reserve'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('location').required().on(_this.item);
            return _this;
        }

        return Equipment;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/equipment/files',['exports', 'aurelia-framework', '../../equipment/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EquipmentFiles = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var EquipmentFiles = exports.EquipmentFiles = (_dec = (0, _aureliaFramework.inject)(_api.EquipmentApi), _dec(_class = function (_SettingsTable) {
        _inherits(EquipmentFiles, _SettingsTable);

        function EquipmentFiles(equipmentApi) {
            _classCallCheck(this, EquipmentFiles);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = equipmentApi;

            _this.setFunctions('copyfile');
            _this.createTemplate = './equipment/create-files.html';

            _this.tableHeaders = ['Name', 'Equipment', 'From prefix', 'To prefix', 'Enabled'];
            _this.tableFields = ['name', 'equipment', 'from_prefix', 'to_prefix', 'is_enabled'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('equipment').required().on(_this.item);
            return _this;
        }

        EquipmentFiles.prototype.addLocation = function addLocation() {
            if (!this.item.locations) {
                this.item.locations = [];
            }
            var location = {};
            this.item.locations.push(location);
        };

        EquipmentFiles.prototype.removeLocation = function removeLocation(index) {
            this.item.locations.splice(index, 1);
        };

        return EquipmentFiles;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/equipment/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: '/equipment', name: 'equipment-settings', moduleId: './equipment/equipment',
    nav: false, title: 'Available equipment', layoutView: './table.html' }, { route: '/files', name: 'files-settings', moduleId: './equipment/files',
    nav: false, title: 'Equipment file handling', layoutView: './table.html' }];
});
define('settings/general/filetemplate-wizard',['exports', 'aurelia-framework', 'aurelia-validation', 'aurelia-dialog', '../../workflows/api'], function (exports, _aureliaFramework, _aureliaValidation, _aureliaDialog, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FiletemplateWizard = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var FiletemplateWizard = exports.FiletemplateWizard = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _aureliaFramework.BindingEngine, _api.WorkflowApi), _dec(_class = function () {
        function FiletemplateWizard(element, dialogController, bindingEngine, workflowApi) {
            var _this = this;

            _classCallCheck(this, FiletemplateWizard);

            this.dialog = dialogController;
            this.be = bindingEngine;
            this.api = workflowApi;

            this.task = undefined;
            this.mapFields = [];

            this.item = {
                fields: []
            };

            this.taskFields = ['product_identifier', 'inventory_identifier', 'product_input_amount', 'product_input_measure'];

            this.inventoryFields = ['name', 'identifier', 'barcode', 'description', 'item_type', 'amount_available', 'amount_measure', 'concentration', 'concentration_measure', 'location'];

            this.requiredForInventoryInput = ['name', 'item_type', 'amount_available', 'amount_measure', 'location'];

            this.requiredForTaskInput = ['product_identifier', 'inventory_identifier', 'product_input_amount', 'product_input_measure'];

            this.observeUsedFor = function (n, o) {
                _this.item.fields.splice(0, _this.item.fields.length);
                if (_this.item.file_for == 'input') {
                    if (n == 'task') {
                        for (var _iterator = _this.requiredForTaskInput, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                            var _ref;

                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                _i = _iterator.next();
                                if (_i.done) break;
                                _ref = _i.value;
                            }

                            var r = _ref;

                            _this.item.fields.push({ name: r, map_to: r, required: true });
                        }
                    } else if (n == 'inventory') {
                        _this.mapFields = _this.inventoryFields.slice();
                        for (var _iterator2 = _this.requiredForInventoryInput, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                            var _ref2;

                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                _i2 = _iterator2.next();
                                if (_i2.done) break;
                                _ref2 = _i2.value;
                            }

                            var _r = _ref2;

                            _this.item.fields.push({ name: _r, map_to: _r, required: true });
                        }
                    }
                }
            };

            this.observeTask = function (n, o) {
                var availableFields = _this.taskFields.slice();
                var fieldList = ['input_fields', 'output_fields', 'variable_fields'];
                _this.api.taskDetail(n).then(function (data) {
                    for (var _iterator3 = fieldList, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                        var _ref3;

                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i3++];
                        } else {
                            _i3 = _iterator3.next();
                            if (_i3.done) break;
                            _ref3 = _i3.value;
                        }

                        var fieldName = _ref3;

                        for (var _iterator4 = data[fieldName], _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                            var _ref4;

                            if (_isArray4) {
                                if (_i4 >= _iterator4.length) break;
                                _ref4 = _iterator4[_i4++];
                            } else {
                                _i4 = _iterator4.next();
                                if (_i4.done) break;
                                _ref4 = _i4.value;
                            }

                            var field = _ref4;

                            availableFields.push(field.label);
                        }
                    }
                    _this.mapFields = availableFields;
                });
            };
        }

        FiletemplateWizard.prototype.addField = function addField() {
            this.item.fields.push({});
        };

        FiletemplateWizard.prototype.removeField = function removeField(index) {
            this.item.fields.splice(index, 1);
        };

        FiletemplateWizard.prototype.activate = function activate(model) {
            this.item = model;
            this.task = undefined;
            this.used_for = undefined;
            this.usedForObserver = this.be.propertyObserver(this, 'used_for').subscribe(this.observeUsedFor);
            this.taskObserver = this.be.propertyObserver(this, 'task').subscribe(this.observeTask);
            console.log('I have been activated!', model);
        };

        FiletemplateWizard.prototype.deactivate = function deactivate() {
            console.log('bye bye');
            this.usedForObserver.dispose();
            this.taskObserver.dispose();
        };

        return FiletemplateWizard;
    }()) || _class);
});
define('settings/general/filetemplates',['exports', 'aurelia-framework', '../../filetemplates/api', '../settings-table', 'aurelia-validation', './filetemplate-wizard'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation, _filetemplateWizard) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FileTemplates = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var FileTemplates = exports.FileTemplates = (_dec = (0, _aureliaFramework.inject)(_api.FiletemplateApi), _dec(_class = function (_SettingsTable) {
        _inherits(FileTemplates, _SettingsTable);

        function FileTemplates(filetemplateApi) {
            _classCallCheck(this, FileTemplates);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = filetemplateApi;

            _this.setFunctions('filetemplate');
            _this.createTemplate = './general/create-filetemplate.html';

            _this.tableHeaders = ['Name', 'Template purpose'];
            _this.tableFields = ['name', 'file_for'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('file_for').required().on(_this.item);

            if (!_this.item.fields) {
                _this.item.fields = [];
            }

            _this.showWizard = function () {
                _this.dialog.open({ viewModel: _filetemplateWizard.FiletemplateWizard, model: _this.item }).whenClosed(function (response) {
                    if (!response.wasCancelled) {
                        _this.save();
                    } else {
                        _this.item.file_for = '';
                        _this.item.fields.splice(0);
                    }
                });
            };

            _this.extraToolbarButtons = [{ text: 'Wizard', icon: 'wizard', action: _this.showWizard }];
            return _this;
        }

        FileTemplates.prototype.addField = function addField() {
            this.item.fields.push({});
        };

        FileTemplates.prototype.removeField = function removeField(index) {
            this.item.fields.splice(index, 1);
        };

        return FileTemplates;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/general',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-dialog'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.General = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var General = exports.General = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService), _dec(_class = function General() {
    _classCallCheck(this, General);
  }) || _class);
});
define('settings/general/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: 'itemtypes', name: 'itemtypes-settings', moduleId: './general/itemtypes',
    nav: false, title: 'Item types', layoutView: './table.html' }, { route: 'measures', name: 'measures-settings', moduleId: './general/measures',
    nav: false, title: 'Measures', layoutView: './table.html' }, { route: 'locations', name: 'locations-settings', moduleId: './general/locations',
    nav: false, title: 'Locations', layoutView: './table.html' }, { route: 'organisms', name: 'organisms-settings', moduleId: './general/organisms',
    nav: false, title: 'Organisms', layoutView: './table.html' }, { route: 'status', name: 'status-settings', moduleId: './general/status',
    nav: false, title: 'Product statuses', layoutView: './table.html' }, { route: 'projectstatuses', name: 'project-status-settings',
    moduleId: './general/projectstatuses',
    nav: false, title: 'Project statuses', layoutView: './table.html' }, { route: 'filetemplates', name: 'filetemplate-settings', moduleId: './general/filetemplates',
    nav: false, title: 'File templates', layoutView: './table.html' }];
});
define('settings/general/itemtypes',['exports', 'aurelia-framework', '../../shared/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ItemTypes = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var ItemTypes = exports.ItemTypes = (_dec = (0, _aureliaFramework.inject)(_api.SharedApi), _dec(_class = function (_SettingsTable) {
        _inherits(ItemTypes, _SettingsTable);

        function ItemTypes(sharedApi) {
            _classCallCheck(this, ItemTypes);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = sharedApi;

            _this.setFunctions('itemType');
            _this.createTemplate = './general/create-itemtype.html';

            _this.tableHeaders = ['Name', 'Parent'];
            _this.tableFields = ['display_name', 'parent'];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        return ItemTypes;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/locations',['exports', 'aurelia-framework', '../../shared/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Locations = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Locations = exports.Locations = (_dec = (0, _aureliaFramework.inject)(_api.SharedApi), _dec(_class = function (_SettingsTable) {
        _inherits(Locations, _SettingsTable);

        function Locations(sharedApi) {
            _classCallCheck(this, Locations);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = sharedApi;

            _this.setFunctions('location');
            _this.createTemplate = './general/create-location.html';

            _this.tableHeaders = ['Name', 'Code', 'Parent'];
            _this.tableFields = ['display_name', 'code', 'parent_name'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('code').required().on(_this.item);
            return _this;
        }

        return Locations;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/measures',['exports', 'aurelia-framework', '../../shared/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Measures = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Measures = exports.Measures = (_dec = (0, _aureliaFramework.inject)(_api.SharedApi), _dec(_class = function (_SettingsTable) {
        _inherits(Measures, _SettingsTable);

        function Measures(sharedApi) {
            _classCallCheck(this, Measures);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = sharedApi;

            _this.setFunctions('measure');
            _this.createTemplate = './general/create-measure.html';

            _this.tableHeaders = ['Symbol', 'Name'];
            _this.tableFields = ['symbol', 'name'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('symbol').required().on(_this.item);
            return _this;
        }

        return Measures;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/organisms',['exports', 'aurelia-framework', '../../shared/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Organisms = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Organisms = exports.Organisms = (_dec = (0, _aureliaFramework.inject)(_api.SharedApi), _dec(_class = function (_SettingsTable) {
        _inherits(Organisms, _SettingsTable);

        function Organisms(sharedApi) {
            _classCallCheck(this, Organisms);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = sharedApi;

            _this.setFunctions('organism');
            _this.createTemplate = './general/create-organism.html';

            _this.tableHeaders = ['Name', 'Common name'];
            _this.tableFields = ['name', 'common_name'];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        return Organisms;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/productstatus',['exports', 'aurelia-framework', '../../shared/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProductStatus = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var ProductStatus = exports.ProductStatus = (_dec = (0, _aureliaFramework.inject)(_api.SharedApi), _dec(_class = function (_SettingsTable) {
        _inherits(ProductStatus, _SettingsTable);

        function ProductStatus(sharedApi) {
            _classCallCheck(this, ProductStatus);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = sharedApi;

            _this.setFunctions('itemType');
            _this.createTemplate = './general/create-itemtype.html';

            _this.tableHeaders = ['Name', 'Parent'];
            _this.tableFields = ['display_name', 'parent'];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        return ProductStatus;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/projectstatuses',['exports', 'aurelia-framework', '../../projects/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProjectStatuses = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var ProjectStatuses = exports.ProjectStatuses = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi), _dec(_class = function (_SettingsTable) {
        _inherits(ProjectStatuses, _SettingsTable);

        function ProjectStatuses(projectApi) {
            _classCallCheck(this, ProjectStatuses);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = projectApi;

            _this.setFunctions('projectStatus');
            _this.getFunc = 'projectStatuses';
            _this.createTemplate = './general/create-productstatus.html';

            _this.tableHeaders = ['Name', 'Description'];
            _this.tableFields = ['name', 'desciption'];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        return ProjectStatuses;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/general/status',['exports', 'aurelia-framework', '../../projects/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ProductStatus = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var ProductStatus = exports.ProductStatus = (_dec = (0, _aureliaFramework.inject)(_api.ProjectApi), _dec(_class = function (_SettingsTable) {
        _inherits(ProductStatus, _SettingsTable);

        function ProductStatus(projectApi) {
            _classCallCheck(this, ProductStatus);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = projectApi;

            _this.setFunctions('productStatus');
            _this.getFunc = 'productStatuses';
            _this.createTemplate = './general/create-productstatus.html';

            _this.tableHeaders = ['Name', 'Description'];
            _this.tableFields = ['name', 'desciption'];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        return ProductStatus;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/users/change-password',['exports', 'aurelia-framework', 'aurelia-dialog', 'aurelia-validation', '../../components/semantic-ui/ui-validation-renderer'], function (exports, _aureliaFramework, _aureliaDialog, _aureliaValidation, _uiValidationRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ChangePassword = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ChangePassword = exports.ChangePassword = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec(_class = function () {
        function ChangePassword(element, dialogController, validationController) {
            _classCallCheck(this, ChangePassword);

            this.dialog = dialogController;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.p = {};

            _aureliaValidation.ValidationRules.ensure('newPassword').required().minLength(10).satisfies(function (v, obj) {
                return v === obj.repeatNewPassword;
            }).ensure('repeatNewPassword').required().minLength(10).satisfies(function (v, obj) {
                return v === obj.newPassword;
            }).on(this.p);
        }

        ChangePassword.prototype.activate = function activate(user) {
            this.user = user;
        };

        ChangePassword.prototype.change = function change() {
            var _this = this;

            this.validator.validate().then(function (results) {
                _this.dialog.ok(_this.p);
            });
        };

        return ChangePassword;
    }()) || _class);
});
define('settings/users/groups',['exports', 'aurelia-framework', '../../auth/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Group = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Group = exports.Group = (_dec = (0, _aureliaFramework.inject)(_api.UserApi), _dec(_class = function (_SettingsTable) {
        _inherits(Group, _SettingsTable);

        function Group(userApi) {
            _classCallCheck(this, Group);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = userApi;

            _this.setFunctions('group');
            _this.createTemplate = './users/create-group.html';

            _this.tableHeaders = ['Name'];
            _this.tableFields = ['name'];

            _this.item.permissions = [];

            _aureliaValidation.ValidationRules.ensure('name').required().on(_this.item);
            return _this;
        }

        Group.prototype.addPermission = function addPermission() {
            this.item.permissions.push(this.permission);
        };

        Group.prototype.removePermission = function removePermission(index) {
            this.item.permissions.splice(index, 1);
        };

        return Group;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/users/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: '/users', name: 'user-settings', moduleId: './users/users',
    nav: false, title: 'Users', layoutView: './table.html' }, { route: '/groups', name: 'group-settings', moduleId: './users/groups',
    nav: false, title: 'Groups', layoutView: './table.html' }];
});
define('settings/users/users',['exports', 'aurelia-framework', '../../auth/api', '../../crm/api', '../settings-table', 'aurelia-validation', './change-password'], function (exports, _aureliaFramework, _api, _api2, _settingsTable, _aureliaValidation, _changePassword) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_api.UserApi, _api2.CrmApi), _dec(_class = function (_SettingsTable) {
        _inherits(Users, _SettingsTable);

        function Users(userApi, crmApi) {
            _classCallCheck(this, Users);

            for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                rest[_key - 2] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = userApi;
            _this.crmApi = crmApi;

            _this.setFunctions('user');
            _this.createTemplate = './users/create-user.html';

            _this.tableHeaders = ['Username', 'Email', 'CRM Account'];
            _this.tableFields = ['username', 'email', 'crmaccount.account_details'];

            _this.item.groups = [];

            _this.changePassword = function (user) {
                _this.dialog.open({ viewModel: _changePassword.ChangePassword, model: user }).whenClosed(function (response) {
                    _this.api.changePassword(user.id, response.output.newPassword).catch(function (err) {
                        return _this.error = err;
                    });
                });
            };

            _this.extraButtons = [{ icon: 'key', action: _this.changePassword }];

            _aureliaValidation.ValidationRules.ensure('username').satisfies(function (v, o) {
                return v.match(/^[A-Za-z0-9@\-_\.\+]+$/g) ? true : false;
            }).satisfies(function (v, o) {
                return v.includes(' ') ? false : true;
            }).required().ensure('password').required().ensure('email').email().required().on(_this.item);

            return _this;
        }

        Users.prototype.addAccount = function addAccount() {
            var _this2 = this;

            this.crmApi.addAccount(this.item.email).then(function (data) {
                _this2.getData();
            });
        };

        Users.prototype.removeAccount = function removeAccount() {
            var _this3 = this;

            this.crmApi.removeAccount(this.item.email).then(function (data) {
                _this3.getData();
            });
        };

        Users.prototype.addGroup = function addGroup() {
            this.item.groups.push(this.group);
        };

        Users.prototype.removeGroup = function removeGroup(index) {
            this.item.groups.splice(index, 1);
        };

        return Users;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/workflows/exportworkflow',['exports', 'aurelia-framework', 'aurelia-validation', 'aurelia-dialog', '../../workflows/api'], function (exports, _aureliaFramework, _aureliaValidation, _aureliaDialog, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ExportWorkflow = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ExportWorkflow = exports.ExportWorkflow = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _aureliaFramework.BindingEngine, _api.WorkflowApi), _dec(_class = function () {
        function ExportWorkflow(element, dialogController, bindingEngine, workflowApi) {
            _classCallCheck(this, ExportWorkflow);

            this.dialog = dialogController;
            this.be = bindingEngine;
            this.api = workflowApi;

            this.hasFile = false;
        }

        ExportWorkflow.prototype.getFile = function getFile(selected) {
            var _this = this;

            this.api.exportWorkflow(selected).then(function (response) {
                _this.hasFile = true;
                var fileBlob = new Blob([response], { type: 'text/plain' });
                _this.fileUrl = URL.createObjectURL(fileBlob);
            });
        };

        return ExportWorkflow;
    }()) || _class);
});
define('settings/workflows/importworkflow',['exports', 'aurelia-framework', 'aurelia-validation', '../../components/semantic-ui/ui-validation-renderer', 'aurelia-dialog', '../../workflows/api', '../../shared/api', '../../filetemplates/api'], function (exports, _aureliaFramework, _aureliaValidation, _uiValidationRenderer, _aureliaDialog, _api, _api2, _api3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ImportWorkflow = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ImportWorkflow = exports.ImportWorkflow = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController, _aureliaFramework.BindingEngine, _api.WorkflowApi, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _api2.SharedApi, _api3.FiletemplateApi), _dec(_class = function () {
        function ImportWorkflow(element, dialogController, bindingEngine, workflowApi, validationController, sharedApi, filetemplateApi) {
            var _this = this;

            _classCallCheck(this, ImportWorkflow);

            this.dialog = dialogController;
            this.be = bindingEngine;
            this.api = workflowApi;
            this.sharedApi = sharedApi;
            this.filetemplateApi = filetemplateApi;

            this.validator = validationController;
            this.validator.validateTrigger = _aureliaValidation.validateTrigger.changeOrBlur;
            this.validator.addRenderer(new _uiValidationRenderer.UiValidationRenderer());

            this.fileError = false;
            this.workflowData = {};

            this.buildWorkflowData = function () {
                _this.workflowData.name = _this.parsedFile.workflow.name;
                _this.workflowData.workflow = _this.parsedFile.workflow;
                _this.workflowData.tasks = _this.parsedFile.tasks;

                _this.item = _this.workflowData.tasks[0];

                _this.doDataCheck();
                _this.handleTaskChange();
            };

            this.doDataCheck = function () {
                var importCheckData = {
                    name: _this.workflowData.name,
                    data: _this.parsedFile,
                    assign_groups: { staff: 'rw' },
                    check: true
                };

                _this.api.importWorkflow(importCheckData).then(function (response) {
                    _this.requiredItems = response.required;
                    _this.importIssues = response.issues;
                    console.log(response);
                }).catch(function (err) {
                    console.log('ERROR', err);
                });
            };
        }

        ImportWorkflow.prototype.handleTaskChange = function handleTaskChange() {
            var _this2 = this;

            this.validationRuleset = {
                input_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().ensure('lookup_type').required().ensure('calculation_used').required().when(function (obj) {
                    return obj.from_calculation;
                }).rules,
                output_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().ensure('lookup_type').required().ensure('calculation_used').required().when(function (obj) {
                    return obj.from_calculation;
                }).rules,
                variable_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().when(function (obj) {
                    return !obj.measure_not_required;
                }).rules,
                calculation_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('calculation').required().rules,
                step_fields: _aureliaValidation.ValidationRules.ensure('label').required().rules
            };

            this.applyValidation();

            this.fieldTypes = ['input_fields', 'output_fields', 'step_fields', 'variable_fields'];

            this.removedFields = [];
            this.calculations = [];

            this.equipmentObserver = this.be.propertyObserver(this.item, 'capable_equipment_source').subscribe(function (n, o) {
                if (!_this2.item.capable_equipment) {
                    _this2.item.capable_equipment = [];
                }
                _this2.item.capable_equipment.push(n);
            });

            this.equipmentFileObserver = this.be.propertyObserver(this.item, 'equipment_files_source').subscribe(function (n, o) {
                if (!_this2.item.equipment_files) {
                    _this2.item.equipment_files = [];
                }
                _this2.item.equipment_files.push(n);
            });

            this.inputFileObserver = this.be.propertyObserver(this.item, 'input_files_source').subscribe(function (n, o) {
                if (!_this2.item.input_files) {
                    _this2.item.input_files = [];
                }
                _this2.item.input_files.push(n);
            });

            this.outputFileObserver = this.be.propertyObserver(this.item, 'output_files_source').subscribe(function (n, o) {
                if (!_this2.item.output_files) {
                    _this2.item.output_files = [];
                }
                _this2.item.output_files.push(n);
            });
        };

        ImportWorkflow.prototype.applyValidation = function applyValidation() {
            _aureliaValidation.ValidationRules.ensure('name').required().ensure('product_input_amount').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('product_input').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('product_input_measure').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('labware').required().when(function (elem) {
                return !elem.labware_not_required;
            }).on(this.item);
        };

        ImportWorkflow.prototype.addItem = function addItem(item) {
            var _this3 = this;

            if (item.item_type == 'ItemType') {
                item.parent = 'Item';
                this.sharedApi.createItemType(item).then(function (response) {
                    _this3.doDataCheck();
                });
            } else if (item.item_type == 'FileTemplate') {
                this.filetemplateApi.createFiletemplate(item).then(function (response) {
                    _this3.doDataCheck();
                });
            } else if (item.item_type == 'AmountMeasure') {
                this.sharedApi.createMeasure(item).then(function (response) {
                    _this3.doDataCheck();
                });
            }
        };

        ImportWorkflow.prototype.setTask = function setTask(index) {
            this.item = this.workflowData.tasks[index];
            this.handleTaskChange();
        };

        ImportWorkflow.prototype.fileUploaded = function fileUploaded(event) {
            var _this4 = this;

            var reader = new FileReader();
            reader.readAsText(this.importedFile[0], "UTF-8");
            reader.onload = function (e) {
                try {
                    _this4.fileError = false;
                    _this4.parsedFile = JSON.parse(e.target.result);
                    _this4.buildWorkflowData();
                } catch (error) {
                    _this4.fileError = true;
                    console.log('could not parse file!');
                }
            };
        };

        ImportWorkflow.prototype.save = function save() {
            var _this5 = this;

            this.workflowData.data = {
                workflow: this.workflowData.workflow,
                tasks: this.workflowData.tasks
            };
            this.api.importWorkflow(this.workflowData).then(function (response) {
                _this5.dialog.ok();
            }).catch(function (err) {
                _this5.doDataCheck();
            });
        };

        return ImportWorkflow;
    }()) || _class);
});
define('settings/workflows/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var routes = exports.routes = [{ route: '/workflows', name: 'workflows-settings', moduleId: './workflows/workflows',
    nav: false, title: 'Workflow templates', layoutView: './table.html' }, { route: '/tasks', name: 'tasks-settings', moduleId: './workflows/tasks',
    nav: false, title: 'Task templates', layoutView: './table.html' }];
});
define('settings/workflows/ll-calculation-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlCalculationFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlCalculationFieldCustomElement = exports.LlCalculationFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlCalculationFieldCustomElement(element) {
            _classCallCheck(this, LlCalculationFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlCalculationFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (this.outputTo && Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.calculation = this.field.calculation;
                this.outputTo.id = this.field.id;
            }
        };

        return LlCalculationFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/workflows/ll-input-field',['exports', 'aurelia-framework', '../../inventory/api'], function (exports, _aureliaFramework, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlInputFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var LlInputFieldCustomElement = exports.LlInputFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _api.InventoryApi), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlInputFieldCustomElement(element, inventoryApi) {
            var _this = this;

            _classCallCheck(this, LlInputFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'calculations', _descriptor2, this);

            _initDefineProp(this, 'outputTo', _descriptor3, this);

            this.element = element;
            this.api = inventoryApi;

            this.doQuery = function (settings, callback) {
                var params = {
                    search: settings.urlData.query,
                    item_type__name: _this.field.lookup_type
                };
                _this.api.inventory(params).then(function (data) {
                    callback(data);
                });
            };

            this.updateFromDropdown = function (value, text, choice) {
                _this.outputTo[_this.field.store_value_in] = value;
            };
        }

        LlInputFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.from_calculation = this.field.from_calculation;
                this.outputTo.from_input_file = this.field.from_input_file;
                this.outputTo.auto_find_in_inventory = this.field.auto_find_in_inventory;
            }
        };

        LlInputFieldCustomElement.prototype.attached = function attached() {
            $('.search.selection.dropdown', this.element).dropdown({
                apiSettings: {
                    responseAsync: this.doQuery
                },
                fields: {
                    remoteValues: 'results',
                    name: 'name',
                    value: 'id'
                },
                onChange: this.updateFromDropdown
            });
        };

        return LlInputFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'calculations', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/workflows/ll-output-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlOutputFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var LlOutputFieldCustomElement = exports.LlOutputFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlOutputFieldCustomElement(element) {
            _classCallCheck(this, LlOutputFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'outputTo', _descriptor2, this);

            this.element = element;
        }

        LlOutputFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.from_calculation = this.field.from_calculation;
                this.outputTo.from_input_file = this.field.from_input_file;
                this.outputTo.lookup_type = this.field.lookup_type;
            }
        };

        return LlOutputFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/workflows/ll-step-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlStepFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var LlStepFieldCustomElement = exports.LlStepFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlStepFieldCustomElement(element) {
            _classCallCheck(this, LlStepFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'calculations', _descriptor2, this);

            _initDefineProp(this, 'outputTo', _descriptor3, this);

            this.element = element;
            this.field.properties = [];
        }

        LlStepFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.description = this.field.description;
                this.outputTo.properties = this.field.properties;
            }
        };

        LlStepFieldCustomElement.prototype.addProperty = function addProperty() {
            if (!this.field.properties) {
                this.field.properties = [];
            }
            if (this.field.properties.length < 4) {
                this.field.properties.push({});
            }
        };

        LlStepFieldCustomElement.prototype.removeProperty = function removeProperty(index) {
            this.field.properties.splice(index, 1);
        };

        return LlStepFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {};
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'calculations', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/workflows/ll-variable-field',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LlVariableFieldCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var LlVariableFieldCustomElement = exports.LlVariableFieldCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function LlVariableFieldCustomElement(element) {
            _classCallCheck(this, LlVariableFieldCustomElement);

            _initDefineProp(this, 'field', _descriptor, this);

            _initDefineProp(this, 'calculations', _descriptor2, this);

            _initDefineProp(this, 'outputTo', _descriptor3, this);

            this.element = element;
        }

        LlVariableFieldCustomElement.prototype.outputToChanged = function outputToChanged() {
            if (this.outputTo && Object.keys(this.outputTo).length === 0 && this.field) {
                this.outputTo.label = this.field.label;
                this.outputTo.amount = this.field.amount;
                this.outputTo.measure = this.field.measure;
                this.outputTo.measure_not_required = this.field.measure_not_required;
            }
        };

        return LlVariableFieldCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'field', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'calculations', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'outputTo', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('settings/workflows/tasks',['exports', 'aurelia-framework', '../../workflows/api', '../../shared/api', '../../equipment/api', '../settings-table', 'aurelia-validation'], function (exports, _aureliaFramework, _api, _api2, _api3, _settingsTable, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tasks = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Tasks = exports.Tasks = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi, _api2.SharedApi, _api3.EquipmentApi, _aureliaFramework.BindingEngine), _dec(_class = function (_SettingsTable) {
        _inherits(Tasks, _SettingsTable);

        function Tasks(workflowApi, sharedApi, equipmentApi, bindingEngine) {
            _classCallCheck(this, Tasks);

            for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                rest[_key - 4] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = workflowApi;
            _this.sharedApi = sharedApi;
            _this.equipmentApi = equipmentApi;
            _this.be = bindingEngine;

            _this.setFunctions('task');
            _this.createTemplate = './workflows/create-task.html';

            _this.tableHeaders = ['Name', 'Description', 'Created by'];
            _this.tableFields = ['name', 'description', 'created_by'];

            _this.validationRuleset = {
                input_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().ensure('lookup_type').required().ensure('calculation_used').required().when(function (obj) {
                    return obj.from_calculation;
                }).rules,
                output_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().ensure('lookup_type').required().ensure('calculation_used').required().when(function (obj) {
                    return obj.from_calculation;
                }).rules,
                variable_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('amount').required().matches(/^-?[0-9.]+/).ensure('measure').required().when(function (obj) {
                    return !obj.measure_not_required;
                }).rules,
                calculation_fields: _aureliaValidation.ValidationRules.ensure('label').required().ensure('calculation').required().rules,
                step_fields: _aureliaValidation.ValidationRules.ensure('label').required().rules
            };

            _this.applyValidation();

            _this.fieldTypes = ['input_fields', 'output_fields', 'step_fields', 'variable_fields'];

            _this.removedFields = [];
            _this.calculations = [];

            return _this;
        }

        Tasks.prototype.setupWatchers = function setupWatchers() {
            var _this2 = this;

            this.equipmentObserver = this.be.propertyObserver(this.item, 'capable_equipment_source').subscribe(function (n, o) {
                if (!_this2.item.capable_equipment) {
                    _this2.item.capable_equipment = [];
                }
                _this2.item.capable_equipment.push(n);
            });

            this.equipmentFileObserver = this.be.propertyObserver(this.item, 'equipment_files_source').subscribe(function (n, o) {
                if (!_this2.item.equipment_files) {
                    _this2.item.equipment_files = [];
                }
                _this2.item.equipment_files.push(n);
            });

            this.inputFileObserver = this.be.propertyObserver(this.item, 'input_files_source').subscribe(function (n, o) {
                if (!_this2.item.input_files) {
                    _this2.item.input_files = [];
                }
                _this2.item.input_files.push(n);
            });

            this.outputFileObserver = this.be.propertyObserver(this.item, 'output_files_source').subscribe(function (n, o) {
                if (!_this2.item.output_files) {
                    _this2.item.output_files = [];
                }
                _this2.item.output_files.push(n);
            });
        };

        Tasks.prototype.teardownWatchers = function teardownWatchers() {
            this.equipmentObserver.dispose();
            this.equipmentFileObserver.dispose();
            this.inputFileObserver.dispose();
            this.outputFileObserver.dispose();
        };

        Tasks.prototype.applyValidation = function applyValidation() {
            _aureliaValidation.ValidationRules.ensure('name').required().ensure('product_input_amount').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('product_input').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('product_input_measure').required().when(function (elem) {
                return !elem.product_input_not_required;
            }).ensure('labware').required().when(function (elem) {
                return !elem.labware_not_required;
            }).on(this.item);
        };

        Tasks.prototype.parseItem = function parseItem(item) {
            var _this3 = this;

            this.calculations = item.calculation_fields.slice(0);

            for (var _iterator = this.fieldTypes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var fieldType = _ref;

                if (item[fieldType]) {
                    var _loop = function _loop() {
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) return 'break';
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) return 'break';
                            _ref2 = _i2.value;
                        }

                        var field = _ref2;

                        if (field.from_calculation) {
                            var calc = _this3.calculations.find(function (x) {
                                return x.id == field.calculation_used;
                            });
                            field.calculation_used = calc.label;
                        }
                        _this3.validator.addObject(field, _this3.validationRuleset[fieldType]);
                    };

                    for (var _iterator2 = item[fieldType], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        var _ret = _loop();

                        if (_ret === 'break') break;
                    }
                }
            }
            return item;
        };

        Tasks.prototype.edit = function edit(item) {
            var parsedItem = this.parseItem(item);
            _SettingsTable.prototype.edit.call(this, parsedItem);
            this.setupWatchers();
        };

        Tasks.prototype.create = function create() {
            _SettingsTable.prototype.create.call(this);
            this.setupWatchers();
        };

        Tasks.prototype.createOrUpdateFields = function createOrUpdateFields(templateId) {
            var _this4 = this;

            var fields = [];
            for (var _iterator3 = this.fieldTypes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var fieldType = _ref3;

                var fieldParam = fieldType.split('_');
                if (this.item[fieldType]) {
                    var _loop2 = function _loop2() {
                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) return 'break';
                            _ref4 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) return 'break';
                            _ref4 = _i4.value;
                        }

                        var field = _ref4;

                        if (field.from_calculation) {
                            var calc = _this4.calculations.find(function (x) {
                                return x.label == field.calculation_used;
                            });
                            field.calculation_used = calc.id;
                        }
                        if (field.id) {
                            fields.push(_this4.api.updateTaskField(field.id, field, fieldParam[0]));
                        } else {
                            field.template = templateId;
                            fields.push(_this4.api.createTaskField(field, fieldParam[0]));
                        }
                    };

                    for (var _iterator4 = this.item[fieldType], _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                        var _ref4;

                        var _ret2 = _loop2();

                        if (_ret2 === 'break') break;
                    }
                }
            }
            return fields;
        };

        Tasks.prototype.save = function save() {
            var _this5 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this5.isSaving = true;
                    _this5.api[_this5.saveFunc](_this5.item).then(function (data) {
                        var fields = void 0;

                        if (_this5.item.calculation_fields && _this5.item.calculation_fields.length > 0) {
                            var calculations = [];
                            for (var _iterator5 = _this5.item.calculation_fields, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                                var _ref5;

                                if (_isArray5) {
                                    if (_i5 >= _iterator5.length) break;
                                    _ref5 = _iterator5[_i5++];
                                } else {
                                    _i5 = _iterator5.next();
                                    if (_i5.done) break;
                                    _ref5 = _i5.value;
                                }

                                var _field = _ref5;

                                _field.template = data.id;
                                calculations.push(_this5.api.createTaskField(_field, 'calculation'));
                            }
                            Promise.all(calculations).then(function (response) {
                                var _loop3 = function _loop3() {
                                    if (_isArray6) {
                                        if (_i6 >= _iterator6.length) return 'break';
                                        _ref6 = _iterator6[_i6++];
                                    } else {
                                        _i6 = _iterator6.next();
                                        if (_i6.done) return 'break';
                                        _ref6 = _i6.value;
                                    }

                                    var c = _ref6;

                                    var calc = _this5.calculations.find(function (x) {
                                        return x.label == c.label;
                                    });
                                    calc.id = c.id;
                                };

                                for (var _iterator6 = response, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                                    var _ref6;

                                    var _ret3 = _loop3();

                                    if (_ret3 === 'break') break;
                                }
                                fields = _this5.createOrUpdateFields(data.id);
                            }).catch(function (err) {
                                _this5.isSaving = false;
                                _this5.error = err;
                            });
                        } else {
                            fields = _this5.createOrUpdateFields(data.id);
                        }
                        Promise.all(fields).then(function (response) {
                            _this5.isSaving = false;
                            _this5.getData();
                            _this5.cancel();
                        }).catch(function (err) {
                            _this5.isSaving = false;
                            _this5.error = err;
                        });
                    }).catch(function (err) {
                        _this5.isSaving = false;
                        _this5.error = err;
                    });
                }
            });
        };

        Tasks.prototype._doUpdate = function _doUpdate(fields) {
            var _this6 = this;

            for (var _iterator7 = this.removedFields, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                var _ref7;

                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i7++];
                } else {
                    _i7 = _iterator7.next();
                    if (_i7.done) break;
                    _ref7 = _i7.value;
                }

                var f = _ref7;

                if (f.id) {
                    fields.push(this.api.deleteTaskField(f.id, f.field_type));
                }
            }
            Promise.all(fields).then(function (response) {
                _this6.isSaving = false;
                _this6.removedFields = [];
                _this6.getData();
                _this6.cancel();
            }).catch(function (err) {
                _this6.isSaving = false;
                _this6.error = err;
            });
        };

        Tasks.prototype.update = function update() {
            var _this7 = this;

            this.validator.validate().then(function (results) {
                if (results.valid) {
                    _this7.api[_this7.updateFunc](_this7.item.id, _this7.item).then(function (data) {
                        var fields = void 0;

                        if (_this7.item.calculation_fields && _this7.item.calculation_fields.length > 0) {
                            var calculations = [];
                            for (var _iterator8 = _this7.item.calculation_fields, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
                                var _ref8;

                                if (_isArray8) {
                                    if (_i8 >= _iterator8.length) break;
                                    _ref8 = _iterator8[_i8++];
                                } else {
                                    _i8 = _iterator8.next();
                                    if (_i8.done) break;
                                    _ref8 = _i8.value;
                                }

                                var _field2 = _ref8;

                                if (_field2.id) {
                                    calculations.push(_this7.api.updateTaskField(_field2.id, _field2, 'calculation'));
                                } else {
                                    _field2.template = data.id;
                                    calculations.push(_this7.api.createTaskField(_field2, 'calculation'));
                                }
                            }
                            Promise.all(calculations).then(function (response) {
                                var _loop4 = function _loop4() {
                                    if (_isArray9) {
                                        if (_i9 >= _iterator9.length) return 'break';
                                        _ref9 = _iterator9[_i9++];
                                    } else {
                                        _i9 = _iterator9.next();
                                        if (_i9.done) return 'break';
                                        _ref9 = _i9.value;
                                    }

                                    var c = _ref9;

                                    var calc = _this7.calculations.find(function (x) {
                                        return x.label == c.label;
                                    });
                                    calc.id = c.id;
                                };

                                for (var _iterator9 = response, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
                                    var _ref9;

                                    var _ret4 = _loop4();

                                    if (_ret4 === 'break') break;
                                }
                                fields = _this7.createOrUpdateFields(data.id);
                                _this7._doUpdate(fields);
                            }).catch(function (err) {
                                _this7.isSaving = false;
                                _this7.error = err;
                            });
                        } else {
                            fields = _this7.createOrUpdateFields(data.id);
                            _this7._doUpdate(fields);
                        }
                    }).catch(function (err) {
                        _this7.isSaving = false;
                        _this7.error = err;
                    });
                }
            });
        };

        Tasks.prototype.addField = function addField(fieldType) {
            var fieldName = fieldType + '_fields';
            if (!this.item[fieldName]) {
                this.item[fieldName] = [];
            }
            var field = {};
            this.item[fieldName].push(field);
            this.validator.addObject(field, this.validationRuleset[fieldName]);
            if (fieldType == 'calculation') {
                this.calculations.push(field);
            }
        };

        Tasks.prototype.removeField = function removeField(index, fieldType, item) {
            if (item.id) {
                item.field_type = fieldType;
                this.removedFields.push(item);
            }
            var fieldName = fieldType + '_fields';
            this.item[fieldName].splice(index, 1);
        };

        Tasks.prototype.clearObject = function clearObject(obj) {
            this.item = {};
            this.applyValidation();
        };

        Tasks.prototype.cancel = function cancel() {
            this.clearObject();
            this.teardownWatchers();
            _SettingsTable.prototype.cancel.call(this);
        };

        return Tasks;
    }(_settingsTable.SettingsTable)) || _class);
});
define('settings/workflows/workflows',['exports', 'aurelia-framework', '../../workflows/api', '../settings-table', 'aurelia-validation', './exportworkflow', './importworkflow'], function (exports, _aureliaFramework, _api, _settingsTable, _aureliaValidation, _exportworkflow, _importworkflow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Workflows = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Workflows = exports.Workflows = (_dec = (0, _aureliaFramework.inject)(_api.WorkflowApi), _dec(_class = function (_SettingsTable) {
        _inherits(Workflows, _SettingsTable);

        function Workflows(workflowApi) {
            _classCallCheck(this, Workflows);

            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _SettingsTable.call.apply(_SettingsTable, [this].concat(rest)));

            _this.api = workflowApi;

            _this.setFunctions('workflow');
            _this.createTemplate = './workflows/create-workflow.html';

            _this.tableHeaders = ['Name', 'Created by'];
            _this.tableFields = ['name', 'created_by'];

            _aureliaValidation.ValidationRules.ensure('name').required().ensure('order').required().on(_this.item);

            _this.importWorkflow = function () {
                _this.dialog.open({ viewModel: _importworkflow.ImportWorkflow }).whenClosed(function (response) {
                    if (!response.wasCancelled) {
                        console.log('import workflow');
                    }
                });
            };

            _this.exportWorkflow = function () {
                _this.dialog.open({ viewModel: _exportworkflow.ExportWorkflow }).whenClosed(function (response) {
                    if (!response.wasCancelled) {
                        _this.api.exportWorkflow(response.output).then(function (data) {
                            var asText = JSON.stringify(data);
                            var a = document.createElement('a');
                            document.body.appendChild(a);
                            var fileBlob = new Blob([asText], { type: 'text/plain' });
                            _this.fileUrl = URL.createObjectURL(fileBlob);
                            a.href = _this.fileUrl;
                            a.download = data.workflow.name + '.workflow';
                            a.click();
                            document.body.removeChild(a);
                        });
                    }
                });
            };

            _this.extraToolbarButtons = [{ text: 'Export', icon: 'upload', action: _this.exportWorkflow }, { text: 'Import', icon: 'download', action: _this.importWorkflow }];
            return _this;
        }

        Workflows.prototype.edit = function edit(item) {
            var _this2 = this;

            _SettingsTable.prototype.edit.call(this, item);

            this.api.getWorkflowTasks(item.id).then(function (data) {
                _this2.taskList = data['tasks'];
            });
        };

        Workflows.prototype.addTask = function addTask() {
            var _this3 = this;

            if (this.taskToAdd) {
                this.api.taskDetail(this.taskToAdd).then(function (data) {
                    console.log(data);
                    _this3.taskList.push(data);
                });
            }
        };

        Workflows.prototype.removeTask = function removeTask(index) {
            this.taskList.splice(index, 1);
        };

        Workflows.prototype.makeOrder = function makeOrder() {
            this.item.order = this.taskList.map(function (x) {
                return x.id;
            }).join(',');
        };

        Workflows.prototype.save = function save() {
            this.makeOrder();
            _SettingsTable.prototype.save.call(this);
        };

        Workflows.prototype.update = function update() {
            this.makeOrder();
            _SettingsTable.prototype.update.call(this);
        };

        return Workflows;
    }(_settingsTable.SettingsTable)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"semantic-ui/semantic.min.css\"></require><require from=\"./shared/styles.css\"></require><require from=\"./shared/navigation\"></require><navigation router.bind=\"router\"></navigation><div class=\"navigation-pad\"><router-view swap-order=\"with\"></router-view></div></template>"; });
define('text!not-found.html', ['module'], function(module) { module.exports = "<template><h1>Page not found</h1><div class=\"ui warning message\">The page you where looking for does not exist. Please check the URL for errors and if the problem persists please contact your administrator.</div></template>"; });
define('text!shared/styles.css', ['module'], function(module) { module.exports = "body {\n  background: #eceff1;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-weight: 400;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.custom {\n  display: block;\n}\nui-table-header > .ui.secondary.menu > .item:first-child {\n  padding-left: 0;\n}\nui-table-header .item .menu .ui.button {\n  border: 0 !important;\n  box-shadow: none;\n}\n[ui-table-row] {\n  cursor: pointer;\n}\nui-dropdown {\n  width: 100%;\n}\n.ui.inverted.menu.left.fixed {\n  background: #8BC34A;\n}\n.inverted.primary {\n  background: #8BC34A !important;\n}\n.ui.label.primary {\n  background: #8BC34A;\n  color: white;\n}\n.ui.label.primary:hover {\n  color: white;\n  background: #7eb73d !important;\n}\n.ui.inverted.menu.primary {\n  background: #8BC34A;\n}\n.ui.inverted.menu.primary i.icons .corner.icon {\n  text-shadow: -1px -1px 0 #8BC34A, 1px -1px 0 #8BC34A, -1px 1px 0 #8BC34A, 1px 1px 0 #8BC34A;\n}\n.ui.pointing.menu.primary .active.item:after {\n  background: #8BC34A !important;\n}\n.ui.pointing.menu.primary .active.item:hover:after {\n  background: #8BC34A !important;\n}\n.ui.inverted.menu .item.darker {\n  background: #7eb73d;\n}\n.ui.basic.borderless.button {\n  border: 0;\n  box-shadow: none;\n}\n.full.height {\n  min-height: 100%;\n}\n.ui.scrolling.message {\n  max-height: 30em;\n  overflow-y: scroll;\n}\n.ui.segment.table-wrapper {\n  display: block;\n  padding: 0;\n  max-width: 103%;\n  overflow-x: scroll;\n}\n.ui.segment.table-wrapper .table.attached {\n  border-top: 0;\n  border-bottom: 0;\n}\n.ui.grid.no.gutter {\n  margin-top: 0;\n  margin-bottom: 0;\n}\nux-dialog-overlay.active {\n  background-color: black;\n  opacity: .8;\n}\n.ui.modal {\n  top: 2em !important;\n  max-height: 90%;\n  overflow-y: scroll;\n}\n.ui.basic.modal {\n  top: 35% !important;\n}\nh1.ui.header,\nh2.ui-header,\nh3.ui.header,\nh4.ui.header {\n  font-weight: 400;\n  text-transform: uppercase;\n}\n.ui.header.primary {\n  color: #8BC34A;\n}\n.ui.inverted.primary.header {\n  color: white;\n}\nui-field[required] label:after,\nui-field.required label:after,\n.required:not(ui-field):after {\n  content: ' *';\n  font-size: 1.25em;\n  color: #8BC34A !important;\n}\n.ui.statistics.primary .statistic > .value,\n.ui.statistic.primary.primary > .value {\n  color: #8BC34A;\n}\n.ui.inverted.primary.steps {\n  border: 0;\n}\n.ui.inverted.primary.steps div:only-of-type {\n  border-radius: .28571429rem;\n}\n.ui.inverted.primary.steps .step {\n  background: #8BC34A;\n  color: white;\n}\n.ui.inverted.primary.steps .step.active {\n  color: white;\n  background: #71a436;\n}\n.ui.inverted.primary.steps .step.active .title {\n  color: white;\n}\n.ui.inverted.primary.steps .step.active::before {\n  color: white;\n}\n.ui.inverted.primary.steps .step.active::after {\n  background: #71a436;\n}\n.ui.inverted.primary.steps .step.active.in_progress {\n  background: #2185d0;\n}\n.ui.inverted.primary.steps .step.active.in_progress::after {\n  background: #2185d0;\n}\n.ui.inverted.primary.steps .step.completed::after {\n  background: #8BC34A;\n}\n.ui.inverted.primary.steps .step.completed::before {\n  color: white;\n}\n.ui.inverted.primary.steps .disabled.step .description,\n.ui.inverted.primary.steps .disabled.step .title {\n  color: rgba(255, 255, 255, 0.4);\n}\n.ui.inverted.primary.steps .disabled.step::after {\n  background: #8BC34A;\n}\n.label-list .ui.label {\n  margin-bottom: 0.25em;\n}\n.ui.page.centered.segment {\n  top: 45%;\n}\n.ui.action.input .ui.dropdown {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.ui.action.input ui-autocomplete {\n  display: block;\n  width: 100%;\n}\n.ui.button.remove-field {\n  margin-bottom: -2rem;\n}\n.ui.scrollable.list {\n  max-height: 20em;\n  overflow-y: auto;\n}\n.ui.scrollable.steps {\n  overflow: scroll;\n}\n.ui.input.read.only input {\n  opacity: 1;\n}\n.table-select {\n  padding: 0 1em !important;\n}\n.clickable {\n  cursor: pointer;\n}\n.dragable {\n  cursor: grab;\n}\n.dragable:active {\n  cursor: grabbing;\n}\n.right.floated {\n  float: right;\n}\n.right.floated.icon {\n  float: right;\n}\n.maintain-breaks {\n  white-space: pre-line;\n}\n.ui.horizontal.equal.segments > .segment {\n  flex-basis: 0;\n}\n.past.item i.icon {\n  color: red !important;\n}\n.warn.item i.icon {\n  color: orange !important;\n}\n@media (max-width: 768px) {\n  .ui.horizontal.stacking.segments {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin: 1rem 0;\n    border: 1px solid rgba(34, 36, 38, 0.15);\n    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);\n    border-radius: .28571429rem;\n  }\n  .ui.stacking.statistics .statistic {\n    min-width: 100%;\n  }\n  .ui.stackable.grid .wide.column,\n  .ui.stackable.grid > .column:not(.row) {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n  .ui.stackable.grid.padded > .column {\n    padding-left: 1rem !important;\n    padding-right: 1rem !important;\n  }\n  .ui.stackable.grid .wide.column.run-info {\n    padding-left: 1rem !important;\n    padding-right: 1rem !important;\n  }\n}\n.chart {\n  display: block;\n  position: relative;\n  width: 100%;\n  min-height: 18em;\n}\n@keyframes slideLeftIn {\n  0% {\n    transform: translate(100%, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(0, 0);\n    opacity: 1;\n  }\n}\n@keyframes slideLeftOut {\n  0% {\n    transform: translate(0, 0);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(-100%, 0);\n    opacity: 0;\n  }\n}\n@keyframes slideDown {\n  0% {\n    transform: translate(0, -100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(0, 0);\n    opacity: 1;\n  }\n}\n@keyframes slideUp {\n  0% {\n    transform: translate(0, 0);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0, -100%);\n    opacity: 0;\n  }\n}\n.slide-down.au-enter {\n  transform: translate(0, -100%);\n}\n.slide-down.au-enter-active {\n  animation: slideDown 0.6s;\n}\n.slide-down.au-leave-active {\n  animation: slideUp 0.6s;\n}\n.slide-out.au-enter {\n  transform: translate(0, -100%);\n}\n.slide-out.au-enter-active {\n  animation: slideLeft 0.6s;\n}\n.slide-out.au-leave-active {\n  animation: slideRight 0.6s;\n}\n.dim {\n  color: rgba(0, 0, 0, 0.3);\n}\n.highlight {\n  color: #8BC34A;\n}\n.new.item {\n  margin-bottom: 1em;\n}\n.padded.top {\n  padding-top: 1em;\n}\n.padded.bottom {\n  padding-bottom: 1em;\n}\n.responsive.width {\n  width: 100%;\n}\n.navigation-pad {\n  padding: 0.5em;\n  margin-left: 5em;\n  margin-right: 0.5em;\n  min-height: 100%;\n}\n.pagination .ui.selection.dropdown {\n  border: 0;\n}\n.user-details.item {\n  background: #7eb73d !important;\n}\n.user-details.item:hover {\n  background: #689F38 !important;\n}\n.user-details .menu {\n  background: #689F38 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n}\n.user-details .menu .header {\n  display: block;\n}\n.ui.menu .ui.dropdown.user-details .menu .item,\nui-menu-item {\n  color: white !important;\n}\n.account-pane {\n  overflow: hidden;\n  height: 100%;\n  max-height: 100%;\n  width: 17em;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 4.5em;\n  background: #eceff1;\n  z-index: 50;\n  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.5);\n}\n.account-pane-header {\n  padding: 1em;\n  background: #689F38;\n  color: white;\n}\n.account-pane-header img {\n  width: 100%;\n}\n.item.pane-active {\n  background: #689F38 !important;\n}\n.alerts-container {\n  padding: 0.5em;\n  height: 70%;\n}\n.ui.list.alerts-list {\n  overflow-y: scroll;\n  height: 100%;\n}\n.ui.list.alerts-list .item {\n  position: relative;\n}\n.ui.list.alerts-list .alert-options {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.alerts-list .alarm.icon.L {\n  color: #2196f3;\n}\n.alerts-list .alarm.icon.M {\n  color: #ff9800;\n}\n.alerts-list .alarm.icon.H {\n  color: #f44336;\n}\np.help.text {\n  padding-top: 0.25em;\n  margin-bottom: 0.3em;\n  font-size: 0.9em;\n  color: grey;\n}\n.permissions {\n  max-height: 20em;\n  overflow-y: scroll;\n}\n.permissions .ui.selection.dropdown {\n  min-width: 10em;\n}\n.product {\n  background: white;\n  border-top: 0 !important;\n  border-bottom: 3px solid #8BC34A;\n}\n.product-row.row-selected td {\n  border-bottom: 0;\n}\n.transfer .header {\n  font-weight: bold;\n}\n.transfer-table-wrapper.segment {\n  padding: 0 !important;\n}\n.transfer-table-wrapper {\n  max-height: 20em;\n  overflow: hidden;\n  overflow-y: scroll;\n}\n.transfer-table-wrapper .ui.table {\n  border-bottom: 0;\n  border-top: 0;\n}\n.run-container {\n  margin-bottom: 1em;\n}\n.run ui-table-wrapper {\n  max-height: 40em;\n  overflow-y: scroll;\n}\n.run > div.ui.segment.column {\n  padding-top: 1em !important;\n  padding-bottom: 1em !important;\n}\n.run.ui.grid > ui-table-wrapper.column {\n  padding: 0 !important;\n  border-top: 0;\n  border-bottom: 0;\n  border-right: 0;\n}\n.run .ui.label {\n  margin-bottom: 0.25em;\n}\n.run .ui.label.excluded {\n  color: rgba(255, 255, 255, 0.4);\n}\nll-add-products .ui.form {\n  margin-bottom: 0;\n}\nll-add-products .ui.form > .ui.segment:last-child {\n  border-bottom: 0;\n}\n.task.header .circular.white.label {\n  margin-left: 0;\n  margin-right: .5rem;\n  background: white;\n}\n.task.header.primary.in_progress {\n  background: #2185d0 !important;\n}\n.step.field.ui.segment .ui.grid {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.attached.menu .highlighted.blue.item {\n  color: white;\n  background: #2185D0 !important;\n}\n.reservation {\n  cursor: pointer;\n}\n.confirmed,\n.missed,\n.checked_in {\n  overflow: visible;\n}\n.confirmed:before,\n.missed:before,\n.checked_in:before {\n  position: absolute;\n  top: -0.75em;\n  right: 0;\n  z-index: 5;\n  display: block;\n  padding: 0 0.1em;\n  font-family: 'Icons';\n}\n.confirmed:before {\n  content: '\\f164';\n  padding: 0.15em 0.3em;\n  color: white;\n  background: #2185d0;\n  border-radius: 30em;\n  top: -1em;\n}\n.checked_in:before {\n  content: '\\f164';\n  padding: 0.15em 0.3em;\n  color: white;\n  background: #7eb73d;\n  border-radius: 30em;\n  top: -1em;\n}\n.past {\n  border: 0;\n}\n.past .fc-content,\n.past .fc-bg {\n  opacity: 0.6;\n}\n.missed:before {\n  content: '\\f06a';\n  color: #212121;\n}\n.pending-text {\n  color: #388e3c;\n}\n.pending-text md-icon {\n  color: #388e3c;\n}\n.event-details {\n  max-width: 20em;\n  display: none;\n  padding: 0.5em !important;\n  position: fixed !important;\n  z-index: 500;\n  font-size: 0.7em;\n}\n.event-details .header {\n  font-weight: bold;\n  display: block;\n}\n.event-details .equipment {\n  font-size: 0.8em;\n}\n.event-details p {\n  font-size: 0.8em;\n}\n"; });
define('text!settings.html', ['module'], function(module) { module.exports = "<template><h2>Settings</h2><div class=\"ui inverted stackable pointing primary menu\"><a class=\"item\" repeat.for=\"route of router.routes\" if.bind=\"route.name\" map-href=\"route.bind: route.name\"> ${route.title} </a><a repeat.for=\"[name, item] of settings\" if.bind=\"settings\" class=\"item ${activeSection == item.section ? 'active' : ''}\" map-href=\"route.bind: '${item.section}-settings'\"> ${name} </a></div></template>"; });
define('text!auth/account.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><div class=\"header section-heading\">Account</div><ux-dialog-body><div class=\"content\"><div class=\"ui two column wide grid form\"><ui-field label=\"First name\" class=\"column\"><input value.bind=\"user.first_name\"></ui-field><ui-field label=\"Last name\" class=\"column\"><input value.bind=\"user.last_name\"></ui-field></div><div class=\"ui horizontal divider\">Addresses</div><form class=\"ui clearing segment form\" submit.delegate=\"save(address)\" repeat.for=\"address of user.addresses\"><ui-field label=\"Institute name\" required><input value.bind=\"address.institution_name & validate\"></ui-field><ui-field label=\"Address\" required><input value.bind=\"address.address_1 & validate\"></ui-field><ui-field label=\"Address 2\"><input value.bind=\"address.address_2 & validate\"></ui-field><ui-field label=\"City\" required><input value.bind=\"address.city & validate\"></ui-field><ui-field label=\"Postcode\" required><input value.bind=\"address.postcode & validate\"></ui-field><ui-field label=\"Country\" required><input value.bind=\"address.country & validate\"></ui-field><div class=\"ui divider\"></div><button class=\"ui basic red button\" click.delegate=\"removeAddress($index)\">Remove</button> <button class=\"ui right floated primary button\" type=\"submit\">Save</button></form><div class=\"ui segment\" if.bind=\"addressSaved\">Address saved.</div><button class=\"ui basic button\" click.delegate=\"addAddress()\">Add address</button></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui primary ok button\" click.trigger=\"dialog.ok(selected)\">Done</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!auth/login.html', ['module'], function(module) { module.exports = "<template><div class=\"ui full height centered grid\"><form class=\"ui form sixteen wide mobile five wide computer column\" submit.delegate=\"login()\"><img src=\"img/leaflims-logo.svg\" class=\"responsive width\"><div class=\"ui top attached inverted primary header\">Login</div><div class=\"ui attached visible error message\" if.bind=\"error\">Could not log in with the supplied details. Please check your username/password and try again.</div><div class=\"ui attached clearing segment\"><div class=\"field\"><label>Username</label> <input name=\"username\" value.bind=\"username\" placeholder=\"Username\"></div><div class=\"field\"><label>Password</label> <input name=\"password\" type=\"password\" value.bind=\"password\" placeholder=\"Password\"></div><button class=\"ui right floated button primary\" type=\"submit\">Login</button></div></form></div></template>"; });
define('text!crm/crm-prompt.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><ux-dialog-body><ui-search search.bind=\"query.search\" source.bind=\"crmItems\" model.bind=\"['Name']\"></ui-search></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui red basic cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui green basic ok button\" click.trigger=\"dialog.ok(result)\">Ok</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!crm/ll-crm.html', ['module'], function(module) { module.exports = "<template><div if.bind=\"add || change\"><ui-error-message error-source.bind=\"error\"></ui-error-message><div class=\"ui fluid icon ${fetching ? 'loading' : ''} input\"><input placeholder=\"Search...\" value.bind=\"query.search & throttle\" keyup.delegate=\"getItems()\"> <i class=\"search icon\"></i></div><div class=\"ui selection list\"><div class=\"item\" repeat.for=\"item of items.results\" click.delegate=\"choose(item)\"> ${item.Name} </div></div></div><div if.bind=\"source.crm_project\"><b><a href.bind=\"source.crm_project.project_url\">${source.crm_project.name}</a></b><div> ${source.crm_project.account.user.first_name} ${source.crm_project.account.user.last_name} </div><div><a href.bind=\"source.crm_project.account.account_url\"> ${source.crm_project.account.account_name} </a></div></div><div class=\"ui divider\"></div><button class=\"ui basic button\" click.delegate=\"add = true\" if.bind=\"!add && !source.crm_project\">Associate with a CRM project</button> <button class=\"ui basic button\" click.delegate=\"cancel()\" if.bind=\"add || change\">Cancel</button><div class=\"ui basic buttons\" if.bind=\"source.crm_project && !change\"><button class=\"ui button\" click.delegate=\"remove()\">Disassociate</button> <button class=\"ui button\" click.delegate=\"change = true\">Update</button></div></template>"; });
define('text!dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><require from=\"../components/shared/chart\"></require><require from=\"./deadline-format\"></require><h1>Dashboard</h1><div class=\"ui inverted primary segment\"><div class=\"ui four huge inverted stacking statistics\"><div class=\"statistic\"><div class=\"value\">${project_count}</div><div class=\"label\">Active projects</div></div><div class=\"statistic\"><div class=\"value\">${run_count}</div><div class=\"label\">Active runs</div></div><div class=\"statistic\"><div class=\"value\">${inventory_count}</div><div class=\"label\">Items available</div></div><div class=\"statistic\"><div class=\"value\">${equipment_count}</div><div class=\"label\">Equipment errors</div></div></div></div><div class=\"ui horizontal equal stacking segments\"><div class=\"ui segment\"><h3 class=\"ui primary header\">Latest projects</h3><div class=\"ui relaxed selection list\"><a repeat.for=\"item of projects.results\" map-href=\"route: project/projectDetail; params.bind: {id: item.id}\" class=\"item\"><span class=\"content\"><span class=\"header\">${item.project_identifier}: ${item.name}</span></span></a></div><a class=\"ui bottom right floated basic button\" map-href=\"route: project\">View all projects</a></div><div class=\"ui segment\"><h3 class=\"ui primary header\">Active runs</h3><div class=\"ui relaxed selection list\"><a repeat.for=\"item of runs.results\" map-href=\"route: workflows\" class=\"item\"><span class=\"content\"><span class=\"header\">${item.name}</span></span></a></div><a class=\"ui right floated basic button\" map-href=\"route: workflows\">View all runs</a></div><div class=\"ui segment\"><h3 class=\"ui primary header\">Last added items</h3><div class=\"ui relaxed selection list\"><a repeat.for=\"item of inventory.results\" map-href=\"route: inventory/inventoryDetail; params.bind: {id: item.id}\" class=\"item\"><span class=\"content\"><span class=\"header\">${item.name}</span></span></a></div><a class=\"ui right floated basic button\" map-href=\"route: inventory\">View full inventory</a></div></div><div class=\"ui horizontal equal stacking segments\"><div class=\"ui segment\"><h3>Project statuses</h3><chart data.bind=\"project_statuses\"></chart></div><div class=\"ui segment\"><h3>Product statuses</h3><chart data.bind=\"product_statuses\"></chart></div><div class=\"ui segment\"><h3>Deadlines</h3><chart data.bind=\"deadlines\"></chart><div class=\"ui relaxed selection list\"><a repeat.for=\"item of past_deadlines.results\" map-href=\"route: project/projectDetail; params.bind: {id: item.id}\" class=\"item past\"><i class=\"clock icon\"></i><div class=\"content\"><span class=\"header\">${item.name}</span>Due <b>${item.deadline|dateFormat:\"DD/MM/YY\"}</b> ${item.deadline|deadlineFormat} </div></a><a repeat.for=\"item of warn_deadlines.results\" map-href=\"route: project/projectDetail; params.bind: {id: item.id}\" class=\"item warn\"><i class=\"clock icon\"></i><div class=\"content\"><span class=\"header\">${item.name}</span>Due <b>${item.deadline|dateFormat:\"DD/MM/YY\"}</b> ${item.deadline|deadlineFormat} </div></a></div></div></div></template>"; });
define('text!equipment/equipment.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-create-reservation\"></require><require from=\"./ll-check-in\"></require><require from=\"./ll-confirm-reservations\"></require><div class=\"au-animate page content\"><h2>Equipment</h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"newReservation = true\"><i class=\"icon add\"></i> New reservation </a><a class=\"item\" click.delegate=\"checkIn = true\"><i class=\"icon checked calendar\"></i> Check in </a><a class=\"item\" click.delegate=\"confirmReservations = true\" if.bind=\"isStaff\"><i class=\"icon calendar\"></i> Confirm reservations</a></div><ll-create-reservation source.bind=\"reservation\" toggle.bind=\"newReservation\"></ll-create-reservation><ll-check-in toggle.bind=\"checkIn\"></ll-check-in><ll-confirm-reservations toggle.bind=\"confirmReservations\"></ll-confirm-reservations><div class=\"ui padded basic segment\" if.bind=\"isLoading\"><div class=\"ui active indeterminate large centered inline text loader\">Loading</div></div><div class=\"ui four column wide stackable grid\"><div repeat.for=\"e of equipment.results\" class=\"column\"><h3 class=\"ui top attached ${statuses.get(e.status).colour} header\"><i class=\"${statuses.get(e.status).icon} icon\"></i><div class=\"content\"> ${e.name} <div class=\"sub header\">${e.location_display}</div></div></h3><div class=\"ui attached segment\" if.bind=\"e.can_reserve\"><div class=\"ui list\"><div class=\"item\" repeat.for=\"r of e.reservations\"><i if.bind=\"!r.is_confirmed && !r.checked_in\" class=\"icon calendar\"></i> <i if.bind=\"r.is_confirmed && !r.checked_in\" class=\"icon thumbs outline up\"></i> <i if.bind=\"r.is_confirmed && r.checked_in\" class=\"icon thumbs up\"></i><div class=\"content\"><b>${r.title}</b>: ${r.start|dateFormat:'DD/MM/YY h:mm a'} - ${r.end|dateFormat:'h:mm a'} </div></div><div class=\"item\" if.bind=\"e.reservations.length == 0\">No reservations</div></div></div><div class=\"ui bottom attached segment\"><ui-dropdown value.bind=\"e.status\" change.delegate=\"setStatus(e.id, $event)\"><ui-item repeat.for=\"[value, details] of statuses\" value.bind=\"value\">${details.display}</ui-item></ui-dropdown></div></div></div><div class=\"ui segment\"><div class=\"ui padded grid\"><div class=\"eight wide mobile four wide computer column\" repeat.for=\"e of events\"><span class=\"ui empty circular label\" style=\"background: ${e.color}\"></span> ${ e.equipmentName } </div></div><calendar options.bind=\"config\" events.bind=\"events\"></calendar><div id=\"calendarPopover\" class=\"ui segment event-details\"></div></div></div></template>"; });
define('text!equipment/index.html', ['module'], function(module) { module.exports = "<template><router-view swap-order=\"with\"></router-view></template>"; });
define('text!equipment/ll-check-in.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Check in</h3><div class=\"ui attached segment\"><div class=\"ui visible message\" if.bind=\"checkIns.results.length == 0\"><p>No reservations are currently available to check in.</p><p>You are able to check in up to an hour before a reservation start time and up to an hour after the start time.</p></div><ui-table-wrapper if.bind=\"checkIns.results.length > 0\"><table ui-table><thead><tr><th></th><th>Equipment</th><th>From</th><th>To</th><th>Other details</th></tr></thead><tbody><tr repeat.for=\"c of checkIns.results\"><td><ui-checkbox checked.bind=\"c.checked_in\"></ui-checkbox></td><td>${ c.equipment_reserved }</td><td>${ c.start|dateFormat }</td><td>${ c.end|dateFormat }</td><td>${ c.reservation_details }</td></tr></tbody></table></ui-table-wrapper></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Check in</button></div></form></template>"; });
define('text!equipment/ll-confirm-reservations.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Confirm reservations</h3><div class=\"ui attached segment\"><div class=\"ui visible message\" if.bind=\"reservations.results.length == 0\"><p>No reservations are currently available to confirm.</p></div><ui-table-wrapper if.bind=\"reservations.results.length > 0\"><table ui-table><thead><tr><th></th><th>Name</th><th>Equipment</th><th>From</th><th>To</th><th>Other details</th></tr></thead><tbody><tr repeat.for=\"c of reservations.results\"><td><ui-checkbox checked.bind=\"c.is_confirmed\"></ui-checkbox></td><td>${ c.username }</td><td>${ c.equipment_reserved }</td><td>${ c.start|dateFormat }</td><td>${ c.end|dateFormat }</td><td>${ c.reservation_details }</td></tr></tbody></table></ui-table-wrapper></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Confirm reservations</button></div></form></template>"; });
define('text!equipment/ll-create-reservation.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">New Reservation</h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><ui-field label=\"Equipment to reserve\" required class=\"sixteen wide column\"><ui-dropdown value.bind=\"source.equipment_reserved & validate\"><ui-item value=\"\"></ui-item><ui-item repeat.for=\"item of equipment.results\" value.bind=\"item.name\"> ${item.name} </ui-item></ui-dropdown></ui-field><div class=\"column\"><h4 class=\"section-header\">Book from</h4><div class=\"ui three column wide stackable grid\"><ui-field label=\"Date\" required class=\"column\"><ui-datetime value.bind=\"source.from_date & validate\" name=\"from_date\" config.bind=\"config\" change.trigger=\"dateChanged($event)\"></ui-datetime></ui-field><ui-field label=\"Hour\" class=\"column\" required><ui-dropdown value.bind=\"source.from_hour & validate\" name=\"from_hour\" change.delegate=\"dateChanged($event)\"><ui-item repeat.for=\"hour of hours\" value.bind=\"hour\"> ${ hour } </ui-item></ui-dropdown></ui-field><ui-field label=\"Minute\" class=\"column\" required><ui-dropdown value.bind=\"source.from_minute & validate\" name=\"from_minute\" change.delegate=\"dateChanged($event)\"><ui-item repeat.for=\"min of minutes\" value.bind=\"min\"> ${ min } </ui-item></ui-dropdown></ui-field></div></div><div class=\"column\"><h4 class=\"section-header\">Book to</h4><div class=\"ui three column wide stackable grid\"><ui-field label=\"Date\" required class=\"column\"><ui-datetime value.bind=\"source.to_date & validate\" name=\"to_date\" config.bind=\"config\" change.delegate=\"dateChanged($event)\"></ui-datetime></ui-field><ui-field label=\"Hour\" class=\"column\" required><ui-dropdown value.bind=\"source.to_hour & validate\" name=\"to_hour\" change.delegate=\"dateChanged($event)\"><ui-item repeat.for=\"hour of hours\" value.bind=\"hour\"> ${ hour } </ui-item></ui-dropdown></ui-field><ui-field label=\"Minute\" class=\"column\" required><ui-dropdown value.bind=\"source.to_minute & validate\" name=\"to_minute\" change.delegate=\"dateChanged($event)\"><ui-item repeat.for=\"min of minutes\" value.bind=\"min\"> ${ min } </ui-item></ui-dropdown></ui-field></div></div></div><ui-field label=\"Further details\"><textarea value.bind=\"source.reservation_details\"></textarea></ui-field><ll-template-hook name=\"create-reservation\" source.bind=\"source\"></ll-template-hook></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!inventory/index.html', ['module'], function(module) { module.exports = "<template><router-view swap-order=\"with\"></router-view></template>"; });
define('text!inventory/inventory-detail.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-dispense-amount\"></require><require from=\"./ll-restock-amount\"></require><div class=\"au-animate slide-in\"><h2><a class=\"dim\" route-href=\"route: inventory\">Inventory:</a> ${item.name}</h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"dispense = true\"><i class=\"icon sign out\"></i> Dispense amount </a><a class=\"item\" click.delegate=\"restock = true\"><i class=\"icon sign in\"></i> Restock</a></div><ll-dispense-amount source.bind=\"item\" toggle.bind=\"dispense\"></ll-dispense-amount><ll-restock-amount source.bind=\"item\" toggle.bind=\"restock\"></ll-restock-amount><div class=\"ui grid form segment no gutter\"><div class=\"middle aligned sixteen wide mobile eight wide computer column\"><ui-boolean source.bind=\"item.in_inventory\" size=\"big\"></ui-boolean>Item is available in <i>${item.location_path}</i></div><div class=\"sixteen wide mobile eight wide computer column\"><ui-field label=\"Change location\" required><ui-autocomplete from=\"locations\" value.bind=\"item.location & validate\" store-value=\"code\" display-value=\"display_name\" default-text.bind=\"item.location_name\"></ui-autocomplete></ui-field></div></div><div class=\"ui stackable grid no gutter\"><form class=\"ui eleven wide column form\" novalidate><div class=\"ui segment\"><div class=\"ui stackable padded grid two column wide\"><ui-field class=\"column\" label=\"Name\" required><input name=\"name\" value.bind=\"item.name & validate & debounce:1000\" placeholder=\"Item name\"></ui-field><ui-field class=\"column\" required label=\"Type\"><ui-autocomplete from=\"itemtypes\" value.bind=\"item.item_type & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"item.item_type\"></ui-autocomplete></ui-field></div><div class=\"ui stackable padded grid two column wide\"><ui-field class=\"column\" label=\"Barcode\"><input name=\"barcode\" value.bind=\"item.barcode & debounce:500\" placeholder=\"Barcode\"></ui-field><ui-field class=\"column\" label=\"Identifier\"><input name=\"identifier\" value.bind=\"item.identifier & debounce:500\" placeholder=\"Identifier\"></ui-field></div></div><div class=\"ui segment\"><h3>Amount</h3><div class=\"ui stackable padded grid four column wide\"><div class=\"middle aligned column\">${item.amount_available}</div><ui-field class=\"column\" label=\"Amount measure\"><ui-autocomplete from=\"measures\" value.bind=\"item.amount_measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"item.amount_measure\"></ui-autocomplete></ui-field><ui-field class=\"column\" label=\"Concentration\"><input name=\"identifier\" value.bind=\"item.concentration & debounce:1000\" placeholder=\"Concentration\"></ui-field><ui-field class=\"column\" label=\"Concentration measure\"><ui-autocomplete from=\"measures\" value.bind=\"item.concentration_measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"item.concentration_measure\"></ui-autocomplete></ui-field></div></div><div class=\"ui segment\"><h3>Properties</h3><div class=\"ui two column wide stackable padded grid\" repeat.for=\"p of item.properties\"><ui-field class=\"column\" label=\"Name\"><input name=\"prop_${index}\" value.bind=\"p.name & validate & debounce:1000\"></ui-field><div class=\"ui two column wide grid\"><ui-field class=\"fourteen wide column\" label=\"Value\"><textarea name=\"val_${index}\" value.bind=\"p.value & validate & debounce:1000\"></textarea></ui-field><div class=\"middle aligned two wide column\"><button class=\"ui circular icon button\" click.delegate=\"removeProperty($index)\"><i class=\"remove icon\"></i></button></div></div></div><button class=\"ui basic button\" click.delegate=\"addProperty()\"><i class=\"icon add\"></i> Add</button></div></form><div class=\"five wide column\"><div class=\"ui segment\"><p><b>Last updated:</b> ${item.last_updated_on|dateFormat}</p><p><b>Added on:</b> ${item.added_on|dateFormat}</p><p><b>Added by:</b> ${item.added_by}</p><ui-accordion><ui-accordion-content title=\"Description\"> ${item.description} </ui-accordion-content></ui-accordion></div><div class=\"ui segment\"><h3>Permissions</h3><ll-permissions object=\"inventory\" object-for.bind=\"item\"></ll-permissions></div><div class=\"ui segment\"><h3>History</h3><div class=\"ui relaxed list\"><div class=\"item\" repeat.for=\"t of item.transfers\"><i if.bind=\"!t.is_addition\" class=\"icon sign out\"></i> <i if.bind=\"t.is_addition\" class=\"icon sign in\"></i><div class=\"content\"><div class=\"header\"><span if.bind=\"t.is_addition\">Added </span><span if.bind=\"!t.is_addition\">Removed </span> ${t.amount_taken}${t.amount_measure} on ${t.date_created|dateFormat} </div><div if.bind=\"t.barcode\">Location: ${t.barcode} <span if.bind=\"t.coordinates\">/${t.coordinates}</span></div></div></div></div><div if.bind=\"item.transfers.length == 0\">Original amount</div><h4>Created from</h4><div if.bind=\"item.created_from.length > 0\" class=\"ui selection list\"><a class=\"item\" repeat.for=\"source of item.created_from\" route-href=\"route: inventoryDetail; params.bind: {id: source.id}\"><span class=\"header\">${source.name}</span> ${source.item_type} </span></a></div><div if.bind=\"item.created_from.length == 0\">Original item</div></div></div></div></div></template>"; });
define('text!inventory/inventory.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-add-item\"></require><require from=\"./ll-add-multiple-items\"></require><require from=\"./ll-dispense-multiple-items\"></require><require from=\"./ll-export-items\"></require><require from=\"../components/shared/show-row\"></require><div class=\"au-animate page\"><h2>Inventory</h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"addItem = true\"><i class=\"icons\"><i class=\"icon cube\"></i> <i class=\"corner plus icon\"></i> </i>Add item </a><a class=\"item\" click.delegate=\"addMultipleItems = true\"><i class=\"icons\"><i class=\"icon cubes\"></i> <i class=\"corner plus icon\"></i> </i>Add multiple items </a><a class=\"item\" click.delegate=\"dispenseMultipleItems = true\"><i class=\"icon grid layout\"></i> Dispense multiple items</a></div><ll-add-item toggle.bind=\"addItem\"></ll-add-item><ll-add-multiple-items toggle.bind=\"addMultipleItems\"></ll-add-multiple-items><ll-dispense-multiple-items toggle.bind=\"dispenseMultipleItems\"></ll-dispense-multiple-items><ui-disappearing-message visible.bind=\"tempMessage\" colour.bind=\"tempMessageColour\" title.bind=\"tempMessageTitle\" text.bind=\"tempMessageText\"></ui-disappearing-message><ui-table-header search.bind=\"query.search\" search-options.bind=\"searchOptions\" search-query.bind=\"query\"><ui-dropdown-menu class=\"item\" icon=\"filter\"><ui-dropdown-menu-item toggle=\"in_inventory\" toggle-source.bind=\"query\">Show only available items</ui-dropdown-menu-item></ui-dropdown-menu><ui-dropdown-menu class=\"item\" icon=\"ellipsis vertical\"><ui-dropdown-menu-item click.delegate=\"exportItems = true\" icon=\"file\">Export Items</ui-dropdown-menu-item><div class=\"ui divider\"></div><ui-dropdown-menu-item class=\"${selected.length == 0 ? 'disabled' : ''}\" click.delegate=\"deleteItems()\" icon=\"erase\">Delete selected</ui-dropdown-menu-item></ui-dropdown-menu></ui-table-header><ll-export-items toggle.bind=\"exportItems\" query-data=\"query\" selected.bind=\"selected\" search-count.bind=\"inventory.meta.count\"></ll-export-items><div class=\"ui attached very padded loading segment\" if.bind=\"isLoading\"></div><ui-table-wrapper if.bind=\"!isLoading\"><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th></th><th sort-by=\"identifier\">Identifier</th><th sort-by=\"barcode\">Barcode</th><th sort-by=\"name\">Name</th><th sort-by=\"item_type__name\">Type</th><th sort-by=\"is_available\">Availability</th><th>Amount available</th><th sort-by=\"location\">Location</th></tr></thead><tbody><tr ui-table-row=\"route: inventoryDetail; params.bind: {id: row.id}\" repeat.for=\"row of inventory.results\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td>${row.identifier}</td><td>${row.barcode}</td><td>${row.name}</td><td>${row.item_type}</td><td><ui-boolean source.bind=\"row.in_inventory\"></ui-boolean></td><td> ${row.amount_available}${row.amount_measure} &nbsp; <i if.bind=\"row.concentration\">(${row.concentration}${row.concentration_measure})</i></td><td>${row.location_path}</td></tr></tbody></table></ui-table-wrapper><ui-table-pagination page.bind=\"inventory.meta.current\" limit.bind=\"query.limit\" limitoptions.bind=\"[10,20,50,100]\" total.bind=\"inventory.meta.count\"></ui-table-pagination><div class=\"ui top attached segment\"><h3>Transfers <a route-href=\"route: allTransfers\" class=\"right floated dim\">(All Transfers)</a></h3></div><div class=\"ui attached very padded loading segment\" if.bind=\"isLoadingTransfers\"></div><ui-table-wrapper if.bind=\"!isLoadingTransfers\"><table ui-table><thead><tr><th></th><th>Source barcode</th><th>Number of items</th></tr></thead><tbody><template repeat.for=\"[key, row] of transfers\" containerless><tr show-row.two-way=\"row.toggled\" class=\"product-row ${row.toggled ? 'row-selected' : ''}\"><td class=\"collapsing\"><i class=\"icon toggle right\" if.bind=\"!row.toggled\"></i> <i class=\"icon toggle down\" if.bind=\"row.toggled\"></i></td><td>${key || 'Not barcoded'}</td><td>${row.length}</td></tr><tr show.bind=\"row.toggled\"><td colspan=\"3\"><ui-table-wrapper class=\"transfer-table-wrapper\"><table ui-table><thead><tr><th>Coordinates</th><th>Name</th><th>Amount available</th><th>Amount taken</th><th>Date created</th><th></th></tr></thead><tbody><tr repeat.for=\"item of row\" ui-table-row=\"route: inventoryDetail;\r\n                                                              params.bind: {id: item.item}\"><td>${item.coordinates}</td><td>${item.item_name}</td><td>${item.amount_available}${item.amount_measure}</td><td>${item.amount_taken}${item.amount_measure}</td><td>${item.date_created|dateFormat}</td><td><button class=\"ui basic icon button\" click.delegate=\"completeTransfer(item)\"><i class=\"check icon\"></i></button></td></tr></tbody></table></ui-table-wrapper></td></tr></template></tbody></table></ui-table-wrapper></div></template>"; });
define('text!inventory/ll-add-item.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">New Item</h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><div class=\"column ten wide\"><div class=\"ui stackable grid two column wide no gutter\"><ui-field class=\"column\" label=\"Name\" required><input value.bind=\"item.name & validate\" required></ui-field><ui-field class=\"column\" label=\"Type\" required><ui-autocomplete from=\"itemtypes\" value.bind=\"item.item_type & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"item.item_type\"></ui-autocomplete></ui-field></div><div class=\"ui stackable grid two column wide no gutter\"><ui-field class=\"column\" label=\"Identifier\"><input value.bind=\"item.identifier\"></ui-field><ui-field class=\"column\" label=\"Barcode\"><input value.bind=\"item.barcode\"></ui-field></div><div class=\"ui stackable grid no gutter\"><ui-field class=\"column\" label=\"Location\" required><ui-autocomplete from=\"locations\" value.bind=\"item.location & validate\" store-value=\"code\" display-value=\"display_name\"></ui-autocomplete></ui-field></div><div class=\"ui stackable grid four column wide no gutter\"><ui-field class=\"column\" label=\"Amount\" required><input name=\"amount_available\" value.bind=\"item.amount_available & validate\" placeholder=\"Amount\"></ui-field><ui-field class=\"column\" label=\"Amount measure\" required><ui-autocomplete from=\"measures\" value.bind=\"item.amount_measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"item.amount_measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field><ui-field class=\"column\" label=\"Concentration\"><input name=\"concentration\" value.bind=\"item.concentration & validate\" placeholder=\"Concentration\"></ui-field><ui-field class=\"column\" label=\"Concentration measure\"><ui-autocomplete from=\"measures\" value.bind=\"item.concentration_measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"item.concentration_measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div><div class=\"ui grid no gutter\"><ui-field class=\"column\" label=\"Description\"><textarea value.bind=\"item.description\"></textarea></ui-field></div><ll-template-hook name=\"create-inventory-item\" source.bind=\"item\"></ll-template-hook><div class=\"ui horizontal divider header\">Properties</div><div class=\"ui two column wide stackable grid\" repeat.for=\"p of item.properties\"><ui-field class=\"column\" label=\"Name\"><input name=\"prop_${index}\" value.bind=\"p.name & validate\"></ui-field><div class=\"ui two column wide grid\"><ui-field class=\"fourteen wide column\" label=\"Value\"><textarea name=\"val_${index}\" value.bind=\"p.value & validate\"></textarea></ui-field><div class=\"middle aligned two wide column\"><button class=\"ui circular icon button\" click.delegate=\"removeProperty($index)\"><i class=\"remove icon\"></i></button></div></div></div><button class=\"ui basic button\" click.delegate=\"addProperty()\"><i class=\"icon add\"></i> Add</button></div><div class=\"column six wide\"><ll-permissions object=\"inventory\" object-for.bind=\"item\" reset.bind=\"toggle\"></ll-permissions></div></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!inventory/ll-add-multiple-items.html', ['module'], function(module) { module.exports = "<template><require from=\"../shared/key-value-converter\"></require><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Add multiple items from file</h3><div class=\"ui attached ${isLoading ? 'loading' : ''} segment\"><div class=\"ui two column wide stackable grid\"><div class=\"column ten wide\"><ui-field class=\"column\" label=\"File Template\" required><ui-dropdown value.bind=\"options.file_template & validate\" change.delegate=\"setFields($event)\"><ui-item repeat.for=\"template of fileTemplates.results\" value.bind=\"template.id\"> ${template.name} </ui-item></ui-dropdown></ui-field><div class=\"ui top attached header\">Available fields</div><div class=\"ui bottom attached segment\"> ${fields} </div><ui-field class=\"column\" label=\"File to use\" required><input type=\"file\" name=\"items_file\" files.bind=\"options.items_file\" required></ui-field></div><div class=\"column six wide\"><ll-permissions object=\"inventory\" object-for.bind=\"options\" reset.bind=\"toggle\"></ll-permissions></div></div></div><div class=\"ui visible attached scrolling warning message\" if.bind=\"hasRejected\"><div class=\"header\">The following ${rejected.length} items failed to import:</div><div repeat.for=\"reject of rejected\"> ${reject.name} failed to import due to:&nbsp;<ul class=\"list\"><li repeat.for=\"field of reject.errors | keys\"><b>${field}:</b> ${reject.errors[field][0]} </b></li></ul></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!inventory/ll-dispense-amount.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Dispense</h3><div class=\"ui attached segment\"><div class=\"ui three column wide stackable grid\"><div class=\"column\"><div class=\"ui right labeled fluid input\"><input value.bind=\"transfer.amount & validate\" placeholder=\"Amount to dispense\"><div class=\"ui basic label\">${transfer.measure}</div></div></div><ui-field class=\"column\"><input value.bind=\"transfer.barcode\" placeholder=\"Destination barcode\"></ui-field><ui-field class=\"column\"><input value.bind=\"transfer.coordinates\" placeholder=\"Destination coordinates\"></ui-field></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Dispense</button></div></form></template>"; });
define('text!inventory/ll-dispense-multiple-items.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Dispense multiple items</h3><div class=\"ui attached segment\"><div class=\"ui top attached segment\"><ui-field label=\"Search for items\"><input value.bind=\"searchText & debounce\"></ui-field></div><ui-table-wrapper><table ui-table><thead><tr><th></th><th sort-by=\"identifier\">Identifier</th><th sort-by=\"barcode\">Barcode</th><th sort-by=\"name\">Name</th><th sort-by=\"item_type__name\">Type</th><th>Amount available</th><th sort-by=\"location\">Location</th></tr></thead><tbody><tr repeat.for=\"row of items.results\"><td><button class=\"ui circular icon button\" click.delegate=\"addItem(row)\"><i class=\"add icon\"></i></button></td><td>${row.identifier}</td><td>${row.barcode}</td><td>${row.name}</td><td>${row.item_type}</td><td> ${row.amount_available}${row.amount_measure} &nbsp; <i if.bind=\"row.concentration\">(${row.concentration}${row.concentration_measure})</i></td><td>${row.location_path}</td></tr></tbody></table></ui-table-wrapper><h4 class=\"section-header\">Items to dispense</h4><div class=\"ui five column wide padded stackable grid\"><div class=\"row\" repeat.for=\"item of dispense\"><div class=\"column\"><b>${item.name}</b></div><div class=\"column\"><div class=\"ui right labeled fluid input\"><input value.bind=\"item.dispense_amount & validate\" placeholder=\"Amount to dispense\"><div class=\"ui basic label\">${item.amount_measure}</div></div></div><ui-field class=\"column\"><input value.bind=\"item.destination_barcode & validate\" placeholder=\"Destination barcode\"></ui-field><ui-field class=\"column\"><input value.bind=\"item.destination_coordinates & validate\" placeholder=\"Destination coordinates\"></ui-field><div class=\"right aligned column\"><button class=\"ui circular icon button\" click.delegate=\"removeItem($index)\"><i class=\"remove icon\"></i></button></div></div></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Dispense</button></div></form></template>"; });
define('text!inventory/ll-export-items.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form attached clearing segment slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3>Export ${count} items</h3><ui-field class=\"column\" label=\"File template\" required><ui-autocomplete from=\"filetemplates\" value.bind=\"exportData.filetemplate & validate\" search-params.bind=\"{file_for: 'output'}\"></ui-autocomplete></ui-field><div class=\"ui message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui divider\"></div><div class=\"right floated\"><button class=\"ui basic button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui basic primary ${generatingFile ? 'loading' : ''} button\" type=\"submit\">Generate file</button> <a class=\"ui basic green button\" if.bind=\"download\" href.bind=\"fileUrl\">Download</a></div></form></template>"; });
define('text!inventory/ll-restock-amount.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Restock</h3><div class=\"ui attached segment\"><p>For the most effective tracking of items it is recommended that each \"lot\" of an item is added individually allowing for identification of problematic items.</p><div class=\"ui three column wide centered stackable grid\"><div class=\"column\"><div class=\"ui right labeled fluid input\"><input value.bind=\"transfer.amount & validate\" placeholder=\"Amount to restock\"><div class=\"ui basic label\">${transfer.measure}</div></div></div></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Restock</button></div></form></template>"; });
define('text!inventory/not-found.html', ['module'], function(module) { module.exports = "<template><div class=\"au-animate slide-in\"><h2><a class=\"dim\" route-href=\"route: inventory\">Inventory:</a> Not found</h2><div class=\"ui visible info message\"><p>The item you are tring to access either does not exist or you do not have the correct permissions to view it.</p></div></div></template>"; });
define('text!inventory/transfer-detail.html', ['module'], function(module) { module.exports = "<template><h2><a class=\"dim\" route-href=\"route: inventory\">Inventory |</a> Transfers: ${barcode}</h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"dispense = true\"><i class=\"icon sign out\"></i> Dispense amount </a><a class=\"item\" click.delegate=\"restock = true\"><i class=\"icon sign in\"></i> Restock</a></div><div class=\"ui two column grid form segment no gutter\"><div class=\"middle aligned column\"><ui-boolean source.bind=\"item.in_inventory\" size=\"big\"></ui-boolean>Item is available in <i>${item.location_path}</i></div><ui-field class=\"column\" label=\"Change location\"><ui-dropdown value.bind=\"item.location\" required placeholder=\"Location\"><ui-item class=\"item\" repeat.for=\"loc of locations.results\" value.bind=\"loc.code\">${loc.display_name}</ui-item></ui-dropdown></ui-field></div></template>"; });
define('text!inventory/transfers.html', ['module'], function(module) { module.exports = "<template><div class=\"au-animate page\"><h2><a class=\"dim\" route-href=\"route: inventory\">Inventory |</a> All Transfers</h2><ui-table-header search.bind=\"query.search\"></ui-table-header><ui-table-wrapper><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th></th><th sort-by=\"item_name\">Name</th><th sort-by=\"barcode\">Barcode</th><th sort-by=\"coordinates\">Coordinates</th><th>Amount available</th><th>Amount taken</th><th sort-by=\"date_created\">Date created</th></tr></thead><tbody><tr ui-table-row=\"route: transferDetail; params.bind: {barcode: row.barcode}\" repeat.for=\"row of transfers.results\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td>${row.item_name}</td><td>${row.barcode}</td><td>${row.coordinates}</td><td>${row.amount_available}${row.amount_measure}</td><td>${row.amount_taken}${row.amount_measure}</td><td>${row.date_created|dateFormat}</td></tr></tbody></table></ui-table-wrapper><ui-table-pagination page.bind=\"transfers.meta.current\" limit.bind=\"query.limit\" limitoptions.bind=\"[10,20,50,100]\" total.bind=\"transfers.meta.count\"></ui-table-pagination></div></template>"; });
define('text!projects/history-dialog.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><div class=\"header\">${data.run}: ${data.task}</div><ux-dialog-body><div class=\"content\"><div class=\"ui grid\"><div class=\"four wide column\"><h4 class=\"ui dividing header\">Inputs</h4><div class=\"ui blue labels\"><div if.bind=\"data.data.product_input_amounts.length == 0\"><i>No inputs for this task</i></div><div class=\"ui label\" repeat.for=\"input of data.data.product_input_amounts\"> ${input.name} <div class=\"detail\"> ${input.amount}${input.measure} </div></div></div></div><div class=\"eight wide column\"><h4 class=\"ui dividing header\">Steps</h4><div class=\"ui violet segment custom step field\" repeat.for=\"step of data.data.step_fields\"><h5 class=\"ui header\">${step.label}</h5><p class=\"maintain-breaks\">${step.description}</p><div class=\"ui four column wide grid\" if.bind=\"step.properties.length > 0\"><div class=\"column\" repeat.for=\"prop of step.properties\"><p>${prop.label}</p><div class=\"ui fluid ${!prop.measure_not_required ? 'right labeled' : ''} input read only\"><input value.bind=\"prop.amount\" disabled=\"disabled\"><div class=\"ui label\" if.bind=\"!prop.measure_not_required\"> ${prop.measure}</div></div></div></div></div><h4 class=\"ui dividing header\" if.bind=\"data.data.variable_fields.length > 0\">Variables</h4><div class=\"ui grid\"><div repeat.for=\"variable of data.data.variable_fields\" class=\"row\"><div class=\"eight wide column\">${variable.label}</div><div class=\"eight wide column\"><div class=\"ui fluid ${!variable.measure_not_required ? 'right labeled' : ''} input read only\"><input value.bind=\"variable.amount\" disabled=\"disabled\"><div class=\"ui label\" if.bind=\"!variable.measure_not_required\"> ${variable.measure}</div></div></div></div></div><h4 class=\"ui dividing header\" if.bind=\"data.data.calculation_fields.length > 0\">Calculations</h4><div class=\"ui brown segment\" repeat.for=\"calculation of data.data.calculation_fields\"><h5 class=\"ui header\">${calculation.label}</h5><pre>\r\n                                ${calculation.calculation}\r\n                            </pre></div></div><div class=\"four wide column\"><h4 class=\"ui dividing header\">Outputs</h4><div if.bind=\"data.data.output_fields.length == 0\"><i>No outputs for this task</i></div><div class=\"ui orange labels\"><div class=\"ui label\" repeat.for=\"output of data.data.output_fields\"> ${output.label} <div class=\"detail\"> ${output.amount}${output.measure} </div></div></div></div></div></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui ok button\" click.trigger=\"dialog.ok(selected)\">Done</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!projects/index.html', ['module'], function(module) { module.exports = "<template><router-view swap-order=\"with\"></router-view></template>"; });
define('text!projects/ll-deadline.html', ['module'], function(module) { module.exports = "<template><div class=\"ui visible ${warn && !past ? 'orange' : ''} ${past ? 'red' : ''} ${inactive ? 'green' : ''} message\"><div if.bind=\"inactive\">Project Finished</div><div if.bind=\"deadline && !inactive\"><b>Deadline:</b> ${deadline|dateFormat:\"DD/MM/YY\"} <span if.bind=\"!deadlinePassed\">(${daysToDeadline} days remaning)</span> <span if.bind=\"deadlinePassed\">(${daysToDeadline} days overdue)</span> <i class=\"calendar plus link right floated icon\" click.delegate=\"edit = true\"></i><div class=\"ui list\" repeat.for=\"e of extensions\"><b>Previous deadline:</b> ${e.previous_deadline|dateFormat:\"DD/MM/YY\"} extended by ${e.extended_by} on ${e.extended_on|dateFormat:\"DD/MM/YY\"}<br><b>Reason:</b> ${e.reason} </div></div><form submit.delegate=\"setDeadline()\" if.bind=\"!deadlineStatus || edit\" class=\"ui form\"><div class=\"ui two column wide vertically padded grid\"><div class=\"column\"><ui-field label=\"Deadline\" required class=\"column\"><ui-datetime value.bind=\"deadline\" config.bind=\"config\"></ui-datetime></ui-field></div><div class=\"column\"><ui-field label=\"Days to warn before deadline\"><input value.bind=\"deadlineWarn\" placeholder=\"7\"></ui-field></div></div><ui-field label=\"Reason for extension\" if.bind=\"edit\" required><textarea value.bind=\"reason\" rows=\"3\"></textarea></ui-field><div class=\"ui horizontal divider\"></div><button class=\"ui primary button\" type=\"submit\">Save</button> <button class=\"ui basic right floated button\" if.bind=\"edit\" click.delegate=\"edit = false\">Cancel</button></form></div></template>"; });
define('text!projects/ll-import-products.html', ['module'], function(module) { module.exports = "<template><require from=\"../shared/key-value-converter\"></require><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">Import New Products</h3><div class=\"ui attached ${isLoading ? 'loading' : ''} segment\"><p>To import a list of products two files are needed: a TSV (tab seperated) text file that contains information on the products to be imported and (optionaly) a zip file containing the design files.</p><p>The following headers are valid for use in the product information file. Those marked with an asterix (*) are required: name*, status*, product_type*, optimised_for.</p><p>All information supplied must match a valid input for the corrosponding field or it will be rejected. Some values are case sensitive, using the incorrect case will cause the entry to be rejected.</p><ui-field label=\"Products TSV file\" required><input type=\"file\" files.bind=\"products.products\" required></ui-field><ll-template-hook name=\"import-products\" source.bind=\"products.items\"></ll-template-hook></div><div class=\"ui visible attached scrolling warning message\" if.bind=\"hasRejected\"><div class=\"header\">The following ${rejected.length} items failed to import:</div><div repeat.for=\"reject of rejected\"> ${reject.name} failed to import due to:&nbsp;<ul class=\"list\"><li repeat.for=\"field of reject.reason | keys\"><b>${field}:</b> ${reject.reason[field]} </b></li></ul></div></div><div class=\"ui attached segment\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Import</button></div></form></template>"; });
define('text!projects/ll-inventory-items.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui top attached header\">Inventory items</h3><div class=\"ui attached clearing segment\" repeat.for=\"item of source\"><a class=\"ui circular right floated small compact icon button\" click.delegate=\"removeItem($index)\"><i class=\"icon minus\"></i> </a><a map-href=\"route: inventory/inventoryDetail; params.bind: {id: item.id}\"> ${item.name}<br> ${item.item_type} </a></div><div class=\"ui bottom attached right aligned segment\"><a class=\"ui basic button\" click.delegate=\"addItem()\"><i class=\"icon add\"></i> Add items</a></div></template>"; });
define('text!projects/ll-links.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form\" if.bind=\"add\" submit.delegate=\"save()\"><p><ui-field label=\"Label\" required><input value.bind=\"link.display_name\" required></ui-field><ui-field label=\"URL\" required><input value.bind=\"link.url\" required></ui-field></p><button class=\"ui primary button\" type=\"submit\">Save</button> <button class=\"ui basic button\" click.delegate=\"cancel()\">Cancel</button></form><div class=\"ui selection list\"><a class=\"item\" repeat.for=\"lnk of source.links\" href.bind=\"lnk.url\"><button class=\"ui tiny right floated circular icon button\" click.delegate=\"remove($index)\"><i class=\"minus icon\"></i></button> <i class=\"external icon\"></i> <span class=\"content\"><span class=\"header\">${lnk.display_name}</span></span></a></div><button class=\"ui basic button\" if.bind=\"!add\" click.delegate=\"add = true\">Add a link</button></template>"; });
define('text!projects/ll-new-product.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">New Product</h3><div class=\"ui attached segment\"><ui-field label=\"Name\" required><input value.bind=\"product.name & validate\" required></ui-field><ui-field label=\"Product status\" required><ui-dropdown value.bind=\"product.status & validate\"><ui-item repeat.for=\"status of statuses.results\" value.bind=\"status.name\"> ${status.name} </ui-item></ui-dropdown></ui-field><ui-field label=\"Product type\" required><ui-autocomplete from=\"itemtypes\" value.bind=\"product.product_type & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"product.product_type\"></ui-autocomplete></ui-field><ll-template-hook name=\"create-product\" source.bind=\"product\"></ll-template-hook></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!projects/ll-new-project.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">New Project</h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><div class=\"column ten wide\"><div if.bind=\"config.get('crm_enabled')\"><ui-autocomplete from=\"crm/project\" value.bind=\"crm_project\" display-value=\"Name\" store-value=\"Id\" placeholder=\"Select a CRM project\"></ui-autocomplete><div class=\"ui horizontal divider\">Or</div></div><ui-field label=\"Name\" required><input value.bind=\"project.name & validate\" required></ui-field><ui-field label=\"Project status\" required><ui-dropdown value.bind=\"project.status & validate\"><ui-item repeat.for=\"status of statuses.results\" value.bind=\"status.name\">${status.name}</ui-item></ui-dropdown></ui-field><ui-field label=\"Description\"><textarea value.bind=\"project.description\"></textarea></ui-field><ui-field label=\"Primary lab contact\" required><ui-autocomplete from=\"users\" value.bind=\"project.primary_lab_contact & validate\" store-value=\"username\" display-value=\"username\" default-text.bind=\"project.primary_lab_contact\"></ui-autocomplete></ui-field><div class=\"ui two column wide vertically padded grid\"><div class=\"column\"><ui-field label=\"Deadline\" required class=\"column\"><ui-datetime value.bind=\"project.deadline\" name=\"from_date\" config.bind=\"dateConfig\"></ui-datetime></ui-field></div><div class=\"column\"><ui-field label=\"Days to warn before deadline\"><input value.bind=\"project.deadline_warn\" placeholder=\"7\"></ui-field></div></div><ll-template-hook name=\"create-project\" source.bind=\"project\"></ll-template-hook></div><div class=\"column six wide\"><ll-permissions object-for.bind=\"project\" reset.bind=\"toggle\"></ll-permissions></div></div></div><div class=\"ui attached error message\" if.bind=\"errors\"> ${errors} </div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!projects/ll-product-attachments.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui top attached header\">Attachments</h3><div class=\"ui attached clearing segment\" repeat.for=\"item of source\"><a class=\"ui circular right floated small compact icon button\" click.delegate=\"removeAttachment($index, item)\"><i class=\"icon minus\"></i> </a><a href.bind=\"item.attachment\"> ${item.attachment_name} </a></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui attached segment\" if.bind=\"addNew\"><p if.bind=\"message\">${message}</p><div class=\"ui input\"><input type=\"file\" files.bind=\"attachmentFile\" placeholder=\"Choose file to attach\"></div></div><div class=\"ui bottom attached right aligned segment\"><a class=\"ui basic button\" click.delegate=\"addNew = true\" if.bind=\"!addNew\"><i class=\"icon add\"></i> Add attachment </a><a class=\"ui primary button\" click.delegate=\"addAttachment()\" if.bind=\"addNew\">Save</a> <a class=\"ui basic button\" click.delegate=\"addNew = false\" if.bind=\"addNew\">Cancel</a></div></template>"; });
define('text!projects/product-history.html', ['module'], function(module) { module.exports = "<template><require from=\"../shared/reverse\"></require><h2><a class=\"dim\" if.bind=\"project\" route-href=\"route: projectDetail; params.bind: {id: project.id}\">Project: ${project.name}</a>&nbsp;| Products History</h2><div repeat.for=\"p of products.results\"><h3 class=\"ui top attached header\">${p.product_identifier}: ${p.name} <span class=\"dim\">(${p.data.length} tasks completed)</span></h3><div class=\"ui bottom attached segment\"><div class=\"ui mini stackable scrollable ordered steps\"><a class=\"step\" repeat.for=\"t of p.data | reverse\" click.delegate=\"showData(t)\"><div class=\"content\"><div class=\"title\">${t.run}</div><div class=\"description\">${t.task}</div></div></a></div></div><p></p></div></template>"; });
define('text!projects/product.html', ['module'], function(module) { module.exports = "<template class=\"product\"><require from=\"./ll-inventory-items\"></require><require from=\"./ll-product-attachments\"></require><form class=\"ui form\" submit.delegate=\"save()\" novalidate><div class=\"ui grid two column wide\"><ui-field class=\"column\" label=\"Name\" required><input name=\"name\" value.bind=\"product.name\" placeholder=\"Product name\"></ui-field><ui-field class=\"column\" required label=\"Product type\"><ui-dropdown value.bind=\"product.product_type\" required><ui-item class=\"item\" repeat.for=\"type of itemTypes.results\" value.bind=\"type.name\">${type.display_name}</ui-item></ui-dropdown></ui-field></div><ui-field label=\"Product status\" required><ui-dropdown value.bind=\"product.status\" required><ui-item repeat.for=\"status of productStatuses.results\" value.bind=\"status.name\">${status.name}</ui-item></ui-dropdown></ui-field><p></p><ll-template-hook name=\"product-detail-top\" if.bind=\"product.id\" source.bind=\"product\"></ll-template-hook><div class=\"ui grid two column wide\"><div class=\"column\"><ll-inventory-items source.bind=\"product.linked_inventory\" source-id.bind=\"product.id\"></ll-inventory-items></div><div class=\"column\"><ll-product-attachments source.bind=\"product.attachments\" source-id.bind=\"product.id\"></ll-product-attachments></div></div><ll-template-hook name=\"product-detail-bottom\" if.bind=\"product.id\" source.bind=\"product\"></ll-template-hook><div class=\"ui grid two column wide segment\"><span class=\"column\"><b>Created on:</b> ${product.created_on|dateFormat} </span><span class=\"column\"><b>Last modified:</b> ${product.last_modified_on|dateFormat} </span></div><div class=\"right aligned\"><div class=\"ui active inline loader\" if.bind=\"isSaving\"></div><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!projects/project-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"au-animate page-back\"><require from=\"./product\"></require><require from=\"./ll-links\"></require><require from=\"./ll-new-product\"></require><require from=\"./ll-import-products\"></require><require from=\"../crm/ll-crm\"></require><require from=\"../components/shared/show-row\"></require><require from=\"../shared/string-truncate\"></require><require from=\"./ll-deadline\"></require><h2><i class=\"dim archive icon\" if.bind=\"project.archive\"></i> <a class=\"dim\" route-href=\"route: project\">Project</a> <span class=\"highlight\">${project.project_identifier}:</span> ${project.name}</span></h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"newProduct = true\"><i class=\"icon add\"></i> New product </a><a class=\"item\" click.delegate=\"importProducts = true\"><i class=\"icon upload\"></i> Import products </a><a class=\"item\" if.bind=\"!project.archive\" click.delegate=\"archive()\"><i class=\"icon archive\"></i> Finish project </a><a class=\"item\" if.bind=\"project.archive\" click.delegate=\"resume()\"><i class=\"icon check\"></i> Resume project</a></div><ll-new-product source.bind=\"project\" toggle.bind=\"newProduct\"></ll-new-product><ll-import-products source.bind=\"project\" toggle.bind=\"importProducts\"></ll-import-products><div class=\"ui two column stackable grid\"><div class=\"sixteen wide mobile eleven wide computer column\"><ui-table-header search.bind=\"query.search\"><div class=\"item\"><a map-href=\"route: project/productHistory; params.bind: {id: project.id}\" if.bind=\"project.id\" class=\"ui basic icon button\"><i class=\"clock icon\"></i></a></div><ui-dropdown-menu class=\"item\" icon=\"ellipsis vertical\"><ui-dropdown-menu-item class=\"${selected.length == 0 ? 'disabled' : ''}\" click.delegate=\"deleteItems()\" icon=\"erase\">Delete selected</ui-dropdown-menu-item></ui-dropdown-menu></ui-table-header><div class=\"ui attached very padded loading segment\" if.bind=\"isLoading\"></div><ui-table-wrapper if.bind=\"!isLoading\"><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th></th><th></th><th>Identifier</th><th sort-by=\"name\">Name</th><th sort-by=\"status__name\">Status</th><th sort-by=\"type__name\">Type</th><th sort-by=\"created_by__username\">Created by</th><th>On run</th></tr></thead><tbody><template repeat.for=\"row of products.results\" containerless><tr show-row.two-way=\"row.toggled\" class=\"product-row ${row.toggled ? 'row-selected' : ''}\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td class=\"collapsing\"><i class=\"icon toggle right\" if.bind=\"!row.toggled\"></i> <i class=\"icon toggle down\" if.bind=\"row.toggled\"></i></td><td>${row.product_identifier}</td><td>${row.name}</td><td>${row.status}</td><td>${row.product_type}</td><td>${row.created_by}</td><td><ui-boolean source.bind=\"row.on_run\"></ui-boolean></td></tr><tr if.bind=\"row.toggled\"><td colspan=\"8\" as-element=\"product\" product-id.bind=\"row.id\" toggle.bind=\"row.toggled\"></td></tr></template></tbody></table></ui-table-wrapper><ui-table-pagination page.bind=\"products.meta.current\" limit.bind=\"query.limit\" limitoptions.bind=\"[10,20,50,100]\" total.bind=\"products.meta.count\"></ui-table-pagination></div><div class=\"five wide column\"><ll-deadline project-id.bind=\"project.id\" deadline.bind=\"project.deadline\" deadline-warn.bind=\"project.deadline_warn\" deadline-status.bind=\"project.deadline_status\" extensions.bind=\"project.deadline_extensions\" inactive.bind=\"project.archive\" warn.bind=\"project.warn_deadline\" past.bind=\"project.past_deadline\"></ll-deadline><form class=\"ui form clearing segment\" novalidate submit.delegate=\"save()\"><p><b>Date started:</b> ${project.date_started|dateFormat}</p><ui-field label=\"Name\" required><input value.bind=\"project.name & validate\"></ui-field><ui-field label=\"Project status\" required><ui-dropdown value.bind=\"project.status & validate\"><ui-item repeat.for=\"status of statuses.results\" value.bind=\"status.name\">${status.name}</ui-item></ui-dropdown></ui-field><ui-field label=\"Description\"><textarea value.bind=\"project.description\" rows=\"10\"></textarea></ui-field><ui-field label=\"Primary lab contact\" required><ui-autocomplete from=\"users\" value.bind=\"project.primary_lab_contact & validate\" store-value=\"username\" display-value=\"username\" default-text.bind=\"project.primary_lab_contact\"></ui-autocomplete></ui-field><div class=\"ui divider\"></div><button class=\"ui primary button\" type=\"submit\">Save</button></form><div class=\"ui segment\"><h3>CRM</h3><ll-crm source.bind=\"project\"></ll-crm></div><div class=\"ui segment\"><h3>Links</h3><ll-links source.bind=\"project\"></ll-links></div><div class=\"ui segment\"><h3>Permissions</h3><ll-permissions object=\"projects\" object-for.bind=\"project\"></ll-permissions></div></div></div></div></template>"; });
define('text!projects/projects.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-new-project\"></require><div class=\"au-animate page\"><h2>Projects</h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"newProject = true\"><i class=\"icon add\"></i> New Project</a></div><ll-new-project toggle.bind=\"newProject\" source.bind=\"project\"></ll-new-project><ui-table-header search.bind=\"query.search\"><ui-dropdown-menu class=\"item\" icon=\"filter\"><ui-dropdown-menu-item toggle=\"archive\" toggle-source.bind=\"query\">Finished</ui-dropdown-menu-item></ui-dropdown-menu><ui-dropdown-menu class=\"item\" icon=\"ellipsis vertical\"><ui-dropdown-menu-item class=\"${selected.length == 0 ? 'disabled' : ''}\" click.delegate=\"archiveItems()\" icon=\"archive\">Mark selected finished</ui-dropdown-menu-item><ui-dropdown-menu-item class=\"${selected.length == 0 ? 'disabled' : ''}\" click.delegate=\"deleteItems()\" icon=\"erase\">Delete selected</ui-dropdown-menu-item></ui-dropdown-menu></ui-table-header><div class=\"ui attached very padded loading segment\" if.bind=\"isLoading\"></div><ui-table-wrapper if.bind=\"!isLoading\"><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th></th><th sort-by=\"identifier\">Identifier</th><th sort-by=\"name\">Name</th><th>Description</th><th sort-by=\"status\">Status</th><th>Project account</th><th sort-by=\"primary_lab_contact\">Lab contact</th><th sort-by=\"deadline\">Deadline</th><th sort-by=\"archived\">Finished</th></tr></thead><tbody><tr ui-table-row=\"route: projectDetail; params.bind: {id: row.id}\" repeat.for=\"row of projects.results\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td>${row.project_identifier}</td><td>${row.name}</td><td>${row.description|limitLength}</td><td>${row.status}</td><td><b>${row.crm_project.account.user.first_name}&nbsp; ${row.crm_project.account.user.last_name}</b><br> ${row.crm_project.account.account_name}<br></td><td>${row.primary_lab_contact}</td><td><span class=\"${row.warn_deadline && !row.past_deadline ? 'ui orange message' : ''} ${row.past_deadline ? 'ui red message' : ''}\"> ${row.deadline|dateFormat:\"DD/MM/YY\"}</span></td><td><ui-boolean source.bind=\"row.archive\"></ui-boolean></td></tr></tbody></table></ui-table-wrapper><ui-table-pagination page.bind=\"projects.meta.current\" limit.bind=\"query.limit\" limitoptions.bind=\"[10,20,50,100]\" total.bind=\"projects.meta.count\"></ui-table-pagination></div></template>"; });
define('text!settings/display-value.html', ['module'], function(module) { module.exports = "<template><i if.bind=\"isBoolean\" class=\"${check} large icon\"></i> <span if.bind=\"!isBoolean\">${text}</span></template>"; });
define('text!settings/index.html', ['module'], function(module) { module.exports = "<template><router-view swap-order=\"with\"></router-view></template>"; });
define('text!settings/section.html', ['module'], function(module) { module.exports = "<template><div class=\"ui secondary pointing menu\"><a repeat.for=\"[path, details] of subsections\" class=\"item ${data.subsection == path ? 'active' : ''}\" route-href=\"route: section; params.bind: {section: data.section,\r\n                                                     subsection: path}\">${details.name}</a></div><compose view.bind=\"template\" view-model.bind=\"subsection\" model.bind=\"data\"></compose></template>"; });
define('text!settings/settings.html', ['module'], function(module) { module.exports = "<template><div class=\"au-animate page content\"><h2>Settings</h2><div class=\"ui inverted stackable pointing primary menu\"><a repeat.for=\"route of router.routes\" if.bind=\"route.name\" class=\"item ${route.navModel.isActive ? 'active' : ''}\" route-href=\"route.bind: route.name\"> ${route.title} </a></div><div class=\"ui stackable secondary pointing menu\"><a repeat.for=\"cr of router.currentInstruction.config.settings.childRoutes\" if.bind=\"cr.name\" click.delegate=\"activateSection(cr)\" class=\"item ${activeSection == cr.name ? 'active' : ''}\"> ${cr.title} </a></div><compose if.bind=\"activeSection\" view-model.bind=\"activeModule\" view=\"./table.html\" model.bind=\"sectionData\"></compose></div></template>"; });
define('text!settings/table.html', ['module'], function(module) { module.exports = "<template><require from=\"./path-walker\"></require><require from=\"./display-value\"></require><form class=\"ui form new item slide-down au-animate\" if.bind=\"createItem\" submit.delegate=\"updateItem ? update() : save()\" novalidate><h3 class=\"ui top attached inverted primary header\"> ${updateItem? 'Update' : 'New'} Item</h3><div class=\"ui attached ${isSaving ? 'loading' : ''} segment\"><compose view.bind=\"createTemplate\" model.bind=\"item\"></compose><ll-template-hook name=\"settings-create-${subsection}\" source.bind=\"item\"></ll-template-hook></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form><ui-table-header search.bind=\"query.search\"><button click.delegate=\"create()\" class=\"ui primary small basic button\"><i class=\"plus icon\"></i> Create new</button> <button if.bind=\"extraToolbarButtons\" repeat.for=\"b of extraToolbarButtons\" class=\"ui basic grey button\" click.delegate=\"b['action']()\"><i class=\"${b.icon} icon\"></i> ${b.text} </button><ui-dropdown-menu class=\"item\" icon=\"ellipsis vertical\"><ui-dropdown-menu-item class=\"${selected.length == 0 ? 'disabled' : ''}\" click.delegate=\"deleteItems()\" icon=\"erase\">Delete selected</ui-dropdown-menu-item></ui-dropdown-menu></ui-table-header><div class=\"ui attached message\" if.bind=\"tableError\"><ui-error-message error-source.bind=\"tableError\"></ui-error-message></div><div class=\"ui loading very padded attached segment\" if.bind=\"isLoading\"></div><ui-table-wrapper if.bind=\"!isLoading\"><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th></th><th repeat.for=\"header of tableHeaders\">${header}</th><th></th></tr></thead><tbody><tr repeat.for=\"row of table.results\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td repeat.for=\"field of tableFields\" as-element=\"display-value\" text.bind=\"row|pathWalker:field\"></td><td class=\"right aligned\"><div class=\"ui icon buttons\"><button if.bind=\"extraButtons\" repeat.for=\"b of extraButtons\" class=\"ui basic grey button\" click.delegate=\"b['action'](row)\"><i class=\"${b.icon} icon\"></i></button> <button class=\"ui primary basic button\" click.delegate=\"edit(row)\"><i class=\"edit icon\"></i></button></div></td></tr></tbody></table></ui-table-wrapper><ui-table-pagination page.bind=\"table.meta.current\" limit.bind=\"query.limit\" limitoptions.bind=\"[10,20,50,100]\" total.bind=\"table.meta.count\"></ui-table-pagination></template>"; });
define('text!shared/navigation.html', ['module'], function(module) { module.exports = "<template><div if.bind=\"accountPane\" class=\"au-animate slide-out account-pane\"><div class=\"account-pane-header\"><img src=\"img/leaflims-logo.svg\" class=\"responsive-image\"> Welcome ${payload.username} </div><div class=\"fluid ui basic white buttons\"><button class=\"ui icon button\" click.delegate=\"showAccountDialog()\"><i class=\"user icon\"></i></button> <button class=\"ui icon button\" click.delegate=\"showPasswordDialog()\"><i class=\"privacy icon\"></i></button> <button class=\"ui icon button\" click.trigger=\"logout()\"><i class=\"sign out icon\"></i></button></div><div class=\"alerts-container\"><h4 class=\"ui header\">Alerts</h4><div class=\"ui selection list alerts-list\"><div if.bind=\"alerts.results.length == 0\" class=\"item\">No alerts</div><div class=\"item\" repeat.for=\"alert of alerts.results\" click.delegate=\"dismissAlert(alert)\"><i class=\"alarm icon ${alert.triggeralert.triggerset.severity}\"></i><div class=\"content\"><div class=\"header\">${alert.triggeralert.triggerset.name}</div> ${alert.triggeralert.fired|dateFormat} </div></div></div></div></div><div if.bind=\"router.currentInstruction.config.nav\" class=\"ui compact massive inverted left fixed vertical full height labelled icon menu\"><a class=\"item user-details darker ${accountPane ? 'pane-active' : ''}\" click.delegate=\"toggleAccountPane()\"><i class=\"user circle icon\"></i> </a><a repeat.for=\"row of router.navigation\" if.bind=\"(row.settings.admin && isAdmin) || !row.settings.admin\" class=\"item ${row.isActive ? 'active' : ''}\" href.bind=\"row.href\"><i class=\"icon ${row.settings.icon}\"></i></a></div></template>"; });
define('text!workflows/finish-task.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form au-animate page\" submit.delegate=\"save()\" novalidate><h2><a class=\"dim\" route-href=\"route: workflows\">Workflow runs:</a> ${run.name}</h2><h3 class=\"ui inverted primary top attached in_progress task header\"><div class=\"ui circular white label\">${taskPosition}</div>Finish Task: ${task_name} </h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><ui-field label=\"Set selected as\" class=\"column\"><ui-dropdown value.bind=\"state\" change.delegate=\"setState($event)\"><ui-item repeat.for=\"[v, d] of finishOptions\" value.bind=\"v\">${d}</ui-item></ui-dropdown></ui-field><div class=\"column\"><ui-field label=\"Restart failed at task\" class=\"column\"><ui-dropdown value.bind=\"restartTaskAt\"><ui-item repeat.for=\"t of run.tasks\" value.bind=\"$index\">${$index + 1}: ${t.name}</ui-item></ui-dropdown></ui-field><ui-field label=\"Add note to data\" class=\"column\"><textarea value.bind=\"notes\" rows=\"3\"></textarea></ui-field></div></div></div><ui-table-wrapper><table ui-table><thead><tr><th></th><th class=\"four wide\">Name</th><th class=\"three wide\">State</th><th class=\"four wide\">Inputs</th><th class=\"four wide\">Outputs</th></tr></thead><tbody><tr repeat.for=\"row of results\"><td as-element=\"ui-table-select\" select-to.bind=\"selected\" select-as.bind=\"row\"></td><td>${row.product_name}</td><td><ui-dropdown value.bind=\"row.state\"><ui-item repeat.for=\"[v, d] of finishOptions\" value.bind=\"v\">${d}</ui-item></ui-dropdown></td><td><div class=\"ui blue labels\"><div class=\"ui label\" repeat.for=\"input of row.data.product_input_amounts\"> ${input.name} <div class=\"detail\"> ${input.amount}${input.measure} </div></div></div></td><td><div class=\"ui orange labels\"><div class=\"ui label\" repeat.for=\"output of row.data.output_fields\"> ${output.label} <div class=\"detail\"> ${output.amount}${output.measure} </div></div></div></td></tr></tbody></table></ui-table-wrapper><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><a route-href=\"route: performTask; params.bind: {id: run.id}\" if.bind=\"run.id\" class=\"ui button\">Cancel</a> <button type=\"submit\" class=\"ui primary button\">Done</button></div></form></template>"; });
define('text!workflows/index.html', ['module'], function(module) { module.exports = "<template><router-view swap-order=\"with\"></router-view></template>"; });
define('text!workflows/ll-add-products.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui attached header\">Add Products</h3><div class=\"ui attached segment\"><ui-picker selected.bind=\"selected\" config.bind=\"config\"></ui-picker></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Add</button></div></form></template>"; });
define('text!workflows/ll-calculation-field.html', ['module'], function(module) { module.exports = "<template class=\"ui brown segment custom\"><h5 class=\"ui header required\">${field.label}</h5><div class=\"ui fluid input\"><textarea value.bind=\"outputTo.calculation\" rows=\"4\" placeholder=\"Calculation\"></textarea></div></template>"; });
define('text!workflows/ll-edit-run.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui attached header\">Edit Run</h3><div class=\"ui attached segment\"><ui-field label=\"Name\" required><input value.bind=\"run.name\"></ui-field><div class=\"ui mini steps\"><div class=\"step ${run.current_task == $index ? 'active' : ''} ${run.task_in_progress ? 'in_progress' : ''} ${$index < run.current_task ? 'completed' : ''}\" repeat.for=\"t of tasks\"><div class=\"content\"><div class=\"title\">${t.name}</div><div class=\"content\" if.bind=\"t.select\"><ui-autocomplete value.bind=\"t.id\" from=\"tasks\" store-value=\"id\" display-value=\"name\" placeholder=\"Select task\"></ui-autocomplete></div><div class=\"content\" if.bind=\"$index >= run.current_task\"><div class=\"ui mini basic fluid icon buttons\"><button class=\"ui button\" click.delegate=\"addAfter($index, t)\"><i class=\"add icon\"></i></button> <button class=\"ui button\" click.delegate=\"removeTask($index, t)\" if.bind=\"$index > run.current_task\"><i class=\"remove icon\"></i></button></div></div></div></div></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Save</button></div></form></template>"; });
define('text!workflows/ll-input-field.html', ['module'], function(module) { module.exports = "<template class=\"ui blue segment custom\"><h5 class=\"ui header required\">${field.label}</h5><div class=\"ui two column wide stackable padded grid\"><div class=\"column\"><div class=\"ui right labeled fluid input ${field.from_calculation ? 'disabled left icon' : ''}\"><i if.bind=\"field.from_calculation\" class=\"icon calculator\"></i> <input type=\"number\" value.bind=\"outputTo.amount & validate\" placeholder=\"${field.from_calculation ? 'Calculated' : 'Amount'}\"><div class=\"ui label\">${field.measure}</div></div></div><div class=\"column\"><div class=\"ui fluid search selection dropdown\"><input value.bind=\"outputTo[field.store_value_in] & validate\"> <i class=\"dropdown icon\"></i><div class=\"default text\">Lookup ${field.consumable_type} from inventory</div><div class=\"menu\"></div></div></div></div><div class=\"ui two column wide stackable padded grid\"><div class=\"column\"><input placeholder=\"Barcode (optional)\" value.bind=\"outputTo.destination_barcode\"></div><div class=\"column\"><input placeholder=\"Coordinates (optional)\" value.bind=\"outputTo.destination_coordinates\"></div></div></template>"; });
define('text!workflows/ll-new-run.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form new item slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui top attached inverted primary header\">New Run</h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><ui-field label=\"Name\" required class=\"column\"><input value.bind=\"run.name & validate\" required></ui-field><ui-field label=\"Workflow\" required class=\"column\"><ui-autocomplete from=\"workflows\" store-value=\"order\" value.bind=\"run.tasks & validate\"></ui-autocomplete></ui-field></div><ll-template-hook name=\"new-run\" source.bind=\"run\"></ll-template-hook><div class=\"ui two column wide stackable padded grid\"><div class=\"ten wide column\"><div class=\"ui horizontal divider\">Select products</div><ui-picker selected.bind=\"run.products\" config.bind=\"config\"></ui-picker></div><div class=\"six wide column\"><ll-permissions object-for.bind=\"run\" reset.bind=\"toggle\"></ll-permissions></div></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui bottom attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Start</button></div></form></template>"; });
define('text!workflows/ll-output-field.html', ['module'], function(module) { module.exports = "<template class=\"ui orange segment custom\"><h5 class=\"ui header required\">${field.label}</h5><div class=\"ui one column wide grid\"><div class=\"column\"><div class=\"ui right labeled fluid input ${field.from_calculation ? 'disabled left icon' : ''}\"><i if.bind=\"field.from_calculation\" class=\"icon calculator\"></i> <input type=\"number\" value.bind=\"outputTo.amount & validate\" placeholder=\"${field.from_calculation ? 'Calculated' : 'Amount'}\"><div class=\"ui label\">${field.measure} ${field.lookup_type}</div></div></div></div><div class=\"ui two column wide grid\"><div class=\"column\"><input placeholder=\"Barcode (optional)\" value.bind=\"outputTo.destination_barcode\"></div><div class=\"column\"><input placeholder=\"Coordinates (optional)\" value.bind=\"outputTo.destination_coordinates\"></div></div></template>"; });
define('text!workflows/ll-run-to-workflow.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form slide-down au-animate\" if.bind=\"toggle\" submit.delegate=\"save()\" novalidate><h3 class=\"ui attached header\">Create workflow from run</h3><div class=\"ui attached segment\"><div class=\"ui two column wide stackable grid\"><ui-field label=\"Name\" required class=\"column\"><input value.bind=\"data.name\"></ui-field><ll-permissions object=\"workflows\" object-for.bind=\"data\" reset.bind=\"toggle\" class=\"column\"></ll-permissions></div></div><div class=\"ui attached message\" if.bind=\"error\"><ui-error-message error-source.bind=\"error\"></ui-error-message></div><div class=\"ui attached right aligned segment\"><button class=\"ui button\" click.delegate=\"cancel()\">Cancel</button> <button class=\"ui primary button\" type=\"submit\">Create</button></div></form></template>"; });
define('text!workflows/ll-step-field.html', ['module'], function(module) { module.exports = "<template class=\"ui violet segment custom step field\"><h5 class=\"ui header\">${field.label}</h5><p class=\"maintain-breaks\">${field.description}</p><div class=\"ui four column wide stackable grid\" if.bind=\"field.properties.length > 0\"><div class=\"column\" repeat.for=\"prop of field.properties\"><p>${prop.label}</p><div class=\"ui fluid ${!prop.measure_not_required ? 'right labeled' : ''} input ${prop.from_calculation ? 'disabled left icon' : ''}\"><i if.bind=\"prop.from_calculation\" class=\"icon calculator\"></i> <input value.bind=\"outputTo.properties[$index].amount\" placeholder=\"${prop.from_calculation ? 'Calculated' : 'Amount'}\"><div class=\"ui label\" if.bind=\"!prop.measure_not_required\">${prop.measure}</div></div></div></div></template>"; });
define('text!workflows/ll-variable-field.html', ['module'], function(module) { module.exports = "<template class=\"ui yellow segment custom\"><h5 class=\"ui header required\">${field.label}</h5><div class=\"ui fluid input ${field.measure_not_required ? '' : 'right labeled'} ${field.from_calculation ? 'disabled left icon' : ''}\"><i if.bind=\"field.from_calculation\" class=\"icon calculator\"></i> <input type=\"number\" value.bind=\"outputTo.amount\" placeholder=\"${field.from_calculation ? 'Calculated' : 'Amount'}\"><div if.bind=\"!field.measure_not_required\" class=\"ui label\">${field.measure}</div></div></template>"; });
define('text!workflows/perform-task.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form au-animate page\" submit.delegate=\"save()\" novalidate><h2><a class=\"dim\" route-href=\"route: workflows\">Workflow runs:</a> ${run.name}</h2><h3 class=\"ui inverted primary top attached in_progress task header\"><div class=\"ui circular white label\">${taskPosition}</div>Perform Task: ${task_name} </h3><div click.delegate=\"toggleSection('setup')\" class=\"ui attached clickable header\"><i class=\"${setup ? 'caret down' : 'caret right'} icon\"></i> Setup</div><div show.bind=\"setup\" class=\"ui attached ${isLoading ? 'loading' : ''} segment\"><ui-field label=\"Select product to see information for\"><ui-dropdown value.bind=\"selectedData\" change.delegate=\"setSelected($event)\"><ui-item repeat.for=\"p of monitorData.data\" value.bind=\"p.id\">${p.product_name}</ui-item></ui-dropdown></ui-field><p></p><div class=\"ui stackable grid\"><div class=\"four wide column\"><h4 class=\"ui dividing header\">Inputs</h4><div if.bind=\"currentData.product_input_amounts.length == 0\"><i>No inputs for this task</i></div><div class=\"ui blue labels\"><div class=\"ui label\" repeat.for=\"input of currentData.product_input_amounts\"> ${input.name} <div class=\"detail\"> ${input.amount}${input.measure} </div></div></div></div><div class=\"eight wide column\"><h4 class=\"ui dividing header\">Steps</h4><div class=\"ui violet segment custom step field\" repeat.for=\"step of currentData.step_fields\"><h5 class=\"ui header\">${step.label}</h5><p class=\"maintain-breaks\">${step.description}</p><div class=\"ui four column wide stackable padded grid\" if.bind=\"step.properties.length > 0\"><div class=\"column\" repeat.for=\"prop of step.properties\"><p>${prop.label}</p><div class=\"ui fluid ${!prop.measure_not_required ? 'right labeled' : ''} input read only\"><input value.bind=\"prop.amount\" disabled=\"disabled\"><div class=\"ui label\" if.bind=\"!prop.measure_not_required\"> ${prop.measure}</div></div></div></div></div></div><div class=\"four wide column\"><h4 class=\"ui dividing header\">Outputs</h4><div if.bind=\"currentData.output_fields.length == 0\"><i>No outputs for this task</i></div><div class=\"ui orange labels\"><div class=\"ui label\" repeat.for=\"output of currentData.output_fields\"> ${output.label} <div class=\"detail\"> ${output.amount}${output.measure} </div></div></div></div></div></div><div click.delegate=\"toggleSection('requirements')\" class=\"ui attached clickable header\"><i class=\"${requirements ? 'caret down' : 'caret right'} icon\"></i> Requirements</div><div show.bind=\"requirements\" class=\"ui attached ${isLoading ? 'loading' : '' } segment\"><div class=\"ui visible warning message\" if.bind=\"taskRequirements.errors.length > 0\"><div class=\"header\">Issues</div><ul class=\"list\"><li repeat.for=\"message of taskRequirements.errors\">${message}</li></ul></div><ui-table-wrapper><table ui-table><thead><tr><th>Name</th><th>Type</th><th>Amount to take</th><th>Amount available</th><th>Location</th></tr></thead><tbody><tr ui-table-row=\"route: inventoryDetail; params.bind: {id: row.id}\" repeat.for=\"row of monitorData.transfers\"><td>${row.item.name}</td><td>${row.item.item_type.name}</td><td>${row.amount_to_take}${row.amount_measure.symbol}</td><td> ${row.item.amount_available}${row.item.amount_measure.symbol} &nbsp; <i if.bind=\"row.item.concentration\">(${row.item.concentration}${row.item.concentration_measure})</i></td><td>${row.item.location_path}</td></tr></tbody></table></ui-table-wrapper></div><div class=\"ui bottom attached right aligned segment\"><a route-href=\"route: workflows\" class=\"ui button\">Cancel</a> <a route-href=\"route: finishTask; params.bind: {id: run.id}\" if.bind=\"run.id\" class=\"ui primary button\">Finish task</a></div></form></template>"; });
define('text!workflows/start-task.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-input-field\"></require><require from=\"./ll-variable-field\"></require><require from=\"./ll-calculation-field\"></require><require from=\"./ll-step-field\"></require><require from=\"./ll-output-field\"></require><form class=\"ui form au-animate page\" submit.delegate=\"save()\" novalidate><h2><a class=\"dim\" route-href=\"route: workflows\">Workflow runs:</a> ${run.name}</h2><h3 class=\"ui inverted primary top attached task header\"><div class=\"ui circular white label\">${taskPosition}</div>Start Task: ${task.name} </h3><div click.delegate=\"toggleSection('setup')\" class=\"ui attached clickable header\"><i class=\"${setup ? 'caret down' : 'caret right'} icon\"></i> Setup</div><div show.bind=\"setup\" class=\"ui attached ${isLoading ? 'loading' : ''} segment\"><h4 class=\"ui dividing header\" if.bind=\"task.capable_equipment.length || !task.labware_not_required\">Equipment</h4><div class=\"ui teal segment\" if.bind=\"task.capable_equipment.length || !task.labware_not_required\"><div class=\"ui two column wide stackable grid\" if.bind=\"task.capable_equipment.length\"><div class=\"six wide column\"><ui-field label=\"Equipment to use\" required><ui-dropdown value.bind=\"taskData.equipment_choice & validate\" placeholder=\"Equipment to use\"><ui-item repeat.for=\"choice of task.capable_equipment\" value.bind=\"choice\"> ${choice} </ui-item></ui-dropdown></ui-field></div><div class=\"ten wide column\" if.bind=\"!task.labware_not_required\"><div class=\"ui three column wide stackable padded grid\"><div class=\"four wide padded column\"><ui-field label=\"Labware amount\" required><input value.bind=\"taskData.labware_amount & validate\"></ui-field></div><div class=\"six wide padded column\"><ui-field label=\"Labware to use\" required><ui-autocomplete from=\"inventory\" value.bind=\"taskData.labware_identifier & validate\" search-params.bind=\"{item_type__name: task.labware}\" autofill=\"true\" placeholder=\"Lookup ${task.labware} from inventory\"></ui-autocomplete></ui-field></div><div class=\"six wide padded column\"><ui-field label=\"Labware barcode\"><input value.bind=\"taskData.labware_barcode\"></ui-field></div></div></div></div></div><h4 class=\"ui dividing header\" if.bind=\"task.input_fields.length && task.product_input\">Inputs</h4><div class=\"ui blue segment\" if.bind=\"task.product_input\"><h5 class=\"ui header required\">Input from product</h5><div class=\"ui right labeled fluid input\"><input type=\"number\" value.bind=\"taskData.product_input_amount & validate\"><div class=\"ui label\">${task.product_input_measure} ${task.product_input}</div></div></div><div class=\"ui three column wide stackable grid\"><div class=\"column\" repeat.for=\"field of task.input_fields\"><ll-input-field field.bind=\"field\" output-to.bind=\"taskData.input_fields[$index] & validate\"></ll-input-field></div></div><h4 class=\"ui dividing header\" if.bind=\"task.step_fields.length\">Steps</h4><ll-step-field repeat.for=\"field of task.step_fields\" field.bind=\"field\" output-to.bind=\"taskData.step_fields[$index]\"></ll-step-field><h4 class=\"ui dividing header\" if.bind=\"task.output_fields.length\">Outputs</h4><div class=\"ui three column wide stackable grid\"><div class=\"column\" repeat.for=\"field of task.output_fields\"><ll-output-field field.bind=\"field\" output-to.bind=\"taskData.output_fields[$index]\"></ll-output-field></div></div><h4 class=\"ui dividing header\" if.bind=\"task.variable_fields.length\">Variables</h4><div class=\"ui five column wide stackable grid\"><div class=\"column\" repeat.for=\"field of task.variable_fields\"><ll-variable-field field.bind=\"field\" output-to.bind=\"taskData.variable_fields[$index]\"></ll-variable-field></div></div><h4 class=\"ui dividing header\" if.bind=\"task.calculation_fields.length\">Calculations</h4><div class=\"ui three column wide stackable grid\"><div class=\"column\" repeat.for=\"field of task.calculation_fields\"><ll-calculation-field field.bind=\"field\" output-to.bind=\"taskData.calculation_fields[$index]\"></ll-calculation-field></div></div></div><div click.delegate=\"toggleSection('requirements')\" class=\"ui attached clickable header\"><i class=\"${requirements ? 'caret down' : 'caret right'} icon\"></i> Status</div><div show.bind=\"requirements\" class=\"ui attached ${loadingRequirements ? 'loading' : '' } segment\"><div class=\"ui three stacking statistics\"><div class=\"${taskRequirements.errors.length > 0 ? 'red' : 'green'} statistic\"><div class=\"value\"><i class=\"${taskRequirements.errors.length > 0 ? 'warning sign' : 'check circle'} icon\"></i></div><div class=\"label\">Task requirements</div></div><div class=\"${taskRequirements.errors.length > 0 ? 'red' : ''} statistic\"><div class=\"value\"> ${taskRequirements.errors.length} </div><div class=\"label\">Errors</div></div><div class=\"statistic\"><div class=\"value\"><i class=\"${taskRequirements.equipment_status == 'idle' ? 'check circle' : 'remove circle'} ${taskRequirements.equipment_status !== 'idle' ? 'red' : 'green'} icon\"></i></div><div class=\"label\">Equipment ready</div></div></div><div class=\"ui visible warning message\" if.bind=\"taskRequirements.errors.length > 0\"><div class=\"header\">Issues</div><ul class=\"list\"><li repeat.for=\"message of taskRequirements.errors\">${message}</li></ul></div><ui-table-wrapper><table ui-table><thead><tr><th>Issue</th><th>Name</th><th>Type</th><th>Amount to take</th><th>Amount available</th><th>Location</th></tr></thead><tbody><tr ui-table-row=\"route: inventoryDetail; params.bind: {id: row.id}\" repeat.for=\"row of taskRequirements.requirements\"><td><i class=\"warning sign icon\" if.bind=\"!row.is_valid\"></i></td><td>${row.item.name}</td><td>${row.item.item_type.name}</td><td>${row.amount_to_take}${row.amount_measure.symbol}</td><td> ${row.item.amount_available}${row.item.amount_measure.symbol} &nbsp; <i if.bind=\"row.item.concentration\">(${row.item.concentration}${row.item.concentration_measure})</i></td><td>${row.item.location_path}</td></tr></tbody></table></ui-table-wrapper></div><div class=\"ui bottom attached right aligned segment\"><a route-href=\"route: workflows\" class=\"ui button\">Cancel</a> <button if.bind=\"!canStart\" type=\"submit\" class=\"ui primary button\">Check task</button> <button if.bind=\"canStart\" click.delegate=\"complete = true\" type=\"submit\" class=\"ui primary button\">Start and complete task</button> <button if.bind=\"canStart\" type=\"submit\" class=\"ui primary button\">Start and monitor task</button></div></form></template>"; });
define('text!workflows/workflows.html', ['module'], function(module) { module.exports = "<template><require from=\"./exclude-type\"></require><require from=\"./is-length\"></require><require from=\"./is-excluded\"></require><require from=\"./ll-new-run\"></require><require from=\"./ll-edit-run\"></require><require from=\"./ll-add-products\"></require><require from=\"./ll-run-to-workflow\"></require><div class=\"au-animate page content\"><h2 if.bind=\"!limitTo\">Workflow runs</h2><h2 if.bind=\"limitTo\"><a class=\"dim\" route-href=\"route: workflows\">Workflow runs:</a> ${runs.results[0].name} </h2><div class=\"ui inverted stackable primary menu\"><a class=\"item\" click.delegate=\"newRun = true\"><i class=\"add icon\"></i> New run</a></div><ll-new-run toggle.bind=\"newRun\"></ll-new-run><ui-error-message error-source.bind=\"error\"></ui-error-message><div class=\"ui padded basic segment\" if.bind=\"isLoading\"><div class=\"ui active indeterminate large centered inline text loader\">Loading</div></div><div if.bind=\"runs.results.length == 0\" class=\"ui basic segment\"><h2 class=\"ui center aligned grey header\">No runs active</h2></div><div repeat.for=\"run of runs.results\" class=\"run-container\"><div class=\"ui ordered mini attached inverted primary steps\"><div class=\"step ${run.current_task == $index ? 'active' : ''} ${run.task_in_progress ? 'in_progress' : ''} ${$index > run.current_task ? 'disabled' : ''} ${$index < run.current_task ? 'completed' : ''}\" repeat.for=\"t of run.tasks_list\"><div class=\"content\"><div class=\"title\">${t.name}</div></div></div></div><ll-edit-run toggle.bind=\"run.edit\" source.bind=\"run\"></ll-edit-run><ll-run-to-workflow toggle.bind=\"run.toWorkflow\" source.bind=\"run\"></ll-run-to-workflow><ll-add-products toggle.bind=\"run.addProducts\" source.bind=\"run\"></ll-add-products><div class=\"ui attached segment stackable grid run\"><div class=\"four wide column run-info\"><div class=\"ui dividing header\"> ${run.name} <div class=\"sub header\">${run.products.length} Products</div></div><div>${run.started_by}</div><div class=\"dim\">${run.date_started|dateFormat}</div></div><ui-table-wrapper class=\"twelve wide column\"><table ui-table><thead><tr><th></th><th>Product</th><th>Available inputs</th></tr></thead><tbody><tr repeat.for=\"row of run.products_list\"><td as-element=\"ui-table-select\" select-to.bind=\"run.selected\" select-as.bind=\"row\"></td><td><b>${row.product_identifier}: </b> ${row.name} </td><td class=\"label-list\"><a class=\"ui primary label ${run.exclude|isExcluded:item.id}\" click.delegate=\"exclude(run, item.id)\" repeat.for=\"item of row.linked_inventory|excludeType:run.tasks_list[run.current_task].valid_product_input_types\"><i class=\"hide icon\" if.bind=\"run.exclude|isExcluded:item.id\"></i> ${item.name} <span class=\"detail\">${item.item_type}</span></a><div class=\"ui active mini warning icon message\" if.bind=\"row.linked_inventory|excludeType:run.tasks_list[run.current_task].valid_product_input_types|isLength:'0' && run.tasks_list[run.current_task].product_input_not_required\"><i class=\"warning icon\"></i><div class=\"content\"><div class=\"header\">No valid inputs available</div></div></div><div class=\"ui active mini info icon message\" if.bind=\"run.tasks_list[run.current_task].product_input_not_required\"><i class=\"info icon\"></i><div class=\"content\"><div class=\"header\">No inputs required for task</div></div></div></td></tr></tbody></table></ui-table-wrapper></div><div class=\"ui bottom attached menu\"><a class=\"item\" if.bind=\"!run.task_in_progress && run.products.length\" route-href=\"route: startTask; params.bind: {id: run.id}\"><i class=\"play icon\"></i> Start task </a><a class=\"highlighted blue item\" if.bind=\"run.task_in_progress\" route-href=\"route: performTask; params.bind: {id: run.id}\"><i class=\"puzzle icon\"></i> Perform task</a><ui-dropdown-menu class=\"item\" text=\"Options\" icon=\"caret down\"><ui-dropdown-menu-item click.delegate=\"workflowFromRun(run)\"><i class=\"fork icon\"></i> Create workflow from run</ui-dropdown-menu-item><ui-dropdown-menu-item click.delegate=\"addProducts(run)\"><i class=\"add icon\"></i> Add products</ui-dropdown-menu-item><ui-dropdown-menu-item class.bind=\"run.selected.length == 0 ? 'disabled' : ''\" click.delegate=\"removeProducts(run)\"><i class=\"minus icon\"></i> Remove products</ui-dropdown-menu-item><div class=\"ui divider\"></div><ui-dropdown-menu-item click.delegate=\"editRun(run)\"><i class=\"edit icon\"></i> Edit run</ui-dropdown-menu-item></ui-dropdown-menu><div class=\"right menu\"><a class=\"item\" if.bind=\"!run.task_in_progress\" click.delegate=\"stopRun(run.id)\"><i class=\"stop icon\"></i> Stop run</a></div></div></div></div></template>"; });
define('text!components/semantic-ui/ui-autocomplete.html', ['module'], function(module) { module.exports = "<template><div class=\"ui fluid ${multiple ? 'multiple' : ''} search selection dropdown\"><input value.bind=\"value\"> <i class=\"dropdown icon\"></i><div class=\"default text\">${placeholder}</div><div class=\"menu\"></div></div></template>"; });
define('text!components/semantic-ui/ui-boolean.html', ['module'], function(module) { module.exports = "<template><i class=\"icon check circle ${size}\" if.bind=\"source\"></i> <i class=\"icon remove circle ${size}\" if.bind=\"!source\"></i></template>"; });
define('text!components/semantic-ui/ui-checkbox.html', ['module'], function(module) { module.exports = "<template class=\"ui checkbox\"><input type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\"> <label>${label}</label></template>"; });
define('text!components/semantic-ui/ui-datetime.html', ['module'], function(module) { module.exports = "<template><div class=\"ui datetime\"><div class=\"ui fluid input left icon\"><i class=\"calendar icon\"></i> <input type=\"text\" placeholder=\"Date/Time\"></div></div></template>"; });
define('text!components/semantic-ui/ui-disappearing-message.html', ['module'], function(module) { module.exports = "<template><div class=\"ui ${colour} ${visible ? 'visible' : 'hidden'} message\"><i class=\"close icon\" click.delegate=\"visible = false\"></i><div class=\"header\">${title}</div><p>${text}</p></div></template>"; });
define('text!components/semantic-ui/ui-dropdown-menu-item.html', ['module'], function(module) { module.exports = "<template class=\"item\"><i if.bind=\"icon && !toggle\" class=\"${icon} icon\"></i> <i if.bind=\"isToggled && toggle\" class=\"toggle on icon\"></i> <i if.bind=\"!isToggled && toggle\" class=\"toggle off icon\"></i><slot></slot></template>"; });
define('text!components/semantic-ui/ui-dropdown-menu.html', ['module'], function(module) { module.exports = "<template class=\"ui dropdown\"><i class=\"${icon} icon\"></i> ${text} <div class=\"menu\"><slot></slot></div></template>"; });
define('text!components/semantic-ui/ui-dropdown.html', ['module'], function(module) { module.exports = "<template><div class=\"ui fluid ${searchable ? 'search' : ''} selection dropdown\"><input type=\"hidden\" value.two-way=\"value\" required.bind=\"required\"> <i class=\"dropdown icon\"></i><div class=\"default text\">${placeholder}</div><div class=\"menu\"><slot></slot></div></div></template>"; });
define('text!components/semantic-ui/ui-error-message.html', ['module'], function(module) { module.exports = "<template><div class=\"ui visible icon error message\" if.bind=\"error\"><i class=\"warning circle icon\"></i><div class=\"content\"><p if.bind=\"error.message\">${error.message}</p><p if.bind=\"!error.message\">${error.statusText}</p></div><div class=\"ui top right attached tiny basic red label\">Error ${error.status}</div></div></template>"; });
define('text!components/semantic-ui/ui-field.html', ['module'], function(module) { module.exports = "<template class=\"field ${required ? 'required' : ''}\"><label if.bind=\"label\">${label}</label><slot></slot></template>"; });
define('text!components/semantic-ui/ui-item.html', ['module'], function(module) { module.exports = "<template class=\"item\"><slot></slot></template>"; });
define('text!components/semantic-ui/ui-picker-dialog.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><div class=\"header\">${config.title}</div><ux-dialog-body><div class=\"content\"><ui-picker selected.bind=\"selected\" config.bind=\"config\"></ui-picker></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui red cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui green ok button\" click.trigger=\"dialog.ok(selected)\">Ok</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!components/semantic-ui/ui-picker.html', ['module'], function(module) { module.exports = "<template><div class=\"ui two column wide stackable grid\"><div class=\"column\"><div class=\"ui left icon fluid input\"><i class=\"search icon\"></i> <input type=\"search\" value.bind=\"searchTerm & debounce\" placeholder=\"Filter...\"></div><div class=\"ui relaxed middle aligned list\"><div class=\"item\" repeat.for=\"item of searchResults.results\"><ui-checkbox class=\"left floated\" model.bind=\"item\" matcher.bind=\"matcherA\" checked.bind=\"selected\"></ui-checkbox><div class=\"header\">${item[config.displayName]}</div><div class=\"description\"><span repeat.for=\"value of config.displayOther\"> ${item[value]} &nbsp;</span></div></div></div></div><div class=\"column\"><div class=\"ui top attached header\">Selected</div><div class=\"ui bottom attached segment\"><div repeat.for=\"item of selected\" class=\"ui relaxed list\"><ui-checkbox class=\"left floated\" model.bind=\"item\" matcher.bind=\"matcherB\" checked.bind=\"selected\"></ui-checkbox> ${config.selectedSingular ? item : item[config.displayName]} </div><div if.bind=\"selected.length == 0\">Nothing selected</div></div></div></div></template>"; });
define('text!components/semantic-ui/ui-prompt.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui basic modal active\"><ux-dialog-body class=\"ui icon header\"><i class=\"icon warning circle\"></i> ${message} </ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui red cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui green ok button\" click.trigger=\"dialog.ok(message)\">Ok</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!components/semantic-ui/ui-search.html', ['module'], function(module) { module.exports = "<template><div class=\"ui search\"><input class=\"prompt\"><div class=\"results\"></div></div></template>"; });
define('text!components/semantic-ui/ui-table-header.html', ['module'], function(module) { module.exports = "<template class=\"ui top attached form segment custom\"><div class=\"ui secondary stackable menu\"><div class=\"item\"><div class=\"ui ${searchOptions.useAdvanced ? 'right action' : ''} left icon input\"><input type=\"search\" placeholder=\"Search...\" value.bind=\"search & updateTrigger:'blur':'change':'input' & debounce\" disabled.bind=\"showAdvanced\"> <i class=\"search icon\"></i> <button click.delegate=\"toggleAdvanced()\" class=\"ui icon basic toggle button ${ showAdvanced ? 'active' : '' }\" if.bind=\"searchOptions.useAdvanced\"><i class=\"find icon\"></i></button></div></div><div class=\"right large menu\"><slot></slot></div></div><div if.bind=\"showAdvanced\"><div class=\"ui four column wide stackable grid\"><div class=\"row\" repeat.for=\"term of searchTerms\"><div class=\"column\"><ui-dropdown value.bind=\"term.field & validate\" name=\"field_${$index}\" placeholder=\"Field\" change.delegate=\"setFields($event, term)\"><ui-item repeat.for=\"field of searchOptions.fields\" value.bind=\"field.name\"> ${field.display} </ui-item></ui-dropdown></div><div class=\"column\"><ui-dropdown value.bind=\"term.action & validate\" placeholder=\"Operator\" name=\"operator_${$index}\"><ui-item repeat.for=\"[operator, display] of term.operators\" value.bind=\"operator\"> ${display} </ui-item></ui-dropdown></div><div class=\"six wide column\"><input class=\"ui flexible input\" placeholder=\"Value\" value.bind=\"term.value & validate\" name=\"value_${$index}\"></div><div class=\"two wide right aligned column\"><button click.delegate=\"removeTerm($index)\" class=\"ui basic circular icon button\" if.bind=\"$index !== 0\"><i class=\"remove icon\"></i></button></div></div></div><div class=\"ui secondary menu\"><div class=\"item\"><button class=\"ui basic button\" click.delegate=\"addTerm()\"><i class=\"add icon\"></i> Add term</button></div><div class=\"right floated item\"><button class=\"ui primary button\" click.delegate=\"doSearch()\">Search</button></div></div></div></template>"; });
define('text!components/semantic-ui/ui-table-pagination.html', ['module'], function(module) { module.exports = "<template class=\"ui bottom attached segment custom\"><div class=\"ui middle aligned two column stackable grid\"><div class=\"column\"><div class=\"ui menu pagination\"><a class=\"item\" click.delegate=\"navigateFirst()\"><i class=\"icon angle double left\"></i> </a><a class=\"item\" click.delegate=\"navigatePrevious()\" show.bind=\"showPrevious\"><i class=\"icon angle left\"></i> </a><select class=\"ui inline dropdown pagination item\" value.bind=\"page\" change.delegate=\"gotoPage()\"><option model.bind=\"i\" repeat.for=\"i of pages\">${i}</option></select> <a class=\"item\" click.delegate=\"navigateNext()\" show.bind=\"showNext\"><i class=\"icon angle right\"></i> </a><a class=\"item\" click.delegate=\"navigateLast()\"><i class=\"icon angle double right\"></i></a></div></div><div class=\"right aligned column\">Page ${page} of ${pageCount} &nbsp;<i>(${total} items)</i></div></div></template>"; });
define('text!components/semantic-ui/ui-table-select.html', ['module'], function(module) { module.exports = "<template class=\"collapsing table-select\"><input class=\"ui tabular checkbox\" type=\"checkbox\" model.bind=\"selectAs\" matcher.bind=\"selectMatcher\" checked.two-way=\"selectTo\"></template>"; });
define('text!components/semantic-ui/ui-table-sort.html', ['module'], function(module) { module.exports = "<template><slot></slot></template>"; });
define('text!components/semantic-ui/ui-table-wrapper.html', ['module'], function(module) { module.exports = "<template class=\"ui attached segment table-wrapper\"><slot></slot></template>"; });
define('text!components/semantic-ui/ui-tabs.html', ['module'], function(module) { module.exports = "<template class=\"ui pointing menu\"><slot></slot></template>"; });
define('text!components/semantic-ui/ui-tags.html', ['module'], function(module) { module.exports = "<template><div class=\"ui labels\"><div class=\"ui label\" repeat.for=\"tag of source\"> ${tag} <i class=\"delete icon\" click.delegate=\"remove($index)\"></i></div></div></template>"; });
define('text!components/semantic-ui/ui-toggle.html', ['module'], function(module) { module.exports = "<template class=\"ui toggle checkbox\"><input type=\"checkbox\" checked.bind=\"checked\" value.bind=\"value\"> <label>${label}</label></template>"; });
define('text!components/shared/calendar.html', ['module'], function(module) { module.exports = "<template><require from=\"fullcalendar/fullcalendar.css\"></require></template>"; });
define('text!components/shared/chart.html', ['module'], function(module) { module.exports = "<template class=\"chart-container chart\"><canvas></canvas></template>"; });
define('text!components/shared/ll-permissions.html', ['module'], function(module) { module.exports = "<template><ui-error-message error-source.bind=\"error\"></ui-error-message><div class=\"ui list permissions\"><div class=\"item\" repeat.for=\"group of groups.results\"><div class=\"right floated content\"><ui-dropdown value.bind=\"perms[group.name]\" change.delegate=\"setPerm(group.name, $event.target.value)\" if.bind=\"perms[group.name]\"><div class=\"item\" data-value=\"r\">Read</div><div class=\"item\" data-value=\"rw\">Read and write</div></ui-dropdown></div><div class=\"middle aligned content\"><ui-toggle checked.bind=\"selected\" change.delegate=\"toggled(group.name)\" value.bind=\"group.name\" label.bind=\"group.name\"></ui-toggle></div></div></div></template>"; });
define('text!components/shared/ll-template-hook.html', ['module'], function(module) { module.exports = "<template><compose repeat.for=\"plugin of plugins\" view-model.bind=\"plugin\" model.two-way=\"source\"></compose></template>"; });
define('text!settings/alerts/create-alert.html', ['module'], function(module) { module.exports = "<template><div class=\"ui two column wide stackable grid\"><ui-field label=\"Name\" required class=\"sixteen wide column\"><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Severity\" class=\"column\" required><ui-dropdown value.bind=\"item.severity & validate\"><ui-item value=\"L\">Low</ui-item><ui-item value=\"M\">Medium</ui-item><ui-item value=\"H\">High</ui-item></ui-dropdown></ui-field><ui-field label=\"Model\" class=\"column\" required><ui-dropdown value.bind=\"item.model & validate\" change.delegate=\"setAvailableFields($event)\"><ui-item value.bind=\"m.model\" repeat.for=\"m of models\">${m.model}</ui-item></ui-dropdown></ui-field></div><div class=\"ui two column wide stackable grid\" if.bind=\"hasLinkedUser\"><ui-field label=\"Alert linked user?\" class=\"column\"><ui-checkbox checked.bind=\"item.alert_linked_user & validate\"></ui-checkbox></ui-field><ui-field label=\"Get user from\" required.bind=\"item.alert_linked_user\" class=\"column\"><ui-dropdown value.bind=\"item.alert_user_field & validate\"><ui-item repeat.for=\"field of linkedUserFields\" value.bind=\"field.path\">${field.name}</ui-item></ui-dropdown></ui-field></div><h4>Email formatting</h4><ui-field label=\"Email title\"><input value.bind=\"item.email_title & validate\"></ui-field><ui-field label=\"Email template\"><textarea value.bind=\"item.email_template & validate\"></textarea></ui-field><h4>Triggers</h4><div repeat.for=\"t of item.triggers\" class=\"ui four column stackable grid\"><div class=\"fifteen wide column\"><ui-field label=\"Trigger when object created\"><ui-checkbox checked.bind=\"t.fire_on_create & validate\"></ui-checkbox></ui-field></div><ui-field label=\"Field\" required class=\"five wide column\" if.bind=\"!t.fire_on_create\"><ui-dropdown value.bind=\"t.field & validate\"><ui-item value.bind=\"name\" repeat.for=\"[name, fieldData] of fields\"> ${fieldData.label} </ui-item></ui-dropdown></ui-field><ui-field label=\"Operator\" class=\"five wide column\" required if.bind=\"!t.fire_on_create\"><ui-dropdown value.bind=\"t.operator & validate\"><ui-item value.bind=\"op.value\" repeat.for=\"op of operators\"> ${op.name} </ui-item></ui-dropdown></ui-field><ui-field label=\"Value\" class=\"five wide column\" required if.bind=\"!t.fire_on_create\"><input value.bind=\"t.value & validate\"></ui-field><div class=\"one wide middle aligned column\"><button class=\"ui circular icon button\" click.delegate=\"removeTrigger($index, t)\"><i class=\"delete icon\"></i></button></div></div><button class=\"ui basic button\" click.delegate=\"addTrigger()\" if.bind=\"item.model\">Add trigger</button><h4>Subscriptions</h4><div repeat.for=\"s of item.subscriptions\" class=\"ui three column stackable grid\"><ui-field label=\"User\" required class=\"eight wide column\"><ui-autocomplete value.bind=\"s.user & validate\" from=\"users\" store-value=\"username\" display-value=\"username\" default-text.bind=\"s.user\" placeholder=\"User to alert\"></ui-autocomplete></ui-field><ui-field label=\"Send email?\" class=\"seven wide column\"><ui-checkbox checked.bind=\"s.email\"></ui-checkbox></ui-field><div class=\"one wide middle aligned column\"><button class=\"ui circular icon button\" click.delegate=\"removeSubscription($index, s)\"><i class=\"delete icon\"></i></button></div></div><button class=\"ui basic button\" click.delegate=\"addSubscription()\" if.bind=\"item.model\">Add subscription</button></template>"; });
define('text!settings/equipment/create-equipment.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Location\" required><ui-autocomplete from=\"locations\" store-value=\"code\" display-value=\"display_name\" value.bind=\"item.location & validate\" default-text.bind=\"item.location\" placeholder=\"Lookup location\"></ui-autocomplete></ui-field><ui-field label=\"Allow reservations?\"><ui-checkbox checked.bind=\"item.can_reserve\"></ui-checkbox></ui-field></template>"; });
define('text!settings/equipment/create-files.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Enabled?\"><ui-checkbox checked.bind=\"item.is_enabled\"></ui-checkbox></ui-field><ui-field label=\"Equipment\" required><ui-autocomplete from=\"equipment\" store-value=\"name\" display-value=\"name\" value.bind=\"item.equipment & validate\" default-text.bind=\"item.equipment\" placeholder=\"Lookup equipment\"></ui-autocomplete></ui-field><ui-field label=\"From prefix\"><input value.bind=\"item.copy_from_prefix & validate\"></ui-field><ui-field label=\"To prefix\"><input value.bind=\"item.copy_to_prefix & validate\"></ui-field><h3>Locations</h3><div class=\"ui segments\"><div class=\"ui segment\" repeat.for=\"location of item.locations\"><button class=\"ui right floated circular icon button\" click.delegate=\"removeLocation($index)\"><i class=\"delete icon\"></i></button><div class=\"ui two column wide stackable grid\"><ui-field label=\"Copy from\" class=\"column\" required><input value.bind=\"location.copy_from & validate\"></ui-field><ui-field label=\"Copy to\" class=\"column\" required><input value.bind=\"location.copy_to & validate\"></ui-field></div></div></div><button class=\"ui basic button\" click.delegate=\"addLocation()\">Add location</button></template>"; });
define('text!settings/general/create-filetemplate.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Template purpose\" required><ui-dropdown value.bind=\"item.file_for & validate\"><ui-item value=\"input\">Input</ui-item><ui-item value=\"output\">Output</ui-item><ui-item value=\"equipment\">Equipment</ui-item></ui-dropdown></ui-field><div class=\"ui horizontal divider\">Fields</div><ui-table-wrapper><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th>Name</th><th>Map to</th><th>Required?</th><th>Use as an identifier</th><th>Use as a property</th><th></th></tr></thead><tbody><tr repeat.for=\"row of item.fields\"><td><ui-field required><input value.bind=\"row.name & validate\"></ui-field></td><td><ui-field required><input value.bind=\"row.map_to & validate\"></ui-field></td><td><ui-checkbox checked.bind=\"row.required\"></ui-checkbox></td><td><ui-checkbox checked.bind=\"row.is_identifier\"></ui-checkbox></td><td><ui-checkbox checked.bind=\"row.is_property\"></ui-checkbox></td><td class=\"right aligned\"><div class=\"ui icon buttons\"><button class=\"ui red basic button\" click.delegate=\"removeField($index)\"><i class=\"delete icon\"></i></button></div></td></tr></tbody></table></ui-table-wrapper><button class=\"ui basic button\" click.delegate=\"addField()\">Add Field</button></template>"; });
define('text!settings/general/create-itemtype.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Parent\"><ui-autocomplete from=\"itemtypes\" display-value=\"display_name\" store-value=\"name\" default-text=\"${item.parent}\" value.bind=\"item.parent & validate\"></ui-autocomplete></ui-field></template>"; });
define('text!settings/general/create-location.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Code\" required><input value.bind=\"item.code & validate\"></ui-field><ui-field label=\"Parent\"><ui-autocomplete from=\"locations\" display-value=\"display_name\" store-value=\"code\" bind-value=\"parent\" default-text.bind=\"item.parent_name\" value.bind=\"item.parent & validate\"></ui-autocomplete></ui-field></template>"; });
define('text!settings/general/create-measure.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Symbol\" required><input value.bind=\"item.symbol & validate\"></ui-field><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field></template>"; });
define('text!settings/general/create-organism.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Common name\"><input value.bind=\"item.common_name & validate\"></ui-field></template>"; });
define('text!settings/general/create-productstatus.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Description\"><textarea value.bind=\"item.description & validate\" rows=\"3\"></textarea></ui-field></template>"; });
define('text!settings/general/create-projectstatus.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><ui-field label=\"Description\"><textarea value.bind=\"item.description & validate\" rows=\"3\"></textarea></ui-field></template>"; });
define('text!settings/general/filetemplate-wizard.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><div class=\"header\"><i class=\"ui wizard icon\"></i> File template wizard</div><ux-dialog-body><div class=\"ui form content\"><ui-field label=\"Name\" required><input value.bind=\"item.name\"></ui-field><div class=\"ui segment\"><ui-field label=\"Template purpose\" required><ui-dropdown value.bind=\"item.file_for\"><ui-item value=\"input\">Input</ui-item><ui-item value=\"output\">Output</ui-item><ui-item value=\"equipment\">Equipment</ui-item></ui-dropdown></ui-field><ui-field label=\"Template to be used in\" required if.bind=\"item.file_for\"><ui-dropdown value.bind=\"used_for\"><ui-item value=\"task\">Task</ui-item><ui-item value=\"inventory\">Inventory</ui-item></ui-dropdown></ui-field><ui-field label=\"Available tasks\" required if.bind=\"used_for == 'task'\"><ui-autocomplete value.bind=\"task\" from=\"tasks\" store-value=\"id\"></ui-autocomplete></ui-field></div><div class=\"ui horizontal divider\">Fields</div><ui-table-wrapper><table ui-table><thead><tr as-element=\"ui-table-sort\" query.bind=\"query\"><th class=\"five wide\">Name</th><th class=\"five wide\">Map to</th><th>Required?</th><th>Use as an identifier</th><th>Use as a property</th><th></th></tr></thead><tbody><tr repeat.for=\"row of item.fields\"><td><ui-field required><input value.bind=\"row.name\"></ui-field></td><td><ui-field required><ui-dropdown value.bind=\"row.map_to\"><ui-item repeat.for=\"f of mapFields\" value.bind=\"f\">${ f }</ui-item></ui-dropdown></ui-field></td><td><ui-checkbox checked.bind=\"row.required\"></ui-checkbox></td><td><ui-checkbox checked.bind=\"row.is_identifier\"></ui-checkbox></td><td><ui-checkbox checked.bind=\"row.is_property\"></ui-checkbox></td><td class=\"right aligned\"><div class=\"ui icon buttons\"><button class=\"ui red basic button\" click.delegate=\"removeField($index)\"><i class=\"delete icon\"></i></button></div></td></tr></tbody></table></ui-table-wrapper><button class=\"ui basic button\" click.delegate=\"addField()\">Add Field</button></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui basic cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui primary ok button\" click.trigger=\"dialog.ok(selected)\">Save</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!settings/general/general.html', ['module'], function(module) { module.exports = "<template>General Settings</template>"; });
define('text!settings/general/index.html', ['module'], function(module) { module.exports = "<template> ${section} <router-view swap-order=\"with\"></router-view></template>"; });
define('text!settings/general/itemtypes.html', ['module'], function(module) { module.exports = "<template>Item types</template>"; });
define('text!settings/users/change-password.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><ux-dialog-body class=\"ui form\"><h3>Change password for <b>${user.username}</b></h3><ui-field label=\"New password\" required><input type=\"password\" value.bind=\"p.newPassword & validate\"></ui-field><ui-field label=\"Repeat new password\" required><input type=\"password\" value.bind=\"p.repeatNewPassword & validate\"></ui-field></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui primary ok button\" click.trigger=\"change()\">Change</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!settings/users/create-group.html', ['module'], function(module) { module.exports = "<template><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field><h4>Permissions (${item.permissions.length || 0})</h4><div class=\"ui fluid action input\"><ui-autocomplete value.bind=\"permission\" from=\"permissions\" store-value=\"name\" placeholder=\"Choose permissions\"></ui-autocomplete><button class=\"ui button\" click.delegate=\"addPermission()\">Add</button></div><div class=\"ui scrollable list\"><div class=\"item\" repeat.for=\"p of item.permissions\"> ${p} <button class=\"ui right floated circular icon button\" click.delegate=\"removePermission($index)\"><i class=\"delete icon\"></i></button></div></div></template>"; });
define('text!settings/users/create-user.html', ['module'], function(module) { module.exports = "<template><div class=\"ui two column wide stackable grid\"><div class=\"row\"><ui-field label=\"Username\" required class=\"column\"><input value.bind=\"item.username & validate\"></ui-field><ui-field label=\"Email\" required class=\"column\"><input value.bind=\"item.email & validate\"></ui-field></div><ui-field label=\"Password\" required class=\"sixteen wide column\"><input value.bind=\"item.password & validate\" type=\"password\"></ui-field><div class=\"row\"><ui-field label=\"First name\" class=\"column\"><input value.bind=\"item.first_name & validate\"></ui-field><ui-field label=\"Last name\" class=\"column\"><input value.bind=\"item.last_name & validate\"></ui-field></div></div><h4>Groups</h4><div class=\"ui fluid action input\"><ui-autocomplete value.bind=\"group\" from=\"groups\" store-value=\"name\" placeholder=\"Choose group\"></ui-autocomplete><button class=\"ui button\" click.delegate=\"addGroup()\">Add</button></div><div class=\"ui scrollable list\"><div class=\"item\" repeat.for=\"p of item.groups\"> ${p} <button class=\"ui right floated circular icon button\" click.delegate=\"removeGroup($index)\"><i class=\"delete icon\"></i></button></div></div><div if.bind=\"item.id\"><h4>CRM</h4><div if.bind=\"item.crmaccount\"> ${item.crmaccount.account_details} </div><button class=\"ui basic button\" if.bind=\"!item.crmaccount && item.id\" click.delegate=\"linkAccount()\">Link account</button> <button class=\"ui basic button\" if.bind=\"item.crmaccount\" click.delegate=\"unlinkAccount()\">Remove account</button></div></template>"; });
define('text!settings/workflows/create-task.html', ['module'], function(module) { module.exports = "<template><require from=\"./ll-input-field\"></require><require from=\"./ll-variable-field\"></require><require from=\"./ll-calculation-field\"></require><require from=\"./ll-step-field\"></require><require from=\"./ll-output-field\"></require><h4 class=\"ui dividing header\">General</h4><div class=\"ui two column wide stackable grid\"><div class=\"column\"><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Description\"><textarea rows=\"3\" value.bind=\"item.description & validate\"></textarea></ui-field></div></div><ll-permissions object=\"tasks\" object-for.bind=\"item\" reset.bind=\"toggle\"></ll-permissions><h4 class=\"ui dividing header\">Equipment and labware</h4><div class=\"ui teal segment\"><div class=\"ui two column wide stackable grid\"><div class=\"column\"><ui-field label=\"Capable equipment\"><ui-autocomplete value.bind=\"item.capable_equipment_source & validate\" from=\"equipment\" store-value=\"name\" placeholder=\"Capable equipment\"></ui-autocomplete></ui-field><div class=\"ui segment\" if.bind=\"item.capable_equipment.length\"><ui-tags source.bind=\"item.capable_equipment\"></ui-tags></div><p class=\"help text\">Pick the piece(s) of equipment that this task can run on.</p></div><div class=\"column\"><ui-field label=\"Equipment files\"><ui-autocomplete value.bind=\"item.equipment_files_source & validate\" from=\"filetemplates\" search-params.bind=\"{file_for: 'equipment'}\" store-value=\"name\" placeholder=\"Equipment files\"></ui-autocomplete></ui-field><div class=\"ui segment\" if.bind=\"item.equipment_files.length\"><ui-tags source.bind=\"item.equipment_files\"></ui-tags></div><p class=\"help text\">Choose which (if any) files can be generated for use in the above equipment. These files are defined in the file templates section of these settings.</p></div></div></div><div class=\"ui teal segment\"><div class=\"ui three column wide stackable grid\"><div class=\"four wide column\"><ui-field label=\"Labware not required\"><ui-checkbox checked.bind=\"item.labware_not_required\"></ui-checkbox></ui-field></div><div class=\"six wide column\"><ui-field label=\"Labware amount\" required.bind=\"!item.labware_not_required\"><input value.bind=\"item.labware_amount & validate\" class=\"${item.labware_not_required ? 'disabled' : ''}\"></ui-field></div><div class=\"six wide column\"><ui-field label=\"Labware type to use\" required.bind=\"!item.labware_not_required\"><ui-autocomplete from=\"itemtypes\" store-value=\"name\" display-value=\"display_name\" value.bind=\"item.labware & validate\" default-text.bind=\"item.labware\" placeholder=\"Lookup labware type\"></ui-autocomplete></ui-field></div></div><p class=\"help text\">Choose the amount and type of labware that will be required for the outputs of this task. Set to \"Labware not required\" if the task does not output a physical item.</p></div><h4 class=\"ui dividing header\">Inputs</h4><div class=\"ui blue segment\"><div class=\"ui four column wide stackable grid\"><div class=\"column\"><ui-field label=\"Input from product not required\"><ui-checkbox checked.bind=\"item.product_input_not_required\"></ui-checkbox></ui-field></div><div class=\"column\"><ui-field label=\"Amount of input from product\" required.bind=\"!item.product_input_not_required\"><input value.bind=\"item.product_input_amount & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Input measure\" required.bind=\"!item.product_input_not_required\"><ui-autocomplete from=\"measures\" value.bind=\"item.product_input_measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"item.product_input_measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div><div class=\"column\"><ui-field label=\"Input type\" required.bind=\"!item.product_input_not_required\"><ui-autocomplete from=\"itemtypes\" value.bind=\"item.product_input & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"item.product_input\" placeholder=\"Select input type\"></ui-autocomplete></ui-field></div></div><p class=\"help text\">Set the default (if no input files are supplied) amount that is taken from items in the product. All items that are child types of the input type will be used.</p></div><div class=\"ui blue segment\"><ui-field label=\"Input files\"><ui-autocomplete value.bind=\"item.input_files_source & validate\" from=\"filetemplates\" search-params.bind=\"{file_for: 'input'}\" store-value=\"name\" placeholder=\"Input files\"></ui-autocomplete></ui-field><div class=\"ui segment\" if.bind=\"item.input_files.length\"><ui-tags source.bind=\"item.input_files\"></ui-tags></div><p class=\"help text\">Choose which (if any) files can be supplied for use in the setting values in a task. These files are defined in the file templates section of these settings with the values overriding any defaults set when configuring.</p></div><div class=\"ui two column wide stackable vertically padded grid\"><div class=\"column\" repeat.for=\"field of item.input_fields\"><ll-input-field field.bind=\"field\" calculations.bind=\"calculations\" output-to.bind=\"item.input_fields[$index] & validate\"></ll-input-field><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeField($index, 'input', field)\"><i class=\"remove icon\"></i></div></div></div><button class=\"ui basic button\" click.delegate=\"addField('input')\"><i class=\"add icon\"></i> Add input field</button><p class=\"help text\">Input fields allow the use amounts of items from the inventory in the task. The amount can also come from a calculation field.</p><h4 class=\"ui dividing header\">Steps</h4><div class=\"ui one column wide stackable vertically padded grid\"><div repeat.for=\"field of item.step_fields\" class=\"column\"><ll-step-field field.bind=\"field\" calculations.bind=\"calculations\" output-to.bind=\"item.step_fields[$index]\"></ll-step-field><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeField($index, 'step', field)\"><i class=\"remove icon\"></i></div></div></div><button class=\"ui basic button\" click.delegate=\"addField('step')\"><i class=\"add icon\"></i> Add step field</button><p class=\"help text\">Step fields allow for the display of text and parameters (up to four) that are required for a task. Each field is a seperate step and can allow for the creation of entire parts of a protocol in a task. Each of the properties can be given an amount and an optional measure and can be derived from a calculation field.</p><h4 class=\"ui dividing header\">Outputs</h4><div class=\"ui orange segment\"><ui-field label=\"Output files\"><ui-autocomplete value.bind=\"item.output_files_source & validate\" from=\"filetemplates\" search-params.bind=\"{file_for: 'output'}\" store-value=\"name\" placeholder=\"Output files\"></ui-autocomplete></ui-field><div class=\"ui segment\" if.bind=\"item.output_files.length\"><ui-tags source.bind=\"item.output_files\"></ui-tags></div></div><p class=\"help text\">Output files are designed to output information from a task into a format that can be used in another system (e.g. an external inventory system).</p><div class=\"ui two column wide stackable vertically padded grid\"><div class=\"column\" repeat.for=\"field of item.output_fields\"><ll-output-field field.bind=\"field\" output-to.bind=\"item.output_fields[$index]\"></ll-output-field><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeField($index, 'output', field)\"><i class=\"remove icon\"></i></div></div></div><button class=\"ui basic button\" click.delegate=\"addField('output')\"><i class=\"add icon\"></i> Add output field</button><p class=\"help text\">Output fields allow the automatic creation of an inventory item on completion of a task. All information is auto-generated but can be altered later. A calculation field can be used to generate the amount.</p><h4 class=\"ui dividing header\">Variables</h4><div class=\"ui three column wide stackable vertically padded grid\"><div class=\"column\" repeat.for=\"field of item.variable_fields\"><ll-variable-field field.bind=\"field\" output-to.bind=\"item.variable_fields[$index]\"></ll-variable-field><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeField($index, 'variable', field)\"><i class=\"remove icon\"></i></div></div></div><button class=\"ui basic button\" click.delegate=\"addField('variable')\"><i class=\"add icon\"></i> Add variable field</button><p class=\"help text\">Variable fields are used to store key values that may be required in a calculation or that are required for use in output/equipment files.</p><h4 class=\"ui dividing header\">Calculations</h4><div class=\"ui three column wide stackable vertically padded grid\"><div class=\"column\" repeat.for=\"field of item.calculation_fields\"><ll-calculation-field field.bind=\"field\" output-to.bind=\"item.calculation_fields[$index]\"></ll-calculation-field><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeField($index, 'calculation', field)\"><i class=\"remove icon\"></i></div></div></div><button class=\"ui basic button\" click.delegate=\"addField('calculation')\"><i class=\"add icon\"></i> Add calculation field</button><p class=\"help text\">Calculation fields allow for basic calculations to be performed and the values used in different parts of a task. Fields are references by enclosing the label in curly braces ({}) e.g. {Field one}. There are extra fields that can be used to access product input information: <i>{product_input_amount}</i>. The following mathematical operators are supported: (), /, *, +, -, pow()</p></template>"; });
define('text!settings/workflows/create-workflow.html', ['module'], function(module) { module.exports = "<template><div class=\"ui two column wide stackable grid\"><div class=\"sixteen wide column\"><ui-field label=\"Name\" required><input value.bind=\"item.name & validate\"></ui-field></div><div class=\"column\"><div class=\"ui fluid action input\"><ui-autocomplete value.bind=\"taskToAdd\" from=\"tasks\" placeholder=\"Select task to add\"></ui-autocomplete><button class=\"ui primary button\" click.delegate=\"addTask()\">Add</button></div><div class=\"ui segments\" sortable.bind=\"{draggable: '.segment'}\"><div class=\"ui clearing dragable segment\" repeat.for=\"task of taskList\"><div class=\"ui circular label\">${$index + 1}</div> ${task.name} <button class=\"ui right floated circular small icon button\" click.delegate=\"removeTask($index)\"><i class=\"remove icon\"></i></button></div></div></div><div class=\"column\"><ll-permissions object=\"workflows\" object-for.bind=\"item\" reset.bind=\"toggle\"></ll-permissions></div></div></div></template>"; });
define('text!settings/workflows/exportworkflow.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui modal active\"><div class=\"header\"><i class=\"ui upload icon\"></i> Export Workflow</div><ux-dialog-body><div class=\"ui form content\"><ui-field label=\"Workflow to export\" required><ui-autocomplete value.bind=\"workflow\" from=\"workflows\" store-value=\"id\"></ui-autocomplete></ui-field></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui basic cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui primary ok button\" click.trigger=\"dialog.ok(workflow)\">Download</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!settings/workflows/importworkflow.html', ['module'], function(module) { module.exports = "<template><ux-dialog class=\"ui fullscreen modal active\"><div class=\"header\"><i class=\"ui download icon\"></i> Import Workflow</div><ux-dialog-body><div class=\"ui form content\"><ui-field label=\"File to upload\" required><input type=\"file\" files.bind=\"importedFile\" change.delegate=\"fileUploaded($event)\"></ui-field><div class=\"ui visible icon error message\" if.bind=\"fileError\"><i class=\"exclamation triangle icon\"></i><div class=\"content\">The file selected is not a valid Leaf LIMS workflow file!</div></div><div if.bind=\"parsedFile\"><div class=\"ui divider\"></div><h3 class=\"ui top attached header\"><i class=\"warning icon\"></i><div class=\"content\">Import Issues</div></h3><div class=\"ui attached segment\"><h4 class=\"ui header\">Task errors</h4><div class=\"ui middle aligned divided relaxed list\"><div repeat.for=\"issue of importIssues\" class=\"item\"><div class=\"content\"> ${issue.field} in task ${issue.issues.error_in}: <span repeat.for=\"m of issue.issues.error\">${m}</span></div></div></div><div class=\"ui visible icon info message\" if.bind=\"importIssues.length == 0\"><i class=\"check icon\"></i><div class=\"content\">There are no errors in any tasks.</div></div><h4 class=\"ui header\">Required for import</h4><p>The following items are required for the workflow to be imported correctly. If a you would like to substitute for an existing entry in the LIMS you will need change the relevant field on the task.</p><div class=\"ui middle aligned divided list\"><template repeat.for=\"items of requiredItems\"><div repeat.for=\"i of items\" class=\"item\"><div class=\"right floated content\"><div class=\"ui green button\" click.delegate=\"addItem(i)\">Add</div></div><div class=\"content\"> ${i.item_type}: ${i.name} </div></div></template></div><div class=\"ui visible icon info message\" if.bind=\"requiredItems.length == 0\"><i class=\"check icon\"></i><div class=\"content\">All requirements are present.</div></div></div><div class=\"ui bottom attached clearing segment\"><button class=\"ui green right floated button\" if.bind=\"requiredItems.length > 0\" click.delegate=\"addRequirements()\">Auto add all requirements</button> <button class=\"ui primary right floated button\" click.delegate=\"doDataCheck()\">Recheck requirements</button></div><div class=\"ui two column wide stackable grid\"><ui-field label=\"Name\" required class=\"column\"><input value.bind=\"workflowData.name\"></ui-field><ll-permissions object=\"workflows\" object-for.bind=\"workflowData\" reset.bind=\"toggle\" class=\"column\"></ll-permissions></div><div class=\"ui ordered top attached steps\"><a class=\"step ${task.id == item.id ? 'active':''}\" click.delegate=\"setTask($index)\" repeat.for=\"task of workflowData.tasks\"><div class=\"content\"><div class=\"title\">${task.name}</div></div></a></div><div class=\"ui stacked bottom attached tall segment\"><compose view=\"./create-task.html\" if.bind=\"parsedFile\" model.bind=\"item\"></compose></div></div></div></ux-dialog-body><ux-dialog-footer class=\"actions\"><button class=\"ui basic cancel button\" click.trigger=\"dialog.cancel()\">Cancel</button> <button class=\"ui primary ok button\" click.trigger=\"save()\">Save</button></ux-dialog-footer></ux-dialog></template>"; });
define('text!settings/workflows/ll-calculation-field.html', ['module'], function(module) { module.exports = "<template class=\"ui brown top attached segment custom\"><ui-field label=\"Field label\" required><input value.bind=\"field.label & validate\"></ui-field><ui-field label=\"Calculation\" required><textarea value.bind=\"field.calculation & validate\" rows=\"4\" placeholder=\"Calculation\"></textarea></ui-field></template>"; });
define('text!settings/workflows/ll-input-field.html', ['module'], function(module) { module.exports = "<template class=\"ui blue top attached segment custom\"><ui-field label=\"Field label\" required><input value.bind=\"field.label & validate\"></ui-field><div class=\"ui two column wide vertically padded stackable grid\"><ui-field label=\"Use calculation for amount\" class=\"column\"><ui-checkbox checked.bind=\"field.from_calculation\"></ui-checkbox></ui-field><ui-field label=\"Automatically fetch from inventory based on property\" class=\"column\"><ui-checkbox checked.bind=\"field.auto_find_in_inventory\"></ui-checkbox></ui-field></div><ui-field if.bind=\"field.from_calculation\" label=\"Calculation\" required.bind=\"field.from_calculation\"><ui-dropdown value.bind=\"field.calculation_used & validate\"><ui-item repeat.for=\"calc of calculations\" value.bind=\"calc.label\"> ${ calc.label } </ui-item></ui-dropdown></ui-field><div class=\"ui three column wide vertically padded stackable grid\"><div class=\"column\"><ui-field label=\"Amount\" required><input type=\"number\" value.bind=\"field.amount & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Input measure\" required><ui-autocomplete from=\"measures\" value.bind=\"field.measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"field.measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div><div class=\"column\"><ui-field label=\"Input type\" required><ui-autocomplete from=\"itemtypes\" value.bind=\"field.lookup_type & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"field.lookup_type\" placeholder=\"Select input type\"></ui-autocomplete></ui-field></div></div></template>"; });
define('text!settings/workflows/ll-output-field.html', ['module'], function(module) { module.exports = "<template class=\"ui orange top attached segment custom\"><ui-field label=\"Field label\" required><input value.bind=\"field.label & validate\"></ui-field><ui-field label=\"Use calculation for amount\"><ui-checkbox checked.bind=\"field.from_calculation\"></ui-checkbox></ui-field><ui-field if.bind=\"field.from_calculation\" label=\"Calculation\" required.bind=\"field.from_calculation\"><ui-dropdown value.bind=\"field.calculation_used & validate\"><ui-item repeat.for=\"calc of calculations\" value.bind=\"calc.id\"> ${ calc.label } </ui-item></ui-dropdown></ui-field><div class=\"ui three column wide vertically padded stackable grid\"><div class=\"column\"><ui-field label=\"Amount\" required><input type=\"number\" value.bind=\"field.amount & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Output measure\" required><ui-autocomplete from=\"measures\" value.bind=\"field.measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"field.measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div><div class=\"column\"><ui-field label=\"Output type\" required><ui-autocomplete from=\"itemtypes\" value.bind=\"field.lookup_type & validate\" store-value=\"name\" display-value=\"display_name\" default-text.bind=\"field.lookup_type\" placeholder=\"Select input type\"></ui-autocomplete></ui-field></div></div></template>"; });
define('text!settings/workflows/ll-step-field.html', ['module'], function(module) { module.exports = "<template class=\"ui violet top attached segment custom stepfield\"><ui-field label=\"Field label\" required><input value.bind=\"field.label & validate\"></ui-field><ui-field label=\"Description\"><textarea rows=\"3\" value.bind=\"field.description & validate\"></textarea></ui-field><div class=\"ui four column wide vertically padded stackable grid\"><div class=\"column\" repeat.for=\"prop of field.properties\"><div class=\"ui top attached segment\"><ui-field label=\"Property label\" required><input value.bind=\"prop.label & validate\"></ui-field><ui-field label=\"Use calculation for amount\"><ui-checkbox checked.bind=\"prop.from_calculation\"></ui-checkbox></ui-field><ui-field if.bind=\"prop.from_calculation\" label=\"Calculation\" required.bind=\"prop.from_calculation\"><ui-dropdown value.bind=\"prop.calculation_used & validate\"><ui-item repeat.for=\"calc of calculations\" value.bind=\"calc.id\"> ${ calc.label } </ui-item></ui-dropdown></ui-field><ui-field label=\"Measure not required\"><ui-checkbox checked.bind=\"prop.measure_not_required\"></ui-checkbox></ui-field><div class=\"ui two column wide stackable grid\"><div class=\"column\"><ui-field label=\"Property amount\" required.bind=\"!prop.from_calculation\"><input value.bind=\"prop.amount & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Input measure\" required.bind=\"!prop.measure_not_required\"><ui-autocomplete from=\"measures\" value.bind=\"prop.measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"prop.measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div></div></div><div class=\"ui basic bottom attached icon button\" click.delegate=\"removeProperty($index)\"><i class=\"delete icon\"></i></div></div></div><button click.delegate=\"addProperty()\" class=\"ui basic violet button\">Add property</button></template>"; });
define('text!settings/workflows/ll-variable-field.html', ['module'], function(module) { module.exports = "<template class=\"ui yellow top attached segment custom\"><ui-field label=\"Field label\" required><input value.bind=\"field.label & validate\"></ui-field><ui-field label=\"Measure not required\"><ui-checkbox checked.bind=\"field.measure_not_required\"></ui-checkbox></ui-field><div class=\"ui two column wide vertically padded stackable grid\"><div class=\"column\"><ui-field label=\"Amount\" required><input type=\"number\" value.bind=\"field.amount & validate\"></ui-field></div><div class=\"column\"><ui-field label=\"Input measure\" required.bind=\"!field.measure_not_required\"><ui-autocomplete from=\"measures\" value.bind=\"field.measure & validate\" store-value=\"symbol\" display-value=\"symbol\" default-text.bind=\"field.measure\" placeholder=\"Select measure\"></ui-autocomplete></ui-field></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map