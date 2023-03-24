export class Question {
    constructor(public id: number | null,
        public user: number,
        public product: number,
        public date: Date,
        public text: string) { }
}