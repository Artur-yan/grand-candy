import { ApiClient } from "../../services/apiClient";
import { ICategoryModel } from "./res/category-model";
import { IPagingResponse } from "../../interfaces/paging-response";
import { IProductModel } from "../products/res/product-model";
import { ProductsSortEnum } from "../../enums/productsSort";
import {ITopCategoryModel} from "./res/top-category-model";

class Category extends ApiClient {

  controller = 'category';

  categories = (page: number, size: number) => {
    return this.get<IPagingResponse<ICategoryModel>>(`getAllCategoriesForMobile/${page}/${size}`)
  }

  topCategories = () => {
    return this.get<ITopCategoryModel[]>(`getTopCategoriesForWeb`)
  }

  search = (search: string) => {
    return this.put('getCategoriesAndProductsBySearchName',{searchText: search })
  }

  productsByCategory = (id, page: number, size: number, sort = ProductsSortEnum.CREATED_DATE_DESC) => {
    return this.get<IPagingResponse<IProductModel>>(`getAllProductsByCategoryIdForMobile/${page}/${size}`, { categoryId: id, sortingEnumValue:sort})
  }
}

export default new Category();
