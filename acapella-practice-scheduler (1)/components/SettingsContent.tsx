
import React from 'react';
import { Member, DayOfWeek, PeriodStatus } from '../types';
import { PERIOD_STATUSES, DAYS_OF_WEEK, getStatusColor } from '../constants';

interface SettingsContentProps {
  selectedDay: DayOfWeek | null;
  selectedPeriod: number | null;
  currentUser: Member;
  onUpdateSchedule: (day: DayOfWeek, period: number, status: PeriodStatus) => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ selectedDay, selectedPeriod, currentUser, onUpdateSchedule }) => {
  if (!selectedDay || !selectedPeriod) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-custom-text-secondary">コマを選択してください</h3>
        <p className="text-custom-text-secondary mt-1">左のパネルから曜日と時間を選択して、予定を設定します。</p>
      </div>
    );
  }

  const dayLabel = DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label;
  const currentStatus = currentUser.schedule[selectedDay]?.find(s => s.period === selectedPeriod)?.status;

  return (
    <div>
      <h2 className="text-2xl font-bold text-custom-text-primary mb-1">ステータス設定</h2>
      <p className="text-lg text-custom-text-secondary mb-6">{dayLabel} - {selectedPeriod}限</p>
      
      <div className="space-y-3">
        {PERIOD_STATUSES.map(status => {
          const isActive = currentStatus === status;
          return (
            <button
              key={status}
              onClick={() => onUpdateSchedule(selectedDay, selectedPeriod, status)}
              className={`w-full p-4 rounded-lg text-left font-semibold transition-all flex items-center gap-4 border-2 ${
                isActive
                  ? 'border-custom-primary bg-blue-50'
                  : 'border-transparent bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full ${getStatusColor(status)}`}></span>
              <span>{status}</span>
              {isActive && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-custom-primary ml-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsContent;
