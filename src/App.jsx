import './App.css'
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
import { createHashRouter, RouterProvider } from 'react-router-dom';


function App() {

  const router = createHashRouter(
    [
       {
           path: "/",
           children : [
               {
                   path: "/",
                   element: <MainPage />
                },
                {
                    path: "ingresa",
                    element: <LoginPage />
                },
                {
                    path: "catalogo",
                    element: <CataloguePage />
                },
                {
                  path: "perfil",
                  element: <PerfilPage />
               },
               {
                   path: "crearcuenta",
                   element: <CreatePage />
               },
               {
                   path: "info/:plantId",
                   element: <PlantInfoPage />
               }
           ]
       }
   ]
);

  return (
    <>
    <ThemeContextProvider>
      <MercadoPagoProvider>
        <CartProvider>
          <SnackbarContextProvider>      
          <RouterProvider router={router} />
          </SnackbarContextProvider>
        </CartProvider>
      </MercadoPagoProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App