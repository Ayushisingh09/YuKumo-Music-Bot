import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed, errorEmbed } from "../../utils/embeds.js";

export const swapCommand: Command = {
  name: "swap",
  description: "Swap positions of two tracks in the queue",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("swap")
    .setDescription("Swap two tracks in the queue by position number")
    .addIntegerOption((option) =>
      option.setName("track1").setDescription("Position of first track").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("track2").setDescription("Position of second track").setRequired(true)
    ),
  execute: async (ctx: CommandContext) => {
    const player = ctx.player;
    if (!player || player.queue.isEmpty) {
      await ctx.reply({ embeds: [errorEmbed("Queue is empty.")] });
      return;
    }

    let pos1 = 0;
    let pos2 = 0;

    if (ctx.interaction) {
      pos1 = ctx.interaction.options.getInteger("track1", true) - 1;
      pos2 = ctx.interaction.options.getInteger("track2", true) - 1;
    } else if (ctx.args.length >= 2) {
      pos1 = parseInt(ctx.args[0], 10) - 1;
      pos2 = parseInt(ctx.args[1], 10) - 1;
    }

    const success = player.queue.swap(pos1, pos2);
    if (!success) {
      await ctx.reply({ embeds: [errorEmbed("Invalid track positions specified.")] });
      return;
    }

    await ctx.reply({
      embeds: [successEmbed("Queue Updated", `Swapped track #${pos1 + 1} and #${pos2 + 1}.`)],
    });
  },
};
