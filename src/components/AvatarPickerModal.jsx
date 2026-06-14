import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { UserAvatar } from './UserAvatar';

const RANDOM_AVATARS = [
  { style: 'adventurer', seed: 'Jack' },
  { style: 'micah', seed: 'Bella' },
  { style: 'bottts', seed: 'Robot1' },
  { style: 'lorelei', seed: 'Jocelyn' },
  { style: 'avataaars', seed: 'Leo' },
  { style: 'shapes', seed: 'Shape1' },
  { style: 'notionists', seed: 'Alex' },
  { style: 'open-peeps', seed: 'Mia' },
  { style: 'bottts', seed: 'Bot2' },
  { style: 'adventurer', seed: 'Felix' },
  { style: 'micah', seed: 'Sarah' },
  { style: 'bottts', seed: 'Mech3' },
  { style: 'lorelei', seed: 'Chloe' },
  { style: 'avataaars', seed: 'Oliver' },
  { style: 'shapes', seed: 'Shape2' }
];

export const AvatarPickerModal = ({ isOpen, onClose }) => {
  const { setAvatarStyle, setAvatarSeed } = useRoadmap();

  const handleSelect = (style, seed) => {
    setAvatarStyle(style);
    setAvatarSeed(seed);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card border border-border shadow-2xl rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Choose Avatar</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {RANDOM_AVATARS.map(({ style, seed }) => (
                <button
                  key={`${style}-${seed}`}
                  onClick={() => handleSelect(style, seed)}
                  className="aspect-square rounded-full border-2 border-transparent hover:border-primary transition-all p-1 hover:scale-110 overflow-hidden"
                >
                  <UserAvatar 
                    styleOverride={style} 
                    seedOverride={seed} 
                    className="w-full h-full bg-secondary" 
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
