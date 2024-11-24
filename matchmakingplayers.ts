import {ClientData, Player} from "./types.ts";
import {Socket} from "npm:socket.io";
import {createRoomAndJoin} from "./socket_rooms.ts";
import {findRandomCodingQuestion} from "./coding_questions.ts";
import type { MatchMakingQueue } from './Queue.ts';
import {Server} from "npm:socket.io";

export const handleMatchMaking = (clientData: ClientData, socket: Socket, queue: MatchMakingQueue, SOCKET_IO: Server): void => {
    const player: Player = {
        name: clientData.userName,
        id: socket.id,
        status: "waiting",
        difficulty: clientData.difficulty,
        category: clientData.category,
    }
    queue.enqueue(player)

    const opponentIndex = queue.matchingPlayersAvailable(player)

    if(opponentIndex !== -1){
        const opponent = queue.findByIndex(opponentIndex)


        //Create a room and join players
        const roomId = `${player.name} & ${opponent.name}'s Server`
        console.log(`RoomId: ${roomId}`)
        const playerSockOne = socket;
        const playerSockTwo = SOCKET_IO.sockets.sockets.get(opponent.id)

        console.info("Opponent found", {playerSockOne, playerSockTwo})

        createRoomAndJoin(roomId, playerSockOne, playerSockTwo)
        SOCKET_IO.to(roomId).emit("match-update", "Opponent Found! Game Initializing.")

        //Change their status in queue
        const playerIndex = queue.findIndexBySocketId(player.id)
        queue.removePlayerFromQueue(playerIndex)
        queue.removePlayerFromQueue(opponentIndex)

        console.log("Updated Queue", queue.printQueue())

        //Find a eligible question
        const question = findRandomCodingQuestion(player.difficulty)
        console.log(`Question: ${question}`)

        const matchDataForClients = {
            player1: player.name,
            player2: opponent.name,
            question: question,
            roomId: roomId
        }

        SOCKET_IO.to(roomId).emit("match-data", matchDataForClients)
    }
    return
}
