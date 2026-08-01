import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { errorEmbed, trackEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const nowplayingCommand: Command = {
  name: "nowplaying",
  description: "Show details of the currently playing track",
  aliases: ["np"],
  requiresVoice: false,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show details of the currently playing track"),
  execute: async (ctx: CommandContext) => {
    if (!ctx.player || !ctx.player.currentTrack) {
      await ctx.reply({ embeds: [errorEmbed("Nothing is currently playing in this server.")] });
      return;
    }

    await ctx.reply({
      embeds: [trackEmbed(ctx.player.currentTrack, ctx.player)],
      components: buildPlayerComponents(ctx.player),
    });
  },
};
