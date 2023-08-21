'use client'

import WavePlayer from './WavePlayer'
import { Track, WavePlayerMode } from '@/lib/types'
import { useStack } from '@/app/wave-player/context/StackContext'

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
  const [stackState, setStackState] = useStack()

  console.log(`[WavePlayerStack (${id})] stackState: `, stackState)

  return (
    <div className='wave-player-stack flex flex-col gap-6 justify-center items-center'>
      {
        tracks.map((track: Track) => (
          <WavePlayer
            key={track.id}
            id={track.id}
            mode={track.mode}
            tracks={track.mode === WavePlayerMode.Loop ? [track] : tracks}
            isActive={stackState.activePlayerId ? stackState.activePlayerId === id : false}
          />
        ))
      }
    </div>
  )
}