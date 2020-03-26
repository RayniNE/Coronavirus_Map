import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';



firebase.initializeApp({
  apiKey: "AIzaSyBjkB-smE4IBDMmFUGQ7b1fDuEm_b0JF_Y",
    authDomain: "corona-84250.firebaseapp.com",
    databaseURL: "https://corona-84250.firebaseio.com",
    projectId: "corona-84250",
    storageBucket: "corona-84250.appspot.com",
    messagingSenderId: "443406708581",
    appId: "1:443406708581:web:223eff79b2f5db2a48fb8c",
    measurementId: "G-RQ5HYZR8MW"
  }
  )

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
