import React from 'react';
import { Clock } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export const TimelineSelector = () => {
  const { timelineMode, setTimelineMode } = useRoadmap();

  return (
    <div className="glass-panel p-5 flex flex-col justify-between gap-3">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/20 text-primary rounded-lg">
          <Clock size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Interview Timeline</h2>
          <p className="text-muted-foreground text-sm">Select your preparation timeframe</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-col items-center gap-4">
        <select 
          value={timelineMode}
          onChange={(e) => setTimelineMode(e.target.value)}
          className="bg-background border border-input text-foreground rounded-lg px-4 py-2 outline-none focus:border-primary w-full"
        >
          <option value="1m">1 Month (Core Interview Focus)</option>
          <option value="3m">3 Months (Balanced Preparation)</option>
          <option value="6m">6 Months (Deep Dive)</option>
          <option value="comprehensive">Comprehensive (End-to-End AI SWE)</option>
        </select>
      </div>
    </div>
  );
};
