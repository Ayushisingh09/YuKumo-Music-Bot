import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed, errorEmbed } from "../../utils/embeds.js";

export const stayCommand: Command = {
  name: "stay",
  description: "Toggle 24/7 mode so bot remains in voice channel",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("stay")
    .setDescription("Toggle 24/7 mode (stay in voice channel when queue ends)")
    .addBooleanOption((option) =>
      option.setName("enable").setDescription("Enable or disable 24/7 mode").setRequired(false)
    ),
  execute: async (ctx: CommandContext) => {
    const player = ctx.player;
    if (!player) {
      await ctx.reply({ embeds: [errorEmbed("No active player found.")] });
      return;
    }
    const enableOpt = ctx.interaction ? ctx.interaction.options.getBoolean("enable") : null;
    const newState = enableOpt !== null ? enableOpt : !player.stayInVc;
    player.setStayInVc(newState);

    await ctx.reply({
      embeds: [successEmbed("24/7 Mode", `24/7 Voice Channel Mode has been ${newState ? "ENABLED" : "DISABLED"}.`)],
    });
  },
};
