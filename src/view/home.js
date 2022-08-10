import {
  observer,
  savePost,
  onGetPost,
  deletePost,
  getPost,
  updatePost,
} from '../firebase/auth.js';

const home = {
  template: () => { /* Backticks: Permiten concatenar y trabajar con cadenas */
    const homeTemplate = `   
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
          <button id="btn-home-nav" class="btn-nav">
            <img src="./img/recipe (Stroke).png">Home</button>
        </div>
        <div class="publicar-nav">
          <button id="btn-publicar-nav" class="btn-nav">
            <img src="./img/photo_camera.png">Publicar
          </button>
        </div>
        <div class="buscar-nav">
          <button id="btn-buscar-nav" class=" btn-nav">
            <img src="./img/search.png">Buscar</button>
        </div>
      </div>

      <div class="modal-container">
        <div class="modal no-verified-email">
          <form id="create-post" class="create-post">
            <label><input type="text" id = "name-restaurant" class="name-restaurant" placeholder="Restaurante"></label>
            <textarea id="publicacion" class="publicacion" placeholder="¿Por qué nos recomiendas este lugar?"></textarea>
              <div class="iconos-post">
                <div>
                  <span class="material-symbols-outlined">image</span>
                </div>
                <button id="btn-publicar" class="btn-primary btn-publicar">Publicar</button>
                <button class="btn-primary btn-close-modal">Cancelar</button>
              </div>
          </form>
        </div>
      </div>
    </section>
    `;

    const divRegister = document.createElement('div');
    divRegister.classList.add('registers');
    divRegister.innerHTML = homeTemplate;
    return divRegister;
  },

  init: () => {
    // Creando post
    const containerPost = document.querySelector('#contentPost');
    const postForm = document.querySelector('.create-post');
    const nameRestaurant = document.querySelector('#name-restaurant');
    const post = document.querySelector('.publicacion');
    const modalPublication = document.querySelector('.modal-container');
    let currentUser;

    /* let currentUser; */
    // Traer el nombre de usuario, (el observador)
    function authCallBack(user) {
      currentUser = user; // Usuario actual
      const photoUser = document.querySelector('.photo-user');
      photoUser.setAttribute('src', user.photoURL); // Cambia el contenido src x la foto
      if (user.photoURL == null) {
        photoUser.setAttribute('src', '../img/photo-user.png');
      }
    }
    observer(authCallBack);

    // funciones para bloquear y activar scroll del modal
    function blockScroll() {
      document.querySelector('.content-post').classList.add('hidden-scroll');
    }

    function activateScroll() {
      document.querySelector('.content-post').classList.remove('hidden-scroll');
    }

    // funcion para mostrar modal
    function showModal(configModal = {}) {
      const noopFunction = () => {};
      const btnCloseModal = document.querySelector('.btn-close-modal');

      const {
        continueText = 'Publicar',
        clickContinue = noopFunction,
        beforeLoad = noopFunction,
        onClose = noopFunction,
      } = configModal;

      postForm['btn-publicar'].innerText = continueText;

      postForm['btn-publicar'].addEventListener('click', clickContinue);
      btnCloseModal.addEventListener('click', onClose);

      beforeLoad();

      modalPublication.classList.add('show-modal-publication');
      // Esta en nav.css
    }

    // funcion para remover modal
    function removeModal(clickContinue = () => {}) {
      postForm['btn-publicar'].removeEventListener('click', clickContinue);

      modalPublication.classList.remove('show-modal-publication');
      activateScroll();
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
          const editId = event.target.dataset.id;

          const clickContinue = (e) => {
            e.preventDefault();

            const content = post.value;
            updatePost(editId, { content });

            removeModal(clickContinue);
            postForm.reset();
          };

          showModal({
            continueText: 'Guardar',
            beforeLoad: async () => {
              const doc = await getPost(editId);
              const publication = doc.data();
              post.value = publication.content;
              blockScroll();
            },
            clickContinue,
            onClose: () => {
              removeModal(clickContinue);
            },
          });
        });
      });
    }
    function counterLike() {
      const btnLikes = document.querySelectorAll('.btn-likes');
      btnLikes.forEach((btnLike) => {
        btnLike.addEventListener('click', async (event) => {
          const elementBtnLike = event.target.closest('.btn-likes');
          const idPost = elementBtnLike.dataset.id;
          const doc = await getPost(idPost);
          const publication = doc.data();
          const likes = publication.likes + 1;
          updatePost(idPost, { likes });
        });
      });
    }

    // Haciendo el post
    onGetPost((querySnapshot) => { // Cuando ocurra 1 cambio te mando los nuevos dts
      let html = '';

      querySnapshot.forEach((doc) => {
        // Si el userID del post no es igual al id del currentUser no muestro el boton de eliminar
        const contentPost = doc.data();
        const avatarUser = contentPost.avatar === null ? './img/photo-user-blanco.png' : contentPost.avatar;
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
              <button class="btn-interaccion btn-likes" data-id="${doc.id}"> 
              <img src = "../img/corazon.png">
              <span class="conteo">${contentPost.likes}</span>
              </button>
              <button class="btn-interaccion">
              <img src = "../img/coment.png">
              <span class = "conteo comentarios">1234</span>
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
      counterLike();
    });

    // evento cuando le dan click al boton del nav-publicar
    const btnPublicarNav = document.querySelector('#btn-publicar-nav');
    btnPublicarNav.addEventListener('click', () => {
      const clickContinue = (event) => {
        event.preventDefault();

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
        removeModal(clickContinue);
        postForm.reset();
      };

      showModal({
        beforeLoad: () => {
          blockScroll();
        },
        clickContinue,
        onClose: () => {
          removeModal(clickContinue);
        },
      });
    });
  },
};

export default home;
