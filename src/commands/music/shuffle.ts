import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const shuffleCommand: Command = {
  name: "shuffle",
  description: "Shuffle the upcoming queue tracks",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffle the upcoming queue tracks"),
  execute: async (ctx: CommandContext) => {
    if (!ctx.player) return;
    ctx.player.queue.shuffle();
    await ctx.reply({
      embeds: [successEmbed("QUEUE SHUFFLED", "Shuffled all upcoming tracks in the queue.")],
      components: buildPlayerComponents(ctx.player),
    });
  },
};
