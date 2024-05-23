import {create} from 'zustand'
import {TCatPattern} from "../../types/global";
import {createJSONStorage, persist} from "zustand/middleware";

interface HalkiSaveState {
  useEyeTracking: boolean
  useFullScreen: boolean
  useBreathingGuide: boolean
  useTextGuide: boolean
  useCalmMode: boolean

  length: number

  heartRate: number
  breathingRate: number // seconds per inhale/pause, exhale doubled
  blinkSensitivity: number

  catName: string
  catPronoun: number // 0: he, 1: she, 2: they
  catPattern: TCatPattern

  setState: (newState: Partial<HalkiSaveState>) => void
}

export const useSaveState = create<HalkiSaveState>()(
  persist(
    (set, get): HalkiSaveState => ({
      useEyeTracking: true,
      useFullScreen: true,
      useBreathingGuide: true,
      useTextGuide: false,
      useCalmMode: false,

      length: 60,

      heartRate: 60,
      breathingRate: 4,
      blinkSensitivity: 0.4,

      catName: "Halki",
      catPronoun: 0,
      catPattern: "black",

      setState: (newState: Partial<HalkiSaveState>) => set((state: HalkiSaveState) => ({...state, ...newState})),
    }),
    {
      name: 'halki-storage'
    }
  ),
)

