import { Track, WavePlayerMode } from './types'

const trackSrcBaseUrl = process.env.NEXT_PUBLIC_TRACK_SRC_BASE_URL

export const tracks: Track[] = [
  {
    id: 0,
    title: '0_initializer',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '0_initializer.wav',
    image: '',
    mode: WavePlayerMode.Loop
  },
  {
    id: 1,
    title: '1_workflows',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '1_workflows.wav',
    image: '',
    mode: WavePlayerMode.Loop
  },
  {
    id: 2,
    title: '2_stasis',
    artist: 'Kalyn Beach',
    src: trackSrcBaseUrl + '2_stasis.wav',
    image: '',
    mode: WavePlayerMode.Loop
  }
]