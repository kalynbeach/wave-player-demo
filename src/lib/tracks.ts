import type { Track } from './types'

const trackSrcBaseUrl = process.env.NEXT_PUBLIC_TRACK_SRC_BASE_URL

console.log(`[tracks] trackSrcBaseUrl: `, trackSrcBaseUrl)

export const tracks: Track[] = [
  {
    title: '0_initializer',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '0_initializer.wav',
    image: ''
  },
  {
    title: '1_workflows',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '1_workflows.wav',
    image: ''
  },
  {
    title: '2_stasis',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '2_stasis.wav',
    image: ''
  }
]