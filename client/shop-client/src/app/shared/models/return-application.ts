export class ReturnApplication {
    constructor(public id: number | null,
        public user: number,
        public date: Date,
        public order: number,
        public text: string,
        public approved: boolean) { }
}