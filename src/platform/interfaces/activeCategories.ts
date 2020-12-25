import {ICategoryModel} from "../api/category/res/category-model";

export interface IActiveCategory {
  category: ICategoryModel
  setActiveCategory: Function;
}
