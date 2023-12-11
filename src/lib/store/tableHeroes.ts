import { create } from "zustand";
import { persist } from "zustand/middleware";

type Item = {
  classhero: string;
  name: string;
  imageUrl: string;
  indice: number;
  stars: "5" | "6" | "7";
  rank: "1" | "5" | "2" | "3" | "4";
  cs: number;
  id: string;
};

type Store = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (index: string) => void;
  reset: () => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (index) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== index),
        })),
      reset: () => set({ items: [] }),
    }),
    {
      name: "table-heroes",
    }
  )
);

export default useStore;
