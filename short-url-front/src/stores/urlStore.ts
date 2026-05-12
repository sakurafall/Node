import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { URLRecord } from '@/types/url';

interface URLStoreState {
  history: URLRecord[];
  upsertRecord: (record: URLRecord) => void;
  removeRecord: (id: string) => void;
  clearHistory: () => void;
}

const HISTORY_LIMIT = 50;

export const useURLStore = create<URLStoreState>()(
  persist(
    (set) => ({
      history: [],
      upsertRecord: (record) =>
        set((state) => {
          const deduped = state.history.filter((item) => item.id !== record.id);
          return {
            history: [record, ...deduped].slice(0, HISTORY_LIMIT),
          };
        }),
      removeRecord: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'brevita.history',
      version: 1,
    },
  ),
);
