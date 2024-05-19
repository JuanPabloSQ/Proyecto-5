import './App.css'
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage/LoginPage';
import { ThemeContextProvider } from "./Context/ThemeContext";
import {SnackbarContextProvider} from "../src/Context/SnackBarConext";
import MainPage from "./MainPage.jsx/MainPage";
import CataloguePage from './CataloguePage/CataloguePage';
import PerfilPage from "./LoginPage/PerfilPage"
import CreatePage from "./LoginPage/CreatePage"
import PlantInfoPage from "./CataloguePage/PlantInfoPage";
import { CartProvider } from "./Context/CartContext";
import { MercadoPagoProvider } from "./Context/MercadopagoContext";


function App() {
  return (
    <>
    <ThemeContextProvider>
      <MercadoPagoProvider>
        <CartProvider>
          <SnackbarContextProvider>      
            <Routes>
              <Route path='/Proyecto-5/' element={<MainPage />} />
              <Route path='/Proyecto-5/home' element={<MainPage />} />
              <Route path='/Proyecto-5/ingresa' element={<LoginPage />} />
              <Route path='/Proyecto-5/catalogo' element={<CataloguePage />} />
              <Route path='/Proyecto-5/perfil' element={<PerfilPage />} />
              <Route path='/Proyecto-5/crearcuenta' element={<CreatePage />} />
              <Route path='/Proyecto-5/info/:plantId' element={<PlantInfoPage />} />
            </Routes>
          </SnackbarContextProvider>
        </CartProvider>
      </MercadoPagoProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App