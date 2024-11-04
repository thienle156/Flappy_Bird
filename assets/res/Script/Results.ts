import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    
    @property({
        type: Label
    })
    public scoreLabel : Label;

    @property({
        type: Label
    })
    public highScoreLabel : Label;

    @property({
        type: Label
    })
    public resultLabel : Label;

    highScore: number = 0;
    currentScore: number = 0;

    updateScore(score :number){

        this.currentScore = score;
        
        this.scoreLabel.string = (' '+ this.currentScore);
    }

    resetScore(){

        this.updateScore(0);

        this.hideResult();
    }

    addScore(){
        
        this.updateScore(this.currentScore += 1);
    }

    showResult(){

        this.highScore = Math.max(this.highScore, this.currentScore);

        this.highScoreLabel.string = (' '+ this.highScore);

        this.resultLabel.node.active = true;

        this.highScoreLabel.node.active = true;
    }

    hideResult(){

        this.highScoreLabel.node.active = false;
        this.resultLabel.node.active = false;  
    }
}
