import { render, screen } from '@testing-library/react'
import { tracks } from '@/lib/tracks'
import { WavePlayerMode } from '@/lib/types'
import WavePlayer from '@/app/wave-player/WavePlayer'
import WavePlayerStack from '@/app/wave-player/WavePlayerStack'
import Home from '@/app/page'


// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />)
//     const heading = screen.getByRole('heading', {
//       name: /wave-player/i,
//     })
//     expect(heading).toBeInTheDocument()
//   })
// })


describe('WavePlayer', () => {
  it('renders', () => {
    render(<WavePlayer
      id={0}
      mode={WavePlayerMode.Playlist}
      tracks={tracks}
      isActive={false}
    />)
    // ...
  })
})


describe('WavePlayerStack', () => {
  it('renders', () => {
    render(<WavePlayerStack
      id={0}
      tracks={tracks}
      isActive={false}
    />)
    // ...
  })
})


// TODO: add context tests