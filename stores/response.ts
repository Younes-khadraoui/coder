import { create } from "zustand";

type ResponseStore = {
  instructions: string;
  updateInstructions: (newInstructions: string) => void;
};

export const useStore = create<ResponseStore>()((set) => ({
  instructions: "",
  updateInstructions: (newInstructions) =>
    set({ instructions: newInstructions }),
}));
