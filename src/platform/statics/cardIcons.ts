import {CardTypeEnum} from "../enums/cardType";
import VisaLogo from "../../assets/svg/visa-white.svg";
import MasterCardLogo from "../../assets/svg/mastercard-white.svg";
import AmexLogo from "../../assets/svg/amex.svg";

export const CardIcons = {
  [CardTypeEnum.visa]: VisaLogo,
  [CardTypeEnum.masterCard]: MasterCardLogo,
  [CardTypeEnum.discover]: '',
  [CardTypeEnum.americanExpress]: AmexLogo,
}