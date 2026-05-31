import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  name: string;
  avatarSeed: string;
  level: number;
  setName: (name: string) => void;
  setAvatarSeed: (seed: string) => void;
}

function randomSeed() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: 'Explorador',
      avatarSeed: randomSeed(),
      level: 1,
      setName: (name) => set({ name }),
      setAvatarSeed: (avatarSeed) => set({ avatarSeed }),
    }),
    {
      name: 'woo-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
