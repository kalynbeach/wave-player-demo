import WavePlayer from './(wave-player)/WavePlayer'

export default function Home() {
  return (
    <main className='w-full min-h-screen md:p-24 flex flex-col items-center justify-between'>
      <div className='flex flex-col items-center justify-center'>
        <WavePlayer />
      </div>
    </main>
  )
}
