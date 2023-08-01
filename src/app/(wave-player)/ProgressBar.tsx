type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
  progressBarRef: React.RefObject<HTMLInputElement>
  timeProgress: number
  duration: number
}

export default function ProgressBar({
  audioRef,
  progressBarRef,
  timeProgress,
  duration
}: Props) {

  const handleProgressChange = () => {
    audioRef.current!.currentTime = parseInt(progressBarRef.current!.value)
  }

  const formatTime = (time: number) => {
    if (time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
      return `${formattedMinutes}:${formattedSeconds}`
    }
    return '00:00'
  }

  return (
    <div className='progress-bar p-2 flex flex-row gap-2 justify-between items-center'>
      <span className='w-14 font-mono text-sm'>{formatTime(timeProgress)}</span>
      <input
        type='range'
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
        className='w-48'
      />
      <span className='w-14 font-mono text-sm text-right'>{formatTime(duration)}</span>
    </div>
  )
}