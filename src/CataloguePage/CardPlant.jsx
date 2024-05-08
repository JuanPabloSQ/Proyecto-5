import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CardPlant = ({ cardName, cardBody, cardImage, addToCart }) => {
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
        <Button onClick={addToCart} variant="contained" color="primary">
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPlant;
