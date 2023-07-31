import Image from 'next/image'
import type { Track } from '@/lib/types'

type Props = {
  currentTrack: Track
  isLooping: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  handleNext: () => void
}

export default function TrackDisplay({
  currentTrack,
  isLooping,
  audioRef,
  progressBarRef,
  setDuration,
  handleNext
}: Props) {
  const onLoadedMetadata = () => {
    if (audioRef.current && progressBarRef) {
      const seconds = audioRef.current.duration
      setDuration(seconds)
      const max = seconds.toString()
      progressBarRef.current!.max = max
    }
  }

  return (
    <div className='track-display'>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        loop={isLooping}
        defaultValue={currentTrack.src}
      />
      {/* Audio Info */}
      <div className='flex flex-col gap-2 justify-between items-center'>
        {/* Image */}
        <div className='w-[350px] h-[350px] bg-neutral-900 rounded'>
          { 
            currentTrack.image ? (
              <Image 
                src={currentTrack.image}
                alt={currentTrack.title}
                width={350}
                height={350}
              />
            ) : (
              <div className='w-full h-full flex justify-center items-center bg-neutral-300'>
                <span className='text-3xl'>🎵</span>
              </div>
            )
          }
        </div>
        {/* Text */}
        <div className='w-full flex flex-col gap-2'>
          <span className='font-mono text-lg'>{currentTrack.title}</span>
          <span className='font-mono text-base'>{currentTrack.artist}</span>
          {/* TODO: Add `album` and any other track info */}
        </div>
      </div>
    </div>
  )
}