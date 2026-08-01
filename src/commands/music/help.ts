import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandContext } from "../types.js";
import { yellowEmbed } from "../../utils/embeds.js";

export const helpCommand: Command = {
  name: "help",
  description: "Show help menu and full bot command list",
  slashData: new SlashCommandBuilder().setName("help").setDescription("Show help menu and full bot command list"),
  execute: async (ctx: CommandContext) => {
    const embed = yellowEmbed()
      .setTitle("[YELLOW MUSIC BOT COMMANDS]")
      .setDescription("Prefix: ! or Slash Commands / - Built with Discord Component V2 and Bun Runtime")
      .addFields(
        { name: "Voice Commands", value: "`join`, `leave`" },
        { name: "Playback Commands", value: "`play <query> [engine]`, `pause`, `resume`, `skip`, `stop`, `seek <seconds>`, `previous`" },
        { name: "Queue Commands", value: "`queue`, `nowplaying` (`np`), `clear`, `remove <pos>`, `move <from> <to>`, `shuffle`, `loop <mode>`" },
        { name: "Audio Filters & Effects", value: "`volume <0-1000>`, `filter <preset>`, `speed <0.5-3.0>`, `pitch <0.5-3.0>`" },
        { name: "System & Diagnostics", value: "`nodeinfo` (`stats`), `nodeselect <strategy>`, `playerstatus` (`status`), `players`" }
      );

    await ctx.reply({ embeds: [embed] });
  },
};
