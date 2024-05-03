import './App.css'
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage/LoginPage';
import { ThemeContextProvider } from "./Context/ThemeContext";
import {SnackbarContextProvider} from "../src/Context/SnackBarConext";
import MainPage from "./MainPage.jsx/MainPage";
import CataloguePage from './CataloguePage/CataloguePage';
import RegistreUserPage from './RegistreUserPage/RegistreUserPage';
import ShoppingCarPage from './ShoppingCarPage/ShoppingCarPage';

function App() {
  return (
    <>
    <ThemeContextProvider>
      <SnackbarContextProvider>      
        <Routes>
          <Route path='/Proyecto-5/home' element={<MainPage />} />
          <Route path='/Proyecto-5/ingresa' element={<LoginPage />} />
          <Route path='/Proyecto-5/registrate' element={<RegistreUserPage />} />
          <Route path='/Proyecto-5/catalogo' element={<CataloguePage />} />
          <Route path='/Proyecto-5/shopping' element={<ShoppingCarPage />} />
        </Routes>
      </SnackbarContextProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App