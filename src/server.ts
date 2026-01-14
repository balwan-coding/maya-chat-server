import express, { Request, Response } from "express";
import { corsConfigs, sessionCoffings } from "./Configs/server.confing";
import { errorHandler } from "./middlewares/errolHandler.middleware";
import { createServer } from "http";
import { Server } from "socket.io";
import initSocket from "./Sockets/socket";
import dbConnect from "./Configs/db";
import authRouter from "./Routes/auth.routes";
import userRouter from "./Routes/user.routes";
import * as env from "./Configs/env";
import chatRouter from "./Routes/chat.routes";

const app = express();
const PORT = env.APP_PORT;

// express json millderware
app.use(express.json());

// trust proxy milldleware
app.set("trust proxy", 1);

// cors configs settings
app.use(corsConfigs);

// sessions coffig settings
app.use(sessionCoffings);

// http server
const server = createServer(app);

// socket.io connection to server
const io = new Server(server, {
  cors: {
    origin: env.ORIGIN_PATH,
    methods: ["GET", "POST"],
  },
});

// test router
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});

// auth router
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/chat", chatRouter);

// goble error handar router
app.use(errorHandler);

// socket.io initslazed
initSocket(io);

// db inlilizide
dbConnect();

server.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
