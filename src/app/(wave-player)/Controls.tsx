'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Track } from '@/lib/types'

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  duration: number
  tracks: Track[]
  trackIndex: number
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track>>
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>
  handleNext: () => void
}

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  setTimeProgress,
  handleNext
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)

  const togglePause = () => {
    setIsPlaying(!isPlaying)
  }

  const skipBackward = () => {
    audioRef.current!.currentTime -= 15
  }

  const skipForward = () => {
    audioRef.current!.currentTime += 15
  }

  const handlePrevious = () => {
    if (trackIndex === 0) {
      const lastTrackIndex = tracks.length - 1
      setTrackIndex(lastTrackIndex)
      setCurrentTrack(tracks[lastTrackIndex])
    } else {
      setTrackIndex(trackIndex - 1)
      setCurrentTrack(tracks[trackIndex - 1])
    }
  }

  const playAnimationRef = useRef(0)

  const update = useCallback(() => {
    const currentTime = audioRef.current!.currentTime
    setTimeProgress(currentTime)
    progressBarRef.current!.value = currentTime.toString()
    progressBarRef.current!.style.setProperty(
      '--range-progress',
      `${(parseInt(progressBarRef.current!.value) / duration) * 100}%`
    )
    playAnimationRef.current = requestAnimationFrame(update)
  }, [audioRef, duration, progressBarRef, setTimeProgress])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play()
    } else {
      audioRef.current!.pause()
    }
    playAnimationRef.current = requestAnimationFrame(update)
  }, [audioRef, isPlaying, update])

  useEffect(() => {
    audioRef.current!.volume = volume / 100
    audioRef.current!.muted = isMuted
  }, [audioRef, volume, isMuted])

  return (
    <div className='controls p-2 flex flex-row gap-2 border border-neutral-900 rounded'>
      {/* Playback Controls */}
      <div className='flex flex-row gap-1 justify-between items-center'>
        {/* Previous */}
        <button
          onClick={() => handlePrevious}
          className=''
        >
          ⏮️
        </button>
        {/* Play/Pause */}
        <button
          onClick={() => togglePause}
          className=''
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        {/* Next */}
        <button
          onClick={() => handleNext}
          className=''
        >
          ⏭️
        </button>
      </div>
      {/* Volume Controls */}
      <div className='flex flex-row gap-2 justify-between items-center'>
        {/* Mute */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className='w-12 font-mono text-xs'
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        {/* Silder */}
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.valueAsNumber)}
          className={`bg-gradient-to-r from-green-500 from-${volume}%`}
        />
      </div>
    </div>
  )
}