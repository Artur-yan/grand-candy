import {OrderTypeEnum} from "../../../enums/OrderType";
import {OrderStatusEnum} from "../../../enums/OrderStatus";
import {PaymentEnum} from "../../../enums/payment";

export interface IOrderDetailsModel {
  orderId: number;
  orderNumber: String;
  orderStatusValue: OrderStatusEnum;
  orderTypeValue: OrderTypeEnum;
  orderDate: number;
  paymentMethodValue: PaymentEnum
  orderCreatedDate: number;
  total: number;
  subTotal: number;
  serviceRate:number;
  usedBonus: number;
  gainedBonus: number;
  branchDto: {
    address: string
    branchId: number
    branchName: string
    enableDelivery: boolean
    enablePickUp: boolean
    imageUrl: string
  };
  addressDto: {
    longitude: number,
    latitude: number,
    addressName: string,
    apartment: string,
    floor: number,
    entrance: number,
  };
  comment: string
  deliveryFee: number
  productList: Array<{
    finalPriceForProduct: number
    id: number
    imageUrl: string
    measurementEnumValue: number
    price: number
    productCount: number
    productName: string
  }>
  recipientName: string
  recipientPhoneNumber: string
}
