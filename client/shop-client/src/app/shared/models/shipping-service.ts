export class ShippingService {
    constructor(public id: number | null,
        public name: string,
        public shippingMethod: number,
        public price: number) { }
}