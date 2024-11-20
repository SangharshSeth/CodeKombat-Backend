// @deno-types="npm:@types/express@4"
import express from "npm:express"
import { Server } from "npm:socket.io"
import * as http from "node:http";
import { MatchMakingQueue } from "./Queue.ts";
import {ClientData, Player} from "./types.ts";
import {findRandomCodingQuestion} from "./coding_questions.ts";
import cors from "npm:cors"
import process from "node:process";
import { PowerUps } from "./powerups.ts";

const app = express()
app.use(cors())
const webSocketServer = http.createServer(app)
const webSocket = new Server(webSocketServer, {
    cors: {
        origin: "http://localhost:5173",
        allowedHeaders: "*",
        methods: ["POST"]
    }
})
const queue = new MatchMakingQueue()
const activeSocketConnections = new Set<string>()

webSocket.on("connection", (socket) => {
    //Handle Incoming connection from individual client
    activeSocketConnections.add(socket.id)
    socket.on("disconnect", () => {
        console.log(`Client Disconnected: ${socket.id}`);
        activeSocketConnections.delete(socket.id);
    });

    socket.on("join-matchmaking", (clientData: ClientData ) => {
        const player: Player = {
            name: clientData.userName,
            id: socket.id,
            status: "waiting",
            difficulty: clientData.difficulty,
            category: clientData.category,
        }
        queue.enqueue(player)

        const opponentIndex = queue.matchingPlayersAvailable(player)
        console.log("OpponentIndex", opponentIndex)
        if(opponentIndex !== -1){
            console.log("Player found")
            const opponent = queue.findByIndex(opponentIndex)

            //Create a room with both the players
            const roomId = `room-${player.name}-${opponent.name}-${Date.now()}`
            console.log(`Room ${roomId}`)
            socket.join(roomId)
            webSocket.sockets.sockets.get(opponent.id)?.join(roomId)
            webSocket.to(roomId).emit("match-update", "Opponent Found! Game Initializing.")

            //Change their status in queue
            const playerIndex = queue.findIndexBySocketId(player.id)
            queue.removePlayerFromQueue(playerIndex)
            queue.removePlayerFromQueue(opponentIndex)

            console.log("Updated Queue", queue.printQueue())

            //Find a eligible question
            const question = findRandomCodingQuestion(player.difficulty)

            const matchDataForClients = {
                player1: player.name,
                player2: opponent.name,
                question: question,
                roomId: roomId
            }

            webSocket.to(roomId).emit("match-data", matchDataForClients)

        }

    })
    socket.on("power-up-activate", (data: number) => {

      //Get the rooms
      const rooms = socket.rooms;
      console.log("You are in room", rooms)
      if(rooms.size > 1){
        //Get the roomId
        const roomId = Array.from(rooms).find((item) => item !== socket.id)
        if(roomId){
          const otherPlayerSocketIds = Array.from(webSocket.sockets.adapter.rooms.get(roomId) || [])
                    .find((id) => id !== socket.id);
          
          const powerDown = PowerUps.find((item) => item.id === data)
          webSocket.to(otherPlayerSocketIds as string).emit("power-level-down", powerDown)
          console.log(`Sent data ${powerDown}`)
        }

      }
      console.log("Powerup activated", data , "from", socket.id)
    })
    console.log("Client Connected", socket.id)
    socket.emit("hello", "hey")
})

const shutdown = () => {
    console.log("Shutting down server...");
    // Disconnect all sockets
    for (const socketId of activeSocketConnections) {
        webSocket.sockets.sockets.get(socketId)?.disconnect(true);
    }
    activeSocketConnections.clear();
    queue.clear()
    // Close the server
    webSocketServer.close(() => {
        console.log("WebSocket Server closed.");
        process.exit(0);
    });
};

webSocketServer.listen(3000, () => {
    console.log("Server Listening on port 30412301")
})

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
