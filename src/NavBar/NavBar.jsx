import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ShoppingCart from "../ShoppingCarPage/ShoppingCart";
import GrassIcon from '@mui/icons-material/Grass';

function NavBar() {
  const [openCart, setOpenCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/Proyecto-5/home');
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
          {isAuthenticated && (
            <>
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
                onClick={handleLogout}
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                CERRAR SESION
              </Typography>
            </>
          )}
          {!isAuthenticated && (
            <>
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
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleCart} color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={openCart}
        onClose={() => setOpenCart(false)}
        onOpen={() => setOpenCart(true)}
      >
        <ShoppingCart onClose={() => setOpenCart(false)} />
      </SwipeableDrawer>
    </AppBar>
  );
}

export default NavBar;
