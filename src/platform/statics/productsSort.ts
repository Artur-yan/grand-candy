import {ProductsSortEnum} from "../../platform/enums/productsSort"
import messages from "../../i18n/messages";
import LanguageStorage from "../../platform/services/storages/languageStorage";

export const ProductsSort = [
  { name: messages[LanguageStorage.getLanguage()]['alphabetical_a_z'], index: ProductsSortEnum.ALPHABETICAL_ASC, data:ProductsSortEnum.ALPHABETICAL_ASC },
  { name: messages[LanguageStorage.getLanguage()]['alphabetical_z_a'], index: ProductsSortEnum.ALPHABETICAL_DESC, data:ProductsSortEnum.ALPHABETICAL_DESC },
  { name: messages[LanguageStorage.getLanguage()]['price_low_to_height'], index: ProductsSortEnum.PRICE_ASC, data:ProductsSortEnum.PRICE_ASC },
  { name: messages[LanguageStorage.getLanguage()]['price_height_to_low'], index: ProductsSortEnum.PRICE_DESC, data:ProductsSortEnum.PRICE_DESC },
  // { name: 'Created date', index: ProductsSortEnum.CREATED_DATE_DESC },
]
