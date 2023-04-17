export class AnswerProdPage {
    constructor(public id: number | null,
        public username: string,
        public question: number,
        public date: Date,
        public text: string) { }
}