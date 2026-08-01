# YuKumo Discord Music Bot

A feature-packed Discord Music Bot built using **discord.js v14** and the **YuKumo Lavalink v4** client wrapper, configured with **verbose console output** for wrapper testing and full API coverage.

---

## 🌟 Features & Wrapper Testing Suite

- 📺 **Verbose Console Logger**: Log every single event (`nodeReady`, `trackStart`, `trackEnd`, `voiceStateUpdate`, `playerCreate`, `queueEnd`) with precise timestamps.
- 📥 **Explicit Voice Controls**: `/join` and `/leave` / `/destroy` to join and leave voice channels on-demand.
- 🎛️ **Full Audio & Queue Management**:
  - `seek`: Seek to any timestamp in seconds.
  - `previous`: Replay previous tracks from queue history.
  - `clear`: Clear upcoming tracks from queue.
  - `remove`: Remove a track at a specific index.
  - `move`: Re-order track positions in the queue.
  - `nodeinfo`: Inspect connected Lavalink node status, penalties, and player count.
- ⚡ **Dual Command Support**: Works with Slash Commands (`/`) and Prefix Commands (`!`).

---

## 📋 Comprehensive Command List

| Command | Arguments | Description | YuKumo Wrapper API |
|---------|-----------|-------------|--------------------|
| `/join` | None | Join user's current voice channel | `yukumo.createPlayer()` |
| `/leave` | None | Leave voice channel & destroy player | `yukumo.destroyPlayer()` |
| `/play` | `<query>` | Search & play track or playlist | `yukumo.search()`, `yukumo.play()` |
| `/pause` | None | Pause current track | `yukumo.pause()` |
| `/resume` | None | Resume current track | `yukumo.resume()` |
| `/skip` | None | Skip to next track in queue | `yukumo.skip()` |
| `/stop` | None | Stop playback & clear queue | `yukumo.stop()` |
| `/seek` | `<seconds>` | Seek to timestamp in seconds | `player.seek()` |
| `/previous` | None | Replay previous track in history | `player.queue.previous()` |
| `/queue` | None | Display server queue list | `player.queue.tracksList` |
| `/clear` | None | Clear all upcoming queue tracks | `player.queue.clear()` |
| `/remove` | `<position>` | Remove track at queue position | `player.queue.remove()` |
| `/move` | `<from> <to>` | Re-order track position in queue | `player.queue.move()` |
| `/nowplaying` | None | Display playing track details | `player.currentTrack` |
| `/volume` | `<0-1000>` | Set audio volume level | `yukumo.setVolume()` |
| `/filter` | `<preset>` | Apply filter (`clear`, `bassboost`, `nightcore`, `vaporwave`, `karaoke`, `3d`) | `player.filters.add()` |
| `/shuffle` | None | Shuffle upcoming queue tracks | `player.queue.shuffle()` |
| `/loop` | `<mode>` | Set repeat mode (`none`, `track`, `queue`) | `player.queue.setRepeatMode()` |
| `/nodeinfo` | None | Display connected Lavalink node status | `yukumo.getNodes()` |
| `/help` | None | Display commands overview | — |

---

## 🛠️ Running the Bot

```bash
cd discord-bot
npm run build
npm start
```
