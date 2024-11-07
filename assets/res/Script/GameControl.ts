import { _decorator, CCInteger, Component, EventKeyboard, input, Input, KeyCode, director, NodeEventType, Contact2DType, Collider2D, IPhysics2DContact, Collider } from 'cc';
import { prefr } from './prefabGround';
import { Result } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { Audio } from './Audio';

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {

    @property({
        type: prefr    })
    public ground: prefr;

    @property({
        type: Audio
    })
    public clip : Audio;

    @property({
        type: Bird
    })
    public bird: Bird;

    @property({
        type: Result
    })
    public result : Result;

    @property({
        type:PipePool
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger
    })
    public speed: number = 50;

    @property({
        type: CCInteger
    })
    public pineSpeed: number = 50;


    public isOver : boolean;

    onLoad(){

        this.initListerner();
        this.result.resetScore();
        director.pause();
        this.isOver = true;
    }

    initListerner(){

        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(NodeEventType.TOUCH_START,() =>{

            if(this.isOver == true){
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }else{
            this.bird.fly();
            this.clip.onAudioQueue(0);
            }
        }
        , this)
    }

    // onKeyDown(event: EventKeyboard){

    //     switch(event.keyCode){

    //         case KeyCode.KEY_E :
    //             this.gameOver();
    //              break;
            
    //         case KeyCode.KEY_A :
    //             this.result.addScore();
    //             break;

    //         case KeyCode.KEY_R :
    //             this.resetGame();
    //             this.bird.resetBird();
    //             break;

    //     }
    // }

    gameOver(){

        this.result.showResult();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause(); // dung man hinh game
    }

    resetGame(){

        this.isOver = false;
        this.result.resetScore();
        this.pipeQueue.reset();
        this.startGame();

    }

    startGame(){
    
        this.result.hideResult();
        director.resume();

    }

    passPipe(){
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }
    
    createPipe(){
        this.pipeQueue.addPool();
    }

    contactGroundPipe(){

        let collider = this.bird.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck(){

        this.contactGroundPipe();
        if(this.bird.hitSomething == true){
            this.gameOver();
        }
    }

    update(){
        if(this.isOver == false){
            this.birdStruck();
        }
    }
}

