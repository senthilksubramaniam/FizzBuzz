export default function Score({score, onClose})
{
    const questions = `Questions : ${score.questions}`;
    const rightScore = `Right answer : ${score.correct}`;
    const wrongScore = `Wrong answer : ${score.incorrect}`;
    const gamescore = `Score : ${score.score}`;
    const bonus = `Bonus : ${score.bonus}`;
    const totalScore = `Total Score : ${score.total}`;
    return <div>    
    <h4>{rightScore}</h4>
    <h4>{wrongScore}</h4>
    <h4>{gamescore}</h4>
    <h4>{bonus}</h4>
    <h4>{totalScore}</h4>
    <div  id="game-button" onClick={onClose} > 
            Close
    </div>
</div>
}  