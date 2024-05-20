import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PlantInfo = () => {
    const { plantId } = useParams(); 
    const navigate = useNavigate();

    const [plant, setPlant] = useState(null); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://proyecto-5-service.vercel.app/plants/${plantId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlant(data);  
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [plantId]);

    const goBack = () => {
        navigate(-1); 
    };

    if (loading) return <p>Loading...</p>;  
    if (error) return <p>Error: {error}</p>;  

    return (
        <div>
        <NavBar />
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, padding: 2, backgroundColor: 'white' }}>
            {plant && (
                <>
                    <CardMedia
                        component="img"
                        height="300"
                        image={plant.image}
                        alt={plant.name}
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom color="black">
                            {plant.name}
                        </Typography>
                        <Typography variant="body1"  color="black">
                            {plant.description}
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
                            ${plant.price}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={goBack} sx={{ marginTop: 2 }}>
                            Volver
                        </Button>
                    </CardContent>
                </>
            )}
        </Card>
        </div>
    );
};

export default PlantInfo;