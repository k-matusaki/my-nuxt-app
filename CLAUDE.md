# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an "Extreme Typing Game" - a typing game designed for engineers that features command-line commands and code snippets rather than traditional text. The goal is to help developers improve their typing speed with technical content like `docker compose`, `bundle exec rails c`, etc.

## Planned Architecture

- **Framework**: Nuxt 3 + Nuxt UI (SPA)
- **Screen Flow**: Ranking → Challenge → Name Input → Game → Results
- **Game Data**: Problems stored in text files with `---` separators
- **Content**: Command-line commands and code snippets (no Japanese input)

## Game Data Format

Problems are stored in text files with the following format:
```
RAILS_ENV=test bundle exec rails db:migrate
---
bundle exec rspec spec/requests/api/v1/users_spec.rb
---
class TweetsController < ApplicationController
  def index
    @tweets = Tweet.where(user: current_user).order(created_at: :desc).limit(30)
  end
end
```

## Development Commands

Once the project is set up with Nuxt 3, typical commands will be:
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Current Implementation Status

The Nuxt 3 application has been implemented with 4 main pages and full screen navigation flow.

### Known Issues

1. **Character color feedback issue**: The character-by-character visual feedback (green highlighting for correct input) may not be working properly in the game screen. The `getCharClass()` function is implemented but the reactivity might not be triggering correctly.

2. **Debug information**: Added progress counter (`currentIndex/totalChars`) in the game header to help debug the reactivity issue.

### Key Implementation Details

- **Keyboard Input**: Direct keyboard event handling without text input field (`@keydown` on game container)
- **Visual Effects**: CSS animations for explosion effects when wrong keys are pressed
- **State Management**: Vue 3 reactivity with refs for game state, progress tracking
- **Navigation**: Vue Router with programmatic navigation between screens

### Development Notes

- The application runs in SPA mode for static deployment
- LocalStorage is used for player name and game results persistence
- Explosion effects include screen shake and visual rings/flash animations
- Game prevents progression on incorrect input (must type correctly to advance)

### Files Structure

```
pages/
├── index.vue          # Ranking/Home screen
├── name-input.vue     # Player name input
├── game.vue           # Main game screen (has reactivity issues)
└── result.vue         # Results display

app.vue                # Root component
nuxt.config.ts         # Nuxt configuration (SPA mode)
package.json           # Dependencies and scripts
```

### Future Improvements Needed

- Fix character highlighting reactivity issue
- Implement external problem data loading from files
- Add real ranking persistence
- Improve mobile responsiveness
- Add sound effects