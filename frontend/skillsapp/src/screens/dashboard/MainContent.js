import React from 'react';
import BarChartComponent from './Chartforskills';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import ListSkills1 from '../Listskills/Listskills1';

const MainContent = () => {
  return (
    <div className="main-content">
      <Navbar /><br />

      <div className="sidebar-box-container">
        <div className="sidebar-box add-skills">
          <center>
            <Link to="/AddSkills" style={{ fontSize: '1.5em', fontWeight: 'bold', fontStyle: 'Montserrat', color: 'white' }}>
              ADD SKILLS
            </Link>
          </center>
        </div>

        <div className="sidebar-box additional-features">
          <center>
            <Link to="/additionalfeatures" style={{ fontSize: '1.5em', fontWeight: 'bold', fontStyle: 'Verdana', color: 'white' }}>
              CHOOSE PATH
            </Link>
          </center>
        </div>
      </div>

      <div className="content-container">
        <BarChartComponent />
        <ListSkills1 />
      </div>
    </div>
  );
};

export default MainContent;