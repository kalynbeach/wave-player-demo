# wave-player

A music player.

## Setup

Install dependencies:

```zsh
npm i
# or
pnpm i
```

Run development server:

```zsh
npm run dev
# or
pnpm dev
```

Run tests:

```zsh
npm run test
npm run test:watch # watch mode
# or
pnpm test
pnpm test:watch
```

Build:

```zsh
npm run build
# or
pnpm build
```

---

## TODOs

- Add more tests
- Add `WavePlayerStack` context
  - If `WavePlayer` is in a `WavePlayerStack`:
    - `WavePlayer` components will be able to access the `StackContext` context via the `useStack` hook
      - `Controls`: on `isPlaying` state change, update `stackState.activePlayerId`