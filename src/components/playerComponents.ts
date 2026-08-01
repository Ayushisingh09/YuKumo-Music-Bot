import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { Player } from "yukumo";

export function buildPlayerComponents(player?: Player): ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] {
  const isPaused = player?.paused ?? false;
  const repeatMode = (player?.queue.repeatMode ?? "none").toUpperCase();
  const queueSize = player?.queue.size ?? 0;

  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("music_pause_resume")
      .setLabel(isPaused ? "[RESUME]" : "[PAUSE]")
      .setStyle(isPaused ? ButtonStyle.Success : ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("music_skip")
      .setLabel("[SKIP]")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_stop")
      .setLabel("[STOP]")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("music_shuffle")
      .setLabel("[SHUFFLE]")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_loop")
      .setLabel(`[LOOP: ${repeatMode}]`)
      .setStyle(repeatMode !== "NONE" ? ButtonStyle.Primary : ButtonStyle.Secondary)
  );

  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("music_prev")
      .setLabel("[PREVIOUS]")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_voldown")
      .setLabel("[VOL -10%]")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_volup")
      .setLabel("[VOL +10%]")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_queue")
      .setLabel(`[QUEUE: ${queueSize}]`)
      .setStyle(ButtonStyle.Secondary)
  );

  const filterSelect = new StringSelectMenuBuilder()
    .setCustomId("music_filters_select")
    .setPlaceholder("Select Audio Filter Preset...")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Clear Audio Filters")
        .setValue("filter_clear")
        .setDescription("Reset all active audio equalizers and filters"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Bass Boost")
        .setValue("filter_bassboost")
        .setDescription("Apply heavy bass equalizer boost"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Nightcore")
        .setValue("filter_nightcore")
        .setDescription("Speed up track playback and increase pitch"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Vaporwave")
        .setValue("filter_vaporwave")
        .setDescription("Slow down track playback and decrease pitch"),
      new StringSelectMenuOptionBuilder()
        .setLabel("3D Spatial Audio")
        .setValue("filter_3d")
        .setDescription("Enable 3D rotating spatial audio panning"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Karaoke")
        .setValue("filter_karaoke")
        .setDescription("Suppress vocal frequencies for karaoke track")
    );

  const row3 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(filterSelect);

  return [row1, row2, row3];
}
