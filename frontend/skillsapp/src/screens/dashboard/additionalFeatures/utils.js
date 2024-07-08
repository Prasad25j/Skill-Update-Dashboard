export function FilterSkill(recommendedSkills, existingSkills) {
    const list = [];
    const recommended = [];
    console.log(recommendedSkills, existingSkills)
  
    existingSkills.map((skills) => {
      list.push(skills.skill_name);
    });
    console.log(list)
  
    recommendedSkills.map((skills) => {
      if (list.includes(skills)) {
        console.log("Skill is already there");
      } else {
        recommended.push(skills);
      }
    });
    console.log(recommended)
  
    return recommended;
  }
  
  
  
  