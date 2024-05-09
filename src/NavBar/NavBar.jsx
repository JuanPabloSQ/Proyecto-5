import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ShoppingCart from "../ShoppingCarPage/ShoppingCart";
import GrassIcon from '@mui/icons-material/Grass'; 
import { useCart } from "../Context/CartContext";

function NavBar() {
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GrassIcon sx={{ marginRight: '8px', color: 'white' }} />
          <Typography variant="h6" noWrap component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            VERDEVIDA
          </Typography>       
          <Box sx={{ width: '20px' }} />        
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/home"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }}
          >
            HOME
          </Typography>
          <Box sx={{ width: '20px' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/catalogo"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} 
          >
            CATALOGO
          </Typography>
          <Box sx={{ width: '20px' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/perfil"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} 
          >
            PERFIL
          </Typography>
          <Box sx={{ width: '20px' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/ingresa"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} 
          >
            INICIA SESION
          </Typography>
          <Box sx={{ width: '20px' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/crearcuenta"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} 
          >
            CREAR CUENTA
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleCart} color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <SwipeableDrawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <ShoppingCart onClose={() => setOpenCart(false)} />
      </SwipeableDrawer>
    </AppBar>
  );
}

export default NavBar;
