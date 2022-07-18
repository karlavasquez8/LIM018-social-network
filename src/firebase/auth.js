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

export const createNewUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('correo enviado');
          // eslint-disable-next-line no-use-before-define
          logOut();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        alert('correo no verificado');
      } else {
        window.location.hash = '#/home';
        alert('correo verificado');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('usuario no se logeo', errorCode, errorMessage);
    });
};
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
  }).catch((error) => {
    // An error happened.
  });
};
