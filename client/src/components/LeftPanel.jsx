export default function LeftPanel ({existingGames,onCreatNewGame,onGameSelected,gameActive}) {
     
    const handleClick = (game,event) => {
        if(gameActive)
            {
                return;
            }  
        onGameSelected(game);
      };
    return (
        <section id="left-panel">
            <div className="title" >
                <div>Games</div>
                <input id ="game-button_small" type="button" onClick={onCreatNewGame}  value={"+"}/> 
            </div>
            {existingGames && existingGames.length>0 ? existingGames.map((game) => (
            <div className="selected" onClick={handleClick.bind(null,game)}  key={game.id?game.id:game.name} >{game.name}</div>
            )) :null
            }
        </section>
    )
}