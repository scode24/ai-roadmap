import { useState } from 'react';
import { RoadmapProvider, useRoadmap } from './context/RoadmapContext';
import { Dashboard } from './components/Dashboard';
import { SettingsPanel } from './components/SettingsPanel';
import { RoadmapView } from './components/RoadmapView';
import { OnboardingModal } from './components/OnboardingModal';
import { BadgeNotification } from './components/BadgeNotification';
import { AvatarPickerModal } from './components/AvatarPickerModal';
import { UserAvatar } from './components/UserAvatar';
import { MobileNavBar } from './components/MobileNavBar';
import { UserProfile } from './components/UserProfile';
import { TimelineSelector } from './components/TimelineSelector';
import { Moon, Sun, Code, Share2 } from 'lucide-react';
import { badges } from './data/badges';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SharedProfile } from './components/SharedProfile';
import { ShareModal } from './components/ShareModal';

const MainApp = () => {
  const { appTheme, setAppTheme, userName, getStats } = useRoadmap();
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('lessons');
  const stats = getStats();
  const earnedBadges = badges.filter(b => stats.percentage >= b.threshold);
  
  const cycleTheme = () => {
    if (appTheme === 'light') setAppTheme('dark');
    else setAppTheme('light');
  };

  const getThemeIcon = () => {
    if (appTheme === 'light') return <Sun size={20} className="text-yellow-500" />;
    return <Moon size={20} className="text-blue-400" />;
  };

  return (
    <>
      <OnboardingModal />
      <BadgeNotification />
      <AvatarPickerModal isOpen={isAvatarPickerOpen} onClose={() => setIsAvatarPickerOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary/30">
        
        {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              AI
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Engineer Roadmap</h1>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            {earnedBadges.length > 0 && (
              <div className="hidden md:flex items-center space-x-1.5 mr-2">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className={`relative group p-1.5 rounded-full border cursor-pointer transition-transform hover:scale-110 ${badge.color}`}>
                    {badge.icon}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-border pointer-events-none">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {userName && (
              <button 
                onClick={() => setIsAvatarPickerOpen(true)}
                className="hidden sm:flex items-center space-x-2 mr-2 px-3 py-1.5 bg-secondary border border-border rounded-full hover:bg-muted transition-colors group"
                title="Change Avatar"
              >
                <UserAvatar className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{userName}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
  

        <div className="flex flex-col lg:flex-row gap-6 items-start pb-20 lg:pb-0">
          
          {/* Mobile Conditional Rendering */}
          <div className="lg:hidden w-full">
            {mobileTab === 'profile' && <UserProfile onAvatarClick={() => setIsAvatarPickerOpen(true)} />}
            {mobileTab === 'dashboard' && <Dashboard />}
            {mobileTab === 'lessons' && (
              <div className="flex flex-col space-y-6">
                <TimelineSelector />
                <RoadmapView />
              </div>
            )}
          </div>

          {/* Desktop Left Sidebar - Sticky */}
          <div className="hidden lg:flex lg:w-1/3 lg:sticky lg:top-24 flex-col space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 pb-4">
            <SettingsPanel />
            <Dashboard />
          </div>

          {/* Desktop Right Content - Scrollable */}
          <div className="hidden lg:block lg:w-2/3 w-full">
            <RoadmapView />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 text-center text-muted-foreground text-sm transition-colors duration-300">
        <p>Designed for Senior SWEs transitioning into AI. All data is cached locally.</p>
      </footer>

      {/* Floating Action Buttons (Desktop only or positioned above mobile nav) */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="p-3 rounded-xl bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-colors flex items-center justify-center shadow-lg"
          title="Share Profile"
        >
          <Share2 size={24} />
        </button>
        <a 
          href="https://github.com/scode24/ai-roadmap" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-secondary border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-lg flex items-center justify-center"
          title="View on GitHub"
        >
          <Code size={24} />
        </a>
        <button 
          onClick={cycleTheme}
          className="p-3 rounded-xl bg-secondary border border-border hover:bg-muted transition-colors flex items-center justify-center text-muted-foreground shadow-lg"
          title={`Toggle Theme (${appTheme})`}
        >
          {getThemeIcon()}
        </button>
      </div>

      <MobileNavBar activeTab={mobileTab} setActiveTab={setMobileTab} />
    </div>
    </>
  );
};

function App() {
  return (
    <RoadmapProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/:code" element={<SharedProfile />} />
        </Routes>
      </Router>
    </RoadmapProvider>
  );
}

export default App;
