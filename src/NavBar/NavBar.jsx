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
import ShoppingCart from '../ShoppingCarPage/Drawer';
import GrassIcon from '@mui/icons-material/Grass'; // Importa el icono GrassIcon

const pages = ['Home', 'Catalogo', 'Ingresa', 'Registrate'];

function NavBar() {
  const [openCart, setOpenCart] = useState(false); // Estado para controlar la apertura del carrito

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Icono GrassIcon */}
          <GrassIcon sx={{ marginRight: '8px', color: 'white' }} />

          {/* Texto VERDEVIDA */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            VERDEVIDA
          </Typography>

          {/* Espacio */}
          <Box sx={{ width: '20px' }} />

          {/* Texto HOME */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} // Tamaño de fuente más pequeño
          >
            HOME
          </Typography>

          {/* Espacio */}
          <Box sx={{ width: '20px' }} />

          {/* Texto CATALOGO */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/Proyecto-5/catalogo"
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }} // Tamaño de fuente más pequeño
          >
            CATALOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Botón del carrito */}
          <IconButton onClick={toggleCart} color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer para el carrito */}
      <SwipeableDrawer
        anchor="right"
        open={openCart}
        onClose={toggleCart}
        onOpen={() => {}}
      >
        <ShoppingCart onClose={toggleCart} />
      </SwipeableDrawer>
    </AppBar>
  );
}

export default NavBar;
