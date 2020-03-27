import React, {useState, useEffect, Fragment} from 'react';
import L from 'leaflet';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './Maps.css';

const Maps = ({handleLocation, user, location, datos, consultarAPI}) => {

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
    else{
      alert('Por favor, haga click en el mapa para conseguir la localización y luego dele click a agregar')
    }     

  }

    return (
        <div className="container">
          {user ?
            <Fragment> <h3 className="text-center"> Haga click en el mapa </h3>  </Fragment>
              :
              <Fragment> <h3>Por favor, loguese con su cuenta de google</h3></Fragment>
          }
            
             <Map onClick={handleLocation} center={[18.547554, -69.915224]} zoom={5}>
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

              <Button onClick={consultarAPI}>Probar API</Button>
        </div>
      );
}
 
export default Maps;