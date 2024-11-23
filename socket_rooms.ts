export const createRoomAndJoin = (roomId: string, player1, player2) => {
    try{
        player1.join(roomId);
        player2.join(roomId);
    }
    catch(err){
        console.log(err)
    }
}