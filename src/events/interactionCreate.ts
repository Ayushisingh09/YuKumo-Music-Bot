import { Events, type Interaction, type GuildMember } from "discord.js";
import { client, yukumo } from "../yukumo/client.js";
import { getCommand } from "../commands/index.js";
import { errorEmbed } from "../utils/embeds.js";
import { buildPlayerComponents } from "../components/playerComponents.js";

export function registerInteractionCreateEvent(): void {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isButton() || interaction.isStringSelectMenu()) {
      const { customId, guildId } = interaction;
      if (!customId.startsWith("music_") || !guildId) return;

      const member = interaction.member as GuildMember | null;
      const voiceChannelId = member?.voice?.channelId ?? null;

      if (!voiceChannelId) {
        await interaction.reply({
          embeds: [errorEmbed("You must be connected to a voice channel to use music controls.")],
          ephemeral: true,
        });
        return;
      }

      const player = yukumo.getPlayer(guildId);
      if (!player) {
        await interaction.reply({
          embeds: [errorEmbed("No active player in this server.")],
          ephemeral: true,
        });
        return;
      }

      try {
        if (customId === "music_pause_resume") {
          if (player.paused) {
            await yukumo.resume(guildId);
          } else {
            await yukumo.pause(guildId);
          }
        } else if (customId === "music_skip") {
          await yukumo.skip(guildId);
        } else if (customId === "music_stop") {
          await yukumo.stop(guildId);
        } else if (customId === "music_shuffle") {
          player.queue.shuffle();
        } else if (customId === "music_loop") {
          const nextMode =
            player.queue.repeatMode === "none"
              ? "track"
              : player.queue.repeatMode === "track"
              ? "queue"
              : "none";
          player.setLoop(nextMode as any);
        } else if (customId === "music_prev") {
          const prevTrack = player.queue.previous();
          if (prevTrack) await player.playTrack(prevTrack);
        } else if (customId === "music_voldown") {
          const nextVol = Math.max(0, player.volume - 10);
          await player.setVolume(nextVol);
        } else if (customId === "music_volup") {
          const nextVol = Math.min(1000, player.volume + 10);
          await player.setVolume(nextVol);
        } else if (customId === "music_queue") {
          await interaction.reply({
            embeds: [
              errorEmbed(
                `Queue contains ${player.queue.size} tracks. Current repeat mode: ${player.queue.repeatMode}`
              ),
            ],
            ephemeral: true,
          });
          return;
        } else if (customId === "music_filters_select" && interaction.isStringSelectMenu()) {
          const val = interaction.values[0];
          if (val === "filter_clear") {
            player.filters.clear();
            await player.setFilters();
          } else if (val === "filter_bassboost") {
            player.filters.setBassBoost();
            await player.setFilters();
          } else if (val === "filter_nightcore") {
            player.filters.setNightcore();
            await player.setFilters();
          } else if (val === "filter_vaporwave") {
            player.filters.setVaporwave();
            await player.setFilters();
          } else if (val === "filter_3d") {
            player.filters.set8D();
            await player.setFilters();
          } else if (val === "filter_karaoke") {
            player.filters.setKaraoke();
            await player.setFilters();
          }
        }

        await interaction.update({
          components: buildPlayerComponents(player),
        });
      } catch (err) {
        console.error("[ERROR] Component interaction error:", err);
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            embeds: [errorEmbed("Failed to process music control interaction.")],
            ephemeral: true,
          });
        }
      }
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const { commandName, guildId } = interaction;
    if (!guildId) {
      await interaction.reply({
        embeds: [errorEmbed("Commands can only be used in a server.")],
        ephemeral: true,
      });
      return;
    }

    const command = getCommand(commandName);
    if (!command) {
      await interaction.reply({
        embeds: [errorEmbed("Command not found.")],
        ephemeral: true,
      });
      return;
    }

    const member = interaction.member as GuildMember | null;
    const voiceChannelId = member?.voice?.channelId ?? null;

    if (command.requiresVoice && !voiceChannelId) {
      await interaction.reply({
        embeds: [errorEmbed("You must be connected to a voice channel to use this command.")],
        ephemeral: true,
      });
      return;
    }

    const player = yukumo.getPlayer(guildId);
    if (command.requiresPlayer && !player) {
      await interaction.reply({
        embeds: [errorEmbed("No active player in this server. Use play command first.")],
        ephemeral: true,
      });
      return;
    }

    const args: string[] = [];
    if (commandName === "play") {
      const engine = interaction.options.getString("engine");
      if (engine) args.push(engine);
      args.push(interaction.options.getString("query", true));
    } else if (commandName === "volume") {
      args.push(interaction.options.getInteger("level", true).toString());
    } else if (commandName === "filter") {
      args.push(interaction.options.getString("preset", true));
    } else if (commandName === "speed" || commandName === "pitch") {
      args.push(interaction.options.getNumber("value", true).toString());
    } else if (commandName === "loop") {
      args.push(interaction.options.getString("mode", true));
    } else if (commandName === "seek") {
      args.push(interaction.options.getInteger("seconds", true).toString());
    } else if (commandName === "remove") {
      args.push(interaction.options.getInteger("position", true).toString());
    } else if (commandName === "move") {
      args.push(interaction.options.getInteger("from", true).toString());
      args.push(interaction.options.getInteger("to", true).toString());
    } else if (commandName === "nodeselect") {
      args.push(interaction.options.getString("strategy", true));
    }

    await interaction.deferReply();

    await command.execute({
      guildId,
      voiceChannelId,
      textChannelId: interaction.channelId ?? "",
      args,
      user: interaction.user,
      member,
      reply: async (options) => {
        return await interaction.editReply(options);
      },
      yukumo,
      player,
      interaction,
    });
  });
}
