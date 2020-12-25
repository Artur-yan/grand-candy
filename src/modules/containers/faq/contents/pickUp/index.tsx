import React from "react";
import './styles.scss';
import t from "../../../../../i18n/translate";

export function ApplyPromoCode() {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{t('FAQ.questions-5-title')}</h4>
      </div>
      <div className='P-info-text'>
        <div className='P-info-text'>
          {t('FAQ.questions-5-text')}
        </div>
        <div className='P-info-text'>
          <div className='G-flex G-border-black-1 G-width-90'>
            <div className='G-flex-column G-width-5'>
              <div className='G-text-bold G-border-black-1 G-p-5'>№</div>
              <div className='G-border-black-1 G-p-5'>1</div>
              <div className='G-border-black-1 G-p-5'>2</div>
              <div className='G-border-black-1 G-p-5'>3</div>
              <div className='G-border-black-1 G-p-5'>4</div>
              <div className='G-border-black-1 G-p-5'>5</div>
              <div className='G-border-black-1 G-p-5'>6</div>
              <div className='G-border-black-1 G-p-5'>7</div>
              <div className='G-border-black-1 G-p-5'>8</div>
              <div className='G-border-black-1 G-p-5'>9</div>
              <div className='G-border-black-1 G-p-5'>10</div>
              <div className='G-border-black-1 G-p-5'>11</div>
              <div className='G-border-black-1 G-p-5'>12</div>
              <div className='G-border-black-1 G-p-5'>13</div>
              <div className='G-border-black-1 G-p-5'>14</div>
              <div className='G-border-black-1 G-p-5'>15</div>
              <div className='G-border-black-1 G-p-5'>16</div>
              <div className='G-border-black-1 G-p-5'>17</div>
              <div className='G-border-black-1 G-p-5'>18</div>
              <div className='G-border-black-1 G-p-5'>19</div>
              <div className='G-border-black-1 G-p-5'>20</div>
            </div>
            <div className='G-flex-column G-width-45'>
              <div className='G-text-bold G-border-black-1 G-p-5'>{t('brand_store')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address1')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address2')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address3')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address4')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address5')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address6')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address7')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address8')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address9')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address10')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address11')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address12')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address13')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address14')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address15')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address16')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address17')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address18')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address19')}</div>
              <div className='G-border-black-1 G-p-5'>{t('address20')}</div>
            </div>
            <div className='G-flex-column G-width-50'>
              <div className='G-text-bold G-border-black-1 G-p-5'>{t('schedule')}</div>
              <div className='G-border-black-1 G-height-100 G-flex-column'>
                <div className='G-p-5'>{t('every_day')}- 10:30-19:00</div>
              </div>
            </div>
          </div>
          <div className='G-flex G-width-90 G-border-black-1 G-border-top-none '>
            <div className='G-flex-column G-width-5'> <div className='G-flex-vertical-center G-height-100 G-border-black-1 G-p-5 G-border-top-none'>21</div></div>
            <div className='G-flex-column G-width-45'><div className='G-flex-vertical-center G-height-100 G-border-black-1 G-p-5 G-border-top-none'>{t('address21')}</div></div>
            <div className='G-flex-column G-width-50 G-border-black-1 G-border-top-none'>
              <div className='G-p-5 G-move-bottom '>
                {t('every_day')}- 10:30-19:00 <br/>
                {t('monday_to_friday')}- 11:30-19:00 <br/>
                {t('saturday')}- 11:30-16:00 <br/>
                {t('closed_days')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}