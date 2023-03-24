export class Action {
    constructor(public id: number | null,
        public name: string,
        public dateBegin: Date,
        public dateEnd: Date,
        public percent: number,
        public image: string,
        public actionType: number) { }
}