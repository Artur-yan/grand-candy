import React from "react";
import './styles.scss';
import t from "../../../../../i18n/translate";

export function DateAndTimeOfDelivery() {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{t('FAQ.questions-8-title')}</h4>
      </div>
      <div className='P-info-text'>
        {t('FAQ.questions-8-text')}
      </div>
    </div>
  )
}