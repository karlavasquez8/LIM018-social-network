import {
  loginGoogle,
  logIn,
} from '../firebase/auth.js';

const login = {
  template: () => {
    const loginTemplate = `
      <section class="first-view">
        <div class="container-index">
          <img src="./img/cubiertos.png" alt="Cubiertos">
          <h1> HELP TASTER </h1>
          <h2> ¿Que deseas probar hoy? </h2>
          <span> Te ayudamos a encontrar los mejores lugares para disfrutar tus comidas!!</span>
          <form class="form-email">
            <input name="email" type="email" id="inputEmail" class="input-register" placeholder="E-mail">
            <p class= "condicion loginError" id="error-usuario"></p>
            <input name="password" type="password" id="inputPassword" class ="input-register" placeholder="Contraseña">
            <p class= "condicion loginError" id="error-contraseña"></p>
            <button type="submit" class="btn-log-email"> Iniciar sesión </button>
          </form>
          <span class="message-error">Llena los campos</span>
          <div class="separator"><hr class="hr">O<hr class="hr"></div>
          <div class="button-index">
            <button class="button" id="googleLogin">
              <img src="./img/Google.png">
              Inicia con Google
            </button>
          </div>
          <span>¿No tienes una cuenta ?</span>
          <a href="#/register"> Registrate aqui</a>
        </div>  
        <div class="modal-container">
          <div class="modal no-verified-email">
            <img src="./img/verificacion.webp"></img> 
            <span> No se verifico, revisa su correo</span>
            <button class="btn-modal"> Aceptar </button>
          </div>
        </div>
      </section>`;

    const divLogin = document.createElement('div');
    divLogin.classList.add('login');
    divLogin.innerHTML = loginTemplate;
    return divLogin;
  },
  init: () => {
    document.querySelector('#googleLogin').addEventListener('click', loginGoogle);
    const formEmail = document.querySelector('.form-email');
    const modal = document.querySelector('.modal-container');
    const errorUser = document.querySelector('#error-usuario');
    const errorPassword = document.querySelector('#error-contraseña');

    function closeModal() {
      const btnModal = document.querySelector('.btn-modal');
      btnModal.addEventListener('click', () => {
        modal.classList.remove('show-modal');
      });
    }

    formEmail.addEventListener('submit', (event) => {
      event.preventDefault();
      errorUser.innerHTML = '';
      errorPassword.innerHTML = '';
      // eslint-disable-next-line max-len
      const newFormEmail = new FormData(event.target); /* el event.target se refiere elemento clickado  */
      const inputEmail = newFormEmail.get('email');
      const inputPassword = newFormEmail.get('password');

      const messageError = document.querySelector('.message-error');
      messageError.classList.remove('show-message-error');
      if (inputEmail === '' || inputPassword === '') {
        messageError.classList.add('show-message-error');
        return;
      }

      logIn(inputEmail, inputPassword)
        /*  Get - devuelve el primer valor asociado con una clave dada en un objeto  */
        .then((user) => {
          if (!user.emailVerified) {
            modal.classList.add('show-modal');
          } else {
            window.location.hash = '#/home';
          }
        })
        .catch(({ code }) => {
          // eslint-disable-next-line default-case
          switch (code) {
            case 'auth/user-not-found':
              errorUser.innerHTML = 'El correo electronico que ingresaste no esta conectado a una cuenta';
              break;
            case 'auth/wrong-password':
              errorPassword.innerHTML = 'Contraseña incorrecta';
              break;
          }
        });
    });
    closeModal();
  },

};

export default login;
