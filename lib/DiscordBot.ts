import {
  Client,
  Events,
  GatewayIntentBits,
  Guild,
  TextChannel,
  Channel,
} from "discord.js";

export const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content === "channels") {
    // サーバーのIDを使用してギルドを取得
  }

  if (message.content === "ping") {
    await message.channel.send("pong");
    // メッセージが送信されたチャンネルがテキストチャンネルである場合
    const channel = client.channels.cache.get("1288430024168575029");
    await (channel as TextChannel)?.send("pong");
  }
});
/*export async function fetchChannels(guildId: string) {
  client.channels.cache.get(guildId)?.send("pong");
}*/
export const fetchChannel = async (guildId: string) => {
  const channel = client.channels.cache.get(guildId);
  const messages = await (channel as TextChannel)?.messages.fetch();
  return messages;
};

export const fetchServerChannels = async (serverId: string) => {
  const guild = client.guilds.cache.get(serverId);
  if (!guild) {
    throw new Error(`Guild with id ${serverId} not found`);
  }
  const channels = guild.channels;
  return channels;
};
