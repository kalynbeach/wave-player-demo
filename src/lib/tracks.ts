import type { Track } from './types'

const trackSrcBaseUrl = process.env.TRACK_SRC_BASE_URL

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