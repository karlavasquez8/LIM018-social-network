/* eslint-disable max-len */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';

import app from './config.js';

const auth = getAuth(app);

export const createNewUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('correo enviado');
        // eslint-disable-next-line no-use-before-define
        logOut();
      })
      .catch((error) => {
        console.log(error);
      });
    return user;
  });

export const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return user;
  });
// observador va recibir como parametros funciones para
// saber en que momento se autenticado, el noAuth es una funcion tonta,
// si no le pasan nada va ser una funcion y si le pasan va reemplazar al valor por defecto

export const observer = (authCallBack, noAuthCallBack = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authCallBack(user);
    } else {
      noAuthCallBack();
    }
  });
};

const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('cerrosesion');
  }).catch((error) => {
    // An error happened.
  });
};
