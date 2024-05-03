import './App.css'
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage/LoginPage';
import { ThemeContextProvider } from "./Context/ThemeContext";
import {SnackbarContextProvider} from "../src/Context/SnackBarConext";
import MainPage from "./MainPage.jsx/MainPage";

function App() {
  return (
    <>
    <ThemeContextProvider>
      <SnackbarContextProvider>      
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </SnackbarContextProvider>
    </ThemeContextProvider>
    </>
  )
}

export default App