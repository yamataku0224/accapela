
import React, { useState } from 'react';
import { DayOfWeek, WeeklySchedule } from '../types';
import { DAYS_OF_WEEK, PERIODS, getStatusColor } from '../constants';

interface CalendarPanelProps {
  selectedDay: DayOfWeek | null;
  selectedPeriod: number | null;
  onSelectDay: (day: DayOfWeek | null) => void;
  onSelectSlot: (day: DayOfWeek, period: number) => void;
  schedule?: WeeklySchedule; // Used in settings mode to show user's status
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  selectedDay,
  selectedPeriod,
  onSelectDay,
  onSelectSlot,
  schedule
}) => {
  const [expandedDay, setExpandedDay] = useState<DayOfWeek | null>(null);

  const handleDayClick = (dayKey: DayOfWeek) => {
    if (expandedDay === dayKey) {
      setExpandedDay(null);
      onSelectDay(null);
    } else {
      setExpandedDay(dayKey);
      onSelectDay(dayKey);
    }
  };

  return (
    <div className="bg-custom-surface rounded-lg shadow-md p-4 space-y-2 h-full">
      <h2 className="text-xl font-bold text-custom-text-primary mb-4 text-center">週間スケジュール</h2>
      {DAYS_OF_WEEK.map(({ key, label }) => (
        <div key={key}>
          <button
            onClick={() => handleDayClick(key)}
            className={`w-full text-left p-3 rounded-md font-semibold transition flex justify-between items-center ${
              expandedDay === key
                ? 'bg-custom-primary text-white'
                : 'bg-gray-100 hover:bg-blue-100 text-custom-text-primary'
            }`}
          >
            {label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${expandedDay === key ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {expandedDay === key && (
            <div className="grid grid-cols-3 gap-2 mt-2 pl-4">
              {PERIODS.map((period) => {
                const status = schedule ? schedule[key].find(s => s.period === period)?.status : undefined;
                return (
                    <button
                        key={period}
                        onClick={() => onSelectSlot(key, period)}
                        className={`p-2 rounded-md text-sm font-medium transition text-center flex items-center justify-center gap-2 ${
                        selectedDay === key && selectedPeriod === period
                            ? 'ring-2 ring-custom-secondary bg-indigo-100'
                            : 'bg-gray-50 hover:bg-gray-200'
                        }`}
                    >
                        {schedule && status && <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>}
                        {period}限
                    </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarPanel;
