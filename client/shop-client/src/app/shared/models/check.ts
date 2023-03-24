export class Check {
    constructor(public order: number | null,
        public paymentMethod: number,
        public fullPrice: number) { }
}