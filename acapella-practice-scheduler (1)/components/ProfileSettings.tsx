
import React, { useState, useEffect, useRef } from 'react';
import { GRADES } from '../constants';

interface ProfileSettingsProps {
  currentName: string;
  currentGrade: string;
  onSave: (name: string, grade: string) => void;
  onClose: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ currentName, currentGrade, onSave, onClose }) => {
  const [name, setName] = useState(currentName);
  const [grade, setGrade] = useState(currentGrade);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), grade);
      onClose();
    }
  };

  return (
    <div ref={modalRef} className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border z-20 p-4">
        <h3 className="text-lg font-semibold mb-4 text-custom-text-primary">プロフィール設定</h3>
        <div className="mb-4">
            <label className="block text-sm font-medium text-custom-text-secondary mb-1">名前</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-custom-primary"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-custom-text-secondary mb-1">学年</label>
            <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-custom-primary"
            >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
        </div>
        <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition">キャンセル</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm rounded-md text-white bg-custom-primary hover:bg-blue-700 transition">保存</button>
        </div>
    </div>
  );
};

export default ProfileSettings;
