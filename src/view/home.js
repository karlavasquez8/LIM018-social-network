import {
  getPost, logOut, observer, savePost, onGetPost, deletePost, editPost, updatePost,
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
      <div id = "contentPost" class = "content-post"></div>

      <div class="nav">
        <div class="home-nav">
          <button id="home-modal" class="btn-nav">
            <img src="./img/recipe (Stroke).png">Home</button>
        </div>
        <div class="publicar-nav">
          <button id="publicar-modal" class="btn-nav">
            <img src="./img/photo_camera.png">Publicar</button>
        </div>
        <div class="buscar-nav">
          <button id="buscar-modal" class="btn-nav">
            <img src="./img/search.png">Buscar</button>
        </div>
      </div>

      <div class="modal-container">
        <div class="modal no-verified-email">
          <form id="create-post" class="create-post">
            <input type="text" id = "name-restaurant" placeholder="¿Que restaurante recomiendas?">
            <textarea id="publicacion" class="publicacion" placeholder="¿Que lugar nos quieres recomendar?"></textarea>
              <div class="iconos-post">
                <div>
                  <span class="material-symbols-outlined">add_location_alt</span>
                  <span class="material-symbols-outlined">image</span>
                </div>
                <button id="btn-publicar" class="btn-publicar">Publicar</button>
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
    const nameRestaurant = document.querySelector('#name-restaurant');
    const post = document.querySelector('.publicacion');
    const btnPublicar = document.querySelector('.btn-publicar');
    const modalPublication = document.querySelector('.modal-container');
    let editStatus = false; // Para editar
    let id = '';

    function blockScroll() {
      document.querySelector('.content-post').classList.add('hidden-scroll');
    }
    function activateScroll() {
      document.querySelector('.content-post').classList.remove('hidden-scroll');
    }

    function showModal() {
      modalPublication.classList.add('show-modal-publication');
      // Esta en nav.css
    }

    function removeModal() {
      modalPublication.classList.remove('show-modal-publication');
    }

    // Menú desplegable
    function menuPublication() {
      const menusDesplegables = document.querySelectorAll('.img-tree-dots');
      menusDesplegables.forEach((menuDesplegable) => {
        menuDesplegable.addEventListener('click', (event) => {
          const btnMenu = event.target.closest('.menu-desplegable').querySelector('.btn-edit-delete');
          if (btnMenu.classList.contains('show-menu')) {
            btnMenu.classList.remove('show-menu');
          } else {
            btnMenu.classList.add('show-menu');
          }
        });
      });
    }

    // Eliminando post
    function deletePostFinal() {
      const btnsDelete = containerPost.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          deletePost(event.target.dataset.id);
        });
      });
    }

    // Editar post
    function editPostFinal() {
      const btnsEdit = containerPost.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (event) => {
          showModal();
          blockScroll();
          const doc = await editPost(event.target.dataset.id);
          const publication = doc.data();

          postForm.publicacion.value = publication.content;

          editStatus = true;
          id = event.target.dataset.id;
          postForm['btn-publicar'].innerText = 'Guardar';
          // obtener el modal
          // llenar los campos
          // mostarr el modal
        });
        activateScroll();
      });
    }

    let currentUser;
    // Haciendo el post
    onGetPost((querySnapshot) => { // Cuando ocurra 1 cambio te mando los nuevos dts
      let html = '';

      querySnapshot.forEach((doc) => {
        // Si el userID del post no es igual al id del currentUser no muestro el boton de eliminar
        const contentPost = doc.data();
        const avatarUser = contentPost.avatar !== null ? contentPost.avatar : './img/photo-user-blanco.png';
        /* console.log(contentPost.userID, currentUser.uid); */

        html += ` 
        <div class="container-publi">
          <div class="container-publi-img">

            ${contentPost.userID === currentUser.uid ? `<div class="menu-desplegable" >
              <button class="img-tree-dots" >
                <img src="../img/menu-desplegable.png">
              </button>
              <ul class="btn-edit-delete">
                <li><button type="button" class="btn-edit menu" data-id="${doc.id}">Editar</button></li>
                <li><button type="button" class="btn-delete menu" data-id="${doc.id}">Eliminar</button></li>
              </ul>
            </div>` : ''}

            <div class="content-publi">            
              <img class="photo-user-post" src="${avatarUser}" referrerpolicy="no-referrer">
              <div>
              <p class="user-publi">${contentPost.userName}</p>
              <span class="time-publi">hace 2 horas</span>
              </div>
            </div>
          </div>
          <div class="info-publi">
            <h4>${contentPost.title}</h4>
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
      menuPublication();
      deletePostFinal();
      editPostFinal();
    });

    /* let currentUser; */
    // Traer el nombre de usuario
    function authCallBack(user) {
      currentUser = user; // Usuario actual
      const photoUser = document.querySelector('.photo-user');
      photoUser.setAttribute('src', user.photoURL); // Cambia el contenido src x la foto
      if (user.photoURL == null) {
        photoUser.setAttribute('src', '../img/photo-user.png');
      }
    }
    observer(authCallBack);

    const publicarModal = document.querySelector('#publicar-modal');
    publicarModal.addEventListener('click', () => {
      showModal();
      blockScroll();
    });

    btnPublicar.addEventListener('click', (event) => {
      event.preventDefault();
      removeModal();
      activateScroll();

      if (!editStatus) {
        const userPublication = post.value;
        const userRestaurant = nameRestaurant.value;
        savePost({
          content: userPublication,
          title: userRestaurant,
          userName: currentUser.displayName,
          userID: currentUser.uid,
          avatar: currentUser.photoURL,
          urlImage: '',
          likes: 0,
          commets: [],
        });
      } else {
        updatePost(
          id,
          {
            content: post.value,
          },
        );
      }

      postForm.reset();
    });
  },
};

export default home;
