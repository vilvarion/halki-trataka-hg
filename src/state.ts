import {create} from 'zustand'

interface HalkiState {
  useEyeTracking: boolean
  useFullScreen: boolean
  useGuiding: boolean

  heartRate: number
  breathingRate: number // seconds per inhale/pause, exhale doubled


  set: (newState: Partial<HalkiState>) => void
}

export const useConfig = create<HalkiState>()((set):HalkiState => ({
  useEyeTracking: true,
  useFullScreen: true,
  useGuiding: true,

  heartRate: 60,
  breathingRate: 4,

  set: (newState: Partial<HalkiState>) => set((state:HalkiState) => ({...state, ...newState})),
}))
