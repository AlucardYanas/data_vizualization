import create from 'zustand';
import { ProductData } from '../types/dataTypes'; 

interface DataStore {
  data: ProductData[];
  setData: (data: ProductData[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
