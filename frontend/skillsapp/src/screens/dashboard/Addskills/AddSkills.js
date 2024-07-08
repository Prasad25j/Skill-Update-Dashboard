  import axios from "axios";
  import { useEffect, useState, useContext } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";
  import Modal from "@mui/material/Modal";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Rating from "@mui/material/Rating";
  import { AppCtx } from "../../../ctx";
  import Navbar from "../../Navbar/Navbar";
  
  function AddSkillss() {
    const [peid, setpeid] = useState("");
    const [eskills, seteskills] = useState("");
    const [erate, seterate] = useState(0);
    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();
    const ctxobj = useContext(AppCtx);
    const employee = ctxobj.ctx["id"];
  
    const getEmpId = async () => {
      setpeid(employee);
    };
  
    const skills = [
   "",
      "Python",
      "C",
      "SQL",
      "Power BI",
      "Hadoop",
      "AWS",
      "Git",
      "Agile",
      "Flask",
      "Django",
      "Linux",
      "Testing",
      "Terraform",
      "Containers and Kubernetes",
      "Azure" , 
      "Django",
      "HTML",
      "CSS",
      "Java Script",
      "React JS" ,
      "Azure Data Factory",
      "Azure Synapse Analytics",
      "Azure Stream Analytics",
      "Azure Databricks",
      "Azure Event Hub",
      "Azure SQL DB"           
    ];
  
    const add = async () => {
      try {
        const id = localStorage.getItem("skill_id");
        const url = `http://localhost:8009/api/skills`;
  
        // Check if the skill already exists
        const checkResponse = await axios.get(`http://localhost:8009/api/skills/${employee}`);
        const skillExists = checkResponse.data.some(
          (skill) => skill.skill_name === eskills
        );
    
        if (skillExists) {
          alert("Skill already exists!");
        } else {
          // If the skill doesn't exist, proceed to add it
          const response = await axios.post(url, {
            
            employee: peid,
            skill_name: eskills,
            proficiency_level: erate,
          });
  
          console.log(response);
  
          if (response.status === 201) {
            alert("Skill added Successfully!");
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error checking skill existence or adding skill:", error);
      }
    };
  
  
    const handleCloseModal = () => {
      setOpenModal(false);
      navigate("/dashboard");
    };
  
    useEffect(() => {
      getEmpId();
    }, []);
  
    return (
      <>
        <Navbar />
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              ADD NEW SKILL
            </Typography>
            
            <br />
            <TextField
              select
              required
              id="outlined-required"
              label="Skill"
              value={eskills}
              onChange={(event) => seteskills(event.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </TextField>
            <br />
            <br />
            <Rating
              name="rating"
              value={erate}
              onChange={(event, newValue) => {
                seterate(newValue);
              }}
              size="large"
            />
            <br /><br/>
            <Button variant="contained" color="primary" onClick={add}>
              Add
            </Button>
            <br /><br/>
            <Link to="/dashboard">Cancel</Link>
            <br />
          </Box>
        </Modal>
      </>
    );
  }
  
  export default AddSkillss;