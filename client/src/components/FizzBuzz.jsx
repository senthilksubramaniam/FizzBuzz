
import { useState , useEffect } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import gameService from "../services/gameService";

export default function FizzBuzz(){
    
    const [games, setGames] = useState([]);
    const [introductionDisplayed,setIntroductionDisplayed]  = useState(false);
    const [createNewGame,setcreateNewGame]  = useState(false);
    const [gameSelected,setGameSelected]  = useState(null);
    const [gameActive,setGameActive]  = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchGames = async () => {
        const data = await gameService.getGames();
        setGames(data);
        setLoading(false);
      };
  
      fetchGames();
    }, []);

    const handleIntroductionNext = ()=>
    {
        setIntroductionDisplayed(true);
    }

    const handleCreateGame = (gameData) => 
    {
    setGames([...games, gameData]);
    setcreateNewGame(false);
    };

    const handleCreatingNewGame = ()=>
    {
        if(gameActive)
        {
            return;
        }
        setcreateNewGame(true);
    } 

    const handleCancel =()=>
    {
        setcreateNewGame(false);
    }

    const handleGameSelected =(game)=>
    {
        setGameSelected(game);
    }

    const handleGameActive= (status)=>
    {        
          setGameActive(status);
        if(!status)
        {
            setGameSelected(null);
        } 
    }

    return (
    <>
        <section id="fizz-buzz"> 
             <LeftPanel 
                existingGames={games} 
                onCreatNewGame={handleCreatingNewGame}
                onGameSelected = {handleGameSelected} 
                gameActive={gameActive} /> 
             <RightPanel 
                onCreateGame ={handleCreateGame} 
                introductionDisplayed={introductionDisplayed} 
                onIntroductionNext ={handleIntroductionNext} 
                games = {games}
                createNewGame={createNewGame}
                onCancel = {handleCancel}
                selectedGame = {gameSelected}
                handleGameActive= {handleGameActive}
                />            
        </section>
    </>);
}