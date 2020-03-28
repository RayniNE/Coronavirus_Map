import React, { useState, useEffect, Fragment } from "react";
import { Button, Alert } from "react-bootstrap";
import firebase from "firebase";
import { Map, TileLayer, Marker, Popup,} from "react-leaflet";
import { Icon } from 'leaflet';
import "./Maps.css";

const myIcon = new Icon({
  iconUrl: '/marker.svg',
  iconSize: [50, 50]
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
      {user ? (
        <Fragment>
          {" "}
          <Alert variant="primary">
            {" "}
            Haga click en el mapa y luego presione el boton de guardar{" "}
          </Alert>{" "}
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <Alert variant="primary">
            {" "}
            Por favor, loguese con su cuenta de google{" "}
          </Alert>{" "}
        </Fragment>
      )}
      <Map
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
          coronavirus.slice(0, 250).map(corona => {
            return (
              <Marker position={[corona.lat, corona.long]} >
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
          })}

        {isInfo &&
          localizaciones.map((local, i) => {
            return (
              <Marker position={[local.lat, local.lng]} icon={myIcon}>
                <Popup position={saveLocalizacion}>
                  <pre>Casos de coronavirus</pre>
                </Popup>
              </Marker>
            );
          })}
      </Map>
      <br></br>
      {isInfo && (
        <Fragment>
          {" "}
          <Button onClick={saveLocation} className="buttonLocal">
            {" "}
            Agregar localización{" "}
          </Button>
        </Fragment>
      )}
      {user && (
        <Button onClick={navCurrentLocation} className="button">
          Localizarme
        </Button>
      )}
    </div>
  );
};

export default Maps;
