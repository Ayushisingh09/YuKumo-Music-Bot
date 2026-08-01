import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { yellowEmbed, errorEmbed } from "../../utils/embeds.js";

export const lyricsCommand: Command = {
  name: "lyrics",
  description: "Fetch synced lyrics for current playing track or query",
  requiresVoice: false,
  requiresPlayer: false,
  slashData: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Fetch synchronized lyrics for current track or song title")
    .addStringOption((option) =>
      option.setName("query").setDescription("Song name to search").setRequired(false)
    ),
  execute: async (ctx: CommandContext) => {
    if (ctx.interaction) {
      await ctx.interaction.deferReply();
    }
    const query = ctx.interaction ? ctx.interaction.options.getString("query") : ctx.args.join(" ");
    const player = ctx.player;

    let title = "";
    let author = "";

    if (query) {
      title = query;
    } else if (player?.currentTrack?.info) {
      title = player.currentTrack.info.title;
      author = player.currentTrack.info.author;
    } else {
      const err = errorEmbed("Please specify a song title or play a track first.");
      if (ctx.interaction) {
        await ctx.interaction.editReply({ embeds: [err] });
      } else {
        await ctx.reply({ embeds: [err] });
      }
      return;
    }

    const { LyricsClient } = await import("yukumo");
    const client = new LyricsClient();
    const result = await client.getLyrics(title, author);

    if (!result || (!result.plainLyrics && result.syncedLyrics.length === 0)) {
      const err = errorEmbed(`No lyrics found for [${title}]`);
      if (ctx.interaction) {
        await ctx.interaction.editReply({ embeds: [err] });
      } else {
        await ctx.reply({ embeds: [err] });
      }
      return;
    }

    const lyricsText = result.plainLyrics || result.syncedLyrics.map((line) => line.text).join("\n");
    const truncated = lyricsText.length > 3900 ? lyricsText.slice(0, 3900) + "..." : lyricsText;

    const embed = yellowEmbed()
      .setTitle(`[LYRICS] ${result.title} - ${result.artist}`)
      .setDescription(truncated);

    if (ctx.interaction) {
      await ctx.interaction.editReply({ embeds: [embed] });
    } else {
      await ctx.reply({ embeds: [embed] });
    }
  },
};
