import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";


import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
} from "@mui/material";

function SignUp1() {
  const [Emp_id, setEmp_id] = useState("");
  const [Emp_name, setEmp_name] = useState("");
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [Emp_designation, setEmp_designation] = useState("");
  const [Emp_department, setEmp_department] = useState("");
  const [Emp_phone, setEmp_phone] = useState("");
  const [Emp_location, setEmp_location] = useState("");
  const [Emp_doj, setEmp_doj] = useState("");
  const [Emp_manager, setEmp_manager] = useState("");
  const [Emp_project, setEmp_project] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    validateField(value, field);
  };

  const validateField = (value, field) => {
    switch (field) {
      case "Emp_id":
        setEmp_id(value);
        validateEmpId(value);
        break;

    
      case "email":
        setemail(value);
        validateEmail(value);
        break;
      case "pwd":
        setpwd(value);
        validatePassword(value);
        break;
    
      case "Emp_phone":
        setEmp_phone(value);
        validatePhoneNumber(value);
        break;
    
      default:
        break;
    }
  };

  const validateEmpId = (value) => {
    const empIdRegex = /^F\d{5}$/;
    const isValid = empIdRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      Emp_id: isValid ? "" : "Employee ID should start with F and have 5 digits after that",
    }));
    setIsButtonDisabled(Object.values(validationErrors).some((error) => !!error));
  };

  const validateRequired = (value, field) => {
    const isValid = value.trim() !== "";
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: isValid ? "" : `Please enter your ${field.replace("Emp_", "")}`,
    }));
    setIsButtonDisabled(Object.values(validationErrors).some((error) => !!error));
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      email: isValid ? "" : "Please enter a valid email address",
    }));
    setIsButtonDisabled(Object.values(validationErrors).some((error) => !!error));
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const isValid = passwordRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      pwd: isValid
        ? ""
        : "Password must be at least 8 characters long with 1 special character, 1 lowercase, 1 uppercase, and 1 number",
    }));
    setIsButtonDisabled(Object.values(validationErrors).some((error) => !!error));
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    const isValid = phoneRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      Emp_phone: isValid ? "" : "Please enter a valid 10-digit phone number",
    }));
    setIsButtonDisabled(Object.values(validationErrors).some((error) => !!error));
  };

  const SignUp = () => {
    const url = "http://127.0.0.1:8009/api/empdetails";
    axios
      .post(url, {
        Emp_id,
        Emp_name,
        email,
        pwd,
        Emp_designation,
        Emp_department,
        Emp_phone,
        Emp_location,
        Emp_doj,
        Emp_manager,
        Emp_project,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          alert("You have registered successfully!");
          navigate("/loginmain");
        }
      });
  };

  return (
    <>
    <div className="backdiv-div" style={{ backgroundColor: '#035fb0' }}>
      <br />
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "20px",
        maxWidth: "500px",
        margin: "50px auto 0 auto", 
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", 
        background: "linear-gradient(to bottom, #ffffff, #f5f5f5)", 
        backgroundColor:'#035fb0',
      }}
    ><br/><br/><br/>
      <div id="employeeform">
        <center >
        <Typography variant="h5" style={{ color: '#035fb0', fontStyle: 'bold', padding: '10px' }}>
          REGISTRATION FORM
        </Typography><br/><br/>

        </center>
        <form className="employee-form">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Employee Id"
                variant="filled"
                fullWidth
                onBlur={(event) => handleInputChange(event, "Emp_id")}
                error={!!validationErrors.Emp_id}
                helperText={validationErrors.Emp_id}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_name(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                fullWidth
                onBlur={(event) => handleInputChange(event, "email")}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                fullWidth
                type="password"
                onBlur={(event) => handleInputChange(event, "pwd")}
                error={!!validationErrors.pwd}
                helperText={validationErrors.pwd}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Designation"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_designation(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Department"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_department(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Phone No:"
                variant="filled"
                fullWidth
                onBlur={(event) => handleInputChange(event, "Emp_phone")}
                error={!!validationErrors.Emp_phone}
                helperText={validationErrors.Emp_phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Location"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_location(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="DOJ"
                type="date"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_doj(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Manager"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_manager(event.target.value);
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                label="Project"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  setEmp_project(event.target.value);
              }}
              />
            </Grid>
          </Grid><br />
          <center>
            <Button variant="contained" onClick={SignUp} disabled={isButtonDisabled}>
              Sign Up
            </Button>
            <br /> <br />
            <center>
              <Link to="/loginmain">Already Registered? Login</Link> <br /> <br />
            </center>
          </center>
        </form>
      </div>
      </Box>
      </div>
    </>
  );
}

export default SignUp1;