// eslint-disable-next-line no-unused-vars
import { createNewUser, observer, updateUser} from '../firebase/auth.js';
/* import { saveForm } from '../firebase/config.js'; */

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
        <input name="name" type="text" id="inputName" class="input-register" placeholder="Nombre ">
        <input name="email" type="email" id="inputEmail" class="input-register" placeholder="E-mail">
        <div>
        <input name="password" type="password" id="inputPassword" class ="input-register" placeholder="Contraseña">
        <p class= "condicion"> Tu contraseña debe contener mínimo 6 carácteres</p>
        </div>
        <button type="submit" class ="button-register"> Registrar </button>
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
    const formEmail = document.querySelector('.form-email'); // seleccionamos el formulario
    const modal = document.querySelector('.modal-container');

    formEmail.addEventListener('submit', (event) => { // el evento sumit recibe l obj event
      event.preventDefault(); // cancelar el evento x defecto - no refresca la página
      const form = new FormData(event.target);
      const inputName = form.get('name');

      createNewUser(form.get('email'), form.get('password'))
        .then((user) => {
          modal.classList.add('show-modal');
          // eslint-disable-next-line no-undef
          updateUser(user, inputName);
          console.log(user);
          /* saveForm(user.uid, inputName, inputEmail); // updateprrofile */
          // cuando se escriba los inputs voy a ejecutar la fx saveForm
        })
        .catch((error) => {
          /*  // eslint-disable-next-line no-alert
          alert('llena tus datos'); */
          console.log(error);
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
