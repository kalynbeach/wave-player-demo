import { WavePlayerMode } from '@/lib/types'
import WavePlayer from './wave-player/WavePlayer'
import WavePlayerStack from './wave-player/WavePlayerStack'
import { tracks } from '@/lib/tracks'

export default function Home() {
  return (
    <main className='w-full min-h-screen md:p-24 flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-6 justify-center items-start'>
        <h1 className='mb-6 text-3xl font-mono'>wave-player</h1>
        <h2 className='mt-6 text-xl font-mono'>WavePlayer</h2>
        <WavePlayer
          id={0}
          mode={WavePlayerMode.Playlist}
          tracks={tracks}
          isStacked={false}
        />
        <h2 className='mt-6 text-xl font-mono'>WavePlayerStack</h2>
        <WavePlayerStack
          id={0}
          tracks={tracks}
        />
      </div>
    </main>
  )
}
