// @deno-types="npm:@types/express@4"
import express from "npm:express"
import {Server, Socket} from "npm:socket.io"
import * as http from "node:http";
import { MatchMakingQueue } from "./Queue.ts";
import {ClientData, Player} from "./types.ts";
import cors from "npm:cors"
import process from "node:process";
import { PowerUps } from "./powerups.ts";
import {handleMatchMaking} from "./matchmakingplayers.ts";

interface ChatMessage {
    sender: string;
    content: string;
    senderType: string;
    timeStamp: string;
}

const app = express()
app.use(cors())
const webSocketServer = http.createServer(app)
console.log(Deno.env.get("FRONTEND_URL"))
const SOCKET_IO = new Server(webSocketServer, {
    cors: {
        origin: Deno.env.get("FRONTEND_URL"),
        allowedHeaders: "*",
        methods: ["*"]
    }
})
const queue = new MatchMakingQueue()
const activeSocketConnections = new Set<string>()

SOCKET_IO.on("connection", (socket) => {
    //Handle Incoming connection from individual client
    activeSocketConnections.add(socket.id)
    socket.on("disconnect", () => {
        console.info(`Client Disconnected: ${socket.id}`);
        activeSocketConnections.delete(socket.id);
    });

    socket.on("showing-code", (code: string) => {
        console.log("Code shower's request received: " + code);
        const rooms = socket.rooms;
        if(rooms.size > 1){
            console.log("Got him who i have to send code")
            //Get the roomId
            const roomId = Array.from(rooms).find((item) => item !== socket.id)
            if(roomId){
                const otherPlayerSocketIds = Array.from(SOCKET_IO.sockets.adapter.rooms.get(roomId) || [])
                    .find((id) => id !== socket.id);
                console.log(otherPlayerSocketIds);
                SOCKET_IO.to(otherPlayerSocketIds as string).emit("take-code", code)
            }
        }
    })

    socket.on("join-matchmaking", (clientData: ClientData) => handleMatchMaking(clientData, socket, queue, SOCKET_IO))
    socket.on("view-code", () => {
        console.log("Recieved request to view opponents code")
      //Get the rooms
      const rooms = socket.rooms;
      console.log("You are in room for view-code request", rooms)
      if(rooms.size > 1){
          console.log("Found the other player who has to show code")
        //Get the roomId
        const roomId = Array.from(rooms).find((item) => item !== socket.id)
        if(roomId){
          const otherPlayerSocketIds = Array.from(SOCKET_IO.sockets.adapter.rooms.get(roomId) || [])
                    .find((id) => id !== socket.id);
          console.log("Other player", otherPlayerSocketIds)
          SOCKET_IO.to(otherPlayerSocketIds as string).emit("show-code")
        }
      }
    })
    socket.on("chat-message", (data: { roomId: string; content: string; sender: string, timeStamp: string }) => {
        console.log("Received message", data, data.roomId)
        const { roomId, content, timeStamp, sender } = data;

        // Validate that the sender is actually in the room
        if (socket.rooms.has(roomId)) {
            console.log("Received message", roomId, content, timeStamp)
            const chatMessage: ChatMessage = {
                sender,
                content,
                timeStamp,
                senderType: "opponent"
            };

            // Broadcast to everyone in the room except sender
            socket.to(roomId).emit("new-chat-message", chatMessage);
        }
    });
})

const shutdown = () => {
    console.log("Shutting down server...");
    // Disconnect all sockets
    for (const socketId of activeSocketConnections) {
        SOCKET_IO.sockets.sockets.get(socketId)?.disconnect(true);
    }
    activeSocketConnections.clear();
    queue.clear()
    // Close the server
    webSocketServer.close(() => {
        console.info("WebSocket Server closed.");
        process.exit(0);
    });
};

webSocketServer.listen(8080, () => {
    console.info("Server Listening on port 8080")
})

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
