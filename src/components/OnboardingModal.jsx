import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './UserAvatar';

export const OnboardingModal = () => {
  const { userName, setUserName } = useRoadmap();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(!userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserName(inputValue.trim());
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-8 overflow-hidden border shadow-2xl glass-panel border-border rounded-3xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/10 shadow-inner">
                {inputValue ? (
                  <UserAvatar seedOverride={inputValue} className="w-full h-full bg-secondary" />
                ) : (
                  <span className="text-4xl">👋</span>
                )}
              </div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Welcome to AI Roadmap!</h2>
              <p className="mb-8 text-muted-foreground">Before we begin your journey, what should we call you?</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 text-center transition-all bg-transparent border rounded-xl border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-full py-3 font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Learning
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
