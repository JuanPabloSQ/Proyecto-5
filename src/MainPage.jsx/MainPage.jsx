import NavBar from "../NavBar/NavBar";
import BasicCard from "./BasicCard"
import Box from '@mui/material/Box';

const MainPage = () => {
  const imageUrl = 'https://p1.pxfuel.com/preview/161/509/211/flower-plant-orchid-nature.jpg';

  return (
    <Box sx={{ backgroundColor: 'black'}}>
      <NavBar />
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={10}>
        <BasicCard />
        <img 
          src={imageUrl} 
          alt="Fish" 
          style={{ 
            width: '50%', 
            marginRight: '20px'
          }} 
        />
      </Box>
    </Box>
  );
};

export default MainPage;