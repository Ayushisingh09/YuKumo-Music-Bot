import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { infoEmbed, warningEmbed } from "../../utils/embeds.js";
import { buildPlayerComponents } from "../../components/playerComponents.js";

export const skipCommand: Command = {
  name: "skip",
  description: "Skip the currently playing track",
  requiresVoice: true,
  requiresPlayer: true,
  slashData: new SlashCommandBuilder().setName("skip").setDescription("Skip the currently playing track"),
  execute: async (ctx: CommandContext) => {
    const skipped = await ctx.yukumo.skip(ctx.guildId);
    if (skipped) {
      await ctx.reply({
        embeds: [infoEmbed("TRACK SKIPPED", `Skipped track **${skipped.info.title}**`)],
        components: buildPlayerComponents(ctx.player ?? undefined),
      });
    } else {
      await ctx.reply({
        embeds: [warningEmbed("Skipped current track. Queue is now empty.")],
      });
    }
  },
};
