import React from "react";
import './styles.scss';
import t from "../../../../../i18n/translate";

export function CancelOrder() {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{t('FAQ.questions-11-title')}</h4>
      </div>
      <div className='P-info-text'>
        <ul className='P-info-ul'>
          <li>
            {t('FAQ.questions-11-point1')}
          </li>
          <li>
            {t('FAQ.questions-11-point1')}
          </li>
        </ul>
      </div>
    </div>
  )
}