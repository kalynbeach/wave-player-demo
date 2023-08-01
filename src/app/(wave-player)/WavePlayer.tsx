'use client'

import { useState, useRef, useEffect } from 'react'
import Controls from './Controls'
import TrackImage from './TrackImage'
import TrackInfo from './TrackInfo'
import { tracks } from '@/lib/tracks'
import type { Track } from '@/lib/types'

export default function WavePlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[trackIndex])
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(true)
  const [audioInitialized, setAudioInitialized] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  const onLoadedMetadata = () => {
    if (audioRef.current && progressBarRef) {
      const seconds = audioRef.current.duration
      setDuration(seconds)
      const max = seconds.toString()
      progressBarRef.current!.max = max
    }
  }

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
    <div className='wave-player p-2 flex flex-row gap-2 border border-neutral-900 rounded'>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        loop={isLooping}
        defaultValue={currentTrack.src}
      />
      <TrackImage
        track={currentTrack}
      />
      <div className='flex flex-col gap-2 justify-between'>
        <TrackInfo
          track={currentTrack}
        />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            timeProgress,
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
    </div>
  )
}