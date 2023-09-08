# mud-game-tools

## Description

`mud-dev-tools` is a developer utility package designed to assist in building Ethereum applications with the MUD framework. This package streamlines the development process by offering a browser and specialized tabs: CheatcodesList and Editor, to interact with the onchain game state.

## Features

- **Browser**: A basic browser to navigate the onchain environment.
- **CheatcodesList**: Write cheatcodes to manipulate the game state for testing.
- **Editor**: A comprehensive editor to view and edit all parts of the game state.

## Prerequisites

- Node.js (>=14.0.0)
- MUD V2

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourorg/mud-dev-tools.git
   ```

2. Install dependencies:
   ```bash
   cd mud-dev-tools
   pnpm install
   pnpm build
   ```

## Usage

### Browser

To integate the development browser, add the following to your file:

```jsx
<Browser
    layers={{ react: { world, components: mud.components } }}
    world={world}
/>
```

### CheatcodesList
To add the Cheatcodes list to the browser, create a Cheatcodes object with the following interface:
```jsx
export type Cheatcodes = Record<string, Cheatcode>;

// NOTE: the params field must match the names and types of function arguments
export type Cheatcode = {
  function: (...args: any[]) => any;
  params: { name: string; type: "number" | "string" | "boolean" }[];
};
```

To use it, add the cheatcodes as a parameter to the Browser:
```jsx
 <Browser
    layers={{ react: { world, components: mud.components } }}
    world={world}
    cheatcodes={cheatcodes}
/>
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

## License

MIT
