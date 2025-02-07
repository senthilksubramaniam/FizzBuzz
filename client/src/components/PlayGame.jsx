import { useState,useEffect  } from "react"; 
import Score from "./Score";
import Timer from "./Timer";
import gameService from "../services/gameService";
export default function PlayGame({selectedGame,onGameActive}){
    
  const [score, setScore] = useState({questions:0,correct:0,incorrect:0,score:0, bonus:0 , total:0});
  const [gameFinished, setGameFinished] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(selectedGame.timeLimit);
  const [selected, setSelected] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [rules, setRules] = useState(selectedGame.rules); 
  const [disableSelection, setDisableSelection ] = useState(false);
  const [generatingRandomNumber, setGeneratingRandomNumber ] = useState(false);
  

  useEffect(() => {
    if(!randomNumber)
    {  
        const init = async () => {
        const quizData = await takeQuiz(selectedGame);
        if(quizData)
        {
          setRandomNumber(quizData.randomNumber);
        }
        };
        init();
    }
    if (timeLeft > 0 && !gameFinished && !generatingRandomNumber) { 
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameFinished(true);
    }
  }, [timeLeft, gameFinished]);

  const getRandomNumber = () => {
    const min = 1;
    const max= selectedGame.range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSelect = (option,index) => {
    setSelected(index);
    setSelectedOption(option.divisibleBy);
  };

  const takeQuiz = async (game,selectedOption,randomNumber) => {
    setGeneratingRandomNumber(true);
    const takeQuiz =  await gameService.takeQuiz({game,selection:selectedOption,randomNumber});
    setGeneratingRandomNumber(false);
    return takeQuiz;
  };

  const handleClose = ()=>
  {
    onGameActive(false);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

const handleNext = async () => {  
    setDisableSelection(false);
    if(!selectedOption)
    {
      return null;
    } 
    const quizScore = await takeQuiz(selectedGame,selectedOption,randomNumber);
    let runningScore = score;
    const selectedScore  =quizScore.score.selectedScore ;
    const bonus  =quizScore.score.bonus ;
    runningScore.score +=selectedScore;
    runningScore.bonus+=bonus;
    runningScore.total+=selectedScore+bonus;
    runningScore.questions+=1;

    let rightAnswer = selectedScore!=0;

    if(rightAnswer)
    {
      runningScore.correct+=1;
    }
    else{
      runningScore.incorrect+=1;
    }

    let shuffledArray = shuffleArray(rules);
    setRules([...shuffledArray]);      
    setScore(runningScore); 
    setSelectedOption(null);
    if(!gameFinished)
    {
        setSelected(null); 
        let randomNumber=getRandomNumber();
        setRandomNumber(randomNumber);
    }
};

const handleCheck =() => {
  if(!selectedOption)
  {
    return;
  }
  setDisableSelection(true);
}

let content = null;
if(timeLeft==0)
{
    content = <Score score={score} onClose = {handleClose}/>;
}
else
{
    content =
    <>
        <Timer time={timeLeft}/>
        <div style={{ display: "flex", margin: "0px 0",flexDirection:"column", alignItems:"center" }}>
            {rules.map((rule,index) => (
                <label key={rule.divisibleBy} style={{ display: "block", margin: "5px 0", width:"4rem" }}>
                <input
                    type="checkbox"
                    style={{marginRight: "10px" }}
                    checked={selected === index}
                    disabled={disableSelection}
                    onChange={() => handleSelect(rule,index)}
                />
                {disableSelection? (randomNumber % parseInt(selectedOption) ===0 && randomNumber % parseInt(rule.divisibleBy) ===0?rule.replacement:rule.divisibleBy): rule.divisibleBy}
                </label>
            ))}
        </div>
        <div id ="flex-row">
          <div  id="game-button" onClick={handleCheck} > 
                  CHECK
          </div>
          <div  id="game-button" onClick={handleNext} > 
                  NEXT
          </div>
        </div>
    </>;
}

return <div className="right-panel game">
         {content}
    </div>
}   