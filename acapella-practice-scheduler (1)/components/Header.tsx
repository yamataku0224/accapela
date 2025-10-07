import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';

interface HeaderProps {
  userName: string;
  grade: string;
  appMode: 'settings' | 'viewing';
  setAppMode: (mode: 'settings' | 'viewing') => void;
  onUpdateProfile: (name: string, grade: string) => void;
}

// FIX: Extracted TabButtonProps to a named interface to avoid potential type inference issues with inline types.
interface TabButtonProps {
  mode: 'settings' | 'viewing';
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ userName, grade, appMode, setAppMode, onUpdateProfile }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const TabButton = ({ mode, children }: TabButtonProps) => {
    const isActive = appMode === mode;
    return (
      <button
        onClick={() => setAppMode(mode)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
          isActive
            ? 'bg-custom-primary text-white shadow'
            : 'text-custom-text-secondary hover:bg-blue-100'
        }`}
      >
        {children}
      </button>
    );
  };
  
  return (
    <header className="bg-custom-surface shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-custom-primary">
          練習スケジューラー
        </h1>
        
        <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
           <TabButton mode="settings">設定用モード</TabButton>
           <TabButton mode="viewing">閲覧用モード</TabButton>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
            className="flex items-center gap-2 text-right bg-white p-2 rounded-lg transition hover:bg-gray-100 shadow border border-gray-200"
          >
            <div>
              <p className="font-semibold text-sm text-custom-text-primary">{userName}</p>
              <p className="text-xs text-custom-text-secondary">{grade}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-custom-text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isSettingsOpen && (
            <ProfileSettings 
              currentName={userName}
              currentGrade={grade}
              onSave={onUpdateProfile}
              onClose={() => setIsSettingsOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;