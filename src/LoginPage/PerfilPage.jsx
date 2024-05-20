import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import NavBar from "../NavBar/NavBar";

const apiUrl = 'https://proyecto-5-service.vercel.app';

const PerfilPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
            console.error('No userId or token found');
            setError('No user ID or token found.');
            setLoading(false);
            return;
        }
    
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, []);
    return (
        <>
            <NavBar />
            <Box sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                {loading ? (
                    <Typography variant="body2" color="gray">Cargando datos del usuario...</Typography>
                ) : error ? (
                    <Typography variant="body2" color="error">{error}</Typography>
                ) : userData ? (
                    <>
                        <Typography variant="h5" color="black" gutterBottom>
                            {userData.name || 'Usuario sin nombre'} 
                        </Typography>
                        <Typography variant="body1" color="black" gutterBottom>
                            Correo electrónico: {userData.email}
                        </Typography>
                        <Typography variant="body1" color="black" gutterBottom>
                            Cuenta de Administrador: {userData.admin ? "Sí" : "No"}
                        </Typography>
                      
                    </>
                ) : (
                    <Typography variant="body2" color="gray">
                        No se encontraron datos del usuario.
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default PerfilPage;
