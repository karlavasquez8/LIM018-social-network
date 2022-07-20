import login from './login.js';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import register from './register.js';
import home from './home.js';
import loginEmail from './loginEmail.js';

const components = {
  Login: login,
  LoginEmail: loginEmail,
  Register: register,
  Home: home,
};
export { components };
