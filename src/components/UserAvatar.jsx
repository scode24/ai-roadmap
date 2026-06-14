import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export const UserAvatar = ({ styleOverride, seedOverride, className = "" }) => {
  const { avatarStyle, avatarSeed, userName } = useRoadmap();
  const [imageError, setImageError] = useState(false);

  const style = styleOverride || avatarStyle || 'adventurer';
  // Use provided seed, fall back to saved seed, then to userName, then to a default
  const seed = seedOverride || avatarSeed || userName || 'default_seed';

  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

  // Reset error state if the URL changes
  useEffect(() => {
    setImageError(false);
  }, [avatarUrl]);

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-secondary text-muted-foreground rounded-full overflow-hidden ${className}`}>
        <User size={24} className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <img 
        src={avatarUrl} 
        alt="User Avatar" 
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};
