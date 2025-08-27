# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project name is FAG: "the Faster Animated Gradient". 
"Faster" means that this project focus on performance. "Animated". so there is movement.That's an animation, not a still image.

Then, what is "Gradient". Is it linear, radical, or conic? None of the above.
But, use linear gradient. It resembles digital art like Grainy Gradient. To put it in words, A screen is filled with some blob shapes. By “filled,” doen't mean the background is painted over. Also, blob shapes are the preparatory stage for graphics. These blob shapes will transform. They may disappear or increase,  ripple, grow thinner or thicker, etc. all sorts of things. And, blobs shape colors will changes. A blur effect will applied over this, along with noise. Similar things,  The background when displayed lyrics in Apple Music, Gradient GL (https://github.com/metaory/gradient-gl), etc.

FAG's Goal is to distribute this as a package. The user give FAG the canvas element id. The FAG displays graphics on the canvas element.

## Project Structure

- **Root**: Monorepo configuration with workspace management
- **packages/fag**: Core TypeScript library (`@7rs/fag`)
- **packages/fag-demo**: React demo application showcasing the library

## Development Tools

- **Bun**: Package manager and runtime (use `bun` commands)
- **TypeScript**: Type checking and compilation
- **Biome**: Linting and formatting
- **Oxlint**: Additional linting
- **Vite**: Build tool for demo app (using rolldown-vite variant)
- **React**: UI framework for demo
- **UnoCSS + DaisyUI**: Styling framework

## Build Commands

### Core Library (@7rs/fag)
```bash
cd packages/fag
bun run build    # Compiles TypeScript to dist/
bun run dev      # Watch mode compilation
```

### Demo Application
```bash
cd packages/fag-demo
bun run dev      # Development server
bun run build    # Production build
bun run preview  # Preview build
```

## Important Notes

- The core library must be built before the demo can reference it
- Root tsconfig.json has `noEmit: true`, so packages need to override this for compilation
- Use workspace protocol (`workspace:*`) for internal package dependencies
