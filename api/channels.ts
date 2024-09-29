import { Router } from "express";
import { fetchChannel, fetchServerChannels } from "../lib/DiscordBot";
import { convertThreads } from "../lib/fileProcessing/subjectTxt";
import { convertDat, searchChannel } from "../lib/fileProcessing/readCgi";
const userRouter = Router();

userRouter.get("/subject.txt", async (req, res) => {
  let channels = await fetchServerChannels("1288430023430115351");
  const subject = await convertThreads(channels.guild.channels.cache);
  console.log(channels.guild.channels.cache);
  res.setHeader("Content-Type", "text/plain; charset=Shift_JIS");
  res.send(subject);
});

userRouter.get("/dat/:id", async (req, res) => {
  const cId: string = req.params.id;
  let channels = await fetchServerChannels("1288430023430115351");
  const channelId = await searchChannel(cId, channels.guild.channels.cache);
  let chats = await fetchChannel("1288430024168575029");
  const cgi = await convertDat(chats);
  res.setHeader("Content-Type", "text/plain; charset=Shift_JIS");
  res.send(cgi);
});

export default userRouter;
