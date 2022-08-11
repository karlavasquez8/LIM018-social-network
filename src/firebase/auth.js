/* eslint-disable import/no-named-as-default-member */
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
  updateProfile,
  sendPasswordResetEmail,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';

import {
  getFirestore, // Conección a firestore
  doc,
  addDoc, // Documento
  collection, // Colección de datos
  onSnapshot, // Cuando los datos cambien
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';

// eslint-disable-next-line import/no-named-as-default
import app from './config.js';

const auth = getAuth(app);
/* console.log(auth); */

// eslint-disable-next-line max-len
export const createNewUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        logOut();
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
  signInWithPopup(auth, provider);
  // .then((result) => {
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential.accessToken;
  // const user = result.user;
  // }); // .catch((error) => {
  // Handle Errors here.
  // const errorCode = error.code;
  // const errorMessage = error.message;
  // The email of the user's account used.
  // const email = error.customData.email;
  // The AuthCredential type that was used.
  // const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
  // });
};

export const logOut = () => { signOut(auth); };

const db = getFirestore(app); // conección a la BD
// Con el type module se puede exportar fx
export const updateUser = (currentUser, inputName) => updateProfile(currentUser, { displayName: inputName });

export const recoverPass = (email) => {
  sendPasswordResetEmail(auth, email);
};

// Firestore
// Guardar los post
export const savePost = (post) => {
  addDoc(collection(db, 'publication'), post);
};

export const getPosts = () => getDocs(collection(db, 'publication'));
export const getPost = (id) => getDoc(doc(db, 'publication', id));

export const onGetPost = (querySnapshot) => {
  const queryPost = query(collection(db, 'publication'), orderBy('datePost', 'desc'));
  onSnapshot(queryPost, querySnapshot);
};

// Función para eliminar los posts
export const deletePost = (id) => deleteDoc(doc(db, 'publication', id));

// Función para editar los posts

// Función para actualizar posts
export const updatePost = (id, newFields) => updateDoc(doc(db, 'publication', id), newFields);
export const serverTime = serverTimestamp();
