import {OrderStatusEnum} from "../enums/OrderStatus";
import messages from "../../i18n/messages";
import LanguageStorage from "../../platform/services/storages/languageStorage";

export const OrderStatus = {
  [OrderStatusEnum.pending]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_pending'], className: 'G-status-pending G-status'},
  [OrderStatusEnum.finished]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_finished'], className: 'G-status-finish G-status'},
  [OrderStatusEnum.canceled]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_canceled'], className: 'G-status-canceled G-status'},
  [OrderStatusEnum.accepted]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_accepted'], className: 'G-status-accepted G-status'},
  [OrderStatusEnum.branch_attached]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_pending'], className: 'G-status-pending G-status'},
  [OrderStatusEnum.started]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_started'], className: 'G-status-started G-status'},
  [OrderStatusEnum.drive_attached]: {name: messages[LanguageStorage.getLanguage()]['order_type_enum_driver_attached'], className: 'G-status-started G-status'},
}
