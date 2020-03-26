import React, {useState} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './Maps.css';

const Maps = () => {

  // const [data, agregarData] = useState([]);

  // const consultarAPI = async () => {
  //   const api = await fetch('https://covid19.mathdro.id/api/confirmed');
  //   const info = await api.json();
  //   agregarData();
  //   console.log(data);
  // };
  // consultarAPI();


    return (
        <div className="container">

            <Map center={[18.547554, -69.915224]} zoom={5}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />
             </Map>
        </div>
      );
}
 
export default Maps;