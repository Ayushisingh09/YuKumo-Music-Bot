import { Events, type Message } from "discord.js";
import { client, yukumo } from "../yukumo/client.js";
import { CONFIG } from "../config/config.js";
import { getCommand } from "../commands/index.js";
import { errorEmbed } from "../utils/embeds.js";

export function registerMessageCreateEvent(): void {
  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot || !message.guild || !message.content.startsWith(CONFIG.PREFIX)) return;

    const args = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/);
    const rawCommand = args.shift()?.toLowerCase();
    if (!rawCommand) return;

    const command = getCommand(rawCommand);
    if (!command) return;

    const guildId = message.guild.id;
    const voiceChannelId = message.member?.voice?.channelId ?? null;

    if (command.requiresVoice && !voiceChannelId) {
      await message.reply({
        embeds: [errorEmbed("You must be connected to a voice channel to use this command.")],
      });
      return;
    }

    const player = yukumo.getPlayer(guildId);
    if (command.requiresPlayer && !player) {
      await message.reply({
        embeds: [errorEmbed("No active player in this server. Use play command first.")],
      });
      return;
    }

    await command.execute({
      guildId,
      voiceChannelId,
      textChannelId: message.channelId,
      args,
      user: message.author,
      member: message.member,
      reply: async (options) => {
        return await message.reply(options);
      },
      yukumo,
      player,
      message,
    });
  });
}
