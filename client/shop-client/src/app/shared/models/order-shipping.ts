export class OrderShipping {
    constructor(public id: number | null,
        public order: number,
        public shippingService: number,
        public adress: number,
        public pickupPointType: number) { }
}