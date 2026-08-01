import { Events, REST, Routes } from "discord.js";
import { client, yukumo } from "../yukumo/client.js";
import { CONFIG } from "../config/config.js";
import { commands } from "../commands/index.js";

export function registerReadyEvent(): void {
  client.once(Events.ClientReady, async (c) => {
    console.log(`[DISCORD] Bot logged in as: ${c.user.tag}`);
    yukumo.setUserId(c.user.id);

    try {
      await yukumo.init();
      console.log("[YUKUMO] YuKumo client initialized successfully.");
    } catch (err) {
      console.error("[ERROR] Failed to initialize YuKumo wrapper:", err);
    }

    const rest = new REST().setToken(CONFIG.TOKEN);
    try {
      const appId = CONFIG.CLIENT_ID || c.user.id;
      if (appId) {
        const slashDataList = Array.from(commands.values()).map((cmd) => cmd.slashData.toJSON());
        console.log(`[DISCORD] Registering ${slashDataList.length} slash commands...`);
        await rest.put(Routes.applicationCommands(appId), {
          body: slashDataList,
        });
        console.log("[DISCORD] Slash commands registered successfully.");
      }
    } catch (err) {
      console.error("[ERROR] Failed to register slash commands:", err);
    }
  });
}
