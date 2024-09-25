import create from 'zustand';

interface DataStore {
  data: any[];
  setData: (data: any[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
