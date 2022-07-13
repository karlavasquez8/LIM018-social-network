import {components} from '../view/index.js';
// aqui exportaras las funciones que necesites
const container = document.getElementById('container');
const changeView = (route) => {
  container.innerHTML='';
 switch (route) {
  case '' : 
  container.appendChild(components.Login.template());
  break;
  case '#/register': 
  container.appendChild(components.Register.template());
  components.Register.init()
  break;
  case '#/home':
  {return container.appendChild(components.Home());}
  default:
    break;
 };
};

export { changeView }