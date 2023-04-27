export class Adress {
    constructor(public id: number | null,
        public orderAdress: string,
        public region: number,
        public streetType: number,
        public house: string | null,
        public building: string,
        public apartment: number,
        public postcode: number) { }
}