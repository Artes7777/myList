import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCkSsxZcTLOVYaLETqCxQjBJrlOlFVY500',
  authDomain: 'bestplasec.firebaseapp.com',
  databaseURL: 'https://bestplasec.firebaseio.com',
  projectId: 'bestplasec',
  storageBucket: 'bestplasec.appspot.com',
  messagingSenderId: '783965093518',
};
const fire = firebase.initializeApp(config);


export default fire;
