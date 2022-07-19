import { logIn } from '../firebase/auth.js';

const loginEmail = {
  template: () => {
    const loginEmail = ` 
    <section class="first-view email">
    <div class="container-index">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Inicia sesión en tú cuenta </h2>
      <span>Disfruta de la mejor comida creada para las personas amantes de codígo!</span>
      <form class="form-email">
        <input name="email" type="email" class="input-register" placeholder="E-mail">
        <input name="password" type="password" class ="input-register" placeholder="Contraseña">
        <button type="submit" class="btn-log-email"> Iniciar sesión </button>
      </form>
    </div>
    <div class="modal-container">
    <div class="modal no-verified-email">
      <img src="./img/verificacion.webp"></img> 
      <span> No se verifico, revisa su correo</span>
      <button class="btn-modal"> Aceptar </button>
    </div>
  </div>
    </section>`;

    const divLoginEmail = document.createElement('div');
    divLoginEmail.classList.add('loginEmail');
    divLoginEmail.innerHTML = loginEmail;
    return divLoginEmail;
  },
  init: () => {
    const buttonLogIn = document.querySelector('.form-email');
    const modal = document.querySelector('.modal-container');

    buttonLogIn.addEventListener('submit', (event) => {
      event.preventDefault();
      const formEmail = new FormData(event.target);
      logIn(formEmail.get('email'), formEmail.get('password'))
      .then((user)=>{
        if (!user.emailVerified){
          modal.classList.add('show-modal')
        } 
      })
      .catch(({code}) => {
        let message = ''

        switch(code) {
          case 'auth/user-not-found':
            message = 'usuario no encontrado';
            break;
          case 'auth/wrong-password':
            message = 'contraseña incorrecta'
            break;
        }

        console.log(message);
      })
    });
    const closeModal = document.querySelector('.btn-modal')
    closeModal.addEventListener('click',() =>{
      modal.classList.remove('show-modal')
    })
  }
};

export default loginEmail;
