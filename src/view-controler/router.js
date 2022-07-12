import {components} from '../view/index.js';
// aqui exportaras las funciones que necesites
const container = document.getElementById('container');
const changeView = (route) => {
  container.innerHTML='';
 switch (route) {
  case '' : 
  {return components.Login();}
  case '#/register': 
  {return container.appendChild(components.Register());}
  case '#/home':
  {return container.appendChild(components.Home());}
  default:
    break;
 }
  console.log(route);
};

export { changeView }