import './App.css'
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage/LoginPage';
import { ThemeContextProvider } from "./Context/ThemeContext";
import {SnackbarContextProvider} from "../src/Context/SnackBarConext";
import MainPage from "./MainPage.jsx/MainPage";
import CataloguePage from './CataloguePage/CataloguePage';
import RegistreUserPage from './RegistreUserPage/RegistreUserPage';
import PerfilPage from "./LoginPage/PerfilPage"
import CreatePage from "./LoginPage/CreatePage"
import PlantInfoPage from "./CataloguePage/PlantInfoPage";
import { CartProvider } from "./Context/CartContext"

function App() {
  return (
    <>
    <ThemeContextProvider>
      <CartProvider>
        <SnackbarContextProvider>      
          <Routes>
            <Route path='/Proyecto-5/home' element={<MainPage />} />
            <Route path='/Proyecto-5/ingresa' element={<LoginPage />} />
            <Route path='/Proyecto-5/registrate' element={<RegistreUserPage />} />
            <Route path='/Proyecto-5/catalogo' element={<CataloguePage />} />
            <Route path='/Proyecto-5/perfil' element={<PerfilPage />} />
            <Route path='/Proyecto-5/crearcuenta' element={<CreatePage />} />
            <Route path='/Proyecto-5/info/:plantId' element={<PlantInfoPage />} />
          </Routes>
        </SnackbarContextProvider>
      </CartProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App