import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { warningEmbed } from "../../utils/embeds.js";

export const leaveCommand: Command = {
  name: "leave",
  description: "Leave voice channel and destroy player",
  aliases: ["destroy"],
  slashData: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave voice channel and destroy player"),
  execute: async (ctx: CommandContext) => {
    await ctx.yukumo.destroyPlayer(ctx.guildId);
    await ctx.reply({
      embeds: [warningEmbed("Left voice channel and destroyed player.")],
    });
  },
};
