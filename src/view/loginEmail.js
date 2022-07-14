const loginEmail = {
  template : () => {
    const loginEmail = ` 
    <section class="firstView">
    <div class="containerIndex">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Inicia sesión en tú cuenta </h2>
      <span>Disfruta de la mejor comida creada para las personas amantes de codígo!</span>
      <form class="formRegister">
        <input name="email" type="email" class="inputRegister" placeholder="E-mail">
        <input name="password" type="password" class ="inputRegister" placeholder="Contraseña">
        <button type="submit" class="buttonRegister"> Registrar </button>
      </form>
    </div>
    </section>`;

    const divLoginEmail= document.createElement("div")
    divLoginEmail.classList.add('loginEmail');
    divLoginEmail.innerHTML= loginEmail;
    return divLoginEmail
  },
}
  


  export default loginEmail