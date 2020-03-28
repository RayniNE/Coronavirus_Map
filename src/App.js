import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Maps from "./components/Maps";
import Login from "./components/login/Login";
import GlobalStats from "./components/GlobalStats";
import './App.css';

function App() {
  const axios = require("axios");

  //State del usuario. Para saber si el usuario esta logueado y almacenarlo.
  const [user, setUser] = useState({ user: null });
  //State para conseguir la localizacion del punto en el mapa.
  const [location, setLocation] = useState({ newLocation: null });
  //State para conseguir la localizacion actual del usuario.
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.737,
    lng: -73.923,
    zoom: 3
  });
  //Conseguir data.
  const [coronavirus, setCoronavirus] = useState([]);

  useEffect(() => {
    axios
      .get("https://covid19.mathdro.id/api/confirmed")
      .then(res => {
       // console.log(res);
        setCoronavirus(res.data);
      })
      .catch(err => console.log(err));
  }, []);




  const navCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 7
      });
    });
  };

  // const getAPI = () => {
  //   axios.get('https://covid19.mathdro.id/api/confirmed')
  //   .then(res => {
  //     console.log(res)
  //     setCoronavirus(res.data)
  //   })
  //   .catch(err => console.log(err));
  // }

  //Practicamente el useEffect de location.
  const handleLocation = e => {
    setLocation({ newLocation: e.latlng });
  };

  //Use effect de USER.
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({ user: user });
      } else {
        setUser({ user: null });
      }
    });
  }, [user]);

  //Manejar el Login
  const handleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
  };
  //Manejar el logout
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Te has desconectado"))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
  };

  return (
    <div className="App">
      <div className="principalDiv">


        <Login
          handleAuth={handleAuth}
          handleLogOut={handleLogOut}
          user={user.user}
        />
        

        <Maps
          handleLocation={handleLocation}
          location={location}
          user={user.user}
          navCurrentLocation={navCurrentLocation}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          coronavirus={coronavirus}
          setCoronavirus={setCoronavirus}
        />

        <GlobalStats
        />
      </div>

      {/* <Login/> */}
    </div>
  );
}

export default App;
