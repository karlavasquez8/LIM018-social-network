import { logOut } from '../firebase/auth.js';

const home = {
  template: () => {
    const home = ` 
        <section class="home">
            <div class="headerHome">
              <h1>HELP TASTER</h1>
              <button id="btn-salir">
                <img src="./img/salir.png">
              </button>
            </div>
            <div class="headerHome">
              <div class="descriptionImg">
                <img src="./img/images 1.png">
              </div>
              <div class="headerInfo">
                <h2 class="homeH2">Home</h2>
                <span>¡Qué bueno verte kami!</span>
              </div>
            </div>
            <div class="createpost">
              <textarea class="publicacion" placeholder="¿Que lugar nos quieres recomendar?"></textarea>
              <div class="iconosPost">
                <span class="material-symbols-outlined">add_location_alt</span>
                <span class="material-symbols-outlined">image</span>
              </div>
            </div>
            <div class="course first">
              <div class="contentPubli">
                <h3>Restaurante Papachos</h3>
                <p>publicado por Karla Vasquez</p>
              </div>
              <button class="like">
            
              </button>
            </div>
            <div class="course second">
              <div class="contentPubli">
                <h3>Nuna Raymi</h3>
                <p>publicado por Gabriela Rojas</p>
              </div>
               <button class="like">
             </button>
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