export class Promocode {
    constructor(public id: number | null,
        public text: string,
        public percent: number,
        public isActive: boolean) { }
}