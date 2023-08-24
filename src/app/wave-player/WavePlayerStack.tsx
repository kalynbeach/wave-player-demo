'use client'

import WavePlayer from './WavePlayer'
import { Track, WavePlayerMode } from '@/lib/types'
import { useStack } from '@/app/wave-player/context/StackContext'

type Props = {
  id: number
  tracks: Track[]
}

export default function WavePlayerStack({
  id,
  tracks
}: Props) {
  const [stackState, setStackState] = useStack()
  return (
    <div className='wave-player-stack flex flex-col gap-6 justify-center items-center'>
      {
        tracks.map((track: Track) => (
          <WavePlayer
            key={track.id}
            id={track.id}
            mode={track.mode}
            tracks={track.mode === WavePlayerMode.Loop ? [track] : tracks}
            isStacked={true}
          />
        ))
      }
    </div>
  )
}