export enum WavePlayerMode {
  Loop = 'loop',
  Playlist = 'playlist'
}

export type WavePlayerConfig = {
  mode: WavePlayerMode
  tracks: Track[]
}

export type Track = {
  title: string
  artist: string
  src: string
  image: string
}