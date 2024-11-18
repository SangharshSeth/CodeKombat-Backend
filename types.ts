export interface Player {
    name: string
    id: string
    status: "waiting" | "playing"
    difficulty: string
    category: string
    
}
export interface ClientData {
    language: string
    category: string
    difficulty: string
    userName: string
}