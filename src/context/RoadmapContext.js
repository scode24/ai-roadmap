import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurriculum } from '../data/curriculum';

const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  // modes: "1m", "3m", "6m", "comprehensive"
  const [timelineMode, setTimelineMode] = useState(() => {
    return localStorage.getItem('timelineMode') || 'comprehensive';
  });

  const [completedSkills, setCompletedSkills] = useState(() => {
    const saved = localStorage.getItem('completedSkills');
    const parsed = saved ? JSON.parse(saved) : {};
    
    // Migration: convert any existing boolean 'true' values to today's date
    let needsMigration = false;
    const today = new Date().toISOString().split('T')[0];
    Object.keys(parsed).forEach(key => {
      if (parsed[key] === true) {
        parsed[key] = today;
        needsMigration = true;
      }
    });
    
    if (needsMigration) {
      localStorage.setItem('completedSkills', JSON.stringify(parsed));
    }
    
    return parsed;
  });

  const [appTheme, setAppTheme] = useState(() => {
    const saved = localStorage.getItem('appTheme');
    if (saved === 'netflix') return 'dark'; // Fallback for removed theme
    return saved || 'light';
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  const [avatarStyle, setAvatarStyle] = useState(() => {
    return localStorage.getItem('avatarStyle') || 'adventurer';
  });

  const [avatarSeed, setAvatarSeed] = useState(() => {
    return localStorage.getItem('avatarSeed') || localStorage.getItem('userName') || 'default';
  });

  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    setCurriculum(getCurriculum(timelineMode));
    localStorage.setItem('timelineMode', timelineMode);
  }, [timelineMode]);

  useEffect(() => {
    localStorage.setItem('completedSkills', JSON.stringify(completedSkills));
  }, [completedSkills]);

  useEffect(() => {
    localStorage.setItem('appTheme', appTheme);
    
    // Apply to html element for standard CSS variable overriding
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(appTheme);
    
  }, [appTheme]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('avatarStyle', avatarStyle);
  }, [avatarStyle]);

  useEffect(() => {
    localStorage.setItem('avatarSeed', avatarSeed);
  }, [avatarSeed]);

  const toggleSkill = (skillId) => {
    setCompletedSkills(prev => {
      const newState = { ...prev };
      if (newState[skillId]) {
        delete newState[skillId];
      } else {
        newState[skillId] = new Date().toISOString().split('T')[0];
      }
      return newState;
    });
  };

  const exportProgress = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      timelineMode,
      completedSkills,
      userName,
      avatarStyle,
      avatarSeed
    }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "ai_roadmap_progress.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importProgress = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file selected.");
        return;
      }
      
      if (!file.name.endsWith('.json') && file.type !== 'application/json') {
        reject("Please upload a .json file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error("Invalid structure. Must be a JSON object.");
          }
          if (data.completedSkills !== undefined && (typeof data.completedSkills !== 'object' || Array.isArray(data.completedSkills) || data.completedSkills === null)) {
            throw new Error("Invalid completedSkills format. Expected an object.");
          }
          if (data.timelineMode !== undefined && typeof data.timelineMode !== 'string') {
            throw new Error("Invalid timelineMode format. Expected a string.");
          }
          if (data.userName !== undefined && typeof data.userName !== 'string') {
            throw new Error("Invalid userName format. Expected a string.");
          }
          if (data.avatarStyle !== undefined && typeof data.avatarStyle !== 'string') {
            throw new Error("Invalid avatarStyle format. Expected a string.");
          }
          if (data.avatarSeed !== undefined && typeof data.avatarSeed !== 'string') {
            throw new Error("Invalid avatarSeed format. Expected a string.");
          }

          if (data.timelineMode !== undefined) setTimelineMode(data.timelineMode);
          if (data.completedSkills !== undefined) setCompletedSkills(data.completedSkills);
          if (data.userName !== undefined) setUserName(data.userName);
          if (data.avatarStyle !== undefined) setAvatarStyle(data.avatarStyle);
          if (data.avatarSeed !== undefined) setAvatarSeed(data.avatarSeed);
          resolve();
        } catch (err) {
          reject(err.message || "Invalid JSON structure. Please upload a valid progress file.");
        }
      };
      reader.onerror = () => reject("Failed to read file.");
      reader.readAsText(file);
    });
  };

  const getStats = () => {
    let total = 0;
    let completed = 0;
    
    curriculum.forEach(phase => {
      phase.skills.forEach(skill => {
        total++;
        if (completedSkills[skill.id]) completed++;
      });
    });

    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
  };

  return (
    <RoadmapContext.Provider value={{
      timelineMode, setTimelineMode,
      completedSkills, toggleSkill,
      curriculum,
      exportProgress, importProgress,
      getStats,
      appTheme, setAppTheme,
      userName, setUserName,
      avatarStyle, setAvatarStyle,
      avatarSeed, setAvatarSeed
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => useContext(RoadmapContext);
