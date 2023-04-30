import { Product } from "./product";

export class ProductReturnPage {
    constructor(public product: Product,
        public chosen: boolean,
        public properQuality: boolean) { }
}