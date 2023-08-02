import WavePlayer from './(wave-player)/WavePlayer'
import WavePlayerStack from './(wave-player)/WavePlayerStack'
import { tracks } from '@/lib/tracks'

export default function Home() {
  return (
    <main className='w-full min-h-screen md:p-24 flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <WavePlayerStack
          tracks={tracks}
        />
      </div>
    </main>
  )
}
