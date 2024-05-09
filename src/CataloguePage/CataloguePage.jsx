import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPlant from "./CardPlant";
import NavBar from "../NavBar/NavBar";
import { useCart } from "../Context/CartContext"

const CataloguePage = () => {
  const [plants, setPlants] = useState([]);
  const { cartItems, setCartItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const addToCart = (plant) => {
    const itemExists = cartItems.find(item => item.id === plant._id);
    if (itemExists) {
      setCartItems(cartItems.map(item => item.id === plant._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...plant, quantity: 1 }]);
    }
    setDrawerOpen(true);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px', flexWrap: 'wrap' }}>
        {plants.map((plant) => (
          <div key={plant._id} style={{ margin: '16px', flex: '1 0 calc(25% - 32px)' }}>
            <CardPlant
              cardName={plant.name}
              cardBody={`Precio: ${plant.price}`}
              cardImage={plant.image}
              addToCart={() => addToCart(plant)}
              plantId={plant._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
