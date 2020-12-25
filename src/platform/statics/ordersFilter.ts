import {OrderStatusEnum} from "../enums/OrderStatus";
import messages from "../../i18n/messages/index";
import LanguageStorage from "../../platform/services/storages/languageStorage";

export const OrderFilter = [
  { name: messages[LanguageStorage.getLanguage()]['all'], index: OrderStatusEnum.reset },
  { name: messages[LanguageStorage.getLanguage()]['order_type_enum_pending'], index: OrderStatusEnum.pending, data:[OrderStatusEnum.pending, OrderStatusEnum.accepted, OrderStatusEnum.branch_attached] },
  { name: messages[LanguageStorage.getLanguage()]['order_type_enum_finished'], index: OrderStatusEnum.finished, data:[OrderStatusEnum.finished] },
  { name: messages[LanguageStorage.getLanguage()]['order_type_enum_canceled'], index: OrderStatusEnum.canceled, data:[OrderStatusEnum.canceled] },
  { name: messages[LanguageStorage.getLanguage()]['order_type_enum_started'], index: OrderStatusEnum.started, data:[OrderStatusEnum.started, OrderStatusEnum.drive_attached] },
];