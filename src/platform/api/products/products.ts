import {ApiClient} from "../../services/apiClient";
import {IProductModel} from "./res/product-model";
import {IPagingResponse} from "../../interfaces/paging-response";
import {ProductsSortEnum} from "../../enums/productsSort";

class Products extends ApiClient {

  controller = 'product';

  product = (params: { id: number }) => {
    return this.get<IProductModel>('getProductById', params)
  };

  products = (page: number, size: number, sort = ProductsSortEnum.CREATED_DATE_DESC) => {
    return this.post<IPagingResponse<IProductModel>>(`getAllProductsBySorting/${page}/${size}`, {},{sortingEnumValue: sort})
  }

  popular = () => {
    return this.get<IProductModel[]>('getMostPopularProducts')
  }

  isFavorite = (id: number) => {
    return this.put('setOrRemoveFavoriteProductToUser', {}, {productId: id})
  }

  favorites = () => {
    return this.get<IProductModel[]>('getAllFavoriteProducts')
  }
}

export default new Products()
