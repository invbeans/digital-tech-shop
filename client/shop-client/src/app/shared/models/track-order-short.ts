export class TrackOrderShort {
    constructor(
        public order: number,
        public date: Date,
        public shippingMethod: string,
        public shippingStatus: string) { }
}