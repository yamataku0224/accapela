
import React from 'react';
import { Member, DayOfWeek, PeriodStatus } from '../types';
import { DAYS_OF_WEEK, getStatusColor } from '../constants';

interface ViewingContentProps {
  selectedDay: DayOfWeek | null;
  selectedPeriod: number | null;
  availableMembers: Member[];
}

const ViewingContent: React.FC<ViewingContentProps> = ({ selectedDay, selectedPeriod, availableMembers }) => {
  if (!selectedDay || !selectedPeriod) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-custom-text-secondary">空きコマを確認</h3>
        <p className="text-custom-text-secondary mt-1">左のパネルから曜日と時間を選択して、空いているメンバーを確認します。</p>
      </div>
    );
  }

  const dayLabel = DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-custom-text-primary mb-1">空き状況</h2>
      <p className="text-lg text-custom-text-secondary mb-6">{dayLabel} - {selectedPeriod}限</p>

      {availableMembers.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
          <p className="text-custom-text-secondary font-semibold">このコマに空いているメンバーはいません。</p>
        </div>
      ) : (
        <div className="overflow-y-auto flex-grow pr-2 -mr-2">
            <ul className="space-y-3">
            {availableMembers.map(member => {
                const status = member.schedule[selectedDay]?.find(s => s.period === selectedPeriod)?.status || PeriodStatus.Lecture;
                return (
                <li key={member.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between transition hover:shadow-md hover:bg-white">
                    <div>
                        <p className="font-semibold text-custom-text-primary">{member.name}</p>
                        <p className="text-sm text-custom-text-secondary">{member.grade}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></span>
                        <span className="text-sm font-medium text-custom-text-secondary">{status}</span>
                    </div>
                </li>
                );
            })}
            </ul>
        </div>
      )}
    </div>
  );
};

export default ViewingContent;
