import {create} from "zustand";

export type TScreen = "title" | "config" | "focusing" | "finish"
interface ProgressState {
  isReady: boolean
  screen: TScreen

  setProgress: (newState: Partial<ProgressState>) => void
}

export const useProgressState = create<ProgressState>((set) => ({
  isReady: false,
  screen: "title",
  setProgress: (newState: Partial<ProgressState>) => set((state: ProgressState) => ({...state, ...newState})),

}));
