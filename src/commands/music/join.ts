import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { errorEmbed, successEmbed, infoEmbed } from "../../utils/embeds.js";

export const joinCommand: Command = {
  name: "join",
  description: "Join your current voice channel",
  requiresVoice: true,
  slashData: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join your current voice channel"),
  execute: async (ctx: CommandContext) => {
    if (!ctx.voiceChannelId) {
      await ctx.reply({ embeds: [errorEmbed("You must be connected to a voice channel.")] });
      return;
    }

    if (ctx.player) {
      await ctx.reply({
        embeds: [infoEmbed("VOICE CHANNEL", `Player is already connected to <#${ctx.player.voiceChannelId}>`)],
      });
      return;
    }

    await ctx.yukumo.createPlayer({
      guildId: ctx.guildId,
      voiceChannelId: ctx.voiceChannelId,
      textChannelId: ctx.textChannelId ?? "",
    });

    await ctx.reply({
      embeds: [successEmbed("VOICE CONNECTED", `Joined voice channel <#${ctx.voiceChannelId}>`)],
    });
  },
};
