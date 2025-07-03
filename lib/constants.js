"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOCS = exports.DEFAULT_PATHS = exports.ADMIN_JS_TMP_DIR = void 0;
/* cspell: disable */
const DOCS = exports.DOCS = 'https://docs.adminjs.co';
const DEFAULT_PATHS = exports.DEFAULT_PATHS = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login'
};
const DEFAULT_TMP_DIR = '.adminjs';
const ADMIN_JS_TMP_DIR = exports.ADMIN_JS_TMP_DIR = typeof process === 'object' ? process.env.ADMIN_JS_TMP_DIR || DEFAULT_TMP_DIR : DEFAULT_TMP_DIR;