import React from "react";
import './styles.scss';
import t from "../../../../../i18n/translate";

export function DesiredProducts() {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{t('FAQ.questions-6-title')}</h4>
      </div>
      <div className='P-info-text'>
        {t('FAQ.questions-6-list')}
        <ul className='P-info-ul'>
          <li>{t('FAQ.questions-6-list1')}</li>
          <li>{t('FAQ.questions-6-list2')}</li>
          <li>{t('FAQ.questions-6-list3')}</li>
          <li>{t('FAQ.questions-6-list4')}</li>
        </ul>
      </div>
    </div>
  )
}