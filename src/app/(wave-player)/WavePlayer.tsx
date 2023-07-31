'use client'

import { useState, useRef, useEffect } from 'react'
import Controls from './Controls'
import ProgressBar from './ProgressBar'
import TrackDisplay from './TrackDisplay'
import type { Track } from '@/lib/types'
import { tracks } from '@/lib/tracks'

export default function WavePlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[trackIndex])
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(true)
  const [audioInitialized, setAudioInitialized] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  const handleNext = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1)
      setCurrentTrack(tracks[trackIndex + 1])
    } else {
      setTrackIndex(0)
      setCurrentTrack(tracks[0])
    }
  }

  useEffect(() => {
    if (!audioInitialized) {
      console.log(`[WavePlayer] Initializing audio...`)
      audioRef.current!.src = currentTrack.src
      audioRef.current!.load()
      console.log(`[WavePlayer] Audio initialized: `, audioRef.current)
      setAudioInitialized(true)
    }
  }, [audioInitialized, currentTrack])

  return (
    <div className='wave-player w-96 p-4 flex flex-col gap-2 border border-neutral-900 rounded'>
      <TrackDisplay
        {...{
          currentTrack,
          isLooping,
          audioRef,
          progressBarRef,
          setDuration,
          handleNext
        }}
      />
      <ProgressBar
        {...{
          audioRef,
          progressBarRef,
          timeProgress,
          duration
        }}
      />
      <Controls
        {...{
          audioRef,
          progressBarRef,
          duration,
          tracks,
          trackIndex,
          isLooping,
          setTrackIndex,
          setCurrentTrack,
          setTimeProgress,
          setIsLooping,
          handleNext
        }}
      />
    </div>
  )
}