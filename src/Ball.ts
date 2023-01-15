import {Sin} from "./Sin";
import {random} from "./util";

type BallPropsType = {
    radius: number,
    color: string,
    x: number,
    y: number,
} & Partial<{
    maxRadius: number,
    minRadius: number,
}>

/**
 * 원하면 나중에 다른 걸 추가할 수 있음. 예를들면 코싸인
 */
type SizeChangeType = 'sin';
type SizeChangeTool = Sin;

/**
 * 'xy' 는 x 랑 y 축 모두 충돌했다는 뜻.
 */
type CollideDirection =  'x' | 'y' | 'xy';

export class Ball {
    private radius: number;
    private maxRadius: number;
    private minRadius: number;
    private color: string;
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    /**
     * {@link SizeChangeType, SizeChangeTool}
     */
    private sizeChangeTool: {type: SizeChangeType, tool: SizeChangeTool};

    constructor({
        radius,
        maxRadius,
        minRadius,
        color,
        x,
        y,
                }: BallPropsType) {
        this.radius = radius;
        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    /**
     * @deprecated changeMovingDirection 매서드로 이 함수의 역할을 대체할 수 있음.
     * private 에서는 써도 좋지만, public 에서는 굳이..?
     */
    public isCollided(stageWidth: number, stageHeight: number) {
        return (
            this.x - this.radius <= 0 ||
            this.y - this.radius <= 0 ||
            this.x + this.radius >= stageWidth ||
            this.y + this.radius >= stageHeight
        )
    }

    public getCollidedDirection(stageWidth: number, stageHeight: number): CollideDirection | null {
        if (!this.isCollided(stageWidth, stageHeight)) {
            return null;
        }

        let ret = '';

        if (this.x - this.radius <= 0 || this.x + this.radius >= stageWidth) {
            ret += 'x';
        } else if (this.y - this.radius <= 0 || this.y + this.radius >= stageHeight) {
            ret += 'y';
        }
        return ret as CollideDirection;
    }

    public changeMovingDirection(direction: 'x' | 'y' | 'xy') {
        switch (direction) {
            case "x":
                this.dx *= -1;
                break ;
            case "y":
                this.dy *= -1;
                break ;
            case "xy":
                this.dx *= -1;
                this.dy *= -1;
                break ;
            default :
                console.error('Error: Incorrect changeMovingDirection Param!');
        }
    }

    public setRadiusBoundary(maxRadius: number, minRadius: number) {
        if (minRadius < 0 || minRadius >= maxRadius || this.radius > maxRadius) {
            console.error('Error: unvalid value!');
        }

        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
    }

    /**
     * 공의 크기를 변경시킬 수 있음.
     * 현재 구현된건 sin 함수를 따라 주기를 변경하는 것
     */
    public changeSize(type: SizeChangeType) {
        if (!this.maxRadius || !this.minRadius) {
            console.error('Error: maxRadius or minRadius is not defined!');
            return ;
        }

        switch (type) {
            case "sin":
                if (this.sizeChangeTool?.type !== type) {
                    this.sizeChangeTool = {
                        type: 'sin',
                        tool: new Sin({max: this.maxRadius, min: this.minRadius, cycleConstant: random(0.5, 2)}),
                    }
                }
                this.radius = this.sizeChangeTool.tool.getContinuousValue();
                return ;
            default:
                console.error('Error: Wrong Sizetype!')
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
}