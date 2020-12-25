import React, {useState, useEffect, useContext} from 'react';
import EnglishImg from "../../assets/svg/ic_english.svg";
import RusImg from "../../assets/svg/ic_russian.svg";
import ArmImg from "../../assets/svg/ic_armenian.svg";
import {LanguageEnum} from "../../platform/enums/language";
import LanguageStorage from "../../platform/services/storages/languageStorage";
import {ClickOutside} from "../../platform/services/helpers";
import StateContext from "../../contexsts/stateContext";

export function SelectLanguage({classes = '', onChange, data}) {

  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(StateContext);

  const [languages] = useState([
    {
      name: LanguageEnum.En,
      label: 'English',
      flag: EnglishImg
    },
    {
      name: LanguageEnum.Ru,
      label: 'Русский',
      flag: RusImg
    },
    {
      name: LanguageEnum.Hy,
      label: 'Հայերեն',
      flag: ArmImg
    },
  ])

  const onSelect = (name) => {
    language.setLanguage(name);
    LanguageStorage.setLanguage(name)
  }

  const [selected, setSelected] = useState(languages[0]);

  useEffect(() => {
    if (LanguageStorage.getLanguage()) {
      languages.map((language, key) => {
        language.name === LanguageStorage.getLanguage() && setSelected(language);
      })
    }
  }, [selected])

  return (
    <ClickOutside onClickOutside={() => setIsOpen(false)}>
      <div className={`${classes} P-select G-flex-space-between`} onClick={() => setIsOpen(!isOpen)}>
      <div className='G-flex G-flex-vertical-center G-position-relative G-cursor-pointer'>
        <img className='P-flag' src={selected.flag} alt="logo"/>
        <span>{selected.label}<i className='icon-ic_arrowdown G-arrow-down-sm G-ml-1'/></span>
      </div>
      <div className={`P-search-select-content ${isOpen ? '' : 'G-d-none'}`}>
        {
          languages.map((val, index) => {
            return (
              <div onClick={() => {onSelect(val.name)}} key={index}>
                <div className='G-flex G-flex-vertical-center G-position-relative G-cursor-pointer'>
                  <img className='P-flag' src={val.flag} alt="logo"/>
                  <span>{val.label}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    </ClickOutside>
  );
}
