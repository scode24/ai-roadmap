import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { encodeProfileData } from '../utils/shareUtils';

export const ShareModal = ({ isOpen, onClose }) => {
  const { userName, avatarStyle, avatarSeed, completedSkills, getStats } = useRoadmap();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      const stats = getStats();
      const profileData = {
        userName,
        avatarStyle,
        avatarSeed,
        completedSkills,
        percentage: stats.percentage
      };
      const code = encodeProfileData(profileData);
      if (code) {
        setShareUrl(`${window.location.origin}/${code}`);
      }
    }
  }, [isOpen, userName, avatarStyle, avatarSeed, completedSkills, getStats]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl overflow-hidden relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Share Your Progress</h2>
              <p className="text-muted-foreground mb-6">
                Copy this secure link to share your AI Engineer profile, earned badges, and suitable roles.
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 bg-muted border border-border rounded-lg text-sm text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                  {shareUrl}
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground font-bold rounded-lg transition-all hover:bg-primary/90 active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
