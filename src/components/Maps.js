import React from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import './Maps.css';

const Maps = () => {

  const axios = require('axios');


  
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