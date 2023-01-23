import {Ball} from "../Ball";
import {getRandomValue} from "../util/util";
import {colorTheme, ThemeType} from "../colors/colorTheme";

type BallsPropsType = {
    radius: number,
    theme: ThemeType,
    minRadius: number,
    maxRadius: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
};

export class BallController {
    private static instance: BallController;

    static getInstance() {
        return this.instance = this.instance ?? new BallController();
    }

    static createBall({ radius,
                          theme,
                          minRadius,
                          maxRadius,
                          x,
                          y,
                          dx,
                          dy
    }: BallsPropsType) {

        const colorList: string[] = colorTheme[theme];

        const ball = new Ball({
            radius: radius,
            maxRadius: maxRadius,
            minRadius: minRadius,
            colors: colorList,
            x: x,
            y: y
        });
        ball.setSpeed(dx, dy);

        return ball;
    }

}

