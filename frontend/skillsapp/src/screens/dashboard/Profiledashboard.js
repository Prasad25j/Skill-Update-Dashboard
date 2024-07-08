import { useState, useContext } from "react"
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
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
import PersonIcon from '@mui/icons-material/Person';
import { AppCtx } from "../../ctx";


const Profiledashboard = () => {
  const [Employee,setEmployee] = useState([]);
    const navigate = useNavigate()

    const ctxobj = useContext(AppCtx)
    const id = ctxobj.ctx['id']
    
    const getEmployeeDetails = async (id) => {
      try {
          const resp = await axios.get(`http://127.0.0.1:8009/api/empdetails/${id}`);
          setEmployee(resp.data)
          
          return resp.data;
      } catch (error) {
          console.error("Error fetching employee details:", error);
          throw error; 
      }
  };
  
  useEffect( () => {
    getEmployeeDetails(id)
}, []);

  return (
    
    
      <div>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10} sm={14} textAlign="center">
          <Avatar sx={{ width: 100, height: 100,margin:'auto',  backgroundColor: 'rgb(0, 149, 255)'}}>
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
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AssignmentIndIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_id}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <WorkIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_designation}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <PhoneIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_phone}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_location}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <EventIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_doj}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SupervisorAccountIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_manager}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <GroupWorkIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{Employee.Emp_project}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profiledashboard;