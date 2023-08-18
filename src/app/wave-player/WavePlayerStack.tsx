import WavePlayer from './WavePlayer'
import { Track, WavePlayerMode } from '@/lib/types'

type Props = {
  id: number
  tracks: Track[]
  isActive: boolean
}

export default function WavePlayerStack({
  id,
  tracks,
  isActive
}: Props) {
  return (
    <div className='wave-player-stack flex flex-col gap-6 justify-center items-center'>
      {
        tracks.map((track: Track) => (
          <WavePlayer
            key={track.id}
            id={track.id}
            mode={track.mode}
            tracks={track.mode === WavePlayerMode.Loop ? [track] : tracks}
            isActive={false}
          />
        ))
      }
    </div>
  )
}