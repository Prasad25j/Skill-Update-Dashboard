import React from 'react';
import { Link } from 'react-router-dom'; 
import Profiledashboard from './Profiledashboard';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Profiledashboard /> 
    </div>
  );
};

export default Sidebar;