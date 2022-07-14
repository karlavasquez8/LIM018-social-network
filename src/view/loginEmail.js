const loginEmail = {
    template : () => {
      const loginEmail = ` 
      <section class="firstView">
      <div class="containerIndex">
        <img src="./img/cubiertos.png" alt="Cubiertos">
        <h1> HELP TASTER </h1>
        <h2> Inicia sesion con tu cuenta</h2>
        <span> Podras ver las fotos de los lugares que tienen la mejor comida de tú país..</span>
        <form class="formRegister">
          <input name="email" type="email" class="inputRegister" placeholder="E-mail">
          <input name="password" type="password" class ="inputRegister" placeholder="Contraseña">
          <button type="submit" class="buttonRegister"> Iniciar sesion </button>
        </form>
      </div>
      </section>`;
  
      const divLoginEmail = document.createElement("div")
      divLoginEmail.classList.add('registers');
      divLoginEmail.innerHTML= loginEmail;
      return divLoginEmail
    },
    init: ()=> {
    
    }
  }
  
  export default loginEmail