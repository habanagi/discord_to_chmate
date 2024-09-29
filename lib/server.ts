import express from "express";
import channelsRouter from "../api/channels";
const app = express();
const port: number = 80;

app.use("/api/discord", channelsRouter);
export { app, port };
