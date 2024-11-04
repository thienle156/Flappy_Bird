import { _decorator, CCInteger, Component, EventKeyboard, input, Input, KeyCode, director } from 'cc';
import { prefr } from './prefabGround';
import { Result } from './Results';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {

    @property({
        type: prefr    })
    public ground: prefr;

    @property({
        type: Bird
    })
    public bird: Bird;

    @property({
        type: Result
    })
    public result : Result;

    @property({
        type: CCInteger
    })
    public speed: number = 50;

    @property({
        type: CCInteger
    })
    public pineSpeed: number = 50;

    onLoad(){

        this.initListerner();
        this.result.resetScore();
        director.pause();
    }

    initListerner(){

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard){

        switch(event.keyCode){

            case KeyCode.KEY_E :
                this.gameOver();
                 break;
            
            case KeyCode.KEY_A :
                this.result.addScore();
                break;

            case KeyCode.KEY_R :
                this.resetGame();
                break;

        }
    }

    gameOver(){

        this.result.showResult();
        director.pause(); // dung man hinh game
    }

    resetGame(){

        this.result.resetScore();
        this.startGame()

    }

    startGame(){
    
        this.result.hideResult();
        director.resume();

    }
     
}

