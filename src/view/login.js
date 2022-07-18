import { loginGoogle } from '../firebase/auth.js';

const login = {
  template: () => {
    const login = `
      <section class="firstView">
          <div class="containerIndex">
            <img src="./img/cubiertos.png" alt="Cubiertos">
            <h1> HELP TASTER </h1>
            <h2> ¿Que deseas probar hoy? </h2>
            <span> Te ayudamos a encontrar los mejores lugares para disfrutar tus comidas!!</span>
            <div class="buttonIndex">
              <a href="#/home" class="button" id="googleLogin">
                <img src="./img/Google.png">
                Inicia con Google</a>
              <a href="#/facebook" class="button">
                <img src="./img/Facebook.png">
                Inicia con Facebook</a>
              <a href="#/loginEmail" class = "button">
                <img src="./img/E-mail.png">
                Inicia con Email</a>
            </div>
            <span>¿No tienes una cuenta ?</span>
            <a href="#/register"> Registrate aqui</a>
          </div>  
      </section>`;

    const divLogin = document.createElement('div');
    divLogin.classList.add('login');
    divLogin.innerHTML = login;
    divLogin.querySelector('#googleLogin').addEventListener('click', loginGoogle);
    return divLogin;
  },

  // init: ()=> {
  // const btnEmail = document.querySelector('#btn-email')
  // btnEmail.addEventListener('click',() => {
  // changeView(window.location.hash);

  // })
  // }

};

export default login;
