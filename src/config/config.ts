import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  TOKEN: process.env.DISCORD_TOKEN ?? "",
  CLIENT_ID: process.env.CLIENT_ID ?? "",
  LAVALINK_HOST: process.env.LAVALINK_HOST ?? "localhost",
  LAVALINK_PORT: Number(process.env.LAVALINK_PORT ?? 2333),
  LAVALINK_PASS: process.env.LAVALINK_PASS ?? "youshallnotpass",
  LAVALINK_SECURE: process.env.LAVALINK_SECURE === "true",
  PREFIX: "!",
};

export const YELLOW_THEME = {
  PRIMARY: 0xFFD700,
  SECONDARY: 0xDAA520,
  ACCENT: 0xB8860B,
  LIGHT: 0xFFFF00,
  HEX: "#FFD700",
  FOOTER_TEXT: "YELLOW MUSIC BOT | YUKUMO BUN FRAMEWORK",
};
