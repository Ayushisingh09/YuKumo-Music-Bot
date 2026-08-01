import { client, yukumo } from "./yukumo/client.js";
import { CONFIG } from "./config/config.js";
import { registerReadyEvent } from "./events/ready.js";
import { registerInteractionCreateEvent } from "./events/interactionCreate.js";
import { registerMessageCreateEvent } from "./events/messageCreate.js";

registerReadyEvent();
registerInteractionCreateEvent();
registerMessageCreateEvent();

process.on("SIGINT", async () => {
  console.log("[SHUTDOWN] SIGINT received. Shutting down YuKumo client and Discord bot...");
  await yukumo.destroy();
  await client.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("[SHUTDOWN] SIGTERM received. Shutting down YuKumo client and Discord bot...");
  await yukumo.destroy();
  await client.destroy();
  process.exit(0);
});

if (CONFIG.TOKEN) {
  client.login(CONFIG.TOKEN).catch((err) => {
    console.error("[ERROR] Discord Login failed:", err);
  });
} else {
  console.warn("[WARN] No DISCORD_TOKEN provided in .env file.");
}
