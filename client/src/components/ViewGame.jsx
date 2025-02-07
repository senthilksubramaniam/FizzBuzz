import Rules from "./Rules";
import Timer from "./Timer";

export default function ViewGame({selectedGame}){
    return    <>
    <Timer time={selectedGame.timeLimit}/>
    <Rules rules={selectedGame.rules}/>
    </>
}