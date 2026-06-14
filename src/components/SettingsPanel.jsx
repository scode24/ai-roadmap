import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRoadmap } from '../context/RoadmapContext';
import { Download, Upload, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPanel = () => {
  const { timelineMode, setTimelineMode, exportProgress, importProgress } = useRoadmap();
  const fileInputRef = useRef(null);
  const [showImportWarning, setShowImportWarning] = useState(false);
  const [importError, setImportError] = useState("");

  const handleImportClick = () => {
    setShowImportWarning(true);
  };

  const confirmImport = () => {
    setShowImportWarning(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await importProgress(file);
      } catch (err) {
        setImportError(err);
      } finally {
        event.target.value = '';
      }
    }
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {showImportWarning && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-border shadow-2xl rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center space-x-3 text-amber-500 mb-4">
                  <AlertTriangle size={28} />
                  <h3 className="text-xl font-bold text-foreground">Warning: Replacing Progress</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Importing data will <strong>replace all your current progress</strong>. If your current progress is not saved, it will be permanently lost. Are you sure you want to continue?
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowImportWarning(false)}
                    className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmImport}
                    className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Yes, Select File
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {importError && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-destructive shadow-2xl rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center space-x-3 text-destructive mb-4">
                  <AlertTriangle size={28} />
                  <h3 className="text-xl font-bold text-foreground">Import Failed</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {importError}
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setImportError("")}
                    className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 flex flex-col justify-between gap-3"
    >
      <div className="hidden lg:flex flex-col gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/20 text-primary rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Interview Timeline</h2>
            <p className="text-muted-foreground text-sm">Select your preparation timeframe</p>
          </div>
        </div>

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
        
        <div className="w-full h-px bg-border my-2"></div>
      </div>

      <div className="flex flex-col md:flex-col items-center gap-4">
        <div className="flex flex-col space-y-2 w-full">
          <button 
            onClick={exportProgress}
            className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors w-full"
          >
            <Download size={18} />
            <span className="whitespace-nowrap">Download Progress Data</span>
          </button>
          
          <button 
            onClick={handleImportClick}
            className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors w-full"
          >
            <Upload size={18} />
            <span className="whitespace-nowrap">Import Progress Data</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json,application/json" 
            className="hidden" 
          />
        </div>
      </div>
    </motion.div>
    </>
  );
};
