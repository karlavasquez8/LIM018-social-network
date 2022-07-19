import { createNewUser, observer } from '../firebase/auth.js';

const register = {
  template: () => {
    const register = ` 
    <section class="first-view">
    <div class="container-index">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Registrate aquí</h2>
      <span> Podrás ver las fotos de los lugares que tienen la mejor comida de tú país..</span>
      <form class="form-email">
        <input name="name" type="text" class="input-register" placeholder="Nombre ">
        <input name="email" type="email" class="input-register" placeholder="E-mail">
        <div>
        <input name="password" type="password" class ="input-register" placeholder="Contraseña">
        <p class= "condicion"> Tu contraseña debe contener mínimo 6 carácteres</p>
        </div>
        <button type="submit" class="button-register"> Registrar </button>
      </form>
      <span> Al registrarte, aceptas nuestras Condiciones,la Política de datos y la Política de cookies.</span>
    </div>
    <div class="modal-container">
      <div class="modal">
        <img src="./img/verificacion.webp"></img> 
        <span>Para continuar con la creación de tu nueva cuenta de Help Taster, verifica tu dirección de correo electrónico.</span>
        <button class="btn-modal"> Aceptar </button>
      </div>
    </div>
    </section>`;

    const divRegister = document.createElement('div');
    divRegister.classList.add('registers');
    divRegister.innerHTML = register;
    return divRegister;
  },

  init: () => {
    const formEmail = document.querySelector('.form-email');
    const modal = document.querySelector('.modal-container');

    formEmail.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      createNewUser(form.get('email'), form.get('password'))
        .then(() => {
          modal.classList.add('show-modal');
        })
        .catch((error) => {
          alert('llena tus datos');
        });
    });
    const closeModal = document.querySelector('.btn-modal');
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show-modal');
      window.location.hash = '';
    });
  },
};

export default register;
