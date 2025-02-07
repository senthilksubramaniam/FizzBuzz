export default function Timer({time}){
    return  <div className="timer-container">
        <div className="timer-box">
            <span className="timer-number">{time}</span>
            <span className="timer-text">SECONDS</span>
        </div>
        </div> 
}