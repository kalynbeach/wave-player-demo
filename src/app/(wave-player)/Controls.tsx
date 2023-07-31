'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Track } from '@/lib/types'

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  duration: number
  tracks: Track[]
  trackIndex: number
  isLooping: boolean
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track>>
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>
  setIsLooping: React.Dispatch<React.SetStateAction<boolean>>
  handleNext: () => void
}

export default function Controls({
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
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)

  const togglePause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping)
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
      <div className='flex flex-row gap-2 justify-between items-center'>
        {/* Previous */}
        <button onClick={() => handlePrevious()} className=''>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
        </button>
        {/* Play/Pause */}
        <button onClick={() => togglePause()} className=''>
          {
            isPlaying ?
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          }
        </button>
        {/* Next */}
        <button onClick={() => handleNext()} className=''>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
        </button>
        {/* Loop */}
        <button onClick={() => toggleLoop()} className=''>
          {
            isLooping ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/></svg>
          }
        </button>
      </div>
      {/* Volume Controls */}
      <div className='flex flex-row gap-2 justify-between items-center'>
        {/* Slider */}
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.valueAsNumber)}
          className={`bg-gradient-to-r from-green-500 from-${volume}%`}
        />
        {/* Mute */}
        <button onClick={() => setIsMuted(!isMuted)} className=''>
          {
            isMuted ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>
          }
        </button>
      </div>
    </div>
  )
}