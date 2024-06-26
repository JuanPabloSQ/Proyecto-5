import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import NavBar from "../NavBar/NavBar";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useSnackbar } from "../Context/SnackBarConext";

const apiUrl = 'https://proyecto-5-service.vercel.app';

const CreatePage = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { successSnackbar, errorSnackbar } = useSnackbar();

    const handleCreateUser = async () => {
        if (!name || !email || !password || !confirmPassword) {
            errorSnackbar('Por favor complete todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            errorSnackbar('Las contraseñas no coinciden.');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/users/`, {
                name,
                email,
                password,
                admin: false
            });
            console.log('Usuario creado:', response.data);
            successSnackbar('Usuario creado exitosamente.');
            window.location.href = '/ecommerce-service/'; 
        } catch (error) {
            console.error('Error al crear usuario:', error);
            let message = 'Error al crear usuario. Por favor verifique la conexión y los datos.';
            if (error.response && error.response.data) {
                message = error.response.data.errors 
                    ? error.response.data.errors.map(e => e.msg).join(', ')
                    : error.response.data.message || message;
            }
            errorSnackbar(message);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <NavBar />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <Typography component="h1" variant="h5">
                    Crear perfil
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        style: { color: 'black' },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Repetir Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        style: { color: 'black' },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleCreateUser}
                >
                    Crear Usuario
                </Button>
            </Box>
        </>
    );
};

export default CreatePage;
