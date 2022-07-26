import {
  getPost, logOut, observer, savePost,
} from '../firebase/auth.js';

const home = {
  template: () => {
    const home = ` 
        <section class="home">
            <div class="header-home">
              <h1>HELP TASTER</h1>
              <button id="btn-salir" class="btn-salir">
                <img src="./img/salir.png">
              </button>
            </div>
            <div class="header-home">
              <div class="description-img">
                <img class="photo-user" src="" referrerpolicy="no-referrer">
              </div>
              <div class="header-info">
                <h2 class="home-h2">Home</h2>
                <span>¡Qué bueno verte <strong class='currentName'></strong>!</span>
              </div>
            </div>
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

            <div id='contentPost'></div>
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

    

    window.addEventListener('DOMContentLoaded', async () => {
      const querySnapshot = await getPost();

      let html = '';

      querySnapshot.forEach((doc) => {
        const contentPost = doc.data();
        console.log(contentPost);
        html += ` 
          <div class="course second">
            <div class="content-publi">
              <h3>Nuna Raymi</h3>
              <p>${contentPost.content}</p>
              <p>${contentPost.userName}</p>
            </div>
            <button class="like"></button>
            <button class="coment"></button>
          </div>
        `;
      });
      containerPost.innerHTML = html;
    });
    let currentUser;
    // Traer el nombre de usuario
    function authCallBack(user) {
      currentUser = user;
      const currentName = document.querySelector('.currentName');
      const photoUser = document.querySelector('.photo-user')

      currentName.innerHTML = user.displayName;
      photoUser.setAttribute("src", user.photoURL);

    }
    observer(authCallBack);

    btnPublicar.addEventListener('click', (event) => {
      event.preventDefault();

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

    document.querySelector('#btn-salir').addEventListener('click', (event) => {
      event.preventDefault(); // cancela el evento sin detener el resto del fx del evento
      logOut();
      window.location.hash = '';
    });
  },

};
export default home;
