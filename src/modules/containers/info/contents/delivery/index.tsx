import React from "react";
import t from "../../../../../i18n/translate";

export function Delivery() {
  return (
    <div className='G-info-section'>
      <h4 className='G-mb-35'>{t('privacy_policy')}</h4>
      <div className='P-info-text'>
        <div className='G-mb-15'>
          {t('delivery_terms_text1')}
        </div>
        <div className='G-mb-15'>
          {t('delivery_terms_text2')}
        </div>
        <div className='G-mb-15'>
          {t('delivery_terms_text3')}
        </div>
        <div className='G-mb-15'>
          {t('delivery_terms_text4')}
        </div>
        <div className='G-mb-15'>
          {t('delivery_terms_text4')}
        </div>
      </div>
      <div className='P-info-text'>
        {t('delivery_terms_table_desc')}
      </div>
      <div className='P-info-text'>
        <div className='G-border-black-1 G-flex-column G-width-90'>
          <div className='G-flex '>
            <div className='G-border-black-1 G-width-80 G-p-15'>{t('delivery_terms_table_row1')}</div>
            <div className='G-border-black-1 G-width-20 G-p-15'>1000 {t('price')}</div>
          </div>
          <div className='G-flex '>
            <div className='G-border-black-1 G-width-80 G-p-15'>{t('delivery_terms_table_row2')}</div>
            <div className='G-border-black-1 G-width-20 G-p-15'>500 {t('price')}</div>
          </div>
          <div className='G-flex '>
            <div className='G-border-black-1 G-width-80 G-p-15'>{t('delivery_terms_table_row3')}</div>
            <div className='G-border-black-1 G-width-20 G-p-15'>{t('free')}</div>
          </div>
        </div>
      </div>
      <div className='P-info-text'>
        <b>{t('attention')}</b>
      </div>
      <div className='P-info-text'>
        <ul className='P-info-ul'>
          <li>
            {t('attention_point_one')}
          </li>
          <li>
            {t('attention_point_two')}
          </li>
        </ul>
      </div>
      <div className='P-info-text'>
        <b>{t('payment_terms')}</b>
      </div>
      <div className='P-info-text'>
        {t('payment_text1')}
      </div>
      <div className='P-info-text'>
        {t('payment_text2')}
      </div>
      <div className='P-info-text'>
        <b>{t('return_terms')}</b>
      </div>
      <div className='P-info-text'>
        {t('return_text')}
      </div>
    </div>
  )
}