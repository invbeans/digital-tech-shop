export class Action {
    constructor(public id: number | null,
        public name: string,
        public dateBegin: Date | null,
        public dateEnd: Date | null,
        public percent: number,
        public image: string,
        public actionType: number) { }
}