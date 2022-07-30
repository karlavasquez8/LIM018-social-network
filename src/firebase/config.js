// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
// import { firestore } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBUB3V4PmreHZy4X1UUv1vtnpUL0crfpBk',
  authDomain: 'help-taster-lim018.firebaseapp.com',
  projectId: 'help-taster-lim018',
  storageBucket: 'help-taster-lim018.appspot.com',
  messagingSenderId: '650967119985',
  appId: '1:650967119985:web:fa8f1efcb13760d3be43d0',
  measurementId: 'G-QJ5VX5ES9N',
};
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export default app;
