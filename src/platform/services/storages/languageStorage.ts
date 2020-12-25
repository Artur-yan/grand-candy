import {BaseStorage} from "./baseStorage";
import {LanguageEnum} from "../../enums/language";

class LanguageStorage extends BaseStorage {

  setLanguage(language: LanguageEnum) {
    this.set('language', JSON.stringify(language));
    window.location.reload();
  }

  getLanguage(): LanguageEnum {
    return this.get('language') ? JSON.parse(this.get('language')) : LanguageEnum.En;
  }
}

export default new LanguageStorage();
