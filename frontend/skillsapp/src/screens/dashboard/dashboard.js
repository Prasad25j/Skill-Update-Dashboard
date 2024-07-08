import React from 'react';
import Sidebar from './sidebar';
import MainContent from './MainContent';
import './Dashboard.css';
import { useContext } from 'react';
import { AppCtx } from '../../ctx';

const Dashboard2 = () => {
  const ctxobj = useContext(AppCtx);
  const Emp_id = ctxobj.ctx['Emp_id'];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard2;