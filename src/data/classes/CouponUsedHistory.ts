export default class CouponUsedHistory {
    couponNumber: string;
    gymName: string;
    price: number;
    orderNumber: string;
    dateUsed: Date;
    couponName?: string;


    constructor({
        couponNumber,
        gymName,
        price,
        orderNumber,
        dateUsed,
        coupon
    }: {
        couponNumber: string;
        gymName: string;
        price: number;
        orderNumber: string;
        dateUsed: Date;
        coupon?:{
            couponMaster:{
                name: string;
            }
        }
    }) {
        this.couponNumber = couponNumber;
        this.gymName = gymName;
        this.price = price;
        this.orderNumber = orderNumber;
        this.dateUsed = dateUsed;
        this.couponName = coupon?.couponMaster.name;
    }
}