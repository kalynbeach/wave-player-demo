'use client'

import { useState, useRef, useEffect } from 'react'
import { ModeProvider } from './context/ModeContext'
import Controls from './components/Controls'
import TrackImage from './components/TrackImage'
import TrackInfo from './components/TrackInfo'
import { WavePlayerMode } from '@/lib/types'
import type { Track } from '@/lib/types'

type Props = {
  id: number
  mode: WavePlayerMode
  tracks: Track[]
  isActive: boolean // TODO: replace this with component state?
}

export default function WavePlayer({ id, mode, tracks, isActive }: Props) {
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
      console.log(`[WavePlayer (${id})] Initializing audio...`)
      audioRef.current!.src = currentTrack.src
      audioRef.current!.load()
      console.log(`[WavePlayer (${id})] Audio initialized: `, audioRef.current)
      setAudioInitialized(true)
    }
  }, [audioInitialized, currentTrack, id])

  return (
    <div className='wave-player max-w-xs md:max-w-3xl'>
      <ModeProvider mode={mode}>
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={handleNext}
          loop={isLooping}
          defaultValue={currentTrack.src}
        />
        <div className='wave-player-inner p-2 flex flex-col md:flex-row gap-2 border border-neutral-900 rounded'>
          <TrackImage
            track={currentTrack}
          />
          <div className='flex flex-col md:gap-2 justify-between'>
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
      </ModeProvider>
    </div>
  )
}