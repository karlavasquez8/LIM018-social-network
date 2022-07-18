import { createNewUser, observer } from '../firebase/auth.js';

const register = {
  template: () => {
    const register = ` 
    <section class="firstView">
    <div class="containerIndex">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Registrate aquí</h2>
      <span> Podras ver las fotos de los lugares que tienen la mejor comida de tú país..</span>
      <form class="formRegister">
        <input name="email" type="email" class="inputRegister" placeholder="E-mail">
        <input name="password" type="password" class ="inputRegister" placeholder="Contraseña">
        <button type="submit" class="buttonRegister"> Registrar </button>
      </form>
      <span> Al registrarte, aceptas nuestras Condiciones,la Política de datos y la Política de cookies.</span>
    </div>

    <div class="modalContainer">
      <div class="modal">
        <img src="./img/verificacion.webp"></img> 
        <span>Para continuar con la creación de tu nueva cuenta de Help Taster, verifica tu dirección de correo electrónico.</span>
      </div>
    </div>
    </section>`;

    const divRegister = document.createElement('div');
    divRegister.classList.add('registers');
    divRegister.innerHTML = register;
    return divRegister;
  },

  init: () => {
    const formRegister = document.querySelector('.formRegister');

    formRegister.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      // createNewUser(form.get('email'), form.get('password')).then(
      //   const modal = document.querySelector('.modalContainer');
      //   modal.style.visibility = 'visible';
      // ).catch();
      createNewUser(form.get('email'), form.get('password'));
      const modal = document.querySelector('.modalContainer');
      modal.style.visibility = 'visible';
    });
  },
};

export default register;
