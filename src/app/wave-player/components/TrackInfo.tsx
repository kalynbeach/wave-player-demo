import type { Track } from '@/lib/types'

type Props = {
  track: Track
}

export default function TrackInfo({ track }: Props) {
  return (
    <div className='track-info p-2 flex-grow'>
      <div className='w-full min-h-[5rem] md:min-h-fit flex flex-col gap-2 justify-evenly'>
        <span className='font-mono font-bold text-xl'>{track.title}</span>
        <span className='font-mono text-xs'>{track.artist}</span>
        {/* TODO: Add `track.album` and any other track info */}
      </div>
    </div>
  )
}