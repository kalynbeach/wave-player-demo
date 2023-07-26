import Image from 'next/image'
import type { Track } from '@/lib/types'

type Props = {
  currentTrack: Track
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  handleNext: () => void
}

export default function TrackDisplay({
  currentTrack,
  audioRef,
  progressBarRef,
  setDuration,
  handleNext
}: Props) {
  const onLoadedMetadata = () => {
    if (audioRef && audioRef.current && progressBarRef) {
      const seconds = audioRef.current.duration
      const max = seconds.toString()
      setDuration(seconds)
      progressBarRef.current!.max = max
    }
  }

  return (
    <div className='track-display '>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      {/* Audio Info */}
      <div className='flex flex-col gap-2 justify-between items-center'>
        {/* Image */}
        <div className='w-[330px] h-[330px] bg-neutral-900 rounded'>
          { 
            currentTrack.image ? (
              <Image 
                src={currentTrack.image}
                alt={currentTrack.title}
                width={330}
                height={320}
              />
            ) : (
              <div className='w-full h-full flex justify-center items-center bg-neutral-300'>
                <span className='text-3xl'>🎵</span>
              </div>
            )
          }
        </div>
        {/* Text */}
        <div className='w-full flex flex-col gap-2 font-mono'>
          <span className='text-lg'>{currentTrack.title}</span>
          <span className='text-base'>{currentTrack.artist}</span>
          {/* TODO: Add `album` and any other track info */}
        </div>
      </div>
    </div>
  )
}