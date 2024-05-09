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

export default function ShoppingCart({ onClose }) {
  const { cartItems, setCartItems } = useCart();

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
    </Box>
  );
}
