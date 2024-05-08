import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPlant from "./CardPlant"

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {plants.map((plant) => (
        <CardPlant
          key={plant._id}
          cardName={plant.name}
          cardBody={`Precio: ${plant.price}`}
          cardImage={plant.image}
        />
      ))}
    </div>
  );
};

export default CataloguePage;