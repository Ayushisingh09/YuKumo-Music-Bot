import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed, errorEmbed } from "../../utils/embeds.js";

export const skiptoCommand: Command = {
  name: "skipto",
  description: "Jump directly to a specific track position in queue",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Jump directly to a track position in queue")
    .addIntegerOption((option) =>
      option.setName("position").setDescription("Queue position number").setRequired(true)
    ),
  execute: async (ctx: CommandContext) => {
    const player = ctx.player;
    if (!player || player.queue.isEmpty) {
      await ctx.reply({ embeds: [errorEmbed("Queue is empty.")] });
      return;
    }

    let pos = 0;
    if (ctx.interaction) {
      pos = ctx.interaction.options.getInteger("position", true) - 1;
    } else if (ctx.args.length >= 1) {
      pos = parseInt(ctx.args[0], 10) - 1;
    }

    const target = player.queue.skipTo(pos);

    if (!target) {
      await ctx.reply({ embeds: [errorEmbed("Invalid queue position specified.")] });
      return;
    }

    await player.playTrack(target);

    await ctx.reply({
      embeds: [successEmbed("Skipped", `Jumped to track #${pos + 1}: **${target.info.title}**`)],
    });
  },
};
