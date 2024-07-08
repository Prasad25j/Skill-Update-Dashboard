import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FilterSkill } from "./utils";
import { AppCtx } from "../../../ctx";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import Navbar from "../../Navbar/Navbar";

const SkillRecommendationForm = () => {
  const [selectedField, setSelectedField] = useState("");
  const [existingSkills, setExistingSkills] = useState([]);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [recommendate, setRecommendate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const ctxobj = useContext(AppCtx);
  const employee = ctxobj.ctx["id"];

  const fetchExistingSkills = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8009/api/skills/${employee}`);
      setExistingSkills(response.data);
    } catch (error) {
      console.error("Error fetching existing skills:", error);
      setError("Error fetching existing skills. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedField) {
      fetchExistingSkills(employee);
    }
  }, [selectedField]);

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
    setRecommendedSkills([]);
    setError(null);
  };

  const handleRecommendSkills = async () => {
    setLoading(false);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8009/api/Careertrack/${selectedField}`
      );

      const recommendedSkills = response.data.Skills;
      
      const recommended = FilterSkill(recommendedSkills[selectedField], existingSkills);
      setRecommendate(recommended);

      setLoading(false);

      if (recommended.length === 0) {
        alert("You have all the skills that are needed.");
      } else {
        handleOpenModal();
      }
    } catch (error) {
      console.error("Error fetching recommended skills:", error);
      setError("Error fetching recommended skills. Please try again.");
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Navbar />
      <div id="signup-div">
        <Box>
          <Typography
            variant="h5"
            style={{
              backgroundColor: "rgb(23, 23, 99)",
              color: "white",
              padding: "10px",
            }}
          >
            Choose Your Paths
          </Typography>
          <Box
            sx={{
              border: 1,
              borderRadius: 4,
              padding: 2,
              marginTop: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="field-label">Choose Path</InputLabel>
              <Select
                label="Select Field"
                labelId="field-label"
                value={selectedField}
                onChange={handleFieldChange}
                fullWidth
              >
                <MenuItem value="Full Stack">Full Stack</MenuItem>
                <MenuItem value="Devops">DevOps</MenuItem>
                <MenuItem value="Data Engineer">Data Engineer</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Azure">Azure</MenuItem>
              </Select>
            </FormControl>
            <br />

            {existingSkills.length > 0 && (
              <div>
                <h3>Your Existing Skills:</h3>
                <ul>
                  {existingSkills.map((skill) => (
                    <li key={skill.skill_name}>{skill.skill_name}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleRecommendSkills}
              disabled={!selectedField || loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? "Loading..." : "Recommend Skills"}
            </Button>

            {error && <div style={{ color: "red" }}>{error}</div>}

           
            <Modal
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  }}
  BackdropProps={{
    timeout: 100000,
  }}
>
  <Fade in={openModal}>
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <h3 style={{padding:"10px",backgroundColor:"#035fb0", color: "white", fontSize: "0.9rem", marginBottom: "10px",fontFamily:"serif" }}>
        RECOMMENDED SKILLS FOR THE CHOSEN PATH
      </h3>
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
        }}
      >
        {recommendate.map((skill) => (
          <li key={skill} style={{ margin: "5px 0", fontSize: "1.2rem" }}>
            {skill}
          </li>
        ))}
      </ul>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={handleCloseModal}
      >
        Close
      </Button>
    </div>
  </Fade>
</Modal>
          </Box>
        </Box>
        <center>
          <Link to="/dashboard">Go back to Dashboard</Link> <br /> <br />
        </center>
      </div>
    </>
  );
};

export default SkillRecommendationForm;