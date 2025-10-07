
import React, { useState, useCallback, useMemo } from 'react';
import { Member, DayOfWeek, PeriodStatus, WeeklySchedule } from './types';
import LoginScreen from './components/LoginScreen';
import CalendarPanel from './components/CalendarPanel';
import SettingsContent from './components/SettingsContent';
import ViewingContent from './components/ViewingContent';
import Header from './components/Header';
import { PERIODS } from './constants';

const createEmptySchedule = (): WeeklySchedule => {
  const emptyDay = PERIODS.map(p => ({ period: p, status: PeriodStatus.Lecture }));
  return {
    monday: [...emptyDay],
    tuesday: [...emptyDay],
    wednesday: [...emptyDay],
    thursday: [...emptyDay],
    friday: [...emptyDay],
    saturday: [...emptyDay],
    sunday: [...emptyDay],
  };
};

const MOCK_MEMBERS: Member[] = [
  {
    id: 'user2',
    name: '佐藤 太郎',
    grade: '3年生',
    schedule: {
      ...createEmptySchedule(),
      monday: [
        { period: 1, status: PeriodStatus.Lecture }, { period: 2, status: PeriodStatus.Lecture }, { period: 3, status: PeriodStatus.Free },
        { period: 4, status: PeriodStatus.Free }, { period: 5, status: PeriodStatus.Lecture }, { period: 6, status: PeriodStatus.Lecture }
      ],
      wednesday: [
        { period: 1, status: PeriodStatus.Lecture }, { period: 2, status: PeriodStatus.Maybe }, { period: 3, status: PeriodStatus.Maybe },
        { period: 4, status: PeriodStatus.Lecture }, { period: 5, status: PeriodStatus.Free }, { period: 6, status: PeriodStatus.Free }
      ],
    },
  },
  {
    id: 'user3',
    name: '鈴木 花子',
    grade: '2年生',
    schedule: {
      ...createEmptySchedule(),
      monday: [
        { period: 1, status: PeriodStatus.Lecture }, { period: 2, status: PeriodStatus.Lecture }, { period: 3, status: PeriodStatus.Free },
        { period: 4, status: PeriodStatus.Free }, { period: 5, status: PeriodStatus.Lecture }, { period: 6, status: PeriodStatus.Lecture }
      ],
      friday: [
        { period: 1, status: PeriodStatus.Free }, { period: 2, status: PeriodStatus.Free }, { period: 3, status: PeriodStatus.Lecture },
        { period: 4, status: PeriodStatus.Lecture }, { period: 5, status: PeriodStatus.Maybe }, { period: 6, status: PeriodStatus.Lecture }
      ],
    },
  },
];

type AppMode = 'settings' | 'viewing';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [appMode, setAppMode] = useState<AppMode>('settings');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);

  const handleLogin = useCallback((name: string, grade: string) => {
    const newUser: Member = {
      id: 'currentUser',
      name,
      grade,
      schedule: createEmptySchedule(),
    };
    setCurrentUser(newUser);
    setAllMembers(prev => [newUser, ...prev]);
  }, []);

  const handleUpdateProfile = useCallback((name: string, grade: string) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updatedUser = { ...prev, name, grade };
      setAllMembers(all => all.map(m => m.id === 'currentUser' ? updatedUser : m));
      return updatedUser;
    });
  }, []);

  const handleUpdateSchedule = useCallback((day: DayOfWeek, period: number, status: PeriodStatus) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const newSchedule = { ...prevUser.schedule };
      const daySchedule = newSchedule[day];
      const slotIndex = daySchedule.findIndex(s => s.period === period);
      if (slotIndex !== -1) {
        daySchedule[slotIndex] = { ...daySchedule[slotIndex], status };
      }
      const updatedUser = { ...prevUser, schedule: newSchedule };
      setAllMembers(all => all.map(m => m.id === 'currentUser' ? updatedUser : m));
      return updatedUser;
    });
  }, []);

  const handleSelectSlot = useCallback((day: DayOfWeek, period: number) => {
    setSelectedDay(day);
    setSelectedPeriod(period);
  }, []);

  const availableMembers = useMemo(() => {
    if (!selectedDay || !selectedPeriod) return [];
    return allMembers.filter(member => {
      const daySchedule = member.schedule[selectedDay];
      const slot = daySchedule.find(s => s.period === selectedPeriod);
      return slot && (slot.status === PeriodStatus.Free || slot.status === PeriodStatus.Maybe);
    });
  }, [allMembers, selectedDay, selectedPeriod]);

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header
        userName={currentUser.name}
        grade={currentUser.grade}
        appMode={appMode}
        setAppMode={setAppMode}
        onUpdateProfile={handleUpdateProfile}
      />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <CalendarPanel
            selectedDay={selectedDay}
            selectedPeriod={selectedPeriod}
            onSelectDay={setSelectedDay}
            onSelectSlot={handleSelectSlot}
            schedule={appMode === 'settings' ? currentUser.schedule : undefined}
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 bg-custom-surface rounded-lg shadow-md p-6">
          {appMode === 'settings' ? (
            <SettingsContent
              selectedDay={selectedDay}
              selectedPeriod={selectedPeriod}
              currentUser={currentUser}
              onUpdateSchedule={handleUpdateSchedule}
            />
          ) : (
            <ViewingContent
              selectedDay={selectedDay}
              selectedPeriod={selectedPeriod}
              availableMembers={availableMembers}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
