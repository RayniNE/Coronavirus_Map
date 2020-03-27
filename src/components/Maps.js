import React, {useState, useEffect, Fragment} from 'react';
import L from 'leaflet';
import { Button, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './Maps.css';

const Maps = ({handleLocation, user, location, datos, navCurrentLocation, currentLocation}) => {

  let localizaciones = JSON.parse(localStorage.getItem('locations'));

  if(!localizaciones){
    localizaciones = [];
  }

  const [localizacion, saveLocalizacion] = useState([]);

  useEffect( () => {
    if(localizaciones){
      localStorage.setItem('locations', JSON.stringify(localizacion));
    }
    else{
      localStorage.setItem('locations', JSON.stringify(localizacion));
    }
  })

  let isInfo = false;

  if(user && location.newLocation){
    isInfo = true;
  }



  const saveLocation = () => {

    if(location)
    {
      const database = firebase.firestore();
      var ref = database.collection('location').doc(user.displayName);
      let array = [];
      
      let data = {
        lat: location.newLocation.lat,
        lng: location.newLocation.lng
      }
      
      saveLocalizacion([...localizacion, data]);

      console.log(datos);
    }   

  }

    return (
        <div className="container">
          {user ?
            <Fragment> <Alert variant="primary"> Haga click en el mapa y luego presione el boton de guardar </Alert> </Fragment>
              :
              <Fragment> <Alert variant="primary"> Por favor, loguese con su cuenta de google </Alert> </Fragment>
          }
             <Map onClick={handleLocation} center={[currentLocation.lat, currentLocation.lng]} zoom={5}> 
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />
             {location.newLocation && <Marker position={location.newLocation}>
               <Popup position={location.setLocation}>
               <Fragment> <pre>Lat: {location.newLocation.lat}  Lng: {location.newLocation.lng} </pre> </Fragment>
               </Popup>

               
             </Marker> }
             </Map>
             <br></br>
             { isInfo
             ? 
              <Fragment> <Button onClick={saveLocation} className="text-center"> Agregar localización </Button>  </Fragment>
              :
             <Fragment> <p></p> </Fragment>

              }
              {user ?
              <Button onClick={navCurrentLocation} className="button">Localizarme</Button>
              :
              <p></p>
              }
              
        </div>
      );
}
 
export default Maps;