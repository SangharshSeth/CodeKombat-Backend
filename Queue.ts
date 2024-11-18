import { Player } from './types.ts'
export class MatchMakingQueue {
    #items:Player[]
    constructor(){
        this.#items = []
    }

    enqueue(element: Player){
        this.#items.push(element)
    }
    removePlayerByIndex(index: number){
        this.#items.splice(index, 1)
    }
    matchingPlayersAvailable(player:Player){

        const found = this.#items.findIndex((currentPlayer) => {
            return player.difficulty === currentPlayer.difficulty && currentPlayer.status === "waiting" && player.category === currentPlayer.category && player.id !== currentPlayer.id && player.name !== currentPlayer.name;
        })
        return found
    }
    findByIndex(index: number){
        return this.#items[index]
    }
    removePlayerFromQueue(index: number){
        this.#items.splice(index, 1)
    }
    findIndexBySocketId(socketId: string){
        return this.#items.findIndex((currentPlayer) => {
            return currentPlayer.id === socketId
        })
    }

    printQueue(){
        return this.#items;
    }
    clear(){
        this.#items = [];
    }
    length(): number{
        return this.#items.length;
    }

}