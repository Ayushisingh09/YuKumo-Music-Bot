import { EmbedBuilder } from "discord.js";
import { YELLOW_THEME } from "../config/config.js";
import { formatDuration } from "./formatters.js";
import { getProgressBar, type TrackData, type Player } from "yukumo";

export function yellowEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(YELLOW_THEME.PRIMARY)
    .setFooter({ text: YELLOW_THEME.FOOTER_TEXT })
    .setTimestamp();
}

export function successEmbed(title: string, description: string): EmbedBuilder {
  return yellowEmbed()
    .setTitle(`[SUCCESS] ${title}`)
    .setDescription(description);
}

export function errorEmbed(description: string): EmbedBuilder {
  return yellowEmbed()
    .setTitle("[ERROR]")
    .setDescription(description);
}

export function warningEmbed(description: string): EmbedBuilder {
  return yellowEmbed()
    .setTitle("[WARNING]")
    .setDescription(description);
}

export function infoEmbed(title: string, description: string): EmbedBuilder {
  return yellowEmbed()
    .setTitle(`[INFO] ${title}`)
    .setDescription(description);
}

export function trackEmbed(track: TrackData, player?: Player): EmbedBuilder {
  const embed = yellowEmbed()
    .setTitle("[NOW PLAYING]")
    .setDescription(`**[${track.info.title}](${track.info.uri ?? "#"})**`)
    .addFields(
      { name: "Author", value: track.info.author || "Unknown", inline: true },
      { name: "Duration", value: formatDuration(track.info.length), inline: true },
      { name: "Source", value: track.info.sourceName || "Unknown", inline: true }
    );

  if (player) {
    const progress = getProgressBar(player.position, track.info.length);
    const time = `${formatDuration(player.position)} / ${formatDuration(track.info.length)}`;
    embed.addFields(
      { name: "Progress", value: `\`${progress}\` (${time})`, inline: false },
      { name: "Volume", value: `${player.volume}%`, inline: true },
      { name: "Repeat Mode", value: player.queue.repeatMode.toUpperCase(), inline: true },
      { name: "Autoplay", value: player.autoplay ? "ENABLED" : "DISABLED", inline: true },
      { name: "24/7 Mode", value: player.stayInVc ? "ENABLED" : "DISABLED", inline: true },
      { name: "Status", value: player.paused ? "PAUSED" : "PLAYING", inline: true }
    );
  }

  if (track.info.artworkUrl) {
    embed.setThumbnail(track.info.artworkUrl);
  }

  return embed;
}

export function queueEmbed(player: Player, page = 1): EmbedBuilder {
  const tracksList: TrackData[] = Array.from(player.queue.tracksList);
  const current = player.currentTrack;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tracksList.length / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageTracks = tracksList.slice(startIndex, startIndex + itemsPerPage);

  const formattedQueue = pageTracks
    .map(
      (t, idx) =>
        `\`${startIndex + idx + 1}.\` [${t.info.title}](${t.info.uri ?? "#"}) | \`${formatDuration(t.info.length)}\``
    )
    .join("\n");

  const nowPlayingText = current
    ? `**[${current.info.title}](${current.info.uri ?? "#"})** (\`${formatDuration(current.info.length)}\`)`
    : "None";

  return yellowEmbed()
    .setTitle(`[QUEUE] Server Queue (${player.queue.size} Tracks)`)
    .setDescription(
      `**Now Playing:**\n${nowPlayingText}\n\n**Up Next (Page ${currentPage}/${totalPages}):**\n${formattedQueue || "No more tracks in queue."}`
    )
    .addFields(
      { name: "Repeat Mode", value: player.queue.repeatMode.toUpperCase(), inline: true },
      { name: "Volume", value: `${player.volume}%`, inline: true },
      { name: "Status", value: player.paused ? "PAUSED" : "PLAYING", inline: true }
    );
}
