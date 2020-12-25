import React, {useState} from 'react';
import './style.scss';
import {ButtonBase, Textarea} from "../../formElements";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  show: boolean,
  close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  submit: (data) => void,
  loading: boolean
  // submit: () => void,
}

export function RateModal(props: IModal) {

  const [selfOrderRate, setSelfOrderRate] = useState(null)
  const [selfOrderFeedback, setSelfOrderFeedback] = useState()
  const [rates, setRates] = useState([
    {
      rateVal: 1,
      isSelected: false
    },
    {
      rateVal: 2,
      isSelected: false
    },
    {
      rateVal: 3,
      isSelected: false
    },
    {
      rateVal: 4,
      isSelected: false
    },
    {
      rateVal: 5,
      isSelected: false
    },
  ])

  const submit = () => {
    props.submit({orderRate: selfOrderRate, orderFeedback: selfOrderFeedback})
  }

  const setRate = (rateVal) => {

    let newRate = [...rates];

    newRate.map((rate, index) => {

      if (rate.rateVal <= rateVal) {
        newRate[index].isSelected = true;
      } else {
        newRate[index].isSelected = false;
      }
      if (rate.rateVal === rateVal) {
        setSelfOrderRate(newRate[index].rateVal)
      }
    })

    setRates(newRate);
  }

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'
           style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-rate P-modal-wrapper"
           style={{
             transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
             top: props.show ? '45%' : '-100%',
             opacity: props.show ? '1' : '0'
           }}>
        <div className='P-rate-content'>
          <h5 className='G-mb-20'>{t('rate_title')}</h5>
          <p className='G-text-center G-text-gray-sm P-rate-desc'>{t('rate_sub_title')}</p>
          <div className='G-flex-space-between P-starts G-p-20 G-width-80'>
            {rates.map((rate, index) => {
              return (
                <i key={index} className={`G-cursor-pointer ${rate.isSelected ? 'icon-ic_starpink' : 'icon-ic_stargrey'}`} onClick={() => setRate(rate.rateVal)}/>
              )
            })}
          </div>
          <Textarea defaultValue={selfOrderFeedback} name='feedback'  onChange={(name, value) => {
            setSelfOrderFeedback(value)
          }} placeholder={messages[LanguageStorage.getLanguage()]['rate_leave_a_feedback']}/>
          <div className='G-flex-space-between G-pt-3 G-width-80'>
            <div className='G-btn-link-gray' onClick={props.close}>{t('cancel')}</div>
            <ButtonBase loading={props.loading} classes='P-btn-bg-ping P-btn-primary G-width-60' onClick={() => submit()}>{t('send')}</ButtonBase>
          </div>
        </div>
      </div>
    </div>
  )
}