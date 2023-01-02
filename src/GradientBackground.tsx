import {useRef} from "react";

export default function GradientBackground() {
    const backgroundRef = useRef<HTMLCanvasElement>(null);

    return(
        <canvas ref={backgroundRef}></canvas>
    );
}