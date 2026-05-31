import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  name: string;
  avatarSeed: string;
  level: number;
}

function randomSeed() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export const useUserStore = create<UserState>()(
  persist(
    () => ({
      name: 'Explorador',
      avatarSeed: randomSeed(),
      level: 1,
    }),
    {
      name: 'woo-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
