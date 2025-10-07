
export enum PeriodStatus {
  Lecture = '授業',
  Free = '空きコマ',
  Maybe = 'たまに出れる',
}

export type TimeSlot = {
  period: number;
  status: PeriodStatus;
};

export type DaySchedule = TimeSlot[];

export type WeeklySchedule = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type Member = {
  id: string;
  name: string;
  grade: string;
  schedule: WeeklySchedule;
};

export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}
