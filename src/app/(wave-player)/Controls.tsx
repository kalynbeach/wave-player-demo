'use client'

import { useState, useRef } from 'react'
import type { Track } from '@/lib/types'

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  duration: number
  tracks: Track[]
  trackIndex: number
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track>>
  handleNext: () => void
}

export default function Controls({}: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)

  return (
    <div>Controls</div>
  )
}