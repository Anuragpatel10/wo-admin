import { getComponentHtml } from '../backend/utils';
import LoginComponent from './components/login';
const html = async (admin, {
  action,
  errorMessage
}) => getComponentHtml(LoginComponent, {
  action,
  message: errorMessage
}, admin);
export default html;