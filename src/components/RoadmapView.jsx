import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, PlayCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';


export const RoadmapView = () => {
  const { curriculum, completedSkills, toggleSkill, timelineMode } = useRoadmap();
  const [expandedPhases, setExpandedPhases] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const getTimelineText = () => {
    switch (timelineMode) {
      case '1m': return "Fast-Track Interview Focus (4 Weeks)";
      case '3m': return "Balanced Preparation (12 Weeks)";
      case '6m': return "Deep Dive (24 Weeks)";
      case 'comprehensive': return "Comprehensive Masterclass (Self-Paced)";
      default: return "Timeline";
    }
  };



  return (
    <div className="glass-panel p-6 space-y-6 relative">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="text-primary" size={28} />
        <h2 className="text-2xl font-bold text-foreground">{getTimelineText()}</h2>
      </div>





      {curriculum.map((phase, index) => {
        const isExpanded = expandedPhases[phase.id] !== false; // Default true
        const completedInPhase = phase.skills.filter(s => completedSkills[s.id]).length;
        const totalInPhase = phase.skills.length;
        const phaseProgress = totalInPhase === 0 ? 0 : Math.round((completedInPhase / totalInPhase) * 100);

        return (
          <motion.div 
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative z-10"
          >

            <div className="border border-border rounded-2xl overflow-hidden bg-background/50">
              <div 
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors"
                onClick={() => togglePhase(phase.id)}
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{phase.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs text-muted-foreground font-medium">{completedInPhase}/{totalInPhase} Skills</span>
                    <div className="w-24 h-2 bg-border rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${phaseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground" />}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border bg-muted/50"
                  >
                    <div>
                      {phase.skills.map((skill, index) => {
                        const isCompleted = completedSkills[skill.id];
                        const isLast = index === phase.skills.length - 1;
                        return (
                          <div 
                            key={skill.id}
                            className={`p-5 transition-all ${isLast ? '' : 'border-b border-border'} ${isCompleted ? 'bg-primary/10 border-primary/30' : 'bg-background hover:bg-muted/10'} hover:border-primary/50`}
                          >
                            <div className="flex items-start">
                              <div className="flex items-start space-x-3 w-full">
                                <button 
                                  onClick={() => toggleSkill(skill.id)}
                                  className="mt-1 focus:outline-none flex-shrink-0"
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="text-primary" size={20} />
                                  ) : (
                                    <Circle className="text-muted-foreground hover:text-foreground transition-colors" size={20} />
                                  )}
                                </button>
                                <div className="w-full">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                                    <h4 className={`text-lg font-medium ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                      {skill.name}
                                    </h4>
                                    {skill.importantForInterview && timelineMode === 'comprehensive' && (
                                      <span className="mt-1 sm:mt-0 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30 font-medium inline-block self-start sm:self-center">
                                        Interview Core
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground text-sm mt-1">{skill.description}</p>
                                  
                                  {/* Resources */}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {skill.resources.map((res, i) => (
                                      <a 
                                        key={i}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                      >
                                        <PlayCircle size={16} className="text-primary" />
                                        <span>{res.name}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
