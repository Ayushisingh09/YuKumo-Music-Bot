import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const resumeCommand: Command = {
  name: "resume",
  description: "Resume audio playback",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder().setName("resume").setDescription("Resume audio playback"),
  execute: async (ctx: CommandContext) => {
    await ctx.yukumo.resume(ctx.guildId);
    await ctx.reply({
      embeds: [successEmbed("RESUMED", "Playback has been resumed.")],
      components: buildPlayerComponents(ctx.player ?? undefined),
    });
  },
};
