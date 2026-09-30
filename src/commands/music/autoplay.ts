import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { successEmbed, errorEmbed } from "../../utils/embeds.js";

export const autoplayCommand: Command = {
  name: "autoplay",
  description: "Toggle smart autoplay track recommendation",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggle smart autoplay recommendation when queue ends")
    .addBooleanOption((option) =>
      option.setName("enable").setDescription("Enable or disable autoplay").setRequired(false)
    ),
  execute: async (ctx: CommandContext) => {
    const player = ctx.player;
    if (!player) {
      await ctx.reply({ embeds: [errorEmbed("No active player found.")] });
      return;
    }
    const enableOpt = ctx.interaction ? ctx.interaction.options.getBoolean("enable") : null;
    const newState = enableOpt !== null ? enableOpt : !player.autoplay;
    player.setAutoplay(newState);

    await ctx.reply({
      embeds: [successEmbed("Autoplay Settings", `Autoplay has been ${newState ? "ENABLED" : "DISABLED"}.`)],
    });
  },
};
