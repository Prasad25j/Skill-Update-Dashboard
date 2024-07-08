
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCtx } from "../../ctx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar/Navbar";
import Rating from "@mui/material/Rating";

function UpdateSkillss() {
  const [peid, setpeid] = useState("");
  const [eskills, seteskills] = useState("");
  const [erate, seterate] = useState(0); // Change the initial value to 0
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();
  const ctxobj = useContext(AppCtx);
  const employee = ctxobj.ctx["id"];
  const Emp_id = ctxobj.ctx["Emp_id"];

  const getSkills = async (Emp_id, id) => {
    const resp = await axios.get(`http://localhost:8009/api/skills/${employee}/${id}`);
    setpeid(resp.data.employee);
    seteskills(resp.data.skill_name);
    seterate(resp.data.proficiency_level);
  };

  const update = () => {
    const id = localStorage.getItem("skill_id");
    const url = `http://localhost:8009/api/skills/${employee}/${id}`;
    axios
      .put(url, {
        employee: employee,
        skill_name: id,
        proficiency_level: erate,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          alert("Skill Updated Successfully!");
          navigate("/dashboard");
        }
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/dashboard");
  };


  useEffect(() => {
    const id = localStorage.getItem("skill_id");
    console.log(id);
    getSkills(employee, id);
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
            UPDATE YOUR SKILL DETAILS
          </Typography>
         
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Skill"
            value={eskills}
            onChange={(event) => seteskills(event.target.value)}
            disabled
          />
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
          <Button variant="contained" color="primary" onClick={update}>
            Update
          </Button>
          <br /><br/>
          <Link to="/dashboard">Cancel</Link>
          <br />
        </Box>
      </Modal>
    </>
  );
}

export default UpdateSkillss;
