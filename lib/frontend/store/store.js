/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Note: We are using legacy "createStore"
// because AdminJS will switch to Eventrix from v7 onwards anyway
import { combineReducers, legacy_createStore as createStore } from 'redux';
import { DRAWER_PREROUTE_SET } from './actions/set-drawer-preroute';
import { VERSIONS_INITIALIZE, SESSION_INITIALIZE, DASHBOARD_INITIALIZE, PATHS_INITIALIZE, ASSETS_INITIALIZE, BRANDING_INITIALIZE, LOCALE_INITIALIZE, PAGES_INITIALIZE, RESOURCES_INITIALIZE, SET_NOTICE_PROGRESS, DROP_NOTICE, ADD_NOTICE, ROUTE_CHANGED, INITIAL_ROUTE } from './actions';
import { DEFAULT_PATHS } from '../../constants';
const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case RESOURCES_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const pagesReducer = (state = [], action) => {
  switch (action.type) {
    case PAGES_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const localesReducer = (state = {
  language: 'en',
  translations: {}
}, action) => {
  switch (action.type) {
    case LOCALE_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const brandingReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANDING_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const assetsReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSETS_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const pathsReducer = (state = DEFAULT_PATHS, action) => {
  switch (action.type) {
    case PATHS_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const sessionReducer = (state = null, action) => {
  switch (action.type) {
    case SESSION_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const versionsReducer = (state = {}, action) => {
  switch (action.type) {
    case VERSIONS_INITIALIZE:
      return {
        admin: action.data.admin,
        app: action.data.app
      };
    default:
      return state;
  }
};
const routerReducer = (state = {
  from: {},
  to: {}
}, action) => {
  switch (action.type) {
    case INITIAL_ROUTE:
      return {
        ...state,
        from: {
          ...action.data
        }
      };
    case ROUTE_CHANGED:
      return {
        from: {
          ...state.to
        },
        to: {
          ...action.data
        }
      };
    default:
      return state;
  }
};
const drawerReducer = (state = {
  previousRoute: null
}, action) => {
  switch (action.type) {
    case DRAWER_PREROUTE_SET:
      {
        return {
          ...state,
          ...action.data
        };
      }
    default:
      {
        return state;
      }
  }
};
const noticesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTICE:
      {
        const notices = [action.data];
        return notices;
      }
    case DROP_NOTICE:
      {
        return state.filter(notice => notice.id !== action.data.noticeId);
      }
    case SET_NOTICE_PROGRESS:
      {
        return state.map(notice => ({
          ...notice,
          progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress
        }));
      }
    default:
      return state;
  }
};
const reducer = combineReducers({
  resources: resourcesReducer,
  branding: brandingReducer,
  assets: assetsReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
  pages: pagesReducer,
  locale: localesReducer,
  router: routerReducer,
  drawer: drawerReducer
});
export default (initialState = {}) => createStore(reducer, initialState);