export class WindowAnimationFrame {
    private static instance: WindowAnimationFrame;
    private requestId: number;
    private clearRect: Callback;
    private callbacks: Set<Callback> = new Set();

    static getInstance() {
        return this.instance = this.instance ?? new WindowAnimationFrame();
    }

    public addCallback(callback: Callback) {
        this.callbacks.add(callback);
    }

    public removeCallback(callback: Callback) {
        this.callbacks.delete(callback);
    }

    public setClearRect(clearFunc: Callback) {
        this.clearRect = clearFunc;
    }

    private runCallbacks() {
        this.clearRect?.();
        this.callbacks.forEach((callback) => {
            callback();
        })
        this.requestId = window.requestAnimationFrame(this.runCallbacks.bind(this));
    }

    public animate() {
        this.requestId = window.requestAnimationFrame(this.runCallbacks.bind(this));
    }

    public cancal() {
        window.cancelAnimationFrame(this.requestId);
    }
}

type Callback = () => void;