import React from "react";
import LanguageStorage from "../../../../../platform/services/storages/languageStorage";
import {LanguageEnum} from "../../../../../platform/enums/language";
import En from "./en";
import Ru from "./ru";
import Hy from "./hy";
import t from "../../../../../i18n/translate";

export function Privacy() {

  return (
    <div className='G-info-section'>
      <h4 className='G-mb-35'>{t('privacy_policy')}</h4>
      {LanguageStorage.getLanguage() === LanguageEnum.En && <En/>}
      {LanguageStorage.getLanguage() === LanguageEnum.Ru && <Ru/>}
      {LanguageStorage.getLanguage() === LanguageEnum.Hy && <Hy/>}
    </div>
  )
}