type DegreeIntervalType = 'slow' | 'normal' | 'fast';

const DegreeInterval: Record<DegreeIntervalType, number> = {
    slow: 0.01,
    normal: 0.04,
    fast: 0.07,
} as const;

type SinPropsType = {
    max: number;
    min: number;
    /**
     * 삼각함수 주기를 결정하는 값으로 (0.5 ~ 2 추천)
     * default: 1
     */
    cycleConstant?: number;
};

export class Sin {
    private max : number;
    private min: number;
    private height: number;
    private middle: number;
    private cycleConstant: number;
    private radian: number;
    private degreeInterval = DegreeInterval.slow;

    constructor({
        max,
        min,
        cycleConstant = 1
                }: SinPropsType) {
        this.max = max;
        this.min = min;
        this.height = (max - min) / 2;
        this.middle = (max + min) / 2;
        this.cycleConstant = cycleConstant;
        this.radian = 0;
    }

    /**
     * Math.PI or Math.PI * 2
     */
    public getValue(radian: number) {
        return this.height * Math.sin(this.cycleConstant * radian) + this.middle;
    }

    public setDegreeInterval(speed: DegreeIntervalType) {
        this.degreeInterval = DegreeInterval[speed];
    }
    /**
     * 호출할때 마다, radian 이 1 씩 증가한 것의 결과값을 리턴함.
     */
    public getContinuousValue() {
        this.radian += this.degreeInterval;
        return this.height * Math.sin(this.cycleConstant * this.radian) + this.middle;
    }

}