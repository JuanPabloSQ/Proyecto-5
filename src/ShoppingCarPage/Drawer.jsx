import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShoppingCart({ open, onClose, cartItems, setCartItems }) {
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {cartItems && cartItems.length > 0 ? cartItems.map((item) => (
          <ListItem key={item._id} disablePadding>
            <ListItemButton>
              <ListItemText 
                primary={item.name} 
                secondary={`$${item.price} x ${item.quantity}`} 
                primaryTypographyProps={{ style: { color: 'black' } }} 
                secondaryTypographyProps={{ style: { color: 'black' } }}
              />
              <IconButton onClick={() => removeFromCart(item._id)} edge="end" color="inherit">
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        )) : (
          <ListItem>
            <ListItemText primary="No hay productos en el carrito." primaryTypographyProps={{ style: { color: 'black' } }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}
