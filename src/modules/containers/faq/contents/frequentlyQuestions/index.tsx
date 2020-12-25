import React from "react";
import './styles.scss';
import t from "../../../../../i18n/translate";

export function FrequentlyQuestions() {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{t('FAQ.questions-1-title')}</h4>
      </div>
      <div className='P-info-text'>
        {t('FAQ.questions-1-text')}
      </div>
    </div>
  )
}