export default () => {
    const register = ` 
    <section class="firstView">
    <div class="containerIndex">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Registrate aquí</h2>
      <span> Podras ver las fotos de los lugares que tienen la mejor comida de tú país..</span>
      <div class="buttonIndex">
        <input type="email" class="inputRegister" placeholder="E-mail">
        <input type="text" class ="inputRegister" placeholder="Contraseña">
        <a href="#/home" class="buttonRegister"> Iniciar sesion </a>
      </div>
      <span> Al registrarte, aceptas nuestras Condiciones,la Política de datos y la Política de cookies.</span>
    </div>
    </section>`;

    const divRegister = document.createElement("div")
    divRegister.classList.add('registers');
    divRegister.innerHTML= register;
    return divRegister
}