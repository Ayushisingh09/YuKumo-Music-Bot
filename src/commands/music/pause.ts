import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { warningEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const pauseCommand: Command = {
  name: "pause",
  description: "Pause audio playback",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder().setName("pause").setDescription("Pause audio playback"),
  execute: async (ctx: CommandContext) => {
    await ctx.yukumo.pause(ctx.guildId);
    await ctx.reply({
      embeds: [warningEmbed("Playback has been paused.")],
      components: buildPlayerComponents(ctx.player ?? undefined),
    });
  },
};
