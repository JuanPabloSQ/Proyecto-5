import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, TextField, InputAdornment, IconButton, Paper, FormControlLabel, Checkbox } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from "../Context/SnackBarConext";
import * as yup from 'yup';

const apiUrl = 'http://localhost:3000'; 

const loginSchema = yup.object().shape({
  email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { errorSnackbar } = useSnackbar();

  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(storedRememberMe);
    if (storedRememberMe) {
      setEmail(localStorage.getItem('email') || '');
      setPassword(localStorage.getItem('password') || '');
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      navigate('/Proyecto-5/home');
    } catch (error) {
      setLoading(false);
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          if (err.path === 'email') setEmailError(err.message);
          if (err.path === 'password') setPasswordError(err.message);
        });
      } else if (error.response && error.response.status === 401) {
        errorSnackbar('Email o contraseña incorrectos');
      } else {
        errorSnackbar('Error durante el inicio de sesión');
      }
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    localStorage.setItem('rememberMe', !rememberMe);
  };

  return (
    <Grid container direction='row' justifyContent='center'>
      <Grid
        item
        lg={4}
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          marginTop: '20px',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ p: 6, minWidth: 560 }} elevation={3}>
          <img src='https://cdn-icons-png.flaticon.com/512/6873/6873284.png' alt="Login Icon" width='256' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              mt: 6,
              gap: 2,  
            }}
          >
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              fullWidth
              required
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ marginBottom: 1}} 
              InputProps={{
                style: { color: 'black' }  
              }}
            />
            <TextField
              id='password'
              label='Contraseña'
              variant='outlined'
              fullWidth
              required
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: 'black' } 
              }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
              label='Recordar contraseña'
              sx={{ marginTop: 2, color: 'black' }} 
            />
            <LoadingButton
              variant='contained'
              color='primary'
              onClick={handleLogin}
              disabled={loading}
              loading={loading}
            >
              Entrar
            </LoadingButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
