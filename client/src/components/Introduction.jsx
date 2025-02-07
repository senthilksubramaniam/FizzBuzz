
import React, { useState, useEffect } from "react";
export default function Introduction({onClickNext}){
    return(
        <>
        <div className="right-panel">        
                <section id ="introduction">
                 <div>  
                    <p>
                        FooBooLoo is a fun and interactive number replacement game. System generates a random runmeber and the player selects an option to score based on the rules of a selected game.
                    </p>
                    <p>
                        A game will have a minimum of three sets of rules and a timer to finish. Each rule has two divisible factor and a score for it. When a player start the game, 
                        System generates random number and the options to are displayed for the player to select. if the random number is divisible by the selected number, the player gets the correspoding score.
                        With that , if his selection is right and if we have any other numbers that can divide the random number, the player gets the other score as bonus. 
                    </p>
                </div>

                <div  id="game-button" onClick={onClickNext}>
                        Next
                </div>
            </section>
        </div>
        </>
    );
}