type SinPropsType = {
    max: number;
    min: number;
    /**
     * 삼각함수 주기를 결정하는 값으로 (0.5 ~ 2 추천)
     * default: 1
     */
    cycleConstant?: number;
};

const radianAcc = 0.07; // 3.14 가 180도니깐.. 0.07은 약 2.2도.. 즉, 2.2 도씩 가속이 있다는 뜻

export class Sin {
    private max : number;
    private min: number;
    private height: number;
    private middle: number;
    private cycleConstant: number;
    private radian: number;

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
        console.log(this.height);
        console.log(this.middle);
    }

    /**
     * Math.PI or Math.PI * 2
     */
    public getValue(radian: number) {
        return this.height * Math.sin(this.cycleConstant * radian) + this.middle;
    }

    /**
     * 호출할때 마다, radian 이 1 씩 증가한 것의 결과값을 리턴함.
     */
    public getContinuousValue() {
        this.radian += radianAcc;
        return this.height * Math.sin(this.cycleConstant * this.radian) + this.middle;
    }

}