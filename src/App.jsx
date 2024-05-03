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
          <Route path='/home' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registre' element={<RegistreUserPage />} />
          <Route path='/catalogue' element={<CataloguePage />} />
          <Route path='/shopping' element={<ShoppingCarPage />} />
        </Routes>
      </SnackbarContextProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App