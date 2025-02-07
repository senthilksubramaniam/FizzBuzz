export interface Rule {
    divisibleBy: number;
    score: number;
    replacement:string;
  }
  
  export interface Game {
    id: number;
    name: string;
    author: string;
    timeLimit: number;
    range: number;
    rules: Rule[];
  }

  export interface Quiz {
    game: Game,
    selection:number,
    randomNumber:number
  }

  export interface Result{
    score : Score,
    randomNumber:number
  }

  export interface Score{
    selectedScore : number,
    bonus:number
  }
  