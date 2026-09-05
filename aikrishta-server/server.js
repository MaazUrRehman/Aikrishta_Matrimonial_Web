import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDatabase from "./src/config/database.js";
import { initializeSocket } from "./src/sockets/socketHandler.js";

const PORT = process.env.PORT || 5000;

await connectDatabase();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 AIKRISHTA Server Running");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});