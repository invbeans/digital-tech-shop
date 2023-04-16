export class Product {
    constructor(public id: number | null,
        public name: string,
        public subCategory: number,
        public manufacturer: number,
        public supplier: number,
        public price: number,
        public rating: number,
        public image_link: string | null,
        public amount: number) { }
}