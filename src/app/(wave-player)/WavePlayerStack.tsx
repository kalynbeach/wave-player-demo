import WavePlayer from './WavePlayer'
import { Track, WavePlayerMode } from '@/lib/types'

type Props = {
  tracks: Track[]
}

export default function WavePlayerStack({ tracks }: Props) {
  return (
    tracks.map((track: Track) => (
      <WavePlayer
        key={track.id}
        id={track.id}
        mode={track.mode}
        tracks={track.mode === WavePlayerMode.Loop ? [track] : tracks}
        isActive={false}
      />
    ))
  )
}