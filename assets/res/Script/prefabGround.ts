import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('prefr')
export class prefr extends Component {

    @property({
        type: Node
    })
    public baseground1: Node;

    @property({
        type: Node
    })
    public baseground2: Node;

    //tao bien width 2 basseground
    public bgWidth1: number;
    public bgWidth2: number;

    //tao vector cho 2 basegound
    public bgVT1 = new Vec3;
    public bgVT2 = new Vec3;

    // toc do basegroud
    public bgSpeed: number = 50;

    onLoad(): void {

        this.startUp();
    }

    startUp(){
        //setup 2 baseground luc at dau game
        this.bgWidth1 = this.baseground1.getComponent(UITransform).width;
        this.bgWidth2 = this.baseground2.getComponent(UITransform).width;

        this.bgVT1.x = 0;
        this.bgVT2.x = this.bgWidth1;

        this.baseground1.setPosition(this.bgVT1);
        this.baseground2.setPosition(this.bgVT2);
    }



    update(deltaTime: number) {
        //lay vi tri 2 basegound
        this.bgVT1 = this.baseground1.position;
        this.bgVT2 = this.baseground2.position;

        //baseground with speed
        this.bgVT1.x -= this.bgSpeed * deltaTime;
        this.bgVT2.x -= this.bgSpeed * deltaTime;

        //prefab basegound
        //const scene = director.getScene();
        //const canvas = scene.getComponentInChildren(Canvas);

        if(this.bgVT1.x <= 0 - this.bgWidth1){
            this.bgVT1.x = this.bgVT2.x+this.bgWidth2; //dua baseground 1 ra sat phai baseground2
        }
        if(this.bgVT2.x <= 0 - this.bgWidth2){
            this.bgVT2.x = this.bgVT1.x+this.bgWidth1;
        }

        this.baseground1.setPosition(this.bgVT1);
        this.baseground2.setPosition(this.bgVT2);
    }
}

