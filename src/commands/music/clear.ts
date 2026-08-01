import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { warningEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const clearCommand: Command = {
  name: "clear",
  description: "Clear all upcoming tracks from queue",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear all upcoming tracks from queue"),
  execute: async (ctx: CommandContext) => {
    if (!ctx.player) return;
    ctx.player.queue.clear();
    await ctx.reply({
      embeds: [warningEmbed("Cleared all upcoming tracks from queue.")],
      components: buildPlayerComponents(ctx.player),
    });
  },
};
