import { app, port } from "./lib/server";
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
import * as config from "./config.json";
import { client } from "./lib/DiscordBot";
client.login(config.token);
