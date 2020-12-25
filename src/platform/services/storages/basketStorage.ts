import { BaseStorage } from "./baseStorage";
import { IBasket } from "../../interfaces/basket";

class BasketStorage extends BaseStorage {

  setProduct(products: IBasket['basket']) {
    this.set('products', JSON.stringify(products));
  }

  getProducts(): IBasket['basket'] {
    return JSON.parse(this.get('products')) || [];
  }
}

export default new BasketStorage();
