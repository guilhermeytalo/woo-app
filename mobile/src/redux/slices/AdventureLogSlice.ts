import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AdventureLog {
  id: string;
  challengeId: string;
  challengeText: string;
  notes: string;
  rating: number;
  date: string;
}

interface AdventureLogState {
  logs: AdventureLog[];
  addLog: (log: Omit<AdventureLog, 'id'>) => void;
}

export const useAdventureLogStore = create<AdventureLogState>()(
  persist(
    (set) => ({
      logs: [],
      addLog: (log) =>
        set((state) => ({
          logs: [{ ...log, id: Date.now().toString() }, ...state.logs],
        })),
    }),
    {
      name: 'adventure-logs',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
