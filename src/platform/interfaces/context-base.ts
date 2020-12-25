import { IBasket } from "./basket";
import { ICategories } from "./categories";
import {IUser} from "./user";
import {IActiveCategory} from "./activeCategories";
import {ILanguage} from "./language";

export interface IContextBase {
  basketState: IBasket;
  categoriesState: ICategories;
  activeCategory: IActiveCategory,
  language: ILanguage,
  userState: IUser;
}
