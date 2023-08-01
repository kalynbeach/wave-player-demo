import Image from 'next/image'
import type { Track } from '@/lib/types'

type Props = {
  track: Track
}

export default function TrackImage({ track }: Props) {
  return (
    <div className='track-image'>
      <div className='w-32 h-[128px] bg-neutral-900 rounded'>
        { 
          track.image ? (
            <Image 
              src={track.image}
              alt={track.title}
              width={128}
              height={128}
            />
          ) : (
            <div className='w-full h-full flex justify-center items-center bg-neutral-300'>
              <span className='text-3xl'>🎵</span>
            </div>
          )
        }
      </div>
    </div>
  )
}