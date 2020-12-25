
export interface IPopularProductModel {
  id: number;
  price: number;
  productName: string;
  description: string;
  imageUrl: string;
  ingredients?: string;
  shelfLife?: string;
  measurementEnumValue: number
}
