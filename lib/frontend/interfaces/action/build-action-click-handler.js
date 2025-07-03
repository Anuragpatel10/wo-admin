/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */

import { actionHasComponent } from './action-has-component';
import { actionHref } from './action-href';
import { buildActionCallApiTrigger } from './build-action-api-call-trigger';
export const buildActionClickHandler = options => {
  const {
    action,
    params,
    actionResponseHandler,
    navigate
  } = options;
  const handleActionClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const href = actionHref(action, params);
    const callApi = buildActionCallApiTrigger({
      params,
      action,
      actionResponseHandler
    });
    if (action.guard && !confirm(action.guard)) {
      return;
    }
    if (actionHasComponent(action)) {
      // eslint-disable-next-line consistent-return
      return callApi();
    }
    if (href) {
      navigate(href);
    }
  };
  return handleActionClick;
};