# YuKumo Discord Music Bot

An example Discord music bot demonstrating the [YuKumo](https://yukumo.vercel.app) Lavalink v4 client. Built with **discord.js v14** and **TypeScript**, running on the **Bun runtime**, with full wrapper API coverage and verbose console output.

## About YuKumo

YuKumo is a modern, lightweight, production-ready Lavalink v4 client engineered for TypeScript and JavaScript.

- **Documentation**: [https://yukumo.vercel.app](https://yukumo.vercel.app)
- **Install**: `npm i yukumo`
- **Source**: [github.com/Nex-Devz/YuKumo](https://github.com/Nex-Devz/YuKumo)

## Features

- **Verbose Console Logger** - Logs every wrapper event (`nodeReady`, `trackStart`, `trackEnd`, `stats`, `queueEnd`) with timestamps.
- **Node Selection Strategies** - Switch between `least-used`, `least-penalty`, `round-robin`, and `random` node selectors at runtime.
- **Audio & Queue Management** - Seek, replay history, reorder, clear, shuffle, and loop the queue.
- **Audio Filters & Effects** - `bassboost`, `nightcore`, `vaporwave`, `karaoke`, `3d`, `tremolo`, `vibrato`, `lowpass`, plus timescale `speed` and `pitch`.
- **Diagnostics** - Inspect live node stats, player status, and all active players across guilds.
- **Dual Command Support** - Slash commands (`/`) and prefix commands (`!`).

## Command List

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/join` | None | Join user's current voice channel |
| `/leave` | None | Leave voice channel & destroy player |
| `/play` | `<query>` | Search & play a track or playlist |
| `/pause` | None | Pause current track |
| `/resume` | None | Resume current track |
| `/skip` | None | Skip to next track in queue |
| `/stop` | None | Stop playback & clear queue |
| `/seek` | `<seconds>` | Seek to a timestamp in seconds |
| `/previous` | None | Replay previous track in history |
| `/queue` | None | Display server queue list |
| `/nowplaying` | None | Display current track details |
| `/clear` | None | Clear all upcoming queue tracks |
| `/remove` | `<position>` | Remove track at queue position |
| `/move` | `<from> <to>` | Re-order track position in queue |
| `/shuffle` | None | Shuffle upcoming queue tracks |
| `/loop` | `<none\|track\|queue>` | Set repeat mode |
| `/volume` | `<0-1000>` | Set audio volume level |
| `/filter` | `<preset>` | Apply filter (`clear`, `bassboost`, `nightcore`, `vaporwave`, `karaoke`, `3d`, `tremolo`, `vibrato`, `lowpass`) |
| `/speed` | `<0.5-3.0>` | Set timescale playback speed multiplier |
| `/pitch` | `<0.5-3.0>` | Set timescale audio pitch multiplier |
| `/nodeinfo` | None | Display connected Lavalink node status |
| `/nodeselect` | `<strategy>` | Switch node selection strategy (`least-used`, `least-penalty`, `round-robin`, `random`) |
| `/playerstatus` | None | Inspect player diagnostic status |
| `/players` | None | Inspect all active players across guilds |
| `/help` | None | Display commands overview |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+ (or Node.js 18+)
- A running [Lavalink v4](https://github.com/lavalink-devs/Lavalink) server
- A Discord bot token with `Guilds`, `GuildVoiceStates`, and `GuildMessages` intents

### Installation

```bash
cd discord-bot
bun install
```

### Configuration

Copy `.env.example` to `.env` and fill in your values:

```env
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here

# Lavalink Node Configuration
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASS=youshallnotpass
LAVALINK_SECURE=false
```

### Running the Bot

```bash
bun run dev       # development (hot reload)
bun start         # production
```

## Links

- YuKumo Documentation: <https://yukumo.vercel.app>
- YuKumo on npm: `npm i yukumo`
- YuKumo GitHub: <https://github.com/Nex-Devz/YuKumo>
- Lavalink: <https://github.com/lavalink-devs/Lavalink>
