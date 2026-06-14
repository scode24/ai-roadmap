import React from 'react';
import { Clock } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { curriculumData } from '../data/curriculum';

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

      <div className="flex flex-col md:flex-col gap-4">
        <select 
          value={timelineMode}
          onChange={(e) => setTimelineMode(e.target.value)}
          className="bg-background border border-input text-foreground rounded-lg px-4 py-2 outline-none focus:border-primary w-full"
        >
          {curriculumData.meta.interviewTimelines.map(timeline => (
            <option key={timeline.id} value={timeline.id}>
              {timeline.label} ({timeline.sublabel})
            </option>
          ))}
        </select>
        
        {curriculumData.meta.interviewTimelines.find(t => t.id === timelineMode)?.description && (
          <p className="text-sm text-muted-foreground">
            {curriculumData.meta.interviewTimelines.find(t => t.id === timelineMode).description}
          </p>
        )}
      </div>
    </div>
  );
};
