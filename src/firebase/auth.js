import { getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js'
import app from './config.js';

const auth = getAuth(app);

const createNewUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
      sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log ('correo enviado')
      })
      .catch((error) => {
        console.log(error)
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

const logIn = (email, password)=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log (errorMessage)
  });

}
onAuthStateChanged(auth, (user) => {
  if (user) {
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const uid = user.uid;
    console.log ( logeado)
    
  } else {
    console.log ('se deslogeo')
    // User is signed out
    // ...
  }
});
export {createNewUser, logIn}

