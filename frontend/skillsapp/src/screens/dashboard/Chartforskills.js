import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import { AppCtx } from "../../ctx";

const BarChartComponent = () => {
  const [skillsData, setSkillsData] = useState([]);

  const ctxobj = useContext(AppCtx)
  const employee = ctxobj.ctx['id']
  
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8009/api/skills/${employee}`);
        setSkillsData(response.data);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    // Fetch skills data when emi_id changes
    if (employee) {
      fetchSkillsData();
    }
  }, []);
  console.log(skillsData)

  return (
    <div id="signup-div" style={{ width: '50%', margin: 'auto' }}>
      <Typography variant="h6" style={{backgroundColor: 'rgb(3, 94, 192)', color: 'white', padding: '7px',fontFamily:'MozAnimationName'}}>
        SKILLS RATING CHART
      </Typography><br /><br />
      <center>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={skillsData} barCategoryGap={0}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill_name" />
            <YAxis domain={[0, 5]} interval={1} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="proficiency_level" fill="rgb(5, 109, 220)" barSize={25} />
          
          </BarChart>
        </ResponsiveContainer>
      </center>
    </div>
  );
};

export default BarChartComponent;
