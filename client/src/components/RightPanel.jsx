import CreateGame from "./CreateGame";
import Empty from "./Empty";
import Game from "./Game";
import Introduction from "./Introduction";

export default function RightPanel(
    {introductionDisplayed , 
        onCreateGame ,
        onIntroductionNext , 
        games ,
        createNewGame,
        onCancel,
        selectedGame,
        handleGameActive}){
    
    let content =<Empty/>;
    if(introductionDisplayed){        
    if(games.length==0 || createNewGame)
        {
            content =<CreateGame
              onCreateGame = {onCreateGame} 
              existingGames={games}
              onCancel = {onCancel}
              createNewGame={createNewGame}/>;
        }else if (selectedGame !=null)
        {
            content = <Game selectedGame={selectedGame} handleGameActive={handleGameActive}  />
        }
    }
    else{
        content = <Introduction onClickNext={onIntroductionNext}/>;
    }

    return (
        content
    )   
}   