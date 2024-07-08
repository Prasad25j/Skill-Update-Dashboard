import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import Navbar from '../Navbar/Navbar';
import PersonIcon from '@mui/icons-material/Person';
import { AppCtx } from "../../ctx";

const Profile3 = () => {
  const [Employee, setEmployee] = useState([]);
  const ctxobj = useContext(AppCtx);
  const id = ctxobj.ctx['id'];

  const getEmployeeDetails = async (id) => {
    try {
      const resp = await axios.get(`http://127.0.0.1:8009/api/empdetails/${id}`);
      setEmployee(resp.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    getEmployeeDetails(id)
  }, []);

  const renderDetailRow = (icon, text) => (
    <Grid item container spacing={1} alignItems="center">
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle1">{text}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
    <Navbar />
    <div style={{ padding: '20px' }}>
      
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Avatar sx={{ width: 100, height: 100, margin: 'auto', backgroundColor: 'rgb(0, 149, 255)' }}>
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {Employee.Emp_name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {Employee.Emp_department}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={2}>
            <Grid container spacing={4} direction="row">
              {renderDetailRow(<AssignmentIndIcon />, Employee.Emp_id)}
              {renderDetailRow(<EmailIcon />, Employee.email)}
              {renderDetailRow(<WorkIcon />, Employee.Emp_designation)}
              {renderDetailRow(<PhoneIcon />, Employee.Emp_phone)}
              
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Grid container spacing={4} direction="row">
             {renderDetailRow(<LocationOnIcon />, Employee.Emp_location)}
              {renderDetailRow(<EventIcon />, Employee.Emp_doj)}
              {renderDetailRow(<SupervisorAccountIcon />, Employee.Emp_manager)}
              {renderDetailRow(<GroupWorkIcon />, Employee.Emp_project)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </>
  );
};

export default Profile3;