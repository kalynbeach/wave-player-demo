'use client'

import { createContext, useContext, useState } from 'react'
import { WavePlayerMode } from '@/lib/types'

type ModeState = WavePlayerMode

const initialState: ModeState = WavePlayerMode.Loop

export const ModeContext = createContext<ModeState>(initialState)

export function ModeProvider({ mode, children }: { mode: ModeState, children: React.ReactNode }) {
  return (
    <ModeContext.Provider value={mode}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
}