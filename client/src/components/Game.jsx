import { useState } from "react";
import PlayGame from "./PlayGame";
import ViewGame from "./ViewGame";

export default function Game({selectedGame,handleGameActive,onStartGame }){
    const [gameRulesShown,setGameRuleShown] = useState(false);
    const handleStartGame=()=>
        {
          handleGameActive(true);
          setGameRuleShown(true);
        }
    let content = null;
    if(gameRulesShown)
    {
        content = <PlayGame selectedGame ={selectedGame} onGameActive={handleGameActive}/>;
    }
    else{
        content =(  <div className="right-panel game">
            <ViewGame selectedGame ={selectedGame}/>
            <div  id="game-button" onClick={handleStartGame}> 
                    Play
            </div>
        </div>);
    }
    return ( 
        <div>
            <div>
                {content}                
            </div> 
         </div> 
    )
}