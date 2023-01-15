import {useEffect, useRef} from "react";
import {useDPR} from "./hooks/useDPR";
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
    const ballRef = new Ball({
        radius: 10,
        maxRadius: 50,
        minRadius: 5,
        color: '#be3455',
        x: 100,
        y: 100
    });

    useEffect(() => {
        function drawBall() {
            const canvas = canvasRef.current;
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ballRef.changeSize('sin');
            ballRef.draw(ctx);
            window.requestAnimationFrame(drawBall);
        }
        window.requestAnimationFrame(() => {
          drawBall();
        })
    }, []);

    return(
        <canvas ref={canvasRef}></canvas>
    );
}