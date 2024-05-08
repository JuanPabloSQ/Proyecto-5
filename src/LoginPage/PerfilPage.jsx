import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import NavBar from "../NavBar/NavBar";

const apiUrl = 'http://localhost:3000';

const PerfilPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Recupera el `_id` almacenado como 'userId'
        const token = localStorage.getItem('token');
        if (!userId) {
            console.error('No userId found');
            return; // Detiene la ejecución si no se encuentra un userId
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <NavBar />
            <Box sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                {userData ? (
                    <>
                        <Typography variant="h5" color="black" gutterBottom>
                            {userData.name} {/* Nombre del usuario */}
                        </Typography>
                        <Typography variant="body1" color="black" gutterBottom>
                            Correo electrónico: {userData.email} {/* Correo electrónico del usuario */}
                        </Typography>
                        {/* Agrega más campos según sea necesario */}
                    </>
                ) : (
                    <Typography variant="body2" color="gray">
                        Cargando datos del usuario...
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default PerfilPage;
