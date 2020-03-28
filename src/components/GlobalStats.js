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
        <h3>Casos totales: {globalStats.total_cases}</h3>
        <h3>Casos recuperados: {globalStats.total_recovered}</h3>
        <h3>Casos activos: {globalStats.total_unresolved}</h3>
        <h3>Muertes: {globalStats.total_deaths}</h3>
    </div>
  );
};

export default GlobalStats;
