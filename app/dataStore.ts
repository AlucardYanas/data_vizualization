import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductData } from './dataTypes';

interface DataStore {
  data: ProductData[];
  setData: (data: ProductData[]) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      data: [],
      setData: (data) => set({ data }),
    }),
    {
      name: 'inventory-data', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
