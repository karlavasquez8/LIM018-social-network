import {
  getPost, logOut, observer, savePost, onGetPost,
} from '../firebase/auth.js';

const home = {
  template: () => { /* Backticks: Permiten concatenar y trabajar con cadenas */
    const home = `   
    <section class="home">
      <div class="header-home">
        <h1>HELP TASTER</h1>
        <div class="description-img">
          <img class="photo-user" src="" referrerpolicy="no-referrer">
        </div>
      </div>
      <div id = "contentPost"></div>

      <div class="nav">
        <div class="home-nav btnNav">
          <button id="home-modal">
            <img src="./img/recipe (Stroke).png">Home</button>
        </div>
        <div class="publicar-nav btnNav">
          <button id="publicar-modal">
            <img src="./img/photo_camera.png">Publicar</button>
        </div>
        <div class="buscar-nav btnNav">
          <button id="buscar-modal">
            <img src="./img/search.png">Buscar</button>
        </div>
      </div>
      <div class="modal-container">
        <div class="modal no-verified-email">
          <form class="create-post">
            <textarea class="publicacion" placeholder="¿Que lugar nos quieres recomendar?"></textarea>
              <div class="iconos-post">
                <div>
                  <span class="material-symbols-outlined">add_location_alt</span>
                  <span class="material-symbols-outlined">image</span>
                </div>
                <button class="btn-publicar">Publicar</button>
              </div>
          </form>
        </div>
      </div>
    </section>
    `;

    const divRegister = document.createElement('div');
    divRegister.classList.add('registers');
    divRegister.innerHTML = home;
    return divRegister;
  },

  init: () => {
    // Creando post
    const containerPost = document.querySelector('#contentPost');
    const postForm = document.querySelector('.create-post');
    const post = document.querySelector('.publicacion');
    const btnPublicar = document.querySelector('.btn-publicar');
    const modalPublication = document.querySelector('.modal-container');

    window.addEventListener('DOMContentLoaded', async () => {
      onGetPost((querySnapshot) => { // Cuando ocurra 1 cambio te mando los nuevos dts
        let html = '';

        querySnapshot.forEach((doc) => {
          const contentPost = doc.data();
          const avatarUser = contentPost.avatar !== null ? contentPost.avatar : './img/corazon.png';

          html += ` 
          <div class="container-publi">
          <div class="container-publi-img">
            <div class="content-publi">
              <img class="photo-user-post" src="${avatarUser}" referrerpolicy="no-referrer">
              <div>
              <p class="user-publi">${contentPost.userName}</p>
              <span class="time-publi">hace 2 horas</span>
              </div>
            </div>
          </div>
          <div class="info-publi">
            <h4>Restaurante Bambu</h4>
            <p class="description">${contentPost.content}</p>

            <div class="interacciones">
              <button class="btn-interaccion"> 
              <img src = "../img/corazon.png">
              <span class="conteo">123</span>
              </button>
              <button class="btn-interaccion">
              <img src = "../img/coment.png">
              <span class = "conteo">1234</span>
              </button>
            </div>
          </div>
        </div>
        `;
        });
        containerPost.innerHTML = html;
      });
    });

    let currentUser;
    // Traer el nombre de usuario
    function authCallBack(user) {
      currentUser = user; // Usuario actual
      /* const currentName = document.querySelector('.currentName'); */
      const photoUser = document.querySelector('.photo-user');
      photoUser.setAttribute('src', user.photoURL); // Cambia el contenido src x la foto
    }
    observer(authCallBack);

    const publicarModal = document.querySelector('#publicar-modal');
    publicarModal.addEventListener('click', () => {
      modalPublication.classList.add('show-modal-publication'); // Esta en nav.css
    });

    btnPublicar.addEventListener('click', (event) => {
      event.preventDefault();
      modalPublication.classList.remove('show-modal-publication');
      const userPublication = post.value;
      savePost({
        content: userPublication,
        title: '',
        userName: currentUser.displayName,
        userID: currentUser.uid,
        avatar: currentUser.photoURL,
        urlImage: '',
        likes: 0,
        commets: [],

      });
      postForm.reset();
    });
  },
};

export default home;
