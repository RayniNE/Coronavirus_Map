import React, { useState, useEffect, Fragment } from "react";
import { Button, Alert } from "react-bootstrap";
import firebase from "firebase";
import { Map, TileLayer, Marker, Popup, Circle} from "react-leaflet";

import { Icon } from 'leaflet';
import "./Maps.css";

const myIcon = new Icon({
  iconUrl: '/brote.svg',
  iconSize: [25, 25]
})




const Maps = ({
  handleLocation,
  user,
  location,
  datos,
  navCurrentLocation,
  currentLocation,
  setCurrentLocation,
  coronavirus,
  setCoronavirus
}) => {
  let localizaciones = JSON.parse(localStorage.getItem("locations"));
  
  const {lat, lng, zoom} = currentLocation;
 

  if (!localizaciones) {
    localizaciones = [];
  }

  const [localizacion, saveLocalizacion] = useState([]);

  useEffect(() => {
    if (!localizaciones) {
      localStorage.setItem("locations", JSON.stringify(localizacion));
    } else {
      localStorage.setItem("locations", JSON.stringify(localizacion));
    }
  });

  let isInfo = false;

  if (user && location.newLocation) {
    isInfo = true;
  }

  const saveLocation = () => {
    if (location) {
      const database = firebase.firestore();
      var ref = database.collection("location").doc(user.displayName);
      let array = [];

      let data = {
        lat: location.newLocation.lat,
        lng: location.newLocation.lng
      };

      saveLocalizacion([...localizacion, data]);
    }
  };





  return (
    <div className="container">
            <Alert variant="danger">
          Aviso importante, solo se muestran un total de 1500 casos en el mapa, para ayudar al rendimiento de la página.
      </Alert>
      {user ? (
        <Fragment>
          {" "}
          <Alert variant="primary">
            {" "}
            Haga click en el mapa y luego presione el boton de guardar.{" "}
          </Alert>{" "}
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <Alert variant="primary">
            {" "}
            Por favor, loguese con su cuenta de google para marcar un nuevo caso.{" "}
          </Alert>{" "}
        </Fragment>
      )}
      <Map className="markercluster-map"
        onClick={handleLocation}
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={currentLocation.zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {location.newLocation && (
          <Marker position={location.newLocation} icon={myIcon}>
            <Popup position={location.setLocation}>
              <Fragment>
                {" "}
                <pre>
                  Lat: {location.newLocation.lat} Lng:{" "}
                  {location.newLocation.lng}{" "}
                </pre>{" "}
              </Fragment>
            </Popup>
          </Marker>
        )}

        {
          user
          &&

          <Marker position={[lat, lng]} zoom={zoom}>
            <Popup position={setCurrentLocation}>
              <pre>Tu localización</pre>
            </Popup>  
          </Marker>

        }

        {
          coronavirus.slice(0, 1500).map((corona, i) => {
        
            if(corona.lat !== null && corona.long !== null){

            
            return (

                
              <Marker position={[corona.lat, corona.long]} icon={myIcon} key={i} >
                <Popup position={setCoronavirus}>
                  <Fragment>
                    <p>
                      País: {corona.countryRegion} <br />
                      Estado/Provincia: {corona.provinceState} <br />
                      Confirmados: {corona.confirmed} <br />
                      Recuperados: {corona.recovered} <br />
                      Muertes: {corona.deaths} <br />
                      Activos: {corona.active}{" "}
                    </p>
                  </Fragment>
                </Popup>
                
              </Marker>

            );
          }
          else{
            return ;
          }
          }) }

        {isInfo &&
          localizaciones.map((local, i) => {
            return (

              <Marker position={[local.lat, local.lng]} icon={myIcon} key={i}>
                <Popup position={saveLocalizacion}>
                  <pre>Casos de coronavirus</pre>
                </Popup>

              </Marker>

            );
          })}
      </Map>

      {isInfo && (
        <Fragment>
          {" "}
          <Button onClick={saveLocation} className="buttonLocal">
            {" "}
            Agregar localización{" "}
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default Maps;
