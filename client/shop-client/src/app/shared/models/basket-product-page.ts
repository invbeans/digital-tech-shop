import { Product } from "./product";

export class BasketProductPage {
    constructor(public product: Product,
        public count: number) { }
}