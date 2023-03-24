export class ShippingHistory {
    constructor(public id: number | null,
        public order: number,
        public date: Date,
        public shippingStatus: number) { }
}