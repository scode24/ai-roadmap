import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoadmap } from '../context/RoadmapContext';
import { badges } from '../data/badges';

export const BadgeNotification = () => {
  const { getStats } = useRoadmap();
  const stats = getStats();
  const earnedBadges = badges.filter(b => stats.percentage >= b.threshold);
  
  const [previousBadgeCount, setPreviousBadgeCount] = useState(earnedBadges.length);
  const [newBadge, setNewBadge] = useState(null);

  useEffect(() => {
    if (earnedBadges.length > previousBadgeCount) {
      // A new badge was earned!
      const latestBadge = earnedBadges[earnedBadges.length - 1];
      setNewBadge(latestBadge);
      setPreviousBadgeCount(earnedBadges.length);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setNewBadge(null);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (earnedBadges.length < previousBadgeCount) {
      // Handle the case where a skill is untoggled (just update the count)
      setPreviousBadgeCount(earnedBadges.length);
    }
  }, [earnedBadges.length, previousBadgeCount, earnedBadges]);

  return (
    <AnimatePresence>
      {newBadge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
          {/* Confetti background effect overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.5, y: 100, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, y: -50, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
            className="relative bg-gradient-to-br from-background to-muted border border-border p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm pointer-events-auto"
          >
            <div className="absolute -top-12">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-background shadow-xl ${newBadge.color}`}
              >
                {React.cloneElement(newBadge.icon, { size: 48 })}
              </motion.div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-2">
                HURRAY!
              </h2>
              <p className="text-muted-foreground mb-1">You just earned the</p>
              <h3 className="text-2xl font-bold text-foreground mb-6">{newBadge.name} Badge</h3>
              
              <button 
                onClick={() => setNewBadge(null)}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
