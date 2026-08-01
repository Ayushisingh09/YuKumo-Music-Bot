import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { warningEmbed } from "../../utils/embeds.js";

export const stopCommand: Command = {
  name: "stop",
  description: "Stop playback and clear the queue",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder().setName("stop").setDescription("Stop playback and clear the queue"),
  execute: async (ctx: CommandContext) => {
    await ctx.yukumo.stop(ctx.guildId);
    await ctx.reply({
      embeds: [warningEmbed("Playback stopped and queue cleared.")],
    });
  },
};
