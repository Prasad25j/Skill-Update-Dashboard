import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { AppCtx } from '../../ctx';

function Login() {
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const ctxobj = useContext(AppCtx);
  const navigate = useNavigate();

  const validate = async () => {
    // Check if Employee Id and Password are provided
    if (!uname.trim() || !pwd.trim()) {
      alert('Please enter both Employee Id and Password.');
      return;
    }

    try {
      // Validate user credentials
      const response = await axios.post('http://127.0.0.1:8009/api/validate', {
        Emp_id: uname,
        pwd: pwd,
      });

      if (response.data.message === 'Valid User') {
        console.log('Login Successful!');
        console.log(response.data);

        // Fetch user details using Emp_id
        const empIdResponse = await axios.get(`http://127.0.0.1:8009/api/empdetailsget/${uname}`);
        const empIdData = empIdResponse.data;

        // Store user ID in ctx object
        ctxobj.setctx({ id: empIdData.id, Emp_id: empIdData.Emp_id });

        alert('Login successful');
        navigate('/dashboard');
      } else {
        alert('User is Invalid');
      }
    } catch (error) {
      console.error('error:', error);
      alert('Error Occurred');
    }
  };

  return (
    <>
      <div id="signup-div">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" style={{ color: '#035fb0', fontStyle: 'bold', padding: '10px' }}>
              LOGIN
            </Typography>
            <br />

            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="uname"
                label="Employee Id"
                name="uname"
                autoComplete="uname"
                variant="outlined"
                onChange={(event) => setUname(event.target.value)}
                style={{ marginBottom: '10px' }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="pwd"
                label="Password"
                type="password"
                id="pwd"
                autoComplete="current-password"
                variant="outlined"
                onChange={(event) => setPwd(event.target.value)}
                style={{ marginBottom: '10px' }}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={validate}
                sx={{
                  mt: 3,
                }}
              >
                Login
              </Button>
              <Link to="/SignUp1" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{
                    mt: 3,
                    display: 'block',
                  }}
                >
                  Not Registered yet? Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default Login;