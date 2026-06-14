import React from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { UserAvatar } from './UserAvatar';
import { SettingsPanel } from './SettingsPanel';
import { badges } from '../data/badges';
import { Trophy, Share2 } from 'lucide-react';
import { useState } from 'react';
import { encodeProfileData } from '../utils/shareUtils';

export const UserProfile = ({ onAvatarClick }) => {
  const { userName, avatarStyle, avatarSeed, completedSkills, getStats } = useRoadmap();
  const stats = getStats();
  const earnedBadges = badges.filter(b => stats.percentage >= b.threshold);
  
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = () => {
    const profileData = {
      userName,
      avatarStyle,
      avatarSeed,
      completedSkills,
      percentage: stats.percentage
    };
    const code = encodeProfileData(profileData);
    if (code) {
      const shareUrl = `${window.location.origin}/${code}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Profile Card */}
      <div className="glass-panel p-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent"></div>
        
        <button 
          onClick={onAvatarClick}
          className="relative z-10 w-24 h-24 rounded-full border-4 border-background shadow-xl mb-4 group"
          title="Change Avatar"
        >
          <UserAvatar className="w-full h-full bg-secondary group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
            Change
          </div>
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-1 relative z-10">{userName || 'Learner'}</h2>
        <p className="text-muted-foreground text-sm relative z-10">AI Engineer in Training</p>

        {/* Badges Section */}
        <div className="w-full mt-6 pt-6 border-t border-border relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-foreground flex items-center">
              <Trophy size={16} className="mr-2 text-primary" />
              Earned Badges
            </h3>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
              {earnedBadges.length} / {badges.length}
            </span>
          </div>
          
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              {earnedBadges.map(badge => (
                <div key={badge.id} className={`flex flex-col items-center p-2 rounded-xl border bg-card/50 ${badge.color}`}>
                  <div className="mb-1">{badge.icon}</div>
                  <span className="text-[10px] font-medium text-center leading-tight opacity-80">{badge.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-secondary/50 rounded-xl border border-border border-dashed">
              <p className="text-xs text-muted-foreground">Complete lessons to earn badges!</p>
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={handleShare}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-primary-foreground font-bold rounded-xl transition-all hover:bg-primary/90 active:scale-95"
      >
        <Share2 size={20} />
        <span>{shareCopied ? 'Link Copied to Clipboard!' : 'Share Profile'}</span>
      </button>

      {/* Settings section */}
      <SettingsPanel />
    </div>
  );
};
