import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CardPlant = ({ cardName, cardBody, cardImage, addToCart, plantId }) => {
  const navigate = useNavigate();

  const goToPlantInfo = () => {
    navigate(`/Proyecto-5/info/${plantId}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardImage}
          alt={cardName}
        />
        <CardContent>
          <Typography variant="h5" color="black">
            {cardName}
          </Typography>
          <Typography variant="body2" color="black">
            {cardBody}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={addToCart} variant="contained" color="primary" sx={{ marginRight: 5 }}>
          Comprar
        </Button>
        <Button onClick={goToPlantInfo} variant="outlined" color="primary">
          Ver Más
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPlant;
