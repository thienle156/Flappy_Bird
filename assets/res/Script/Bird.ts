import { _decorator, animation, CCFloat, Component, Node, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    
    @property({
        type: CCFloat
    })
    public jumpHeight: number = 2;

    @property({
        type: CCFloat
    })
    public jumpDuration: number = 2;

    public birdAnimation: Animation;
    public birdLocation = new Vec3;

    onLoad(){

        this.resetBird();

        this.birdAnimation = this.getComponent(Animation);
    }

    resetBird(){

        this.birdLocation = new Vec3(0,0,0);

        this.node.setPosition(this.birdLocation);
    }
}

