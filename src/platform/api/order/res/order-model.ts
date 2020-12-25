
export interface IOrderModel {
  orderDate: number
  branch: {
    branchId: number
    branchName: string
    imageUrl: string
  }
  address : {
    longitude: number,
    latitude: number,
    addressName: string,
    apartment: string,
    floor: number,
    entrance: number,
  }
  orderId: number
  orderNumber: string
  orderStatus: number
  orderType: number
  productCount: number
  productImages: Array<string>
  total: number
}
