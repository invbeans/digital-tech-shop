export class Answer {
    constructor(public id: number | null,
        public user: number,
        public question: number,
        public date: Date,
        public text: string) { }
}