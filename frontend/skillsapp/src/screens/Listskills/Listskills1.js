import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppCtx } from "../../ctx";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function ListSkills1() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const ctxobj = useContext(AppCtx);
  const employee = ctxobj.ctx["id"];
  
  const getSkills = async () => {
    const resp = await axios.get(`http://127.0.0.1:8009/api/skills/${employee}`);
    setSkills(resp.data);
  };

  const editData = (skill) => {
    localStorage.setItem("skill_id", skill);
    navigate("/updateskills2");
  };

  const deleteSkill = async (skil) => {
    try {
      await axios.delete(`http://127.0.0.1:8009/api/skills/${employee}/${skil}`);
      alert("Skill deleted successfully");
      getSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      
    }
  };

  useEffect(() => {
    getSkills(employee);
  }, []);

  return (
    <>
    <div id="signup-div" style={{ width: '38%', margin: 'auto' }}>
      <Typography variant="h6" style={{ backgroundColor: 'rgb(3, 94, 192)', color: 'white', padding: '7px', fontFamily: 'Myriad Pro Regular' }}>
        LISTING SKILLS
      </Typography><br />
      
      <div id="users-table">
        <center>
          <table border="1" style={{ width: '80%' }}>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Proficiency</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.skill_id}>
                  <td>{skill.skill_name}</td>
                  <td>
                    <Rating
                      name={`rating-${skill.skill_id}`}
                      value={skill.proficiency_level}
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                    />
                  </td>
                  <td>
                    <button onClick={() => editData(skill.skill_name)}><EditIcon /></button>
                  </td>
                  <td>
                    <button onClick={() => deleteSkill(skill.skill_name)}><DeleteIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
      <br /><br />
      <center>
       
        <br /><br />
      </center>
    </div>
    </>
  );
}

export default ListSkills1;