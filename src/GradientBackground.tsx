import {useEffect, useRef} from "react";
import {useDPR} from "./hooks/useDPR";
import {BallController} from "./controller/BallController";
import {hexToRgb} from "./util/util";
import {colorTheme} from "./colors/colorTheme";
import {Ball} from "./Ball";

interface GradientBackgroundPropsType {
    size: {
        width: string,
        height: string,
    }
}

const defaultSize = {
    width: '100%',
    height: '100%',
}


export default function GradientBackground({size = defaultSize}: GradientBackgroundPropsType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useDPR(canvasRef, size);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const balls: Ball[] = [];
        const ballCnt = 15;

        for (let i = 0; i < ballCnt; i++) {
            const minRadius = Math.min(canvas.width, canvas.height) * 0.2;
            const ball = BallController.createBall({
                radius: minRadius,
                theme: 'vine',
                minRadius: minRadius,
                maxRadius: Math.min(canvas.width, canvas.height) * 0.5,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: Math.random() > 0.5 ? Math.random() * 7 : -Math.random() * 7,
                dy: Math.random() > 0.5 ? Math.random() * 7 : -Math.random() * 7,
            });

            balls.push(ball);
        }

        // ctx.filter = 'blur(20px)';
        ctx.globalCompositeOperation = 'lighter';

        function drawBall() {
            const canvas = canvasRef.current;
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < balls.length; i++) {
                balls[i].update(ctx);
                balls[i].draw(ctx);
            }
            window.requestAnimationFrame(drawBall);
        }
        window.requestAnimationFrame(() => {
          drawBall();
        })
        const onResize = () => {
            balls.forEach((ball) => ball.resize(Math.min(canvas.width, canvas.height) * 0.2, Math.min(canvas.width, canvas.height) * 0.5));
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    return(
        <canvas ref={canvasRef}></canvas>
    );
}