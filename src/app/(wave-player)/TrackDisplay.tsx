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
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}

      />
    </div>
  )
}