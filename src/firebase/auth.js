import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js'
import app from './config.js';

const auth = getAuth(app);

const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log (userCredential)
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
export {createNewUser}
