
import React, { useState } from 'react';
import { GRADES } from '../constants';

interface LoginScreenProps {
  onLogin: (name: string, grade: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && grade) {
      onLogin(name.trim(), grade);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-primary to-custom-secondary p-4">
      <div className="w-full max-w-md bg-custom-surface rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-custom-text-primary mb-2">アカペラ練習スケジューラー</h1>
        <p className="text-center text-custom-text-secondary mb-8">ようこそ！まずは名前と学年を設定してください。</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-custom-text-secondary mb-1">名前</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 山田 太郎"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-custom-primary focus:border-transparent transition"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="grade" className="block text-sm font-medium text-custom-text-secondary mb-1">学年</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-custom-primary focus:border-transparent transition bg-white"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary transition-transform transform hover:translate-y-[-2px] shadow-lg"
          >
            利用を開始する
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
