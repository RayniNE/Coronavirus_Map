import React, { useState, useEffect } from "react";
import './GlobalStats.css'

const GlobalStats = () => {
    const axios = require('axios');
    const [globalStats, setGlobalStats] = useState([]);

  useEffect(() => {
    axios
      .get("https://thevirustracker.com/free-api?global=stats")
      .then(res => {
       console.log(res.data.results[0]);
       setGlobalStats(res.data.results[0]);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="stats-container">
      <div className="total_cases"> 
        <h3>Casos totales: {globalStats.total_cases}</h3>
        </div>
        <div className="total_recovered">
        <h3>Casos recuperados: {globalStats.total_recovered}</h3>
        </div>
        <div className="active_cases">
        <h3>Casos activos: {globalStats.total_unresolved}</h3>
        </div>
        <div className="total_deaths">
        <h3>Muertes: {globalStats.total_deaths}</h3>
        </div>
        
    </div>
  );
};

export default GlobalStats;
