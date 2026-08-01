import type {
  ChatInputCommandInteraction,
  GuildMember,
  Message,
  User,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import type { Player, YuKumo } from "yukumo";

export interface CommandContext {
  guildId: string;
  voiceChannelId: string | null;
  textChannelId: string;
  args: string[];
  user: User;
  member: GuildMember | null;
  reply: (options: { embeds?: any[]; components?: any[]; content?: string }) => Promise<any>;
  yukumo: YuKumo;
  player: Player | undefined;
  interaction?: ChatInputCommandInteraction;
  message?: Message;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  slashData: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
  requiresVoice?: boolean;
  requiresPlayer?: boolean;
  execute: (ctx: CommandContext) => Promise<void>;
}
