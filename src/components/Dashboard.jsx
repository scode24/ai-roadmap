import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActivityCalendar } from 'react-activity-calendar';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { getStats, completedSkills } = useRoadmap();
  const stats = getStats();







  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState('All');

  const months = [
    { value: 'All', label: 'All Months' },
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  const availableYears = Array.from(new Set([
    currentYear,
    ...Object.values(completedSkills).map(dateStr => {
      if (typeof dateStr === 'string') return new Date(dateStr).getFullYear();
      return currentYear;
    }).filter(y => !isNaN(y))
  ])).sort((a, b) => b - a);

  // Generate calendar data
  const dateCounts = {};
  Object.values(completedSkills).forEach(dateStr => {
    if (dateStr && typeof dateStr === 'string') {
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    }
  });

  const calendarData = [];
  const isAllMonths = selectedMonth === 'All';
  const start = isAllMonths ? new Date(selectedYear, 0, 1) : new Date(selectedYear, parseInt(selectedMonth), 1);
  const end = isAllMonths ? new Date(selectedYear, 11, 31) : new Date(selectedYear, parseInt(selectedMonth) + 1, 0);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = format(d, 'yyyy-MM-dd');
    const count = dateCounts[dateStr] || 0;
    let level = 0;
    if (count > 0) level = 1;
    if (count > 2) level = 2;
    if (count > 4) level = 3;
    if (count > 6) level = 4;
    calendarData.push({
      date: dateStr,
      count,
      level
    });
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Activity Calendar (1st) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 overflow-x-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Learning Activity</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
              className="bg-secondary border border-border text-foreground text-xs font-medium rounded-lg focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none cursor-pointer"
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-secondary border border-border text-foreground text-xs font-medium rounded-lg focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none cursor-pointer"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-max pr-6">
          <ActivityCalendar 
            data={calendarData} 
            theme={{
              light: ['hsl(var(--muted))', 'hsl(var(--primary) / 0.4)', 'hsl(var(--primary) / 0.6)', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary))'],
              dark: ['hsl(var(--muted))', 'hsl(var(--primary) / 0.4)', 'hsl(var(--primary) / 0.6)', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary))'],
            }}
            labels={{
              tooltip: '<strong>{{count}} lessons</strong> completed on {{date}}',
            }}
            showWeekdayLabels
          />
        </div>
      </motion.div>

      {/* Progress & Stats Card (2nd) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 flex flex-col space-y-6"
      >
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm font-medium">Overall Progress</p>
            <h3 className="text-xl font-bold text-foreground">{stats.percentage}%</h3>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full" 
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/10 p-3 rounded-xl flex items-center space-x-3">
            <div className="p-2 bg-primary/20 text-primary rounded-lg flex-shrink-0">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{stats.total}</h3>
              <p className="text-muted-foreground text-xs font-medium">Total Skills</p>
            </div>
          </div>

          <div className="bg-primary/10 p-3 rounded-xl flex items-center space-x-3">
            <div className="p-2 bg-primary/20 text-primary rounded-lg flex-shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{stats.completed}</h3>
              <p className="text-muted-foreground text-xs font-medium">Completed</p>
            </div>
          </div>
        </div>
      </motion.div>


    </div>
  );
};
