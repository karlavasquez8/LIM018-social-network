
const container = document.getElementById('container');
export default () =>{
    const login = `
    <section class="firstView">
        <div class="containerIndex">
           <img src="./img/cubiertos.png" alt="Cubiertos">
           <h1> HELP TASTER </h1>
           <h2> ¿Que deseas probar hoy? </h2>
           <span> Te ayudamos a encontrar los mejores lugares para disfrutar tus comidas!!</span>
           <div class="buttonIndex">
             <button>
              <img src="./img/Google.png">
              Inicia con Google</button>
             <button>
              <img src="./img/Facebook.png">
              Inicia con Faceboook</button>
             <button>
              <img src="./img/E-mail.png">
              Inicia con Email</button>
           </div>
           <span>¿No tienes una cuenta ?</span>
           <a href="#/register">Registrate aqui</a>
        </div>  
    </section>`;
       
    const containerIndex = container.innerHTML= login;
    return containerIndex
}