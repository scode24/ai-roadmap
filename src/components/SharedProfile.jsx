import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { decodeProfileData } from '../utils/shareUtils';
import { getSuitableRoles } from '../utils/roleMatcher';
import { curriculumData } from '../data/curriculum';
import { badges } from '../data/badges';
import { Trophy, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const SharedProfile = () => {
  const { code } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (code) {
      const decoded = decodeProfileData(code);
      if (decoded) {
        setProfile(decoded);
      } else {
        setError(true);
      }
    }
  }, [code]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Invalid or Expired Link</h1>
        <p className="text-muted-foreground mb-8">This roadmap profile could not be loaded. The link might be broken.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl">Build Your Own Roadmap</Link>
      </div>
    );
  }

  if (!profile) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground animate-pulse">Loading Profile...</p></div>;
  }

  const { userName, avatarStyle, avatarSeed, completedSkills, percentage } = profile;
  const earnedBadges = badges.filter(b => percentage >= b.threshold);
  const suitableRoles = getSuitableRoles(completedSkills);

  // Flatten curriculum to get learned skills details
  const allSkills = curriculumData.flatMap(p => p.skills);
  const learnedSkills = allSkills.filter(s => completedSkills[s.id]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Header / Brand */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              AI
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Engineer Roadmap</h1>
          </div>
          <Link to="/" className="text-sm font-medium text-primary hover:underline flex items-center">
            Build yours <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent"></div>
          
          <div className="relative z-10 w-24 h-24 rounded-full border-4 border-background shadow-xl mb-4 pointer-events-none">
            <img 
              src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}&backgroundColor=transparent`}
              alt="Avatar" 
              className="w-full h-full bg-secondary rounded-full"
            />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1 relative z-10">{userName || 'AI Engineer Learner'}</h2>
          <p className="text-muted-foreground text-sm relative z-10">AI Engineer in Training • {percentage}% Completed</p>
        </motion.div>

        {/* Suitable Roles */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-foreground flex items-center mb-4">
            <Briefcase size={20} className="mr-2 text-primary" />
            Suitable Roles
          </h3>
          <div className="space-y-3">
            {suitableRoles.map((role, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-card/50">
                <h4 className="font-bold text-foreground">{role.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{role.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h3 className="text-lg font-bold text-foreground flex items-center mb-4">
              <Trophy size={20} className="mr-2 text-primary" />
              Earned Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {earnedBadges.map(badge => (
                <div key={badge.id} className={`flex flex-col items-center p-3 rounded-xl border bg-card/50 ${badge.color}`}>
                  <div className="mb-2 scale-125">{badge.icon}</div>
                  <span className="text-xs font-medium text-center leading-tight">{badge.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Learned Skills */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-foreground flex items-center mb-4">
            <CheckCircle2 size={20} className="mr-2 text-primary" />
            Learned Skills ({learnedSkills.length})
          </h3>
          {learnedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {learnedSkills.map(skill => (
                <div key={skill.id} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-lg">
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No skills completed yet.</p>
          )}
        </motion.div>

      </div>
    </div>
  );
};
