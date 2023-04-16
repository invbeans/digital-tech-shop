export class ReviewProdPage {
    constructor(public id: number | null,
        public username: string,
        public product: number,
        public points: number,
        public date: Date,
        public text: string) { }
}