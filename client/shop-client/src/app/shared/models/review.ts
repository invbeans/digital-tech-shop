export class Review {
    constructor(public id: number | null,
        public user: number,
        public product: number,
        public points: number,
        public date: Date,
        public text: string) { }
}