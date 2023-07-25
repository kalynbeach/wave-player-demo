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

  const handleProgressChange = () => {}

  const formatTime = (time: number) => {}

  return (
    <div>ProgressBar</div>
  )
}