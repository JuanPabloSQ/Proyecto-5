import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CardPlant = ({ cardName, cardBody, cardImage }) => {
  return (
    <Card sx={{ width: 200 }}>
        <CardMedia
          component="img"
          height="200"
          image={cardImage}
        />
        <CardContent sx={{ height: 60 }} >
          <Typography variant="body2" color="black">
            <Typography>
              {cardName}
            </Typography>
            {cardBody}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPlant;