import {useEffect} from "react";

interface Size {
    width: string;
    height: string;
}

export function useDPR(canvasRef: React.RefObject<HTMLCanvasElement>, size: Size) {
    useEffect(() => {
        if (!canvasRef.current) {
            console.error('Error: useDRP fail Initialization.');
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio > 1 ? 2 : 1;
        /**
         * css pixel 을 먼저 정의한 뒤, getBoundingClientRect 로 정의한 값을 가져와서 사용한다.
         */
        canvas.style.width = size.width;
        canvas.style.height = size.height;

        const {width, height} = canvas.getBoundingClientRect();
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }, []);
}