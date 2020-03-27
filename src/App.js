import React, {useState, useEffect, Fragment} from 'react';
import firebase from 'firebase';
import Maps from './components/Maps';
import Login from './components/login/Login';

function App() {
  //State del usuario. Para saber si el usuario esta logueado y almacenarlo.
  const [user, setUser] = useState({user: null});
  //State para conseguir la localizacion del punto en el mapa.
  const [location, setLocation] = useState({newLocation: null});
  //State para conseguir la localizacion actual del usuario.
  const [currentLocation, setCurrentLocation] = useState({lat: 40.737, lng:-73.923, zoom: 3});


  const navCurrentLocation = () => {

        navigator.geolocation.getCurrentPosition(position => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 5
          })
        });

  }



  //Practicamente el useEffect de location.
  const handleLocation = e => {
    setLocation({newLocation: e.latlng});
  }


  //Use effect de USER.
  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          if(user){
              setUser({user: user});
          } else{
              setUser({user: null});
          }
      })
  }, [user])







    const [datos, agregarDatos] = useState({});

    const consultarAPI = async () => {
    const api = await fetch('https://covid19.mathdro.id/api/confirmed');
    const info = await api.json();
    console.log(info)
    agregarDatos({datos});
    console.log(datos);
  };


 //Manejar el Login
  const handleAuth = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then( result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }   
  //Manejar el logout
  const handleLogOut = () => {
      firebase.auth().signOut()
      .then( () => console.log('Te has desconectado'))
      .catch( error => console.log(`Error: ${error.code}: ${error.message}`) )
  }


  return (
    <div className="App">
      <div>
        <Login
        handleAuth={handleAuth}
        handleLogOut={handleLogOut}
        user={user.user}
        />
        <Maps
        handleLocation={handleLocation}
        location={location}
        user={user.user}
        consultarAPI={consultarAPI}
        datos={datos}
        navCurrentLocation={navCurrentLocation}
        currentLocation={currentLocation}
        />
      </div>

      {/* <Login/> */}
    </div>
  );
}

export default App;
