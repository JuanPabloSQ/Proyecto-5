import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, width: '700px', height: '578px', borderRadius: 0, backgroundColor: 'black' }}>
      <CardContent sx={{ mt: 10 }}>
        <Typography sx={{ fontSize: 20, mb: 1, color: 'white' }} gutterBottom>
          <span style={{ color: 'rgba(255, 0, 0, 0.8)' }}>BIENVENIDOS A</span>
        </Typography>
        <Typography variant="h2" component="div" sx={{ mb: 2 }}>
          <span style={{ color: 'white' }}>VERDEVIDA </span>
        </Typography>
        <Typography variant="h2" component="div" sx={{ mb: 2 }}>
          <span style={{ color: 'white' }}>HUERTO</span>
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
          Especializados en plantas para tu hogar
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Link to="/Proyecto-4/reserva" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Revisa nuestro catalogo</Button>
        </Link>
      </CardActions>
    </Card>
  );
}