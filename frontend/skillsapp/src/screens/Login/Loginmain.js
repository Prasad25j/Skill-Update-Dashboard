import React from 'react';
import './Login.css';
import Sidebar2 from './sidebarlogin';
import MainContentlogin from './MainContentlogin';


const LoginMain = () => {
  
  return (
    <div className="login">
      <Sidebar2 />
      <div>
        <MainContentlogin />
      </div>
    </div>
  );
};

export default LoginMain;