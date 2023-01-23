import {Sin} from "./Sin";
import {random} from "./util";
import {getRandomValue, hexToRgb} from "./util/util";

type BallPropsType = {
    radius: number,
    colors: string[],
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
    private colors: string[];
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private color: string;
    /**
     * {@link SizeChangeType, SizeChangeTool}
     */
    private sizeChangeTool: {type: SizeChangeType, tool: SizeChangeTool};

    constructor({
        radius,
        maxRadius,
        minRadius,
        colors,
        x,
        y,
                }: BallPropsType) {
        this.radius = radius;
        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
        this.colors = colors;
        this.x = x;
        this.y = y;
        this.color =  getRandomValue(this.colors);
    }

    public resize(minR: number, maxR: number) {
        this.setRadius(minR, maxR);
        this.sizeChangeTool.type = null;
    }

    public setRadius(minR: number, maxR: number) {
        this.minRadius = minR;
        this.radius = minR;
        this.maxRadius = maxR;
    }

    public isCollided(stageWidth: number, stageHeight: number) {
        return (
            this.x - this.radius <= 0 ||
            this.y - this.radius <= 0 ||
            this.x + this.radius >= stageWidth ||
            this.y + this.radius >= stageHeight
        )
    }

    public manageCollision(top: number, right: number, bottom: number, left: number) {
        if (this.x - this.radius < left) {
            this.x = this.radius + left;
            this.dx *= -1;
        }
        if (this.x + this.radius > right) {
            this.x = right - this.radius;
            this.dx *= -1;
        }

        if (this.y - this.radius < top) {
            this.y = this.radius + top;
            this.dy *= -1;
        }

        if (this.y + this.radius > bottom) {
            this.y = bottom - this.radius;
            this.dy *= -1;
        }
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

    public setSpeed(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    private applyForce() {
        this.x += this.dx;
        this.y += this.dy;
    }

    public update(ctx:CanvasRenderingContext2D, changeSize = true, move = true) {
        if (changeSize) {
            this.changeSize('sin');
        }
        if (move) {
            this.applyForce();
            // 공이 움직일수 있는 영역의 크기 9배로 늘림.
            const ratio = 0.3;
            this.manageCollision(-ctx.canvas.height * ratio, ctx.canvas.width * (1 + ratio), ctx.canvas.height * (1 + ratio), -ctx.canvas.width * ratio);
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.01,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, hexToRgb(this.color,1));
        gradient.addColorStop(1, hexToRgb(this.color,0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
}