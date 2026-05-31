import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: 'success',
  visible: false,
  show: (message, type = 'success') => set({ message, type, visible: true }),
  hide: () => set({ visible: false }),
}));
