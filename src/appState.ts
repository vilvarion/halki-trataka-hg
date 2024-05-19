import {create} from 'zustand'
import {TCatPattern} from "./types/global";

interface HalkiState {
  useEyeTracking: boolean
  useFullScreen: boolean
  useGuiding: boolean

  heartRate: number
  breathingRate: number // seconds per inhale/pause, exhale doubled
  blinkSensitivity: number

  catName: string
  catPronoun: number // 0: he, 1: she, 2: they
  catPattern: TCatPattern

  setState: (newState: Partial<HalkiState>) => void
}

export const useAppState = create<HalkiState>()((set):HalkiState => ({
  useEyeTracking: true,
  useFullScreen: true,
  useGuiding: true,

  heartRate: 60,
  breathingRate: 4,
  blinkSensitivity: 0.4,

  catName: "Halki",
  catPronoun: 2,
  catPattern: "black",

  setState: (newState: Partial<HalkiState>) => set((state:HalkiState) => ({...state, ...newState})),
}))
