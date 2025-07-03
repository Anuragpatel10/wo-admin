import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { combineStyles } from '@adminjs/design-system';
import i18n from 'i18next';
import { getAssets, getBranding, getFaviconFromBranding } from '../../../backend/utils/options-parser/options-parser';
import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers';
import { initializeAssets } from '../../../frontend/store/actions/initialize-assets';
import { initializeBranding } from '../../../frontend/store/actions/initialize-branding';
import { initializeLocale } from '../../../frontend/store/actions/initialize-locale';
import createStore from '../../../frontend/store/store';
export async function getComponentHtml(Component, props, admin) {
  const h = new ViewHelpers({
    options: admin.options
  });
  const store = createStore();
  const branding = await getBranding(admin);
  const assets = await getAssets(admin);
  const faviconTag = getFaviconFromBranding(branding);
  const scripts = (assets && assets.scripts || []).map(s => `<script src="${s}"></script>`);
  const styles = (assets && assets.styles || []).map(l => `<link rel="stylesheet" type="text/css" href="${l}">`);
  store.dispatch(initializeBranding(branding));
  store.dispatch(initializeAssets(assets));
  store.dispatch(initializeLocale(admin.locale));
  const theme = combineStyles(branding && branding.theme || {});
  const {
    locale
  } = store.getState();
  i18n.init({
    resources: {
      [locale.language]: {
        translation: locale.translations
      }
    },
    lng: locale.language,
    interpolation: {
      escapeValue: false
    }
  });
  const sheet = new ServerStyleSheet();
  const component = renderToString(/*#__PURE__*/React.createElement(StyleSheetManager, {
    sheet: sheet.instance
  }, /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(I18nextProvider, {
    i18n: i18n
  }, /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Component, props))))));
  sheet.collectStyles(/*#__PURE__*/React.createElement(Component, props));
  const style = sheet.getStyleTags();
  sheet.seal();
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">
      ${styles.join('\n')}

      <script src="${h.assetPath('global.bundle.js', assets)}"></script>
      <script src="${h.assetPath('design-system.bundle.js', assets)}"></script>
    </head>
    <body>
      <div id="app">${component}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `;
}
export default getComponentHtml;