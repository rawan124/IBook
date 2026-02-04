import React from 'react';

//import RegistrationPage from '../../features/RegistrationPage';
import NavBar from './NavBar';
import LandingPage from '../../features/LandingPage';
//import { Outlet } from 'react-router';
//import ChangePassword from '../../features/ChangePassword';
const App: React.FC = () => {



  return (
    <>
      <NavBar />
      <LandingPage />
    </>
  )
}

export default App;