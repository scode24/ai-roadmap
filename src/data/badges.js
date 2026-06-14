import React from 'react';
import { Target, Activity, Brain, Award, Star } from 'lucide-react';

export const badges = [
  { id: 'starter', name: 'First Step', threshold: 1, icon: <Star size={16} />, color: 'bg-blue-500/20 text-blue-500 border-blue-500/30' },
  { id: 'quarter', name: 'Quarterback', threshold: 25, icon: <Target size={16} />, color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' },
  { id: 'half', name: 'Halfway There', threshold: 50, icon: <Activity size={16} />, color: 'bg-amber-500/20 text-amber-500 border-amber-500/30' },
  { id: 'deep', name: 'Deep Learner', threshold: 75, icon: <Brain size={16} />, color: 'bg-purple-500/20 text-purple-500 border-purple-500/30' },
  { id: 'master', name: 'AI Master', threshold: 100, icon: <Award size={16} />, color: 'bg-red-500/20 text-red-500 border-red-500/30' },
];
