import { useState,useRef } from "react";
import Rules from "./Rules";
import gameService from "../services/gameService";
export default function CreateGame({existingGames,onCreateGame,onCancel,createNewGame})
{
    const [rules, setRules] = useState([]); 
    const name = useRef();
    const author = useRef();
    const divisibleBy = useRef();
    const timeLimit = useRef();
    const score = useRef();
    const replacement = useRef();
    const range = useRef();
    const [ruleError, setRuleError] = useState(null);
    const [gameError, setGameError] = useState(null);

    const handleAddRule = () => {
        setRuleError('');
        const divisibleByRef = divisibleBy.current.value;
        const scoreRef = score.current.value;
        const replacementRef= replacement.current.value;
        if (!divisibleByRef || !scoreRef  ||!replacementRef) {
          setRuleError('All fields are required for a rule.');
          return;
        }
        if (replacementRef.length<3)
        {
          setRuleError('Replacement text length should be three.');
        return;
        }

        if (rules.some(rule => rule.divisibleBy === Number(divisibleByRef))) {
          setRuleError('A rule with this Divisible By already exists.');
          return;
        }   
        
        if (rules.some(rule => rule.divisibleBy === Number(divisibleByRef) && rule.replacement.toUpperCase() === replacementRef.toUpperCase()  )) {
          onCreateGame('Divisible By and Replacement combinaiton already exists.');
          return;
        }
    
        setRules([...rules, { divisibleBy: Number(divisibleByRef), score: Number(scoreRef)  , replacement: replacementRef.toUpperCase() }]);
        divisibleBy.current.value ='';
        score.current.value='';
        replacement.current.value='';
        setRuleError('');
      };

      const handleKeyDown =(even)=>
      {
        if (!/^[a-zA-Z\s]*$/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
          event.preventDefault();
        }
      }
    
      const handleSaveGame = async() => {    
        const rangeRef = range.current.value;
        const autherRef = author.current.value;
        const timelimitRef = timeLimit.current.value;
        const nameRef = name.current.value;    
        setGameError('');

        if (!nameRef || !autherRef || rules.length < 3 || timelimitRef <= 0 ||  rangeRef  <= 0) {
          setGameError('All fields are required and at least three rule must be added.');
          return;
        }
        if(rangeRef<130)
        {
            setGameError('Range should be at least 130');
            return;
        }
        if (existingGames && existingGames.some(game => game.name.toUpperCase() === nameRef.toUpperCase())) {
          onCreateGame('Game with this name already exists!');
          return;
        }
        const game = { name: nameRef.toUpperCase(), author:autherRef.toUpperCase(), timeLimit:timelimitRef, range:rangeRef, rules};
        const createdGame = await gameService.createGame(game);
        if (createdGame) 
        {
          onCreateGame(game); 
        }
        setGameError('');
      };

    return (    
    <div className="right-panel">
    <section id="create-game">
        <div className="input-group">
            <p>
                <label htmlFor="name">Name</label>
                <input id ='name' ref={name} type="text" required/> 
            </p>
            <p>
                <label htmlFor="author">Author</label>
                <input id='author' ref={author} type="text" required/> 
            </p> 
        </div>
        <div className="input-group">
            <p>
                <label htmlFor="timeleft">Time Limit (seconds)</label>
                <input id='timeleft' ref={timeLimit}  type="number"  /> 
            </p>
            <p>
                <label htmlFor="range">Range for the system generated number</label>
                <input id='range' ref={range} type="number" /> 
            </p> 
        </div>
        <div className="input-group">
            <p>
                <label htmlFor="divisibleby">Divisible By</label>
                <input id='divisibleby' ref={divisibleBy} type="number" required/> 
            </p>            
            <p>
                <label htmlFor="replacement">Replacement</label>
                <input id='replacement' ref={replacement} type="text"onKeyDown={(e) => handleKeyDown(e)} maxLength={3} required/> 
            </p> 
            <p>
                <label htmlFor="score">Score</label>
                <input id='score' ref={score} type="number" required/> 
            </p> 
            <p>
                <input type="button" onClick={handleAddRule} value={"+"}/> 
            </p>
        </div>
        
        <div className="input-group">
        <div id="game-button" onClick={handleSaveGame}>
           Save
        </div>
        {createNewGame?<div id="game-button" onClick={onCancel}>
           Cancel
        </div>:null}

        <div className="error">
            {(ruleError??'') + (gameError??'')}
        </div>
      </div>
    </section>    
    {rules.length>0 ? <Rules rules ={rules}/> : null} 
    </div>)
}