import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { errorEmbed, successEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const previousCommand: Command = {
  name: "previous",
  description: "Play previous track from queue history",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("previous")
    .setDescription("Play previous track from queue history"),
  execute: async (ctx: CommandContext) => {
    if (!ctx.player) return;
    const prevTrack = ctx.player.queue.previous();
    if (prevTrack) {
      await ctx.player.playTrack(prevTrack);
      await ctx.reply({
        embeds: [
          successEmbed("PREVIOUS TRACK", `Playing previous track **${prevTrack.info.title}**`),
        ],
        components: buildPlayerComponents(ctx.player),
      });
    } else {
      await ctx.reply({
        embeds: [errorEmbed("No previous tracks available in queue history.")],
      });
    }
  },
};
