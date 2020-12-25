import { IProductModel } from "../api/products/res/product-model";

export interface IBasket {
  basket: Array<{
    item: IProductModel;
    count: number;
  }>;
  setBasket(data: IBasket['basket']): void;
}
