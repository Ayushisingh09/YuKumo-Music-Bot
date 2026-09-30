import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { errorEmbed, successEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";
import { TimescaleFilter } from "yukumo";

export const pitchCommand: Command = {
  name: "pitch",
  description: "Set timescale audio pitch multiplier (e.g. 1.2)",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder()
    .setName("pitch")
    .setDescription("Set timescale audio pitch multiplier (e.g. 1.2)")
    .addNumberOption((o) =>
      o.setName("value").setDescription("Pitch multiplier (0.5 to 3.0)").setRequired(true)
    ),
  execute: async (ctx: CommandContext) => {
    if (!ctx.player) return;
    const pitchVal = Number(ctx.args[0]);
    if (isNaN(pitchVal) || pitchVal < 0.5 || pitchVal > 3.0) {
      await ctx.reply({ embeds: [errorEmbed("Pitch multiplier must be between 0.5 and 3.0.")] });
      return;
    }
    ctx.player.filters.add(new TimescaleFilter({ pitch: pitchVal }));
    await ctx.player.setFilters();
    await ctx.reply({
      embeds: [successEmbed("PITCH UPDATED", `Audio pitch set to **${pitchVal}x**`)],
      components: buildPlayerComponents(ctx.player),
    });
  },
};
