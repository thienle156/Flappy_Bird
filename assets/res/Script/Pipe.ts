import { _decorator, Component, Node, Vec3, screen ,find, UITransform, } from 'cc';
const { ccclass, property } = _decorator;

const random = (min:number,max:number) =>{
    return (Math.random()*(max-min) + min);
}

//import { GameControl } from './GameControl';
@ccclass('Pipe')
export class Pipe extends Component {

    @property({
        type: Node
    })
    public topPipe: Node;

    @property({
        type: Node  
    })
    public botPipe: Node;



    public tempStartLocationUp: Vec3 = new Vec3(0,0,0,);
    public tempStartLocationDown: Vec3 = new Vec3(0,0,0,);
    public scene = screen.windowSize;

    public game;
    public pipeSpeed:number;
    public tempSpeed:number;

    isPass :boolean;

    onLoad(){

        this.game = find("GameControl").getComponent("GameControl")
        this.pipeSpeed = this.game.pineSpeed;
        this.initPos();
        this.isPass = false;
    }

    initPos(){

        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(80, 90);
        let topHeight = random(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = topHeight-(gap*10);

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.botPipe.setPosition(this.tempStartLocationDown);
    }

    
    update(deltaTime){

        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.botPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.botPipe.setPosition(this.tempStartLocationDown);

        if(this.isPass == false && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.game.passPipe();
        }

        if(this.topPipe.position.x < (0-this.scene.width)){
            this.game.createPipe();
            this.destroy();
        }
    }
}

