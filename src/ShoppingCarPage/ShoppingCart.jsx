import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCart } from "../Context/CartContext";
import { useMercadoPago } from "../Context/MercadopagoContext";

export default function ShoppingCart({ onClose}) {
  const { cartItems, setCartItems } = useCart();
  const { createPreference } = useMercadoPago();

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const loadMercadoPagoSDK = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject('Error loading MercadoPago SDK');
      document.head.appendChild(script);
    });
  };


  const handleCheckout = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('User is not logged in or email is not available');
      alert('Por favor, inicia sesión para continuar con la compra.');
      return;
    }
  
    try {
      await loadMercadoPagoSDK();
      console.log("Creating preference for:", cartItems);
      const preferenceId = await createPreference(cartItems, { email });
      console.log("Preference ID:", preferenceId);
    
      const mp = new window.MercadoPago('TEST-81ce8b94-a7c9-44b6-8951-afc10bf5ac15', {
        locale: 'es-CL'
      });
  
      mp.checkout({
        preference: {
          id: preferenceId
        },
        autoOpen: true
      });
    } catch (error) {
      console.error('Failed to load MercadoPago SDK', error);
    }
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {cartItems.length > 0 ? cartItems.map((item) => (
          <ListItem key={item._id} disablePadding>
            <ListItemButton>
              <ListItemText 
                primary={item.name} 
                secondary={`$${item.price} x ${item.quantity}`}
                primaryTypographyProps={{ style: { color: 'darkslategray' } }} 
                secondaryTypographyProps={{ style: { color: 'darkslategray' } }}
              />
              <IconButton onClick={() => removeFromCart(item._id)} edge="end" sx={{ color: 'darkslategray' }}>
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        )) : <ListItem>
            <ListItemText primary="No hay productos en el carrito." primaryTypographyProps={{ style: { color: 'darkslategray' } }} />
          </ListItem>}
      </List>
      <Divider />
      <Typography variant="h6" align="center" sx={{ my: 2, color: 'darkslategray' }}>
        Total: ${getTotalPrice().toFixed(2)}
      </Typography>
      { cartItems.length > 0 && (
        <button onClick={handleCheckout} style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: 'green', color: 'black', border: 'none', cursor: 'pointer' }}>
          Pagar con MercadoPago
        </button>
      )}
    </Box>
  );
}
