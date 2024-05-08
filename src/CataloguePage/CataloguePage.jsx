import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPlant from "./CardPlant";
import NavBar from "../NavBar/NavBar"

const CataloguePage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/plants');
        setPlants(response.data.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <NavBar /> {/* Agrega la barra de navegación */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px', flexWrap: 'wrap' }}> {/* Agrega flex-wrap para que las tarjetas se envuelvan y se muestren en filas */}
        {plants.map((plant) => (
          <div key={plant._id} style={{ margin: '16px', flex: '1 0 calc(25% - 32px)' }}> {/* Aplica margen y ancho flexible para cada tarjeta */}
            <CardPlant
              cardName={plant.name}
              cardBody={`Precio: ${plant.price}`}
              cardImage={plant.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
