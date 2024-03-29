# Primodium Game Tools

## Description

`@primodiumxyz/mud-game-tools` is a developer utility package designed to assist in building Ethereum applications with the MUD framework. This package streamlines the development process by offering a browser and specialized tabs: CheatcodesList and Editor, to interact with the onchain game state.

## Features

- **Browser**: A basic browser to navigate the onchain environment.
- **CheatcodesList**: Write cheatcodes to manipulate the game state for testing.
- **Editor**: A comprehensive editor to view and edit all parts of the game state.

## Prerequisites

- Node.js (>=14.0.0)
- pnpm
- MUD V2

## Installation

Install with npm:

```bash
npm install @primodiumxyz/mud-game-tools
```

## Usage

### Browser

To integrate the development browser, add the following to your file:

```jsx
import { Browser } from "mud-game-tools";
<Browser
  layers={{ react: { world, components: mud.components } }}
  world={world}
/>;
```

### CheatcodesList

To add the Cheatcodes list to the browser, create a Cheatcodes object with the following interface:

```jsx
export type Cheatcodes = Record<string, Cheatcode>;

// NOTE: the params field must match the names and types of function arguments
export type Cheatcode = {
  function: (...args: any[]) => any,
  params: { name: string, type: "number" | "string" | "boolean" }[],
};
```

To use it, add the cheatcodes as a parameter to the Browser:

```jsx
import { Browser } from "mud-game-tools";
<Browser
  layers={{ react: { world, components: mud.components } }}
  world={world}
  cheatcodes={cheatcodes}
/>;
```

Access via the browser's `Cheatcodes` tab.

### Editor

Access via the browser's `Editor` tab. This allows you to:

- View game state
- Modify components
- Execute queries

## Development

1. Run the local development server:
   ```bash
   pnpm run dev
   ```

## Contributions

Pull requests and issues are welcome.

To develop this package locally, clone the repository and install dependencies.

```bash
git clone https://github.com/primodiumxyz/mud-dev-tools.git
cd mud-dev-tools
pnpm install
pnpm build
```

## License

MIT
