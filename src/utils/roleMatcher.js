export const getSuitableRoles = (completedSkillsObj) => {
  const skills = Object.keys(completedSkillsObj || {});
  const hasSkill = (id) => skills.includes(id);

  const roles = [];

  // Data Scientist / Analyst
  if (hasSkill('p1_s1') && hasSkill('p1_s3') && hasSkill('p2_s1')) {
    if (hasSkill('p2_s2')) {
      roles.push({ 
        title: 'Data Scientist', 
        desc: 'Capable of analyzing complex datasets and building robust predictive models.' 
      });
    } else {
      roles.push({ 
        title: 'Data Analyst', 
        desc: 'Proficient in data manipulation, statistics, and exploratory data analysis.' 
      });
    }
  }

  // Deep Learning Engineer
  if (hasSkill('p3_s1') && hasSkill('p3_s2')) {
    roles.push({ 
      title: 'Deep Learning Engineer', 
      desc: 'Specialized in designing, building, and training complex neural networks using PyTorch.' 
    });
  }

  // AI Application Engineer
  if (hasSkill('p4_s1') && hasSkill('p4_s2') && hasSkill('p4_s3')) {
    roles.push({ 
      title: 'AI Application Engineer', 
      desc: 'Ready to build next-generation applications powered by LLMs and Retrieval-Augmented Generation.' 
    });
  }

  // MLOps Engineer
  if (hasSkill('p5_s1')) {
    if (hasSkill('p5_s2') || hasSkill('p5_s3')) {
      roles.push({ 
        title: 'MLOps Engineer', 
        desc: 'Skilled at deploying, tracking, and managing machine learning models in production environments.' 
      });
    } else {
      roles.push({
        title: 'ML Deployment Engineer',
        desc: 'Capable of serving machine learning models via REST APIs using FastAPI/Docker.'
      });
    }
  }
  
  if (roles.length === 0 && skills.length > 0) {
    roles.push({ 
      title: 'AI Enthusiast', 
      desc: 'Actively building foundational knowledge on the path to becoming an AI professional.' 
    });
  } else if (roles.length === 0) {
     roles.push({ 
      title: 'Aspiring AI Engineer', 
      desc: 'Ready to start learning and tackling the challenges of artificial intelligence.' 
    });
  }

  return roles;
};
