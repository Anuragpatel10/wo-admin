"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAdapter = exports.defaultOptions = exports.default = exports.VERSION = void 0;
var _merge = _interopRequireDefault(require("lodash/merge"));
var path = _interopRequireWildcard(require("path"));
var fs = _interopRequireWildcard(require("fs"));
var _i18next = _interopRequireDefault(require("i18next"));
var _configurationError = _interopRequireDefault(require("./backend/utils/errors/configuration-error"));
var _resourcesFactory = _interopRequireDefault(require("./backend/utils/resources-factory/resources-factory"));
var _userComponentsBundler = _interopRequireDefault(require("./backend/bundler/user-components-bundler"));
var _constants = require("./constants");
var _actions = require("./backend/actions");
var _loginTemplate = _interopRequireDefault(require("./frontend/login-template"));
var _config = require("./locale/config");
var _locale = require("./locale");
var _translateFunctions = require("./utils/translate-functions.factory");
var _fileResolver = require("./utils/file-resolver");
var _utils = require("./backend/utils");
var _componentLoader = require("./backend/utils/component-loader");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
const VERSION = exports.VERSION = pkg.version;
const defaultOptions = exports.defaultOptions = {
  rootPath: _constants.DEFAULT_PATHS.rootPath,
  logoutPath: _constants.DEFAULT_PATHS.logoutPath,
  loginPath: _constants.DEFAULT_PATHS.loginPath,
  databases: [],
  resources: [],
  dashboard: {},
  pages: {},
  bundler: {}
};
/**
 * Main class for AdminJS extension. It takes {@link AdminJSOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const AdminJS = require('adminjs')
 * const admin = new AdminJS(AdminJSOptions)
 */
class AdminJS {
  /**
   * List of all default actions. If you want to change the behavior for all actions like:
   * _list_, _edit_, _show_, _delete_ and _bulkDelete_ you can do this here.
   *
   * @example <caption>Modifying accessibility rules for all show actions</caption>
   * const { ACTIONS } = require('adminjs')
   * ACTIONS.show.isAccessible = () => {...}
   */

  /**
   * AdminJS version
   */

  /**
   * Login override
   */

  /**
   * @param   {AdminJSOptions} options      Options passed to AdminJS
   */
  constructor(options = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminJS.
     * They can be fetched with the {@link AdminJS#findResource} method
     */
    this.resources = [];

    /**
     * @type {AdminJSOptions}
     * @description Options given by a user
     */
    this.options = (0, _merge.default)({}, defaultOptions, options);
    this.resolveBabelConfigPath();
    this.initI18n();
    const {
      databases,
      resources
    } = this.options;
    this.componentLoader = options.componentLoader ?? new _componentLoader.ComponentLoader();
    const resourcesFactory = new _resourcesFactory.default(this, global.RegisteredAdapters || []);
    this.resources = resourcesFactory.buildResources({
      databases,
      resources
    });
  }
  initI18n() {
    var _this$options$locale, _locales$language, _this$options$locale2;
    const language = ((_this$options$locale = this.options.locale) === null || _this$options$locale === void 0 ? void 0 : _this$options$locale.language) || _locale.locales.en.language;
    const defaultTranslations = ((_locales$language = _locale.locales[language]) === null || _locales$language === void 0 ? void 0 : _locales$language.translations) || _locale.locales.en.translations;
    this.locale = {
      translations: (0, _config.combineTranslations)(defaultTranslations, (_this$options$locale2 = this.options.locale) === null || _this$options$locale2 === void 0 ? void 0 : _this$options$locale2.translations),
      language
    };
    if (_i18next.default.isInitialized) {
      _i18next.default.addResourceBundle(this.locale.language, 'translation', this.locale.translations);
    } else {
      _i18next.default.init({
        lng: this.locale.language,
        initImmediate: false,
        // loads translations immediately
        resources: {
          [this.locale.language]: {
            translation: this.locale.translations
          }
        }
      });
    }

    // mixin translate functions to AdminJS instance so users will be able to
    // call AdminJS.translateMessage(...)
    this.translateFunctions = (0, _translateFunctions.createFunctions)(_i18next.default);
    Object.getOwnPropertyNames(this.translateFunctions).forEach(translateFunctionName => {
      this[translateFunctionName] = this.translateFunctions[translateFunctionName];
    });
  }

  /**
   * Registers various database adapters written for AdminJS.
   *
   * @example
   * const AdminJS = require('adminjs')
   * const MongooseAdapter = require('adminjs-mongoose')
   * AdminJS.registerAdapter(MongooseAdapter)
   *
   * @param  {Object}       options
   * @param  {typeof BaseDatabase} options.Database subclass of {@link BaseDatabase}
   * @param  {typeof BaseResource} options.Resource subclass of {@link BaseResource}
   */
  static registerAdapter({
    Database,
    Resource
  }) {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource');
    }

    // TODO: check if this is actually valid because "isAdapterFor" is always defined.
    // checking if both Database and Resource have at least isAdapterFor method
    // @ts-ignore
    if (Database.isAdapterFor && Resource.isAdapterFor) {
      global.RegisteredAdapters = global.RegisteredAdapters || [];
      global.RegisteredAdapters.push({
        Database,
        Resource
      });
    } else {
      throw new Error('Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase');
    }
  }

  /**
   * Initializes AdminJS instance in production. This function should be called by
   * all external plugins.
   */
  async initialize() {
    if (process.env.NODE_ENV === 'production' && !(process.env.ADMIN_JS_SKIP_BUNDLE === 'true')) {
      // eslint-disable-next-line no-console
      console.log('AdminJS: bundling user components...');
      await (0, _userComponentsBundler.default)(this, {
        write: true
      });
    }
  }

  /**
   * Watches for local changes in files imported via {@link ComponentLoader}.
   * It doesn't work on production environment.
   *
   * @return  {Promise<never>}
   */
  async watch() {
    if (process.env.NODE_ENV !== 'production') {
      return (0, _userComponentsBundler.default)(this, {
        write: true,
        watch: true
      });
    }
    return undefined;
  }

  /**
   * Allows you to override the default login view by providing your React components
   * and custom props.
   *
   * @param  {Object} options
   * @param  {String} options.component       Custom React component
   * @param  {String} [options.props]         Props to be passed to React component
   * @return {Promise<void>}
   */
  overrideLogin({
    component,
    props
  }) {
    this.loginOverride = {
      component,
      props: props ?? {}
    };
  }

  /**
   * Renders an entire login page with email and password fields
   * using {@link Renderer}.
   *
   * Used by external plugins
   *
   * @param  {Object} options
   * @param  {String} options.action          Login form action url - it could be
   *                                          '/admin/login'
   * @param  {String} [options.errorMessage]  Optional error message. When set,
   *                                          renderer will print this message in
   *                                          the form
   * @return {Promise<string>}                HTML of the rendered page
   */
  async renderLogin({
    action,
    errorMessage
  }) {
    if (this.loginOverride) {
      const {
        component,
        props = {}
      } = this.loginOverride;
      const mergedProps = {
        action,
        message: errorMessage,
        ...props
      };
      return (0, _utils.getComponentHtml)(component, mergedProps, this);
    }
    return (0, _loginTemplate.default)(this, {
      action,
      errorMessage
    });
  }

  /**
   * Returns resource base on its ID
   *
   * @example
   * const User = admin.findResource('users')
   * await User.findOne(userId)
   *
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   * @throws {Error}                When resource with given id cannot be found
   */
  findResource(resourceId) {
    const resource = this.resources.find(m => {
      var _m$_decorated;
      return ((_m$_decorated = m._decorated) === null || _m$_decorated === void 0 ? void 0 : _m$_decorated.id()) === resourceId;
    });
    if (!resource) {
      throw new Error([`There are no resources with given id: "${resourceId}"`, 'This is the list of all registered resources you can use:', this.resources.map(r => {
        var _r$_decorated;
        return ((_r$_decorated = r._decorated) === null || _r$_decorated === void 0 ? void 0 : _r$_decorated.id()) || r.id();
      }).join(', ')].join('\n'));
    }
    return resource;
  }

  /**
   * Resolve babel config file path,
   * and load configuration to this.options.bundler.babelConfig.
   */
  resolveBabelConfigPath() {
    var _this$options, _this$options2;
    if (typeof ((_this$options = this.options) === null || _this$options === void 0 || (_this$options = _this$options.bundler) === null || _this$options === void 0 ? void 0 : _this$options.babelConfig) !== 'string') {
      return;
    }
    let filePath = '';
    let config = (_this$options2 = this.options) === null || _this$options2 === void 0 || (_this$options2 = _this$options2.bundler) === null || _this$options2 === void 0 ? void 0 : _this$options2.babelConfig;
    if (config[0] === '/') {
      filePath = config;
    } else {
      filePath = (0, _fileResolver.relativeFilePathResolver)(config, /new AdminJS/);
    }
    if (!fs.existsSync(filePath)) {
      throw new _configurationError.default(`Given babel config "${filePath}", doesn't exist.`, 'AdminJS.html');
    }
    if (path.extname(filePath) === '.js') {
      // eslint-disable-next-line
      const configModule = require(filePath);
      config = configModule && configModule.__esModule ? configModule.default || undefined : configModule;
      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error(`${filePath}: Configuration should be an exported JavaScript object.`);
      }
    } else {
      try {
        config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        throw new Error(`${filePath}: Error while parsing config - ${err.message}`);
      }
      if (!config) throw new Error(`${filePath}: No config detected`);
      if (typeof config !== 'object') {
        throw new Error(`${filePath}: Config returned typeof ${typeof config}`);
      }
      if (Array.isArray(config)) {
        throw new Error(`${filePath}: Expected config object but found array`);
      }
    }
    this.options.bundler.babelConfig = config;
  }

  /**
   * Requires given `.jsx/.tsx` file, that it can be bundled to the frontend.
   * It will be available under AdminJS.UserComponents[componentId].
   *
   * @param   {String}  src  Path to a file containing react component.
   *
   * @param  {OverridableComponent}  [componentName] - name of the component which you want
   *                                  to override
   * @returns {String}                componentId - uniq id of a component
   *
   * @example <caption>Passing custom components in AdminJS options</caption>
   * const adminJsOptions = {
   *   dashboard: {
   *     component: AdminJS.bundle('./path/to/component'),
   *   }
   * }
   * @example <caption>Overriding AdminJS core components</caption>
   * // somewhere in the code
   * AdminJS.bundle('./path/to/new-sidebar/component', 'SidebarFooter')
   *
   * @deprecated since version 6.5.0, use {@link ComponentLoader} instead
   */
  static bundle(src, componentName) {
    // eslint-disable-next-line no-plusplus
    const name = componentName ?? `Component${this.__unsafe_componentIndex++}`;
    this.__unsafe_staticComponentLoader.__unsafe_addWithoutChecks(name, src, 'bundle');
    return name;
  }
  static __unsafe_componentIndex = 0;
  static __unsafe_staticComponentLoader = new _componentLoader.ComponentLoader();
}
AdminJS.VERSION = VERSION;
AdminJS.ACTIONS = _actions.ACTIONS;

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const {
  registerAdapter
} = AdminJS;
exports.registerAdapter = registerAdapter;
var _default = exports.default = AdminJS;