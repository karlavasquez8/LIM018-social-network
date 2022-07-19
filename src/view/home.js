import { logOut } from "../firebase/auth.js";

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
                <img src="./img/images 1.png">
              </div>
              <div class="header-info">
                <h2 class="home-h2">Home</h2>
                <span>¡Qué bueno verte kami!</span>
              </div>
            </div>
            <div class="create-post">
              <textarea class="publicacion" placeholder="¿Que lugar nos quieres recomendar?"></textarea>
              <div class="iconos-post">
                <div>
                  <span class="material-symbols-outlined">add_location_alt</span>
                  <span class="material-symbols-outlined">image</span>
                </div>
                <button class="btn-publicar">Publicar</button>

              </div>
            </div>
            <div class="course first">
              <div class="content-publi">
                <h3>Restaurante Papachos</h3>
                <p>publicado por Karla Vasquez</p>
              </div>
              <button class="like">
            
              </button>
            </div>
            <div class="course second">
              <div class="content-publi">
                <h3>Nuna Raymi</h3>
                <p>publicado por Gabriela Rojas</p>
              </div>
               <button class="like"></button>
            </div>
           </section>
        `;

    const divRegister = document.createElement('div');
    divRegister.classList.add('registers');
    divRegister.innerHTML = home;
    return divRegister;
  },

  init: () => {
    document.querySelector('#btn-salir').addEventListener('click',(event) =>{
      event.preventDefault();
      logOut();
      window.location.hash = '';
    });
  },

};
export default home;