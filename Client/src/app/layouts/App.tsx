import React from 'react';

import NavBar from './NavBar';

import { Outlet } from 'react-router';

const App: React.FC = () => {



  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App;