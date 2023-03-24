export class Adress {
    constructor(public id: number | null,
        public region: number,
        public streetType: number,
        public house: string,
        public building: string,
        public apartment: number,
        public postcode: number) { }
}