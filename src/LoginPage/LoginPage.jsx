import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useSnackbar } from "../Context/SnackBarConext"
import LoadingButton from '@mui/lab/LoadingButton';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const EndAdorment = ({ visible, setVisible }) => {
    return (
      <InputAdornment position='end'>
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(storedRememberMe);

    if (storedRememberMe) {
      const storedEmail = localStorage.getItem('email') || '';
      const storedPassword = localStorage.getItem('password') || '';
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const { errorSnackbar } = useSnackbar();

  const handleEmailValidation = (value) => {
    try {
      loginSchema.fields.email.validateSync(value);
      setEmailError('');
    } catch (error) {
      if (error.name === 'ValidationError') {
        setEmailError(error.errors[0]);
      }
      throw error;
    }
  };

  const handlePasswordValidation = (value) => {
    try {
      loginSchema.fields.password.validateSync(value);
      setPasswordError('');
    } catch (error) {
      if (error.name === 'ValidationError') {
        setPasswordError(error.errors[0]);
      }
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      handleEmailValidation(email);
      handlePasswordValidation(password);

      const response = await axios.post(
        `${process.env.REACT_APP_TEP_API}/auth/login`,
        {
          email,
          password,
        },
      );
      localStorage.setItem('token', response.data.token);
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      navigate('/institutions');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        errorSnackbar('Email o contraseña incorrectos');
      } else if (error.name === 'ValidationError') {
        console.error('Error de validación:', error.errors);
      } else {
        errorSnackbar('Error durante el inicio de sesión');
        console.error('Error durante el inicio de sesión:', error);
      }
    } finally {
      setLoading(false);
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
          marginTop: '100px',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ p: 6, minWidth: 560 }} elevation={3}>
          <img width='256' src='/logo.svg' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              mt: 6,
            }}
          >
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              sx={{ mb: 3 }}
              fullWidth
              required
              type='text'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              id='outlined-basic'
              label='Contraseña'
              variant='outlined'
              fullWidth
              required
              type={visible ? 'text' : 'password'}
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <EndAdorment visible={visible} setVisible={setVisible} />
                ),
              }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Recordar contraseña'
              sx={{ mb: 3 }}
              checked={rememberMe}
              onChange={handleRememberMeChange}
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
