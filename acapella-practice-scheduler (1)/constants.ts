import { DayOfWeek, PeriodStatus } from './types';

export const DAYS_OF_WEEK: { key: DayOfWeek; label: string }[] = [
  { key: DayOfWeek.Monday, label: '月曜日' },
  { key: DayOfWeek.Tuesday, label: '火曜日' },
  { key: DayOfWeek.Wednesday, label: '水曜日' },
  { key: DayOfWeek.Thursday, label: '木曜日' },
  { key: DayOfWeek.Friday, label: '金曜日' },
  { key: DayOfWeek.Saturday, label: '土曜日' },
  { key: DayOfWeek.Sunday, label: '日曜日' },
];

export const PERIODS = [1, 2, 3, 4, 5, 6];

export const PERIOD_STATUSES: PeriodStatus[] = [
  PeriodStatus.Free,
  PeriodStatus.Maybe,
  PeriodStatus.Lecture,
];

export const GRADES = ['1年生', '2年生', '3年生', '4年生'];

export const getStatusColor = (status: PeriodStatus): string => {
  switch (status) {
    case PeriodStatus.Free:
      return 'bg-status-free';
    case PeriodStatus.Maybe:
      return 'bg-status-maybe';
    case PeriodStatus.Lecture:
      return 'bg-status-lecture';
    default:
      return 'bg-gray-300';
  }
};
