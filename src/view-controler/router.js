import { components } from '../view/index.js';
import { observer } from '../firebase/auth.js';
// aqui exportaras las funciones que necesites
const container = document.getElementById('container');
const changeView = (route) => {
  container.innerHTML = '';
  switch (route) {
    case '':
      container.appendChild(components.Login.template());
      components.Login.init();
      break;
    case '#/loginEmail':
      container.appendChild(components.LoginEmail.template());
      components.LoginEmail.init();
      break;
    case '#/register':
      container.appendChild(components.Register.template());
      components.Register.init();
      break;
    case '#/home':
    { return container.appendChild(components.Home()); }
    default:
      break;
  }

  function authCallBack(user) {
    if (user.emailVerified) {
      window.location.hash = '#/home';
    }
  }
  observer(authCallBack);
};

export { changeView };
